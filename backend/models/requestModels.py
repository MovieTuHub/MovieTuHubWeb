from pydantic import EmailStr, Field, BaseModel, field_validator, model_validator
from datetime import date
from typing import List, Optional
from models.models import Banner, StreamingService, Producer

class CategoryRequest(BaseModel):
    category: str


class ActorRequest(BaseModel):
    name: str
    image: str

class FilterRequest(BaseModel):
    categories: Optional[List[str]]
    ratingMin: Optional[float] = Field(ge=1, le=5, decimal_places=1, max_digits=2)
    ratingMax: Optional[float] = Field(ge=1, le=5, decimal_places=1, max_digits=2)
    numOfRatingMin: Optional[int] = None
    numOfRatingMax: Optional[int] = None
    cast: Optional[List[str]] = None


    @model_validator(mode="after")
    def validate_fields(self) -> "FilterRequest":
        ratingMax = self.ratingMax
        ratingMin = self.ratingMin

        numOfRatingMax = self.numOfRatingMax
        numOfRatingMin = self.numOfRatingMin

        if (ratingMax< ratingMin):
            raise ValueError("Max rating cannot be less than min rating")
        
        if (numOfRatingMax< numOfRatingMin):
            raise ValueError("Max number of ratings cannot be less than min number of ratings")

class SearchMovieRequest(BaseModel):
    searchPhrase: str

class MovieCastRequest(BaseModel):
    actor: str
    role: str

class StreamingServiceEnumRequest(BaseModel):
    service: str 
    link: str

class MovieRequest(BaseModel):
    banners: List[Banner]
    mainPageBanner: Banner
    name: str
    releaseDate: date
    duration: str
    categories: str
    producers: List[Producer]          
    trailer: str
    overview: str
    streamingService: Optional[StreamingService] = None
    cast: List[MovieCastRequest]
    gallery: List[str]
    countryOrigin: str
    filmingLocation: str
    productionCompanies: str
    budget: str
    grossProfit: str

    model_config = {"val_json_bytes":"base64"}


class ChangeBookmarkRequest(BaseModel):
    user: str
    movie: str
    bookmark: bool

# 4. USER, CREDENTIALS & REVIEWS COLLECTIONS

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
    reviewText: str
    movie: str
