import uvicorn
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from logger import create_logger
from models.requestModels import *
from controllers.authController import auth_router
from controllers.actorsController import actor_controller
from controllers.categoriesController import categories_router
from controllers.movieController import movie_router
from controllers.reviewsController import reviews_router

from contextlib import asynccontextmanager
from components.func import init_db, create_data_file_structure

logger = create_logger(__name__)

load_dotenv("./conf/.env")

@asynccontextmanager
async def start_db(app: FastAPI):
    db_string = os.getenv("MONGO_DB_STRING")
    await init_db(db_string)
    create_data_file_structure()
    yield

app = FastAPI(lifespan=start_db)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(actor_controller)
app.include_router(categories_router)
app.include_router(movie_router)
app.include_router(reviews_router)

@app.get("/")
async def hello():
    return {"message":"hello"}

if __name__ == "__main__":
    uvicorn.run(app)