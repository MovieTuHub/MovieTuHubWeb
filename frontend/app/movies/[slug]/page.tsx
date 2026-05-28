"use client"
import ReviewModal from '@/app/modals/ReviewModal'
import PlayTrailerButton from '@/components/buttons/PlayTrailerButton'
import ReviewButton from '@/components/buttons/ReviewButton'
import SaveButton from '@/components/buttons/SaveButton'
import StreamButton from '@/components/buttons/StreamButton'
import ActorsCarousel from '@/components/complex/ActorsCarousel'
import GalleryCarousel from '@/components/complex/GalleryCarousel'
import MoviePageBannerCarousel from '@/components/complex/MoviePageBannerCarousel'
import ReviewsCarousel from '@/components/complex/ReviewsCarousel'
import StarRating from '@/components/interractibles/StarRating'
import CategoryBlob from '@/components/static/CategoryBlob'
import CategoryDelimiter from '@/components/static/CategoryDelimiter'
import { useAuth } from '@/context/AuthContext'
import LoginModal from '@/forms/LoginModal'
import { use, useEffect, useState } from 'react'

const page = ({ params, }: { params: Promise<{ slug: string }> }) => {
    const { isLoggedIn, login } = useAuth();
    const [activeModal, setActiveModal] = useState<null | "login" | "review">(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const { slug } = use(params)
    const [movieData, setMovieData] = useState<MovieResponse | null>(null)

    useEffect(() => {
        fetch(`http://localhost:8000/movies/single_movie/${slug}`)
            .then(response => response.json())
            .then(data => setMovieData(data))
    }, [])

    if (movieData == null) {
        return <div className="flex flex-col w-screen h-screen justify-center items-center text-7xl font-bold text-white">
            Loading...
        </div>
    }

    return (
        <div className="flex flex-col justify-center gap-y-4">
            <MoviePageBannerCarousel
                movieTitle={movieData.name}
                banners={movieData.backdrops.map(backdrop => `data:${backdrop.mime};base64,${backdrop.image}`)}
                posters={movieData.posters.map(poster => `data:${poster.mime};base64,${poster.image}`)}
            />
            <div className="absolute w-full h-20 top-180
                bg-linear-to-t from-background to-transparent">
            </div>
            <div className="flex flex-col justify-center
                text-white gap-y-5 mx-180">
                <div className="flex items-center gap-x-5 font-bold">
                    <StarRating starSize={25} />
                    <div className="text-2xl">{movieData.average_score.toFixed(1)}/5</div>
                    <div className="text-3xl">&bull;</div>
                    <div className="text-[20px] text-[#fff9]">
                        Rate this movie
                    </div>
                </div>
                <div className="flex gap-x-4">
                    {
                        movieData.categories.map((category, index) => (
                            <CategoryBlob key={index} height={35} text={category.category} />
                        ))
                    }
                </div>
                <div className="flex gap-x-24">
                    <div>Release date: {movieData.release_date}</div>
                    <div>
                        Duration: {movieData.duration}
                    </div>
                </div>
                <div className="flex gap-x-6">
                    <SaveButton />
                    <PlayTrailerButton href={movieData.trailer} />
                    {movieData.streaming_service && <StreamButton href={movieData.streaming_service.link} streaming_service={movieData.streaming_service.service} />}
                </div>
                <div className="flex flex-col mt-5 gap-y-4">
                    <div className="text-2xl">Overview</div>
                    <div className="max-w-3xl">{movieData.overview}</div>
                </div>
                <div className="flex gap-x-36 mt-10">
                    <div className="flex flex-col gap-y-2">
                        <div className="text-2xl font-bold">{movieData.producers[0].name}</div>
                        {movieData.producers[0].producer_role.join(", ")}
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <div className="text-2xl font-bold">{movieData.producers[1].name}</div>
                        {movieData.producers[1].producer_role.join(", ")}
                    </div>
                </div>
            </div>
            <div className="mt-10 flex flex-col gap-y-5">
                <CategoryDelimiter text="Main cast" isSemibold />
                <ActorsCarousel cast={movieData.cast} />
            </div>
            <div className="mt-16 flex flex-col gap-y-5">
                <CategoryDelimiter text="Reviews" isSemibold />
                <div className="absolute self-end mt-6 mr-33">
                    <ReviewButton onClick={() => {
                        setActiveModal(isLoggedIn ? "review" : "login");
                        setIsModalOpen(true);
                    }} />
                </div>
                <ReviewsCarousel reviews={movieData.reviews} />
            </div>
            <div className="mt-16 flex flex-col gap-y-5">
                <CategoryDelimiter text="Gallery" isSemibold />
                <GalleryCarousel imageSources={movieData.gallery.map(image => `data:${image.mime};base64,${image.image}`)} />
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
                        <div>{movieData.release_date}</div>
                        <div>{movieData.country_origin.join(", ")}</div>
                        <div>{movieData.filming_location.join(", ")}</div>
                        <div>{movieData.production_companies.join(", ")}</div>
                        <div>{movieData.budget}</div>
                        <div>{movieData.gross_profit}</div>
                    </div>
                </div>
            </div>
            {
                isModalOpen && activeModal === "review" && (
                    <ReviewModal
                        isOpen={isModalOpen}
                        onClose={() => {
                            setActiveModal(null);
                            setIsModalOpen(false);
                        }}
                    />
                )
            }
            {
                isModalOpen && activeModal === "login" && (
                    <LoginModal
                        isOpen={isModalOpen}
                        onClose={() => {
                            setActiveModal(null);
                            setIsModalOpen(false);
                        }}
                        onClickLogin={() => {
                            login()
                            setActiveModal(null);
                            setIsModalOpen(false);
                        }}
                    />
                )
            }
        </div>

    )
}

export default page