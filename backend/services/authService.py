import bcrypt
from models.requestModels import CreateUserRequest
from models.responseModels import LoginResponse
from models.models import Credential, User


async def add_user(request: CreateUserRequest):
    password = request.password
    
    encoded_password = password.encode("utf-8")
    generated_salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(encoded_password,salt=generated_salt)

    user = User(username=request.username,
                image = request.image)
    
    await user.create()

    credentials = Credential(email=request.email,password=hashed_password,user=user)

    await credentials.create()

    return {"message":"User created"}
    