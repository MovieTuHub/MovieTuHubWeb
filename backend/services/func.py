from typing import List

from models.models import Movie, ProducerRoleEnum
from models.responseModels import ActorResponse, HeroBannerMovieResponse, MainPageMovieResponse, MovieCastResponse, MovieResponse, SimpleMovieResponse


def image_to_bytes(images:List[str],file_path:str) -> List[bytes]:
    image_data = []
    for image in images:
        with open(f"{file_path}/{image}","rb") as f:
            image_data.append(f.read())
    return image_data

def create_movie_response_with_images(movie: Movie):
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

    movie_response = MovieResponse(**movie.model_dump(exclude={"backdrops","posters","gallery","cast"}),
                                    backdrops=backdrops,
                                    posters=posters,
                                    gallery=gallery,
                                    cast=cast_processed)
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