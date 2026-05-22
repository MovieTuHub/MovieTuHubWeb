import base64

from pydantic import Field, BaseModel, field_validator
from datetime import date
from typing import List, Optional
from models import Banner, StreamingService, Producer

class CategoryRequest(BaseModel):
    category: str


class ActorRequest(BaseModel):
    name: str
    image: str


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


# 4. USER, CREDENTIALS & REVIEWS COLLECTIONS

class CreateUserRequest(BaseModel):
    image: Optional[str] = None
    username: str
    password: str  

class LoginRequest(BaseModel):
    username: str
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