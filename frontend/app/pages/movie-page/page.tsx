import SaveButton from '@/components/buttons/SaveButton'
import PlayTrailerButton from '@/components/buttons/PlayTrailerButton'
import MoviePageBannerCarousel from '@/components/complex/MoviePageBannerCarousel'
import StarRating from '@/components/interractibles/StarRating'
import CategoryBlob from '@/components/static/CategoryBlob'
import React from 'react'
import StreamButton from '@/components/buttons/StreamButton'
import CategoryDelimiter from '@/components/static/CategoryDelimiter'
import ActorsCarousel from '@/components/complex/ActorsCarousel'
import ReviewsCarousel from '@/components/complex/ReviewsCarousel'
import GalleryCarousel from '@/components/complex/GalleryCarousel'
import Image from 'next/image'
import Footer from '@/components/Footer'

interface Actor {
    photo: string;
    fullName: string;
    role: string;
}

const actors: Array<Actor> = [
    {
        photo: "/actor_carousel_test/Mathew_McConaughey.jpg",
        fullName: "Mathew McConaughey",
        role: "Cooper"
    },
    {
        photo: "/actor_carousel_test/Anne_Hathaway.jpg",
        fullName: "Anne Hathaway",
        role: "Amelia Brand"
    },
    {
        photo: "/actor_carousel_test/Jessica_Chastain.jpg",
        fullName: "Jessica Chastain",
        role: "Professor Brand"
    },
    {
        photo: "/actor_carousel_test/Michael_Caine.jpg",
        fullName: "Michael Caine",
        role: "Murph"
    },
    {
        photo: "/actor_carousel_test/Casey_Affleck.jpg",
        fullName: "Casey Affleck",
        role: "Tom"
    },
    {
        photo: "/actor_carousel_test/Timothee_Chalamet.jpg",
        fullName: "Timothée Chalamet",
        role: "Young Tom"
    }
]

interface Review {
    profileImgSrc?: string;
    userName: string;
    givenRating: number;
    comment?: string;
}

const reviews: Array<Review> = [
    {
        userName: "User 1",
        givenRating: 3,
        comment: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur quibusdam minus est veritatis nostrum nobis odio itaque, repudiandae perferendis dolores beatae nam consectetur amet voluptas excepturi at eius qui! Temporibus."
    },
    {
        userName: "spacefan777",
        givenRating: 5,
        comment: "Legendary movie. Will most definitely watch again. I've never been so invested into the plot of a movie before I saw this one. 100% recommend it for the folks who like science fiction or adventure movies."
    },
    {
        userName: "corNiX5413",
        givenRating: 2,
        comment: "Honestly mid. Could have been done better."
    },
    {
        userName: "User 4",
        givenRating: 5,
        comment: "Comment 4"
    },
    {
        profileImgSrc: "/reviews_carousel_test/dj_khaled.png",
        userName: "DJ Khaled",
        givenRating: 4,
        comment: "Anotha one"
    },
]

interface MovieInfo {
    banners: Array<string>;
    posters: Array<string>;
    movieTitle: string;
    rating: number;
    releaseDate: Date;
    categories: Array<string>;
    duration: number;
    trailerLink: string;
    netflixLink: string;
    overview: string;
    director: string;
    writer: string;
    actors: Array<Actor>;
    reviews: Array<Review>;
    galleryImages: Array<string>;
    releaseDateAmericanFormat: string;
    countriesOfOrigin: Array<string>;
    filmingLocations: Array<string>;
    productionCompanies: Array<string>
    budget: string;
    grossWorldwide: string;
}

const galleryImages: Array<string> = [
    "/gallery_carousel_test/Gallery_Image_1.png",
    "/gallery_carousel_test/Gallery_Image_2.png",
    "/gallery_carousel_test/Gallery_Image_3.png"
]

