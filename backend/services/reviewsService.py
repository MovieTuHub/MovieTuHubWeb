from fastapi.responses import JSONResponse
from fastapi import status
from models.responseModels import ReviewResponse
from services.func import image_to_bytes
from models.models import Movie, Review, User
from models.requestModels import ReviewRequest
from logger import create_logger

logger = create_logger(__name__)

async def add_review(request: ReviewRequest):
    try:
        movie = await Movie.find_one(Movie.id == request.movie)

        if (not movie):
            return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST,content={"message":"The movie does not exist!"})
        
        user = await User.find_one(User.id == request.user)

        if (not user):
            return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST,content={"message":"The user does not exist!"})
    
        review = Review(**request.model_dump(exclude={"user","movie"}),
                        user = user,
                        movie = movie)
        
        await review.save()

        movie.reviews.append(review)

        await movie.save()
        
        user_image = image_to_bytes([user.image],"data/users")[0]
        return ReviewResponse(**review.model_dump(exclude={"user","movie"}),
                       user_image=user_image,
                       username=user.username,
                       user=str(user.id),
                        movie=str(movie.id))
    
    except Exception as e:
        logger.error(e)
        raise e
    
async def search_all_reviews_by_movie(slug: str):
    try:
        reviews = await Review.find_many(Review.movie.id == slug,fetch_links=True).to_list()

        reviews_processed = []

        for review in reviews:
            user_image = image_to_bytes([review.user.image],"data/users")[0]
            response =  ReviewResponse(**review.model_dump(exclude={"user","movie"}),
                        user_image=user_image,
                        username=review.user.username,
                        user=str(review.user.id),
                            movie=str(review.movie.id))
            reviews_processed.append(response)

        return reviews_processed
    
    except Exception as e:
        logger.error(e)
        raise e