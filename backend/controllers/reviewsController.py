from fastapi import status, APIRouter
from fastapi.responses import JSONResponse

from models.requestModels import ReviewRequest
from services.reviewsService import add_review, search_all_reviews_by_movie

reviews_router = APIRouter(prefix="/reviews",tags=["reviews"])

@reviews_router.post(path="/",status_code=status.HTTP_201_CREATED,response_class=JSONResponse)
async def create_review(request: ReviewRequest):
    return await add_review(request)

@reviews_router.get(path="/movie/{slug}",status_code=status.HTTP_200_OK,response_class=JSONResponse)
async def search_reviews_by_movie(slug: str):
    return await search_all_reviews_by_movie(slug)
