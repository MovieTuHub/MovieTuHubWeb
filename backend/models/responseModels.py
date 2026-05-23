from datetime import date
from typing import List, Optional
from pydantic import BaseModel, ConfigDict
from models.models import Banner, Producer, StreamingService

class ActorResponse(BaseModel):
    model_config = {"ser_json_bytes":"base64"}

    id: str
    name: str
    image: Optional[bytes] = None


class MovieCastResponse(BaseModel):  # Fixed typo in name
    model_config = {"ser_json_bytes":"base64"}

    actor: ActorResponse
    role: str


class CategoryResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    category: str  # Fixed: Must match your database class attribute name


class LoginResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    token: str
    username: str
    image: Optional[bytes] = None

    model_config = {"ser_json_bytes":"base64"}

class SimpleMoviewResponse(BaseModel):
    id: str
    rating: float
    banner: bytes
    name: str
    duration: str
    releaseDate: date
    director: str
    isBookmaked: bool

    model_config = {"ser_json_bytes":"base64"}


class MainPageMovieResponse(BaseModel):

    id: str
    banners: List[bytes]
    name: str
    isBookmaked: bool

    model_config = {"ser_json_bytes":"base64"}
    
class ReviewResponse(BaseModel):

    score: int
    username: str
    userImage: Optional[bytes] = None 
    title: str
    reviewText: str
    movie: str

    model_config = {"ser_json_bytes":"base64"}


# =====================================================================
# 3. COMPREHENSIVE MOVIE RESPONSE MODEL
# =====================================================================

class MovieResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str 
    banners: List[Banner]
    mainPageBanner: Banner
    name: str
    releaseDate: date
    duration: str
    categories: List[CategoryResponse]  
    producers: List[Producer]          
    trailer: str
    overview: str
    streamingService: Optional[StreamingService] = None
    cast: List[MovieCastResponse]
    gallery: List[bytes] = []      
    countryOrigin: str
    filmingLocation: str
    productionCompanies: str
    budget: str
    grossProfit: str
    isBookmaked: bool

    model_config = {"ser_json_bytes":"base64"}
    

class MovieResponse(BaseModel):
    id: str 
    banners: List[Banner]
    mainPageBanner: Banner
    name: str
    releaseDate: date
    duration: str
    categories: List[CategoryResponse]  
    producers: List[Producer]          
    trailer: str
    overview: str
    streamingService: Optional[StreamingService] = None
    cast: List[MovieCastResponse]
    gallery: List[bytes] = []
    countryOrigin: str
    filmingLocation: str
    productionCompanies: str
    budget: str
    grossProfit: str

    model_config = {"ser_json_bytes":"base64"}
