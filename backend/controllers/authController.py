from fastapi import APIRouter, File, Form,status
from models.requestModels import CreateUserRequest, LoginRequest
from services.authServices import *

auth_router = APIRouter(prefix="/auth",tags=["auth"])

@auth_router.post("/register",status_code=status.HTTP_201_CREATED, response_class=JSONResponse)
async def register(image: Optional[UploadFile] = File(default=None),
        email: EmailStr = Form(...),
        username: str = Form(...),
        password: str = Form(...)):
    return await create_user_document(image=image, email=email,username=username,password=password)

@auth_router.post("/login",status_code=status.HTTP_200_OK, response_class=JSONResponse)
async def login(request: LoginRequest):
    return await login_user(request)


