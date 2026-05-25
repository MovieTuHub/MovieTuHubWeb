from typing import Optional

import bcrypt
from fastapi import  UploadFile, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from pydantic import EmailStr
from models.responseModels import LoginResponse
from models.models import User, Credential
from models.requestModels import LoginRequest
from logger import create_logger

logger = create_logger(__name__)


async def create_user_document(
        email: EmailStr,
        username: str,
        password: str,
        image: Optional[UploadFile] = None
):
    try:
        existing_users = await Credential.find(Credential.email == email).to_list()

        if (len(existing_users)>0):
            return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={"message":"The e-mail is already used!"})

        password = password
        
        encoded_password = password.encode("utf-8")
        generated_salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(encoded_password,salt=generated_salt)

        if (image):
            image_data = await image.read()
            
            with open(f"data/users/{image.filename}","wb") as f:
                f.write(image_data)
            
            image_file = image.filename
        else:
            image_file = None

        user = User(username=username,
                    image = image_file)
        
        await user.create()

        credentials = Credential(email=email,password=hashed_password,user=user)

        await credentials.create()

        return {"message":"User created!"}
    except Exception as e:
        logger.error(e)
        raise e

async def login_user(request:LoginRequest):
    try:
        user_credentials = await Credential.find_one(Credential.email == request.email)

        if (user_credentials == None):
            return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={"message":"Invalid e-mail or password!"})
        
        hash_passowrd = user_credentials.password

        received_password = request.password.encode("utf-8")

        result = bcrypt.checkpw(received_password,hash_passowrd)

        if (not result):
            return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={"message":"Invalid e-mail or password!"})
        
        user = await user_credentials.user.fetch()

        response = LoginResponse(**user.model_dump())
        return jsonable_encoder(response)
    except Exception as e:
        logger.error(e)
        raise e