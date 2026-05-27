from typing import List, Optional

from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from fastapi import UploadFile, status
from services.func import image_to_bytes
from models.responseModels import ActorResponse, CreateActorResponse, SimpleActorResponse
from models.models import Actor
from models.requestModels import ActorRequest
from pydantic import TypeAdapter

from logger import create_logger

logger = create_logger(__name__)

async def create_actor_document(name: str,
                    image: Optional[UploadFile] = None)-> JSONResponse:
    try:
        existing_actors = await Actor.find(Actor.name == name).to_list()

        if (len(existing_actors)>0):
            return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={"message":"The actor already exists"})

        actor = Actor(name = name)

        await actor.create()

        if (image):
            image_data = await image.read()
            image_file = image.filename.strip().split(".")
            image_file[0] = f"actor_{str(actor.id)}"
            image_file = ".".join(image_file)
            with open(f"data/actors/{image_file}","wb") as f:
                f.write(image_data)
            
        else:
            image_file = None

        actor.image = image_file
        
        await actor.save()

        logger.info("Actor created!")

        response = CreateActorResponse(**actor.model_dump())

        return jsonable_encoder(response)
    except Exception as e:
        logger.error(e)
        raise e

async def get_actors()->JSONResponse:
    try:
        actors = await Actor.all().to_list()
        # list_type = TypeAdapter(List[ActorResponse])

        # response = list_type.validate_python(actors,from_attributes=True)
        actors_processed = []
        for actor in actors:
            if (actor.image):
                actor_image = image_to_bytes([actor.image],"data/actors")[0]
            else:
                actor_image = None

            actor_response = SimpleActorResponse(**actor.model_dump())
            actors_processed.append(actor_response)

        return actors_processed
    except Exception as e:
        logger.error(e)
        raise e