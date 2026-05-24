from fastapi import APIRouter
from models.requestModels import CreateUserRequest, LoginRequest
from services.authServices import *

auth_router = APIRouter(prefix="/auth",tags=["auth"])

@auth_router.post("/register",status_code=201, response_class=JSONResponse)
async def register(request: CreateUserRequest):
    return await add_user(request)

@auth_router.post("/login",status_code=200, response_class=JSONResponse)
async def login(request: LoginRequest):
    return await login_user(request)


