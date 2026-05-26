from datetime import date
import os
import json
import re
import shutil
from typing import Annotated, List, Optional
import ast
from beanie import PydanticObjectId
from beanie.operators import In
from fastapi import File, Form, UploadFile, status
from fastapi.responses import JSONResponse
from pydantic import TypeAdapter
from models.models import Category, Movie, MovieMainPageCollections, MovieReviewView, Producer, Actor, MovieCast, StreamingService
from models.requestModels import MovieCastRequest
from models.responseModels import ActorResponse, CreateMovieResponse, MovieCastResponse, MovieResponse
from services.func import create_hero_banner_movie_response_with_images, create_main_page_movie_response_with_images, create_movie_response_with_images, create_simple_movie_response_with_images

from logger import create_logger

logger = create_logger(__name__)

async def create_movie_document(backdrops: List[UploadFile],
    posters: List[UploadFile],
    main_page_banner: UploadFile,
    main_page_collections: List[str],
    name: str,
    release_date: date,
    duration: str,
    categories: List[str],
    producers: List[str],  # Convert to List of Producers     
    trailer: str,
    overview: str,
    cast: List[str], # Convert to List of MovieCastRequst
    gallery: List[UploadFile],
    country_origin: List[str],
    filming_location: List[str],
    production_companies: List[str],
    budget: str,
    gross_profit: str,
    streaming_service: Optional[str]= None) -> JSONResponse:
    try:
        slug = "{movie}-{year}".format(movie=name.strip().lower().replace(" ","-"),
                                    year = release_date.year)
        
        existing_movie = await Movie.find_one(Movie.id == slug)

        if (existing_movie):
            return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={"message":"The movie already exists!"})
        
        os.mkdir(f"data/movies/{slug}")
        os.mkdir(f"data/movies/{slug}/backdrops")
        os.mkdir(f"data/movies/{slug}/posters")
        os.mkdir(f"data/movies/{slug}/gallery")
        os.mkdir(f"data/movies/{slug}/homepage_poster")

        logger.info("Created movie file system")


        backdrop_files = []
        poster_files = []
        gallery_files = []
        
        for idx, file in enumerate(backdrops):
            file_data = await file.read()
            backdrop_name = file.filename.strip().split(".")
            backdrop_name[0] = f"backdrop_{idx+1}"
            backdrop_name = ".".join(backdrop_name)
            with open(f"data/movies/{slug}/backdrops/{backdrop_name}","wb") as f:
                f.write(file_data)
            backdrop_files.append(backdrop_name)
        
        logger.info("Saved backdrops")

        for idx, file in enumerate(posters):
            file_data = await file.read()
            poster_name = file.filename.strip().split(".")
            poster_name[0] = f"poster_{idx+1}"
            poster_name = ".".join(poster_name)
            with open(f"data/movies/{slug}/posters/{poster_name}","wb") as f:
                f.write(file_data)
            poster_files.append(poster_name)
        
        logger.info("Saved posters")

        for idx,file in enumerate(gallery):
            file_data = await file.read()
            gallery_name = file.filename.strip().split(".")
            gallery_name[0] = f"gallery_{idx+1}"
            gallery_name = ".".join(gallery_name)
            with open(f"data/movies/{slug}/gallery/{gallery_name}","wb") as f:
                f.write(file_data)
            gallery_files.append(gallery_name)
        
        logger.info("Saved gallery")

        file_data = await main_page_banner.read()
        with open(f"data/movies/{slug}/homepage_poster/{file.filename}","wb") as f:
            f.write(file_data)

        main_page_banner_filename = file.filename

        logger.info("Saved homepage banner")


        producer_list_type = TypeAdapter(List[Producer])
        producers = producer_list_type.validate_python([ast.literal_eval(v) for v in producers])

        main_page_collections_list_type = TypeAdapter(List[MovieMainPageCollections])
        main_page_collections = main_page_collections_list_type.validate_python(main_page_collections)

        movie_cast_list_type = TypeAdapter(List[MovieCastRequest])
        movie_cast_request_list = movie_cast_list_type.validate_python([ast.literal_eval(v) for v in cast])

        validated_streaming = None
        if streaming_service:
            raw_streaming = json.loads(streaming_service)
            validated_streaming = StreamingService.model_validate(raw_streaming)

        validated_categories = TypeAdapter(List[PydanticObjectId]).validate_python(categories)

        categories_objects = []

        for category in validated_categories:
            category_object = await Category.find_one(Category.id == category)
            categories_objects.append(category_object)

        movie_cast_object_list = []
        for movie_cast in movie_cast_request_list:
            actor = await Actor.find_one(Actor.id == movie_cast.actor)
            movie_cast_object = MovieCast(actor=actor,role=movie_cast.role)
            movie_cast_object_list.append(movie_cast_object)

        movie = Movie(backdrops=backdrop_files,
                      posters=poster_files,
                      main_page_banner=main_page_banner_filename,
                      main_page_collections=main_page_collections,
                      name=name,
                      release_date=release_date,
                      duration=duration,
                      categories=categories_objects,
                      producers=producers,
                      trailer=trailer,
                      overview=overview,
                      streaming_service=validated_streaming,
                      cast=movie_cast_object_list,
                      gallery=gallery_files,
                      country_origin=country_origin,
                      filming_location=filming_location,
                      production_companies=production_companies,
                      budget=budget,
                      gross_profit=gross_profit)

        await movie.save()


        logger.info("Movie is saved")

        response = CreateMovieResponse(**movie.model_dump())

        return response
    except Exception as e:
        shutil.rmtree(f"data/movies/{slug}")

        logger.error(e)
        raise e

