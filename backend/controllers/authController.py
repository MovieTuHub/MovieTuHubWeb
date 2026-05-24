from fastapi import APIRouter
from models.requestModels import CreateUserRequest, LoginRequest
from services.authServices import *

authRouter = APIRouter(prefix="/auth",tags=["auth"])

@authRouter.post("/register",status_code=201, response_class=JSONResponse)
async def register(request: CreateUserRequest):
    return await add_user(request)

@authRouter.post("/login",status_code=200, response_class=JSONResponse)
async def login(request: LoginRequest):
    return await login_user(request)


