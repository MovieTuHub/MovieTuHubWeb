from typing import List

from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from fastapi import status
from models.responseModels import ActorResponse
from models.models import Actor
from models.requestModels import ActorRequest
from pydantic import TypeAdapter


async def add_actor(request: ActorRequest)-> JSONResponse:

    existing_actors = await Actor.find(Actor.name == request.name).to_list()

    if (len(existing_actors)>0):
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={"message":"The actor already exists"})

    actor = Actor(**request.model_dump())
    
    await actor.create()

    response = ActorResponse(**actor.model_dump())

    return jsonable_encoder(response)

async def get_actors()->JSONResponse:
    actors = await Actor.all().to_list()
    list_type = TypeAdapter(List[ActorResponse])

    response = list_type.validate_python(actors,from_attributes=True)
    return response