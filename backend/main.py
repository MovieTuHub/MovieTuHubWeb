import uvicorn
import os
from fastapi import FastAPI
from dotenv import load_dotenv
from logger import create_logger
from models.requestModels import *
from controllers.authController import authRouter
from contextlib import asynccontextmanager
from components.func import init_db

logger = create_logger(__name__)

load_dotenv("./conf/.env")

@asynccontextmanager
async def start_db(app: FastAPI):
    db_string = os.getenv("MONGO_DB_STRING")
    await init_db(db_string)
    yield

app = FastAPI(lifespan=start_db)

app.include_router(authRouter)

@app.get("/")
async def hello():
    return {"message":"hello"}

if __name__ == "__main__":
    uvicorn.run(app)