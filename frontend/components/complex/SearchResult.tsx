import { FaStar } from 'react-icons/fa';
import Link from '../buttons/Link';
import MoviePosterSearchResult from '../interractibles/MoviePosterNoHoverSrc';
import Delimiter from '../static/Delimiter';

interface SearchResultProps {
    title: string;
    duration: string;
    releaseDate: string;
    director: string;
    rating: number;
    src: string;
    slug: string
}

const SearchResult = ({
    title,
    duration,
    releaseDate,
    director,
    rating,
    src,
    slug
}: SearchResultProps) => {
    const href = `/movies/${slug}`;
    return (
        <div className="top-20 w-full flex flex-col justify-center items-center gap-y-5">
            <Delimiter width="70%" />
            <div className="w-[70%] h-70 flex justify-between items-center px-8">
                <div className="flex gap-x-6">
                    <MoviePosterSearchResult
                        src={src}
                        href={href}
                        width={165}
                    />
                    <div className="flex flex-col justify-center gap-y-16 text-white text-[20px]">
                        <a href={href} className="text-[28px]">{title}</a>
                        <div className="flex flex-col gap-y-3">
                            <div>Duration: {duration}</div>
                            <div>Release date: {releaseDate}</div>
                            <div>Director: {director}</div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-y-30">
                    <div className="flex justify-center items-center gap-x-4">
                        <div className="text-white text-[20px]">{rating.toFixed(1)}/5</div>
                        <FaStar size={30} style={{ color: "#ebb500" }} />
                    </div>
                    <Link href={href} fontSize={24} text="Reviews" />
                </div>
            </div>
        </div>
    )
}

export default SearchResult