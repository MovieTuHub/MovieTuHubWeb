from beanie import PydanticObjectId
from fastapi import File, Form, UploadFile
from pydantic import EmailStr, Field, BaseModel, model_validator
from datetime import date
from typing import Annotated, List, Optional
from models.models import Banner, MovieMainPageCollections, StreamingService, Producer

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
    actor: PydanticObjectId
    role: str

class StreamingServiceEnumRequest(BaseModel):
    service: str 
    link: str

# ! DEPRECATED !
class MovieRequest(BaseModel): 
    backdrops: Annotated[List[UploadFile],File()]
    posters: Annotated[List[UploadFile],File()]
    main_page_banner: UploadFile
    main_page_collections: Annotated[str,Form()]
    name: Annotated[str,Form()]
    release_date: Annotated[date,Form()]
    duration: Annotated[str,Form()]
    categories: Annotated[List[PydanticObjectId],Form()]
    producers: Annotated[List[str],Form()]     # Convert to List of Producers     
    trailer: Annotated[str,Form()]
    overview: Annotated[str,Form()]
    streaming_service: Annotated[Optional[StreamingService],Form()] = None
    cast: Annotated[List[str],Form()] # Convert to List of MovieCastRequst
    gallery: Annotated[List[UploadFile],File()]
    country_origin: Annotated[List[str],Form()]
    filming_location: Annotated[List[str],Form()]
    production_companies: Annotated[List[str],Form()]
    budget: Annotated[str,Form()]
    gross_profit: Annotated[str,Form()]


class ChangeBookmarkRequest(BaseModel):
    user: str
    movie: str
    bookmark: bool

# ! Deprecated !
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
