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