import base64
from datetime import date
from typing import List, Optional
from beanie import PydanticObjectId
from pydantic import BaseModel, ConfigDict, field_serializer
from models.models import Producer, StreamingService

class CreateActorResponse(BaseModel):
    model_config = {"ser_json_bytes":"base64"}

    id: PydanticObjectId
    name: str
    image: Optional[str] = None


class ActorResponse(BaseModel):
    id: PydanticObjectId
    name: str
    image: Optional[bytes] = None

    @field_serializer('image')
    def serialize_bytes(self, file_bytes: bytes|None):
        if (file_bytes is None):
            return None
        return base64.b64encode(file_bytes)

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
    image: Optional[bytes] = None

    @field_serializer('image')
    def serialize_bytes(self, file_bytes: bytes|None):
        if (file_bytes is None):
            return None
        return base64.b64encode(file_bytes)


class SimpleMoviewResponse(BaseModel):
    id: PydanticObjectId
    rating: float
    banner: bytes
    name: str
    duration: str
    release_date: date
    director: str
    is_bookmaked: bool

    model_config = {"ser_json_bytes":"base64"}


class MainPageMovieResponse(BaseModel):

    id: PydanticObjectId
    banners: List[bytes]
    name: str
    is_bookmaked: bool

    model_config = {"ser_json_bytes":"base64"}
    
class ReviewResponse(BaseModel):

    score: int
    username: str
    user_image: Optional[bytes] = None 
    title: str
    review_text: str
    movie: str

    model_config = {"ser_json_bytes":"base64"}


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
    backdrops: List[bytes]
    posters: List[bytes]
    name: str
    release_date: date
    duration: str
    categories: List[CategoryResponse]  
    producers: List[Producer]          
    trailer: str
    overview: str
    streaming_service: Optional[StreamingService] = None
    cast: List[MovieCastResponse]
    gallery: List[bytes] = []      
    country_origin: List[str]
    filming_location: List[str]
    production_companies: List[str]
    budget: str
    gross_profit: str    
    reviews: List[ReviewResponse] = []

    @field_serializer('backdrops','posters','gallery')
    def serialize_bytes(self, file_bytes: List[bytes]):
        return [base64.b64encode(v) for v in file_bytes]