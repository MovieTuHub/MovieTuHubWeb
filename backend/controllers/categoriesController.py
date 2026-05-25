from fastapi import APIRouter, status
from fastapi.responses import JSONResponse
from models.requestModels import CategoryRequest
from services.categoriesServices import *

categories_router = APIRouter(prefix="/categories",tags=["categories"])

@categories_router.post(path="/",status_code=status.HTTP_201_CREATED, response_class=JSONResponse)
async def create_category(request: CategoryRequest):
    return await create_category_document(request)

@categories_router.get(path="/",status_code=status.HTTP_200_OK,response_class=JSONResponse)
async def get_all_categories():
    return await get_categories()