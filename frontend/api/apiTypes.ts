interface ImageDataResponse {
    image: string
    mime: string
    alt: string
}

interface HeroBannerMovieResponse {
    id: string
    banner: ImageDataResponse
    backdrop: ImageDataResponse
}

interface MainPageMovieResponse {
    id: string
    banners: Array<ImageDataResponse>
    name: string
}

interface SimpleMovieResponse {
    id: string
    average_score: number
    banner: ImageDataResponse
    name: string
    duration: string
    release_date: string
    director: string
}

interface CategoryResponse {
    id: string
    category: string
}

interface ReviewResponse {
    score: number
    user: string
    username: string
    user_image: ImageDataResponse | null
    review_text: string

}

interface SimpleActorResponse {

    name: string
    id: string
}

interface ActorResponse {

    name: string
    image: ImageDataResponse
}

interface MovieCastResponse {
    actor: ActorResponse
    role: string
}

enum StreamingServiceEnum {
    NETFLIX = "Netflix",
    APPLE_TV = "Apple TV",
    DISNEY_PLUS = "Disney +"
}

interface StreamingServiceResponse {
    service: StreamingServiceEnum
    link: string
}

enum ProducerRoleEnum {

    DIRECTOR = "Director",
    WRITER = "Writer"
}

interface ProducerResponse {
    name: string
    producer_role: Array<ProducerRoleEnum>
}

interface MovieResponse {
    backdrops: Array<ImageDataResponse>;
    posters: Array<ImageDataResponse>;
    name: string;
    average_score: number;
    release_date: string;
    overview: string;
    categories: Array<CategoryResponse>;
    duration: number;
    trailer: string;
    streaming_service: StreamingServiceResponse | null
    producers: Array<ProducerResponse>
    cast: Array<MovieCastResponse>;
    reviews: Array<ReviewResponse>;
    gallery: Array<ImageDataResponse>;
    country_origin: Array<string>;
    filming_location: Array<string>;
    production_companies: Array<string>
    budget: string;
    gross_profit: string;
}

