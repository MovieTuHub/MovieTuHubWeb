from pydantic import Field, model_validator, BaseModel, EmailStr
from datetime import date
from enum import Enum
from beanie import Link, Document
from typing import List, Optional

# 1. ENUMS & EMBEDDED SCHEMAS (BaseModels - No Collections)

class StreamingServiceEnum(Enum):
    NETFLIX = "Netflix"
    APPLE_TV = "Apple TV"
    DISNEY_PLUS = "Disney +"

class StreamingService(BaseModel):
    service: StreamingServiceEnum
    link: str

class Producer(BaseModel):
    name: str
    producer_role: List[str]

class Banner(BaseModel):
    backdrop: bytes
    poster: bytes

# 2. STANDALONE COLLECTIONS (Documents)

class Category(Document):
    category: str

    class Settings: 
        name = "categories"

class Actor(Document):
    name: str
    image: Optional[bytes] = None

    class Settings:  
        name = "actors"

class MovieCast(BaseModel):
    actor: Link[Actor]
    role: str

# 3. MOVIE DOCUMENT (Placed here so User & Review can reference it)

class Movie(Document):
    id: str = Field(default=None, alias="_id") 
    banners: List[Banner]
    main_page_banner: Banner
    name: str
    release_date: date
    duration: str
    categories: List[Link[Category]]  
    producers: List[Producer]          
    trailer: str
    overview: str
    streaming_service: Optional[StreamingService] = None
    cast: List[MovieCast]
    gallery: List[bytes]
    country_origin: str
    filming_location: str
    production_companies: str
    budget: str
    gross_profit: str

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
    image: Optional[bytes] = None
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
    reviewText: str
    movie: Link[Movie]

    class Settings: 
        name = "reviews"

MODELS = [Category,Actor,Movie,User,Credential,Review]