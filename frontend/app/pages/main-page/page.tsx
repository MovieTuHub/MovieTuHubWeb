import MainPageMovieCarousel from '@/components/complex/MainPageMovieCarousel'
import MovieCategoryCarousel from '@/components/complex/MovieCategoryCarousel'
import Footer from '@/components/Footer'
import React from 'react'

const page = () => {
  return (
    <div className="flex flex-col gap-y-5">
      <MainPageMovieCarousel
        movieLogos={[
          "/main_carousel/Interstellar_logo.png",
          "/main_carousel/Top_Gun_Maverick_logo.png",
          "/main_carousel/Project_Hail_Mary_logo.png",
          "/main_carousel/The_Devil_Wears_Prada_2_logo.png",
        ]}
        images={[
          "/main_carousel/Interstellar.jpg",
          "/main_carousel/Top_Gun_Maverick.jpg",
          "/main_carousel/Project_Hail_Mary.jpg",
          "/main_carousel/The_Devil_Wears_Prada_2.jpg",
        ]}
      />
      <div className="absolute w-full h-20 top-105
        bg-linear-to-t from-background to-transparent">
      </div>
      <div className="flex flex-col gap-y-16 pb-20">
        <MovieCategoryCarousel
          text="Ones to watch"
          imagesDef={[
            "/category_test/category1/Interstellar_banner_default.png",
            "/category_test/category1/Top_Gun_Maverick_banner_default.jpg",
            "/category_test/category1/Project_Hail_Mary_banner_default.jpg",
            "/category_test/category1/The_Devil_Wears_Prada_2_banner_default.jpg",
            "/category_test/category1/Michael_Poster.png"
          ]}
          imagesHover={[
            "/category_test/category1/Interstellar_banner_hover.png",
            "/category_test/category1/Top_Gun_Maverick_banner_hover.jpg",
            "/category_test/category1/Project_Hail_Mary_banner_hover.jpg",
            "/category_test/category1/The_Devil_Wears_Prada_2_banner_hover.jpg",
            "/category_test/category1/Michael_Poster_On_Hover.png"
          ]}
          movieTitles={[
            "Interstellar",
            "Top Gun: Maverick",
            "Project Hail Mary",
            "The Devil Wears Prada 2",
            "Michael"
          ]}
        />
        <MovieCategoryCarousel
          text="Upcoming"
          imagesDef={[
            "/category_test/category2/Tom_Clancys_Jack_Ryan_Ghost_War_Poster.png",
            "/category_test/category2/Disclosure_Day_Poster.png",
            "/category_test/category2/The_Odyssey_Poster.png",
            "/category_test/category2/Spider-Man_Brand_New_Day_Poster.png",
            "/category_test/category2/Avengers_Doomsday_Poster.png"
          ]}
          imagesHover={[
            "/category_test/category2/Tom_Clancys_Jack_Ryan_Ghost_War_Poster_On_Hover.png",
            "/category_test/category2/Disclosure_Day_Poster_On_Hover.png",
            "/category_test/category2/The_Odyssey_Poster_On_Hover.png",
            "/category_test/category2/Spider-Man_Brand_New_Day_Poster_On_Hover.png",
            "/category_test/category2/Avengers_Doomsday_Poster_On_Hover.png"
          ]}
          movieTitles={[
            "Tom Clancy's Jack Ryan: Ghost War",
            "Disclosure Day",
            "The Odyssey",
            "Spider-Man: Brand New Day",
            "Avengers: Doomsday"
          ]}
        />
        <MovieCategoryCarousel
          text="All-timers"
          imagesDef={[
            "/category_test/category3/The_Shawshank_Redemption_Poster.png",
            "/category_test/category3/The_Dark_Knight_Poster.png",
            "/category_test/category3/The_Lord_of_the_Rings_The_Return_of_the_King_Poster.png",
            "/category_test/category3/Fight_Club_Poster.png",
            "/category_test/category3/The_Matrix_Poster.png"
          ]}
          imagesHover={[
            "/category_test/category3/The_Shawshank_Redemption_Poster_On_Hover.png",
            "/category_test/category3/The_Dark_Knight_Poster_On_Hover.png",
            "/category_test/category3/The_Lord_of_the_Rings_The_Return_of_the_King_Poster_On_Hover.png",
            "/category_test/category3/Fight_Club_Poster_On_Hover.png",
            "/category_test/category3/The_Matrix_Poster_On_Hover.png"
          ]}
          movieTitles={[
            "The Shawshank Redemption",
            "The Dark Knight",
            "The Lord of the Rings: The Return of the King",
            "Fight Club",
            "The Matrix"
          ]}
        />
      </div>
      <Footer />
    </div>
  )
}

export default page