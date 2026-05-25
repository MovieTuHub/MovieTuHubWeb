from fastapi import APIRouter,status
from models.requestModels import CreateUserRequest, LoginRequest
from services.authServices import *

auth_router = APIRouter(prefix="/auth",tags=["auth"])

@auth_router.post("/register",status_code=status.HTTP_201_CREATED, response_class=JSONResponse)
async def register(request: CreateUserRequest):
    return await create_user_document(request)

@auth_router.post("/login",status_code=status.HTTP_200_OK, response_class=JSONResponse)
async def login(request: LoginRequest):
    return await login_user(request)


