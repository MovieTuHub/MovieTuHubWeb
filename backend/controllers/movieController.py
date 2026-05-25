from datetime import date
from typing import Annotated, Optional

from beanie import PydanticObjectId
from fastapi import APIRouter, Depends, File, Form, UploadFile, status
from fastapi.responses import JSONResponse
from models.models import StreamingService
from services.moviesServices import *


movie_router = APIRouter(prefix="/movies",tags=["movies"])

@movie_router.post(path="/",status_code=status.HTTP_201_CREATED,response_class=JSONResponse)
async def create_movie( backdrops: list[UploadFile]=File(...),
    posters: list[UploadFile]=File(...),
    main_page_banner: UploadFile=File(...),
    main_page_collections: List[str]=Form(...),
    name: str=Form(...),
    release_date: date=Form(...),
    duration: str = Form(...),
    categories: list[str] = Form(...),
    producers: list[str] = Form(...),  # Convert to list of Producers     
    trailer: str = Form(...),
    overview: str = Form(...),
    cast: list[str] = Form(...), # Convert to list of MovieCastRequst
    gallery: list[UploadFile] = File(...),
    country_origin: list[str] = Form(...),
    filming_location: list[str] = Form(...),
    production_companies: list[str] = Form(...),
    budget: str = Form(...),
    gross_profit: str = Form(...),
    streaming_service: Optional[str] = Form(default=None)):
    return await create_movie_document(backdrops=backdrops,
        posters= posters,
        main_page_banner= main_page_banner,
        main_page_collections = main_page_collections,
        name = name,
        release_date = release_date,
        duration = duration,
        categories = categories,
        producers = producers,  # Convert to list of Producers     
        trailer = trailer,
        overview = overview,
        cast = cast, # Convert to list of MovieCastRequst
        gallery = gallery,
        country_origin = country_origin,
        filming_location = filming_location,
        production_companies = production_companies,
        budget = budget,
        gross_profit = gross_profit,
        streaming_service = streaming_service)

@movie_router.get(path="/",status_code=status.HTTP_200_OK,response_class=JSONResponse)
async def get_all_movies():
    return await get_movies()

@movie_router.get(path="/",status_code=status.HTTP_200_OK,response_class=JSONResponse)
async def get_movie(slug):
    return await get_single_movie(slug)

@movie_router.get(path="/simple_presentation",status_code=status.HTTP_200_OK,response_class=JSONResponse)
async def get_all_movies_simple():
    return await get_movies_simple()

@movie_router.get(path="/main_page",status_code=status.HTTP_200_OK,response_class=JSONResponse)
async def get_all_movies_main_page_collection(collection: MovieMainPageCollections):
    return await get_movies_main_page(collection)

@movie_router.get(path="/hero",status_code=status.HTTP_200_OK,response_class=JSONResponse)
async def get_all_movies_main_page_collection():
    return await get_movies_hero_banner()