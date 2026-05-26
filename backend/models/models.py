from pydantic import Field, model_validator, BaseModel, EmailStr
from datetime import date
from enum import Enum
from beanie import Link, Document, View
from typing import List, Optional

class StreamingServiceEnum(Enum):
    NETFLIX = "Netflix"
    APPLE_TV = "Apple TV"
    DISNEY_PLUS = "Disney +"

class ProducerRoleEnum(Enum):
    DIRECTOR = "Director"
    WRITER = "Writer"

class MovieMainPageCollections(Enum):
    ALL_TIMERS = "All Timers"
    UPCOMING = "Upcoming"
    ONES_TO_WATCH = "Ones to watch"
    HERO_BANNER = "Hero Banner"

class StreamingService(BaseModel):
    service: StreamingServiceEnum
    link: str

class Producer(BaseModel):
    name: str
    producer_role: List[ProducerRoleEnum]

class Banner(BaseModel):
    backdrop_directory: str
    poster_direcotry: str

# 2. STANDALONE COLLECTIONS (Documents)

class Category(Document):
    category: str

    class Settings: 
        name = "categories"

class Actor(Document):
    name: str
    image: Optional[str] = None

    class Settings:  
        name = "actors"

class MovieCast(BaseModel):
    actor: Link[Actor]
    role: str

# 3. MOVIE DOCUMENT (Placed here so User & Review can reference it)
class MovieFields(BaseModel):
    id: str = Field(default=None, alias="_id") 
    backdrops: List[str]
    posters: List[str]
    main_page_banner: str
    main_page_collections: List[MovieMainPageCollections] = []
    name: str
    release_date: date
    duration: str
    categories: List[Link[Category]]  
    producers: List[Producer]          
    trailer: str
    overview: str
    streaming_service: Optional[StreamingService] = None
    cast: List[MovieCast]
    gallery: List[str]
    country_origin: List[str]
    filming_location: List[str]
    production_companies: List[str]
    budget: str
    gross_profit: str
    reviews: List[Review] = []


class Movie(Document, MovieFields):

    class Settings:
        name = "movies"

    @model_validator(mode="after")
    def generate_slug(self) -> "Movie":
        if not self.id:
            name_slug = self.name.lower().strip().replace(" ", "-")
            year = self.release_date.year
            self.id = f"{name_slug}-{year}"
        return self

# 4. USER, CREDENTIALS & REVIEWS COLLECTIONS

class User(Document):
    username: str
    image: Optional[str] = None
    bookmarks: List[Link[Movie]] = [] 

    class Settings:  
        name = "users"

class Credential(Document):
    email: EmailStr
    password: bytes  
    user: Link[User]

    class Settings: 
        name = "credentials"

class Review(Document):
    score: int = Field(ge=1, le=5) 
    user: Link[User]
    title: str
    review_text: str
    movie: Link[Movie]

    class Settings: 
        name = "reviews"

class MovieReviewView(View,MovieFields):
    # Add your calculated field to the flattened schema
    average_score: float = 0.0

    class Settings:
        source = Movie  # Start from the Movie collection to get all movies
        pipeline = [
            # 1. Pull independent reviews matching this movie's ID
            {
                "$lookup": {
                    "from": "reviews",
                    "localField": "_id",
                    "foreignField": "movie.$id",
                    "as": "movie_reviews"
                }
            },
            # 2. Flatten the data: Merge all original fields with the new average_score
            {
                "$project": {
                    # This passes through every single field from the Movie document automatically
                    # without you having to type them out one by one.
                    "root": "$$ROOT",
                    
                    # Calculate the average score
                    "average_score": { 
                        "$ifNull": [{"$avg": "$movie_reviews.score"}, 0.0] 
                    }
                }
            },
            # 3. Replace the root structure so the fields are sitting on the top-level
            {
                "$replaceRoot": {
                    "newRoot": {
                        "$mergeObjects": ["$root", { "average_score": "$average_score" }]
                    }
                }
            },
            # 4. Enforce that the _id stays a string if your Movie model uses string IDs/slugs
            {
                "$project": {
                    "_id": { "$toString": "$_id" },
                    # Pass the rest of the merged document properties through
                    "backdrops": 1, "posters": 1, "main_page_banner": 1, 
                    "main_page_collections": 1, "name": 1, "release_date": 1, 
                    "duration": 1, "categories": 1, "producers": 1, "trailer": 1, 
                    "overview": 1, "streaming_service": 1, "cast": 1, "gallery": 1, 
                    "country_origin": 1, "filming_location": 1, "production_companies": 1, 
                    "budget": 1, "gross_profit": 1, "reviews": 1, "average_score": 1
                }
            }
        ]
MODELS = [Category,Actor,Movie,User,Credential,Review,MovieReviewView]