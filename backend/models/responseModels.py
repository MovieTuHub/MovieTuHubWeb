from datetime import date
from typing import List, Optional
from beanie import PydanticObjectId
from pydantic import BaseModel, ConfigDict
from models.models import Banner, Producer, StreamingService

class ActorResponse(BaseModel):
    model_config = {"ser_json_bytes":"base64"}

    id: PydanticObjectId
    name: str
    image: Optional[bytes] = None


class MovieCastResponse(BaseModel): 
    model_config = {"ser_json_bytes":"base64"}

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

    model_config = {"ser_json_bytes":"base64","from_attributes":True}

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


class MovieResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: PydanticObjectId 
    banners: List[Banner]
    main_page_banner: Banner
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
    country_origin: str
    filming_location: str
    production_companies: str
    budget: str
    gross_profit: str
    is_bookmaked: bool

    model_config = {"ser_json_bytes":"base64"}
    

class MovieResponse(BaseModel):
    id: PydanticObjectId 
    banners: List[Banner]
    main_page_banner: Banner
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
    country_origin: str
    filming_location: str
    production_companies: str
    budget: str
    gross_profit: str

    model_config = {"ser_json_bytes":"base64"}
