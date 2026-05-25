from typing import Optional

from fastapi import APIRouter, File, Form, UploadFile, status
from fastapi.responses import JSONResponse
from models.requestModels import ActorRequest
from services.actorsServices import *

actor_controller = APIRouter(prefix="/actors",tags=["actors"])

@actor_controller.post(path="/",status_code=status.HTTP_201_CREATED,response_class=JSONResponse)
async def create_actor(name: str = Form(...),
                    image: Optional[UploadFile] = File(...)):
    return await create_actor_document(name=name,image=image)

@actor_controller.get(path="/",status_code=status.HTTP_200_OK,response_class=JSONResponse)
async def get_all_actors():
    return await get_actors()