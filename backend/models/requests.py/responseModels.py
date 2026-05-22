import base64
from datetime import date
from typing import List, Optional
from pydantic import BaseModel, ConfigDict, field_validator
from models import Banner, Producer, StreamingService

# =====================================================================
# 1. BASE UTILITY SCHEMAS
# =====================================================================

def convert_bytes_to_base64(v: bytes) -> Optional[str]:
    """Helper utility to automatically encode raw DB bytes to JSON-safe text."""
    if not v:
        return None
    return base64.b64encode(v).decode("utf-8")


# =====================================================================
# 2. STANDALONE RESPONSE MODELS
# =====================================================================

class ActorResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    image_base64: Optional[str] = None

    @field_validator("image_base64", mode="before")
    @classmethod
    def serialize_image(cls, v):
        # Automatically catches raw database bytes and morphs them to base64
        if isinstance(v, bytes):
            return convert_bytes_to_base64(v)
        return v


class MovieCastResponse(BaseModel):  # Fixed typo in name
    model_config = ConfigDict(from_attributes=True)

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
    image_base64: Optional[str] = None

    @field_validator("image_base64", mode="before")
    @classmethod
    def serialize_image(cls, v):
        if isinstance(v, bytes):
            return convert_bytes_to_base64(v)
        return v


class ReviewResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    score: int
    username: str
    userImage_base64: Optional[str] = None  # JSON Safe base64 string
    title: str
    reviewText: str
    movie: str

    @field_validator("userImage_base64", mode="before")
    @classmethod
    def serialize_image(cls, v):
        if isinstance(v, bytes):
            return convert_bytes_to_base64(v)
        return v


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
    gallery_base64: List[str] = []      # Fixed: List of text strings instead of binary chunks
    countryOrigin: str
    filmingLocation: str
    productionCompanies: str
    budget: str
    grossProfit: str

    @field_validator("gallery_base64", mode="before")
    @classmethod
    def serialize_gallery(cls, v):
        # Converts entire array of image bytes to clean strings at runtime
        if isinstance(v, list):
            return [convert_bytes_to_base64(item) for item in v if isinstance(item, bytes)]
        return v