from pydantic import EmailStr, Field, BaseModel, model_validator
from datetime import date
from typing import List, Optional
from models.models import Banner, StreamingService, Producer

class CategoryRequest(BaseModel):
    category: str


class ActorRequest(BaseModel):
    name: str
    image: Optional[bytes] = None

    model_config = {"val_json_bytes":"base64"}


class FilterRequest(BaseModel):
    categories: Optional[List[str]]
    rating_min: Optional[float] = Field(ge=1, le=5, decimal_places=1, max_digits=2)
    rating_max: Optional[float] = Field(ge=1, le=5, decimal_places=1, max_digits=2)
    num_of_rating_min: Optional[int] = None
    num_of_rating_max: Optional[int] = None
    cast: Optional[List[str]] = None


    @model_validator(mode="after")
    def validate_fields(self) -> "FilterRequest":
        rating_max = self.rating_max
        rating_min = self.rating_min

        num_of_rating_max = self.num_of_rating_max
        num_of_rating_min = self.num_of_rating_min

        if (rating_max< rating_min):
            raise ValueError("Max rating cannot be less than min rating")
        
        if (num_of_rating_max< num_of_rating_min):
            raise ValueError("Max number of ratings cannot be less than min number of ratings")

class SearchMovieRequest(BaseModel):
    search_phrase: str

class MovieCastRequest(BaseModel):
    actor: str
    role: str

class StreamingServiceEnumRequest(BaseModel):
    service: str 
    link: str

class MovieRequest(BaseModel):
    banners: List[Banner]
    main_page_banner: Banner
    name: str
    release_date: date
    duration: str
    categories: str
    producers: List[Producer]          
    trailer: str
    overview: str
    streaming_service: Optional[StreamingService] = None
    cast: List[MovieCastRequest]
    gallery: List[str]
    country_origin: str
    filming_location: str
    production_companies: str
    budget: str
    gross_profit: str

    model_config = {"val_json_bytes":"base64"}


class ChangeBookmarkRequest(BaseModel):
    user: str
    movie: str
    bookmark: bool


class CreateUserRequest(BaseModel):
    image: Optional[bytes] = None
    email: EmailStr
    username: str
    password: str

    model_config = {"val_json_bytes":"base64"}

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class ReviewRequest(BaseModel):
    score: int = Field(ge=1, le=5) 
    user: str
    title: str
    review_text: str
    movie: str
