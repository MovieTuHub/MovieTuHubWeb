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