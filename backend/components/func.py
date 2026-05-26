import os
import pymongo
from logger import create_logger
from beanie import init_beanie
from models.models import MODELS

logger = create_logger(__name__)

async def init_db(db_string: str):
    client = pymongo.AsyncMongoClient(db_string)

    await init_beanie(database=client.db_name, document_models=MODELS,recreate_views=True)

    logger.info("Database is set")

def create_data_file_structure():
    if ("data" not in os.listdir()):
        os.mkdir("data")
        os.mkdir("data/movies")
        os.mkdir("data/actors")
        os.mkdir("data/users")
        logger.info("Created file system")
    else:
        logger.info("File system already exists")