async def get_movies() ->JSONResponse:
    try:
        movies = await MovieReviewView.find_all(fetch_links=True).to_list()
        response = []

        for movie in movies:
            response.append(await create_movie_response_with_images(movie))

        return response
    except Exception as e:
        logger.error(e)
        raise e
    
async def get_single_movie(slug) -> JSONResponse:
    try:
        movie = await MovieReviewView.find_one(MovieReviewView.id == slug,fetch_links=True)

        if (not movie):
            return JSONResponse(status_code=status.HTTP_404_NOT_FOUND,content={"message":"The movie is not found"})
        
        return await create_movie_response_with_images(movie)
    except Exception as e:
        logger.error(e)
        raise e
    

async def get_searches(seach_phrase) -> JSONResponse:
    try:
        pattern = re.compile(seach_phrase,re.IGNORECASE)
        movies = await MovieReviewView.find_many(MovieReviewView.name == pattern,fetch_links=True).to_list()

        response = []

        for movie in movies:
            response.append(await create_movie_response_with_images(movie))
        
        return response
    except Exception as e:
        logger.error(e)
        raise e
    
async def get_movies_simple() ->JSONResponse:
    try:
        movies = await MovieReviewView.find_all(fetch_links=True).to_list()

        response = []

        for movie in movies:
            response.append(create_simple_movie_response_with_images(movie))

        return response
    except Exception as e:
        logger.error(e)
        raise e
    
async def get_movies_main_page(collection: MovieMainPageCollections) ->JSONResponse:
    try:
        movies = await Movie.find(Movie.main_page_collections == collection.value,fetch_links=True).to_list()

        response = []

        for movie in movies:
            response.append(create_main_page_movie_response_with_images(movie))

        return response
    except Exception as e:
        logger.error(e)
        raise e

async def get_movies_hero_banner() ->JSONResponse:
    try:
        movies = await Movie.find(Movie.main_page_collections == MovieMainPageCollections.HERO_BANNER.value,fetch_links=True).to_list()

        response = []

        for movie in movies:
            response.append(create_hero_banner_movie_response_with_images(movie))

        return response
    except Exception as e:
        logger.error(e)
        raise e