const movieData: MovieInfo = {
    movieTitle: "Interstellar (2014)",
    rating: 8.7,
    releaseDate: new Date("2014-11-07"),
    categories: ["Adventure", "Drama", "Science fiction"],
    duration: 169,
    banners: [
        "/movie_page_carousel_test/Interstellar_banner_1.jpg",
        "/movie_page_carousel_test/Interstellar_banner_2.jpg",
        "/movie_page_carousel_test/Interstellar_banner_3.jpg",
        "/movie_page_carousel_test/Interstellar_banner_4.jpg"
    ],
    posters: [
        "/movie_page_carousel_test/Interstellar_poster_1.png",
        "/movie_page_carousel_test/Interstellar_poster_2.png",
        "/movie_page_carousel_test/Interstellar_poster_3.jpg",
        "/movie_page_carousel_test/Interstellar_poster_4.jpg"
    ],
    trailerLink: "https://...",
    netflixLink: "https://...",
    overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
    director: "Christopher Nolan",
    writer: "Jonathan Nolan",
    actors: actors,
    reviews: reviews,
    galleryImages: galleryImages,
    releaseDateAmericanFormat: "November 7, 2014 (USA)",
    countriesOfOrigin: ["USA", "UK"],
    filmingLocations: ["Canada", "Iceland"],
    productionCompanies: ["Paramount Pictures", "Warner Bros."],
    budget: "$165,000,000",
    grossWorldwide: "$774,560,578"
}

const page = () => {
    return (
        <div className="flex flex-col justify-center gap-y-4">
            <MoviePageBannerCarousel
                movieTitle={movieData.movieTitle}
                banners={movieData.banners}
                posters={movieData.posters}
            />
            <div className="absolute w-full h-20 top-105
                bg-linear-to-t from-background to-transparent">
            </div>
            <div className="flex flex-col justify-center
                text-white gap-y-5 ml-130">
                <div className="flex items-center gap-x-5 font-bold">
                    <StarRating starSize={25} />
                    <div className="text-2xl">4.3/5</div>
                    <div className="text-3xl">&bull;</div>
                    <div className="text-[20px] text-[#fff9]">
                        Rate this movie
                    </div>
                </div>
                <div className="flex gap-x-4">
                    {
                        movieData.categories.map((category, index) => (
                            <CategoryBlob key={index} height={35} text={category} />
                        ))
                    }
                </div>
                <div className="flex gap-x-24">
                    <div>Release date: {movieData.releaseDate.toISOString().split("T")[0]}</div>
                    <div>
                        Duration: {`${movieData.duration >= 60 ? `${Math.floor(movieData.duration / 60)}hr` : ""} ${movieData.duration % 60}min`}
                    </div>
                </div>
                <div className="flex gap-x-6">
                    <SaveButton />
                    <PlayTrailerButton href={movieData.trailerLink} />
                    <StreamButton href={movieData.netflixLink} />
                </div>
                <div className="flex flex-col mt-5 gap-y-4">
                    <div className="text-2xl">Overview</div>
                    <div className="max-w-3xl">{movieData.overview}</div>
                </div>
                <div className="flex gap-x-36 mt-10">
                    <div className="flex flex-col gap-y-2">
                        <div className="text-2xl font-bold">{movieData.director}</div>
                        Director
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <div className="text-2xl font-bold">{movieData.writer}</div>
                        Writer
                    </div>
                </div>
            </div>
            <div className="mt-10 flex flex-col gap-y-5">
                <CategoryDelimiter text="Main cast" isSemibold />
                <ActorsCarousel actors={movieData.actors} />
            </div>
            <div className="mt-16 flex flex-col gap-y-5">
                <CategoryDelimiter text="Reviews" isSemibold />
                <ReviewsCarousel reviews={movieData.reviews} />
            </div>
            <div className="mt-16 flex flex-col gap-y-5">
                <CategoryDelimiter text="Gallery" isSemibold />
                <GalleryCarousel imageSources={movieData.galleryImages} />
            </div>
            <div className="mt-16 flex flex-col gap-y-5">
                <CategoryDelimiter text="Details" isSemibold />
                <div className="flex ml-60 gap-x-20 text-white text-2xl font-medium mb-20">
                    <div className="flex flex-col gap-y-4">
                        <div>Release date</div>
                        <div>Countries of origin</div>
                        <div>Filming locations</div>
                        <div>Production companies</div>
                        <div>Budget</div>
                        <div>Gross worldwide</div>
                    </div>
                    <div className="flex flex-col gap-y-4">
                        <div>{movieData.releaseDateAmericanFormat}</div>
                        <div>{movieData.countriesOfOrigin.join(", ")}</div>
                        <div>{movieData.filmingLocations.join(", ")}</div>
                        <div>{movieData.productionCompanies.join(", ")}</div>
                        <div>{movieData.budget}</div>
                        <div>{movieData.grossWorldwide}</div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default page