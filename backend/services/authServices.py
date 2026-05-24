import bcrypt
from fastapi import status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from models.responseModels import LoginResponse
from models.models import User, Credential
from models.requestModels import CreateUserRequest, LoginRequest


async def add_user(request: CreateUserRequest):

    existing_users = await Credential.find(Credential.email == request.email).to_list()

    if (len(existing_users)>0):
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={"message":"The e-mail is already used!"})

    password = request.password
    
    encoded_password = password.encode("utf-8")
    generated_salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(encoded_password,salt=generated_salt)

    user = User(username=request.username,
                image = request.image)
    
    await user.create()

    credentials = Credential(email=request.email,password=hashed_password,user=user)

    await credentials.create()

    return {"message":"User created!"}

async def login_user(request:LoginRequest):
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