from datetime import date
import os
import json
import shutil
from typing import Annotated, List, Optional
import ast
from beanie import PydanticObjectId
from fastapi import File, Form, UploadFile, status
from fastapi.responses import JSONResponse
from pydantic import TypeAdapter
from models.models import Category, Movie, MovieMainPageCollections, Producer, Actor, MovieCast, StreamingService
from models.requestModels import MovieCastRequest
from models.responseModels import MovieResponse

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
        
        for file in backdrops:
            file_data = await file.read()
            with open(f"data/movies/{slug}/backdrops/{file.filename}","wb") as f:
                f.write(file_data)
            backdrop_files.append(file.filename)
        
        logger.info("Saved backdrops")

        for file in posters:
            file_data = await file.read()
            with open(f"data/movies/{slug}/posters/{file.filename}","wb") as f:
                f.write(file_data)
            poster_files.append(file.filename)
        
        logger.info("Saved posters")

        for file in gallery:
            file_data = await file.read()
            with open(f"data/movies/{slug}/gallery/{file.filename}","wb") as f:
                f.write(file_data)
            gallery_files.append(file.filename)
        
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

        response = MovieResponse(**movie.model_dump())

        return response
    except Exception as e:
        shutil.rmtree(f"data/movies/{slug}")

        logger.error(e)
        raise e

async def get_movies() ->JSONResponse:
    try:
        movies = await Movie.find_all(fetch_links=True).to_list()

        list_type = TypeAdapter(List[MovieResponse])

        response = list_type.validate_python(movies,from_attributes=True)

        return response
    except Exception as e:
        logger.error(e)
        return e