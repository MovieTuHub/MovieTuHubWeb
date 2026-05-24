from fastapi import APIRouter
from fastapi.responses import JSONResponse
from models.requestModels import ActorRequest
from services.actorServices import *

actor_controller = APIRouter(prefix="/actors",tags=["actors"])

@actor_controller.post(path="/",status_code=201,response_class=JSONResponse)
async def create_actor(request: ActorRequest):
    return await add_actor(request)

@actor_controller.get(path="/",status_code=200,response_class=JSONResponse)
async def get_all_actors():
    return await get_actors()