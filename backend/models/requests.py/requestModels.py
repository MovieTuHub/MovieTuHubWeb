import base64

from pydantic import EmailStr, Field, BaseModel, field_validator, model_validator
from datetime import date
from typing import List, Optional
from models import Banner, StreamingService, Producer

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


class ChangeBookmarkRequest(BaseModel):
    user: str
    movie: str
    bookmark: bool

# 4. USER, CREDENTIALS & REVIEWS COLLECTIONS

class CreateUserRequest(BaseModel):
    image: Optional[str] = None
    email: EmailStr
    username: str
    password: str  

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class ReviewRequest(BaseModel):
    score: int = Field(ge=1, le=5) 
    user: str
    title: str
    reviewText: str
    movie: str

class Base64ImageRequest(BaseModel):
    """
    Accepts images sent inside JSON payloads as Base64 encoded strings.
    This allows clients to easily bundle images inside a single API post.
    """
    image_data: str  # The raw base64 string from the frontend

    @field_validator("image_data")
    @classmethod
    def validate_and_convert_base64(cls, v: str) -> bytes:
        try:
            # Clean up the typical data URI prefix if sent by web frontends
            if "," in v:
                v = v.split(",")[1]
            return base64.b64decode(v)
        except Exception:
            raise ValueError("Invalid base64 image data string provided.")