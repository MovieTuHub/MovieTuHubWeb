"use client"
import Button from '@/components/buttons/Button';
import SearchResult from '@/components/complex/SearchResult';
import Delimiter from '@/components/static/Delimiter';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const page = () => {
    const searchParams = useSearchParams()

    const search = searchParams.get("query") ?? null;

    const [movieData, setMovieData] = useState<Array<SimpleMovieResponse>>([])

    useEffect(() => {
        let requesUrl
        if (!search) {
            requesUrl = "http://localhost:8000/movies/simple_presentation"
        }
        else {
            const params = new URLSearchParams()
            params.append("search_phrase", search)
            requesUrl = `http://localhost:8000/movies/search?${params}`
        }

        fetch(requesUrl)
            .then(response => response.json())
            .then(data => setMovieData(data))

    }, [search])

    return (
        <div className="min-h-screen flex flex-col pt-25">
            <div className="w-full flex flex-col gap-y-6 mb-20 grow">
                <div className="text-white flex justify-between px-[15%]">
                    <div className="text-[24px]">Search results for: {search}</div>
                    <div className="flex gap-x-6 text-[20px]">
                        <a href="/forms/results-sort-form"><Button text="Sort" height={40} /></a>
                        <a href="/forms/results-filter-form"><Button text="Filter" height={40} /></a>
                    </div>
                </div>
                {
                    movieData.length > 0 ? (
                        movieData.map((movie, index) => (
                            <SearchResult
                                key={index}
                                slug={movie.id}
                                title={movie.name}
                                duration={movie.duration}
                                releaseDate={movie.release_date}
                                director={movie.director}
                                rating={movie.average_score}
                                src={`data:${movie.banner.mime};base64,${movie.banner.image}`}
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
        </div>
    )
}

export default page