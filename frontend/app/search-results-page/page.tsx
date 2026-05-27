import Button from '@/components/buttons/Button';
import SearchResult from '@/components/complex/SearchResult'
import Footer from '@/components/Footer';
import Delimiter from '@/components/static/Delimiter';
import React from 'react'

interface MovieSearchResult {
    title: string;
    duration: number;
    releaseDate: Date;
    director: string;
    rating: number;
    defaultSrc: string;
    //hoverSrc?: string;
}

interface pageProps {
    searchResults: Array<MovieSearchResult>;
    searchParams: Promise<{ query?: string }>;
}

const sampleMovies: Array<MovieSearchResult> = [
    {
        title: "The Devil Wears Prada 2",
        duration: 119,
        releaseDate: new Date("2026-05-01"),
        director: "David Frankel",
        rating: 3.4,
        defaultSrc: "/category_test/category1/The_Devil_Wears_Prada_2_banner_default.jpg"
    },
    {
        title: "Lee Cronin's The Mummy",
        duration: 134,
        releaseDate: new Date("2026-04-17"),
        director: "Lee Cronin",
        rating: 3.2,
        defaultSrc: "/search_results_test/Lee_Cronins_The_Mummy.jpg"
    },
    {
        title: "The Super Mario Galaxy Movie",
        duration: 99,
        releaseDate: new Date("2026-04-01"),
        director: "Aaron, Horvath, Michael Jelenic, Pierre Leduc",
        rating: 3.2,
        defaultSrc: "/search_results_test/The_Super_Mario_Galaxy_Movie.jpg"
    },
    {
        title: "Dhurandhar: The Revenge",
        duration: 235,
        releaseDate: new Date("2026-03-19"),
        director: "Aditya Dhar",
        rating: 4.3,
        defaultSrc: "/search_results_test/Dhurandhar_The_Revenge.jpg"
    },
    {
        title: "The Mortuary Assistant Movie",
        duration: 91,
        releaseDate: new Date("2026-02-13"),
        director: "Jeremiah Kipp",
        rating: 1.9,
        defaultSrc: "/search_results_test/The_Mortuary_Assistant_Movie.jpg"
    },
    {
        title: "28 Years Later: The Bone Temple",
        duration: 110,
        releaseDate: new Date("2026-01-16"),
        director: "Nia DaCosta",
        rating: 3.7,
        defaultSrc: "/search_results_test/28_Years_Later_The_Bone_Temple.jpg"
    }
]

const page = async ({ searchResults = sampleMovies, searchParams }: pageProps) => {
    const params = await searchParams;
    const currentQuery = params.query || "";

    const filteredMovies = searchResults.filter((movie) => (
        movie.title.toLowerCase().includes(currentQuery.toLowerCase())
    ));

    return (
        <div className="min-h-screen flex flex-col pt-25">
            <div className="w-full flex flex-col gap-y-6 mb-20 grow">
                <div className="text-white flex justify-between px-[15%]">
                    <div className="text-[24px]">Search results for: {currentQuery}</div>
                    <div className="flex gap-x-6 text-[20px]">
                        <a href="/forms/results-sort-form"><Button text="Sort" height={40}/></a>
                        <a href="/forms/results-filter-form"><Button text="Filter" height={40}/></a>
                    </div>
                </div>
                {
                    filteredMovies.length > 0 ? (
                        filteredMovies.map((movie, index) => (
                            <SearchResult
                                key={index}
                                title={movie.title}
                                duration={movie.duration}
                                releaseDate={movie.releaseDate}
                                director={movie.director}
                                rating={movie.rating}
                                src={movie.defaultSrc}
                            />
                        ))
                    ) : (
                        <div className="top-20 flex flex-col justify-center items-center gap-y-5">
                            <Delimiter width="70%" />
                            <div className="text-white text-2xl">No results found.</div>
                        </div>
                    )
                }
            </div>
            <Footer />
        </div>
    )
}

export default page