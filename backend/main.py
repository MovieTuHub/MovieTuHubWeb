import uvicorn
import os
from fastapi import FastAPI
from dotenv import load_dotenv
from logger import create_logger
from services.func import init_db
from models.requestModels import *
from services.authService import add_user
from contextlib import asynccontextmanager

logger = create_logger(__name__)

load_dotenv("./conf/.env")

@asynccontextmanager
async def start_db(app: FastAPI):
    db_string = os.getenv("MONGO_DB_STRING")
    await init_db(db_string)
    yield

app = FastAPI(lifespan=start_db)


@app.get("/")
async def hello():
    return {"message":"hello"}

@app.post("/auth/register",status_code=201)
async def register(request: CreateUserRequest):
    return await add_user(request)

if __name__ == "__main__":
    uvicorn.run(app)