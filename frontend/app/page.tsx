'use client';
import MainPageMovieCarousel from '@/components/complex/MainPageMovieCarousel';
import MovieCategoryCarousel from '@/components/complex/MovieCategoryCarousel';
import { useEffect, useState } from 'react';

const page = () => {
  const [mainPageCaroselData, setMainPageCaroselData] = useState<Array<HeroBannerMovieResponse>>([])
  // const [heroBannerLoading, setHeroBannerLoading] = useState(true)
  const [onesToWatchMovieData, setOnesToWatchMovieData] = useState<Array<MainPageMovieResponse>>([])
  const [upcomingMovieData, setUpcomingMovieData] = useState<Array<MainPageMovieResponse>>([])
  const [allTimersMovieData, setAllTimersMovieData] = useState<Array<MainPageMovieResponse>>([])

  useEffect(() => {
    fetch(`http://localhost:8000/movies/hero`)
      .then(response => response.json())
      .then(data => {
        setMainPageCaroselData(data)
        // setHeroBannerLoading(false)
      })
  }
    , [])

  useEffect(() => {
    const params = new URLSearchParams();
    params.append("collection", "Ones to watch")
    fetch(`http://localhost:8000/movies/main_page?${params}`)
      .then(response => response.json())
      .then(data => setOnesToWatchMovieData(data))
  }
    , [])

  useEffect(() => {
    const params = new URLSearchParams();
    params.append("collection", "Upcoming")
    fetch(`http://localhost:8000/movies/main_page?${params}`)
      .then(response => response.json())
      .then(data => setUpcomingMovieData(data))
  }
    , [])

  useEffect(() => {
    const params = new URLSearchParams();
    params.append("collection", "All Timers")
    fetch(`http://localhost:8000/movies/main_page?${params}`)
      .then(response => response.json())
      .then(data => setAllTimersMovieData(data))
  }
    , [])

  return (
    <div className="flex flex-col gap-y-5">
      <MainPageMovieCarousel
        backdrops={mainPageCaroselData.map(data => `data:${data.backdrop.mime};base64,${data.backdrop.image}`)}
        movieLogos={mainPageCaroselData.map(data => `data:${data.banner.mime};base64,${data.banner.image}`)}
      />
      <div className="absolute w-full h-20 top-180
        bg-linear-to-t from-background to-transparent">
      </div>
      <div className="flex flex-col gap-y-16 pb-20">
        <MovieCategoryCarousel
          text={"Ones to watch"}
          imagesDef={onesToWatchMovieData.map(data => `data:${data.banners[0].mime};base64,${data.banners[0].image}`)}
          imagesHover={onesToWatchMovieData.map(data => `data:${data.banners[1].mime};base64,${data.banners[1].image}`)}
          movieTitles={onesToWatchMovieData.map(data => data.name)}
        />
        <MovieCategoryCarousel
          text={"Upcoming"}
          imagesDef={upcomingMovieData.map(data => `data:${data.banners[0].mime};base64,${data.banners[0].image}`)}
          imagesHover={upcomingMovieData.map(data => `data:${data.banners[1].mime};base64,${data.banners[1].image}`)}
          movieTitles={upcomingMovieData.map(data => data.name)}
        />
        <MovieCategoryCarousel
          text={"All-Timers"}
          imagesDef={allTimersMovieData.map(data => `data:${data.banners[0].mime};base64,${data.banners[0].image}`)}
          imagesHover={allTimersMovieData.map(data => `data:${data.banners[1].mime};base64,${data.banners[1].image}`)}
          movieTitles={allTimersMovieData.map(data => data.name)}
        />
      </div>
    </div>
  )
}

export default page