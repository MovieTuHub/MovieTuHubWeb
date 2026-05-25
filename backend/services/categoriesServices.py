from typing import List

from fastapi.responses import JSONResponse
from fastapi import status
from pydantic import TypeAdapter

from models.requestModels import CategoryRequest
from models.models import Category
from models.responseModels import CategoryResponse

from logger import create_logger

logger = create_logger(__name__)

async def create_category_document(request:CategoryRequest) -> JSONResponse:
    try:
        existing_categoty = await Category.find_one(Category.category == request.category.title())

        if (existing_categoty):
            return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={"message":"The category already exists"})
        
        category = Category(**request.model_dump())

        await category.save()

        response = CategoryResponse(**category.model_dump())

        return response
    except Exception as e:
        logger.error(e)
        raise e

async def get_categories()->JSONResponse:
    try:
        categories = await Category.all().to_list()
        list_type = TypeAdapter(List[CategoryResponse])

        response = list_type.validate_python(categories,from_attributes=True)
        return response
    except Exception as e:
            logger.error(e)
            raise e


    