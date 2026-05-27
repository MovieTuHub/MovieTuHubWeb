import base64
from datetime import date
from typing import List, Optional
from beanie import PydanticObjectId
from pydantic import BaseModel, ConfigDict, field_serializer
from models.models import Producer, StreamingService

class ImageDataResponse(BaseModel):
    image: bytes
    mime: str
    alt: str

    @field_serializer('image')
    def serialize_bytes(self, file_bytes: bytes):
        return base64.b64encode(file_bytes)

class CreateActorResponse(BaseModel):

    id: PydanticObjectId
    name: str
    image: Optional[str] = None


class ActorResponse(BaseModel):
    id: PydanticObjectId
    name: str
    image: Optional[ImageDataResponse] = None


class SimpleActorResponse(BaseModel):
    id: PydanticObjectId
    name: str

class CreateMovieCastResponse(BaseModel): 

    actor: CreateActorResponse
    role: str

class MovieCastResponse(BaseModel): 

    actor: ActorResponse
    role: str


class CategoryResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: PydanticObjectId
    category: str 


class LoginResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: PydanticObjectId
    username: str
    image: Optional[ImageDataResponse] = None


class SimpleMovieResponse(BaseModel):
    id: str
    average_score: float = 0.0
    banner: ImageDataResponse
    name: str
    duration: str
    release_date: date
    director: str

class MainPageMovieResponse(BaseModel):

    id: str
    banners: List[ImageDataResponse]
    name: str

    
class HeroBannerMovieResponse(BaseModel):

    id: str
    banner: ImageDataResponse
    backdrop: ImageDataResponse

    
    
class ReviewResponse(BaseModel):

    score: int
    user: str
    username: str
    user_image: Optional[ImageDataResponse] = None 
    title: str
    review_text: str
    movie: str



class CreateMovieResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str 
    backdrops: List[str]
    posters: List[str]
    main_page_banner: str
    name: str
    release_date: date
    duration: str
    categories: List[CategoryResponse]  
    producers: List[Producer]          
    trailer: str
    overview: str
    streaming_service: Optional[StreamingService] = None
    cast: List[CreateMovieCastResponse]
    gallery: List[str] = []      
    country_origin: List[str]
    filming_location: List[str]
    production_companies: List[str]
    budget: str
    gross_profit: str    


class MovieResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str 
    backdrops: List[ImageDataResponse]
    posters: List[ImageDataResponse]
    name: str
    release_date: date
    duration: str
    categories: List[CategoryResponse]  
    producers: List[Producer]          
    trailer: str
    overview: str
    streaming_service: Optional[StreamingService] = None
    cast: List[MovieCastResponse]
    gallery: List[ImageDataResponse] = []      
    country_origin: List[str]
    filming_location: List[str]
    production_companies: List[str]
    budget: str
    gross_profit: str    
    reviews: List[ReviewResponse] = []
    average_score: float = 0.0
