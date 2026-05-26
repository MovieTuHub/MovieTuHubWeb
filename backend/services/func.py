import os
from typing import List

from models.models import Movie, ProducerRoleEnum
from models.responseModels import ActorResponse, HeroBannerMovieResponse, ImageDataResponse, MainPageMovieResponse, MovieCastResponse, MovieResponse, ReviewResponse, SimpleMovieResponse

mime_types = {
        '.jpg': 'image/jpeg',
        '.png': 'image/png',
        '.webp': 'image/webp'
        # Add more file extensions and MIME types as needed
}


def image_to_bytes(images:List[str],file_path:str) -> List[ImageDataResponse]:
    image_data = []
    for image in images:
        _,file_extension = os.path.splitext(f"{file_path}/{image}")
        with open(f"{file_path}/{image}","rb") as f:
            response = ImageDataResponse(image=f.read(),
                                         mime=mime_types.get(file_extension.lower(),"*"),
                                         alt=image)
            image_data.append(response)
    return image_data

async def create_movie_response_with_images(movie: Movie):
    backdrops = image_to_bytes(movie.backdrops,f"data/movies/{movie.id}/backdrops")
    posters = image_to_bytes(movie.posters,f"data/movies/{movie.id}/posters")
    gallery = image_to_bytes(movie.gallery,f"data/movies/{movie.id}/gallery")

    cast_processed = []

    for cast in movie.cast:
        if (cast.actor.image):
            actor_image = image_to_bytes([cast.actor.image],"data/actors")[0]
        else:
            actor_image = None
        
        actor_response = ActorResponse(**cast.actor.model_dump(exclude={"image"}),image=actor_image)
        movie_cast_response = MovieCastResponse(
            **cast.model_dump(exclude={"actor"}),
            actor=actor_response
        )

        cast_processed.append(movie_cast_response)
    
    reviews_processed =[]
    for review in movie.reviews:
        await review.fetch_link("user")
        user_image = image_to_bytes([review.user.image],"data/users")[0]
        review_response =  ReviewResponse(**review.model_dump(exclude={"user","movie"}),
                        user_image=user_image,
                        username=review.user.username,
                        user=str(review.user.id),
                            movie=str(movie.id))
        
        reviews_processed.append(review_response)

    movie_response = MovieResponse(**movie.model_dump(exclude={"backdrops","posters","gallery","cast","reviews"}),
                                    backdrops=backdrops,
                                    posters=posters,
                                    gallery=gallery,
                                    cast=cast_processed,
                                    reviews=reviews_processed)
    return movie_response


def create_simple_movie_response_with_images(movie: Movie):
    banner = image_to_bytes([movie.posters[0]],f"data/movies/{movie.id}/posters")[0]
    
    for producer in movie.producers:
        if (ProducerRoleEnum.DIRECTOR in producer.producer_role):
            director = producer
            break 
    movie_response = SimpleMovieResponse(**movie.model_dump(),
                                    banner=banner,
                                    director = director.name)
    return movie_response

def create_main_page_movie_response_with_images(movie: Movie):

    banners = image_to_bytes(movie.posters[:2],f"data/movies/{movie.id}/posters")

    movie_response = MainPageMovieResponse(**movie.model_dump(),
                                    banners=banners,
                                    )
    return movie_response

def create_hero_banner_movie_response_with_images(movie: Movie):

    banner = image_to_bytes([movie.main_page_banner],f"data/movies/{movie.id}/homepage_poster")[0]
    backdrop = image_to_bytes(movie.backdrops[:1],f"data/movies/{movie.id}/backdrops")[0]

    movie_response = HeroBannerMovieResponse(**movie.model_dump(),
                                    banner=banner,
                                    backdrop=backdrop
                                    )
    return movie_response