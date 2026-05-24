import pymongo
from logger import create_logger
from beanie import init_beanie
from models.models import MODELS

logger = create_logger(__name__)

async def init_db(db_string: str):
    client = pymongo.AsyncMongoClient(db_string)

    await init_beanie(database=client.db_name, document_models=MODELS)

    logger.info("Database is set")
