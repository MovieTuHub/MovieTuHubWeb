import MainPageMovieCarousel from '@/components/complex/MainPageMovieCarousel'
import MovieCategoryCarousel from '@/components/complex/MovieCategoryCarousel'
import Footer from '@/components/Footer'
import React from 'react'

interface MainPageProps {
  backdropCarouselImages: Array<string>;
  backdropCarouselMovieLogos: Array<string>;

  movieCategoryOneTitle: string;
  movieCategoryOnePostersDef: Array<string>;
  movieCategoryOnePostersHover: Array<string>;
  movieCategoryOneMovieTitles: Array<string>;

  movieCategoryTwoTitle: string;
  movieCategoryTwoPostersDef: Array<string>;
  movieCategoryTwoPostersHover: Array<string>;
  movieCategoryTwoMovieTitles: Array<string>;

  movieCategoryThreeTitle: string;
  movieCategoryThreePostersDef: Array<string>;
  movieCategoryThreePostersHover: Array<string>;
  movieCategoryThreeMovieTitles: Array<string>;
}

const mainPageData: MainPageProps = {
  backdropCarouselImages: [
    "/main_carousel/Interstellar.jpg",
    "/main_carousel/Top_Gun_Maverick.jpg",
    "/main_carousel/Project_Hail_Mary.jpg",
    "/main_carousel/The_Devil_Wears_Prada_2.jpg",
  ],
  backdropCarouselMovieLogos: [
    "/main_carousel/Interstellar_logo.png",
    "/main_carousel/Top_Gun_Maverick_logo.png",
    "/main_carousel/Project_Hail_Mary_logo.png",
    "/main_carousel/The_Devil_Wears_Prada_2_logo.png",
  ],

  movieCategoryOneTitle: "Ones to watch",
  movieCategoryOnePostersDef: [
    "/category_test/category1/Interstellar_banner_default.png",
    "/category_test/category1/Top_Gun_Maverick_banner_default.jpg",
    "/category_test/category1/Project_Hail_Mary_banner_default.jpg",
    "/category_test/category1/The_Devil_Wears_Prada_2_banner_default.jpg",
    "/category_test/category1/Michael_Poster.png"
  ],
  movieCategoryOnePostersHover: [
    "/category_test/category1/Interstellar_banner_hover.png",
    "/category_test/category1/Top_Gun_Maverick_banner_hover.jpg",
    "/category_test/category1/Project_Hail_Mary_banner_hover.jpg",
    "/category_test/category1/The_Devil_Wears_Prada_2_banner_hover.jpg",
    "/category_test/category1/Michael_Poster_On_Hover.png"
  ],
  movieCategoryOneMovieTitles: [
    "Interstellar",
    "Top Gun: Maverick",
    "Project Hail Mary",
    "The Devil Wears Prada 2",
    "Michael"
  ],

  movieCategoryTwoTitle: "Upcoming",
  movieCategoryTwoPostersDef: [
    "/category_test/category2/Tom_Clancys_Jack_Ryan_Ghost_War_Poster.png",
    "/category_test/category2/Disclosure_Day_Poster.png",
    "/category_test/category2/The_Odyssey_Poster.png",
    "/category_test/category2/Spider-Man_Brand_New_Day_Poster.png",
    "/category_test/category2/Avengers_Doomsday_Poster.png"
  ],
  movieCategoryTwoPostersHover: [
    "/category_test/category2/Tom_Clancys_Jack_Ryan_Ghost_War_Poster_On_Hover.png",
    "/category_test/category2/Disclosure_Day_Poster_On_Hover.png",
    "/category_test/category2/The_Odyssey_Poster_On_Hover.png",
    "/category_test/category2/Spider-Man_Brand_New_Day_Poster_On_Hover.png",
    "/category_test/category2/Avengers_Doomsday_Poster_On_Hover.png"
  ],
  movieCategoryTwoMovieTitles: [
    "Tom Clancy's Jack Ryan: Ghost War",
    "Disclosure Day",
    "The Odyssey",
    "Spider-Man: Brand New Day",
    "Avengers: Doomsday"
  ],

  movieCategoryThreeTitle: "All-timers",
  movieCategoryThreePostersDef: [
    "/category_test/category3/The_Shawshank_Redemption_Poster.png",
    "/category_test/category3/The_Dark_Knight_Poster.png",
    "/category_test/category3/The_Lord_of_the_Rings_The_Return_of_the_King_Poster.png",
    "/category_test/category3/Fight_Club_Poster.png",
    "/category_test/category3/The_Matrix_Poster.png"
  ],
  movieCategoryThreePostersHover: [
    "/category_test/category3/The_Shawshank_Redemption_Poster_On_Hover.png",
    "/category_test/category3/The_Dark_Knight_Poster_On_Hover.png",
    "/category_test/category3/The_Lord_of_the_Rings_The_Return_of_the_King_Poster_On_Hover.png",
    "/category_test/category3/Fight_Club_Poster_On_Hover.png",
    "/category_test/category3/The_Matrix_Poster_On_Hover.png"
  ],
  movieCategoryThreeMovieTitles: [
    "The Shawshank Redemption",
    "The Dark Knight",
    "The Lord of the Rings: The Return of the King",
    "Fight Club",
    "The Matrix"
  ]
}

const page = () => {
  return (
    <div className="flex flex-col gap-y-5">
      <MainPageMovieCarousel
        backdrops={mainPageData.backdropCarouselImages}
        movieLogos={mainPageData.backdropCarouselMovieLogos}
      />
      <div className="absolute w-full h-20 top-105
        bg-linear-to-t from-background to-transparent">
      </div>
      <div className="flex flex-col gap-y-16 pb-20">
        <MovieCategoryCarousel
          text={mainPageData.movieCategoryOneTitle}
          imagesDef={mainPageData.movieCategoryOnePostersDef}
          imagesHover={mainPageData.movieCategoryOnePostersHover}
          movieTitles={mainPageData.movieCategoryOneMovieTitles}
        />
        <MovieCategoryCarousel
          text={mainPageData.movieCategoryTwoTitle}
          imagesDef={mainPageData.movieCategoryTwoPostersDef}
          imagesHover={mainPageData.movieCategoryTwoPostersHover}
          movieTitles={mainPageData.movieCategoryTwoMovieTitles}
        />
        <MovieCategoryCarousel
          text={mainPageData.movieCategoryThreeTitle}
          imagesDef={mainPageData.movieCategoryThreePostersDef}
          imagesHover={mainPageData.movieCategoryThreePostersHover}
          movieTitles={mainPageData.movieCategoryThreeMovieTitles}
        />
      </div>
      <Footer />
    </div>
  )
}

export default page