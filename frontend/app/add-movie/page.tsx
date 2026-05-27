"use client"

import { createMovie } from '@/api/postHandlers';
import Button from '@/components/buttons/Button';
import InputFilesField from '@/components/buttons/InputFilesField';
import Footer from '@/components/Footer';
import ActorComboBox from '@/components/interractibles/ActorComboBox';
import CategoryComboBox from '@/components/interractibles/CategoryComboBox';
import CategoryListBox from '@/components/interractibles/CategoryListBox';
import InputField from '@/components/interractibles/InputField';
import ListBox from '@/components/interractibles/ListBox';
import MainPageBox from '@/components/interractibles/MainPageBannerBox';
import StreamingServiceComboBox from '@/components/interractibles/StreamingServiceComboBox';
import Delimiter from '@/components/static/Delimiter';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';


const page = () => {
    const [categoryData, setCategoryData] = useState<Array<CategoryResponse>>([])
    const [actorData, setActorData] = useState<Array<SimpleActorResponse>>([])


    const [selectedActors, setSelectedActors] = useState<{ object: SimpleActorResponse, role: string }[]>([]);
    const [currentActor, setCurrentActor] = useState<SimpleActorResponse>();
    const [currentRole, setCurrentRole] = useState("");

    const [name, setName] = useState("")
    const [releaseDate, setReleaseDate] = useState<Date>()
    const [duration, setDuration] = useState("")
    const [director, setDirector] = useState("")
    const [writer, setWriter] = useState("")
    const [trailer, setTrailer] = useState("")
    const [overview, setOverview] = useState("")
    const [countryOfOrigin, setCountryOfOrigin] = useState("")
    const [filmingLocation, setFilmingLocation] = useState("")
    const [productionCompanies, setProductionCompanies] = useState("")
    const [budget, setBudget] = useState("")
    const [grossWorldwide, setGrossWorldwide] = useState("")
    const [streamingService, setStreamingService] = useState("");
    const [streamingLink, setStreamingLink] = useState("");



    const addActor = () => {
        if (currentActor && currentRole) {
            setSelectedActors([...selectedActors, { object: currentActor, role: currentRole }]);
            setCurrentActor(undefined);
            setCurrentRole("");
        }
    }

    const removeActor = (indexToRemove: number) => {
        setSelectedActors(selectedActors.filter((_, index) => index !== indexToRemove));
    }

    const [selectedCategories, setSelectedCategories] = useState<Array<CategoryResponse>>([]);
    const [currentCategory, setCurrentCategory] = useState<CategoryResponse>();

    const addCategory = () => {
        if (currentCategory) {
            setSelectedCategories([...selectedCategories, currentCategory]);
            setCurrentCategory(undefined);
        }
    }

    const removeCategory = (indexToRemove: number) => {
        setSelectedCategories(selectedCategories.filter((_, index) => index !== indexToRemove));
    }

    const [uploadedBackdrops, setUploadedBackdrops] = useState<File[]>([]);
    const [uploadedPosters, setUploadedPosters] = useState<File[]>([]);
    const [uploadedGalleryImages, setUploadedGalleryImages] = useState<File[]>([]);
    const [uploadedMainPageBanner, setUploadedMainPageBanner] = useState<File>();


    const handleFiles = (e: ChangeEvent<HTMLInputElement>, setter: Dispatch<SetStateAction<File[]>>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setter(prev => [...prev, ...newFiles])
            e.target.value = "";
        }
    }

    const handleFileMainPageBanner = (e: ChangeEvent<HTMLInputElement>, setter: Dispatch<SetStateAction<File | undefined>>) => {
        if (e.target.files) {
            setter(e.target.files[0])
            e.target.value = "";
        }
    }

    const removeFile = (setter: Dispatch<SetStateAction<File[]>>, indexToRemove: number) => {
        setter(prevArray => prevArray.filter((_, index) => index !== indexToRemove));
    }

    useEffect(() => {
        fetch("http://localhost:8000/categories")
            .then(response => response.json())
            .then(data => setCategoryData(data))
    }, [])


    useEffect(() => {
        fetch("http://localhost:8000/actors")
            .then(response => response.json())
            .then(data => setActorData(data))
    }, [])

    const handleActorSelect = (id: string) => {
        const foundActor = actorData.find(actor => actor.id == id)

        setCurrentActor(foundActor)
    }


    const handleCategorySelect = (id: string) => {
        const foundCategory = categoryData.find(actor => actor.id == id)

        setCurrentCategory(foundCategory)
    }

    const upload = () => {
        createMovie(uploadedBackdrops,
            uploadedPosters,
            uploadedMainPageBanner,
            name,
            releaseDate,
            duration,
            selectedCategories.map(category => category.id),
            director,
            writer,
            trailer,
            overview,
            selectedActors.map(actor => ({ id: actor.object.id, role: actor.role })),
            uploadedGalleryImages,
            countryOfOrigin.toString().split(",") ?? [],
            filmingLocation.toString().split(",") ?? [],
            productionCompanies.toString().split(",") ?? [],
            budget,
            grossWorldwide,
            streamingService ? { service: streamingService, link: streamingLink } : null
        )
    }

    return (
        <div className="mt-20 w-full flex flex-col items-center text-white">
            <div className="w-full flex flex-col items-center gap-y-12 mb-20">
                <div className="text-5xl font-bold">Add a movie</div>
                <Delimiter />
                {/*Starting fields and Overview section*/}
                <div className="flex gap-x-28 justify-center">
                    <div className="flex flex-col gap-y-5 text-[20px] font-semibold">
                        <div className="flex flex-col gap-y-3">
                            <div>Title</div>
                            <InputField type="text" isRounded placeholder="Title" onChange={setName} />
                        </div>
                        <div className="flex flex-col gap-y-3">
                            <div>Release date</div>
                            <InputField type="date" isRounded onChange={setReleaseDate} />
                        </div>
                        <div className="flex flex-col gap-y-3">
                            <div>Duration</div>
                            <InputField type="text" isRounded placeholder="Duration" onChange={setDuration} />
                        </div>
                        <div className="flex flex-col gap-y-3">
                            <div>Director</div>
                            <InputField type="text" isRounded placeholder="Full name" onChange={setDirector} />
                        </div>
                        <div className="flex flex-col gap-y-3">
                            <div>Writer</div>
                            <InputField type="text" isRounded placeholder="Full name" onChange={setWriter} />
                        </div>
                    </div>
                    <div className="flex flex-col justify-between items-center gap-y-10">
                        <div className="flex flex-col items-center gap-y-3">
                            <div className="text-[20px] font-semibold">Overview</div>
                            <textarea
                                placeholder="Overview"
                                className="bg-white w-125 h-72 border border-black rounded-lg
                                    px-4 py-2 text-black transition-all duration-150
                                    hover:bg-[#d0d0d0] hover:shadow-[0px_0px_10px_5px_#4a5ac266]
                                    focus:bg-white focus:outline-none focus:shadow-[0px_0px_10px_5px_#4a5ac2cc]"
                                onChange={e => setOverview(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-center gap-x-10 font-semibold">
                            <div className="flex flex-col items-center gap-y-3">
                                <div className="text-[20px] font-semibold">Trailer link</div>
                                <InputField type="text" isRounded placeholder="Link" onChange={setTrailer} />
                            </div>
                            <div className="flex flex-col items-center gap-y-3">
                                <div className="text-[20px] font-semibold">Streaming link</div>
                                <InputField type="text" isRounded placeholder="Link" onChange={setStreamingLink} />
                            </div>
                            <div className="flex flex-col items-center gap-y-3">
                                <StreamingServiceComboBox
                                    label="Streaming Service"
                                    onChange={setStreamingService}
                                    defaultText="Select a streaming service"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Delimiter />
                {/*Category and actors section*/}
                <div className="w-full flex justify-between px-25 items-center">
                    {/*Category select*/}
                    <div className="flex justify-center items-center gap-x-10">
                        {/*Category select fields + Button*/}
                        <div className="flex flex-col justify-center items-center gap-y-10 font-semibold">
                            <CategoryComboBox
                                label="Category"
                                onChange={handleCategorySelect}
                                defaultText="Select a category"
                                array={categoryData}
                            />
                            <Button
                                text="Add category"
                                width={150}
                                onClick={addCategory}
                            />
                        </div>
                        {/*Category select list box*/}
                        <div className="flex flex-col items-center gap-y-3">
                            <CategoryListBox
                                width={200}
                                height={300}
                                array={selectedCategories}
                                textWhenEmpty="No category added yet."
                                onClick={removeCategory}
                            />
                            <div className="text-[16px] font-semibold">
                                Click a category to remove
                            </div>
                        </div>
                    </div>
                    {/*Actor select*/}
                    <div className='flex justify-center items-center gap-x-10'>
                        {/*Actor select fields + Button*/}
                        <div className="flex flex-col justify-center items-center gap-y-10 font-semibold">
                            <ActorComboBox
                                label="Actor"
                                onChange={handleActorSelect}
                                defaultText="Select an actor"
                                array={actorData}
                            />
                            <div className="flex flex-col items-center gap-y-3">
                                <div className="text-[20px]">Movie role</div>
                                <InputField
                                    type="text"
                                    isRounded
                                    placeholder="Role"
                                    onChange={(e) => setCurrentRole(e.target.value)}
                                />
                            </div>
                            <Button
                                text="Add actor"
                                onClick={addActor}
                            />
                        </div>
                        {/*Actor select list box*/}
                        <div className="flex flex-col items-center gap-y-3">
                            <div className="w-87.5 h-75 bg-white rounded-lg border border-black px-3 py-2
                                hover:shadow-[0px_0px_10px_5px_#4a5ac266] overflow-y-auto">
                                <ul className="text-black flex flex-col gap-y-1">
                                    {
                                        selectedActors.length == 0
                                            ? <li>No actors added yet.</li>
                                            : (
                                                selectedActors.map((actor, index) => (
                                                    <li
                                                        key={index}
                                                        onClick={() => removeActor(index)}
                                                        className="border border-black rounded-lg px-4 h-10 flex items-center
                                                        bg-[#e0e0e0] hover:bg-[#c8c8c8] active:bg-[#a0a0a0]"
                                                    >
                                                        <div><strong>{actor.object.name}</strong> as {actor.role}</div>
                                                    </li>
                                                ))
                                            )
                                    }
                                </ul>
                            </div>
                            <div className="text-[20px] font-semibold">
                                Click an actor to remove
                            </div>
                        </div>
                    </div>
                </div>
                <Delimiter />
                {/*Upload images section*/}
                <div className="w-full flex justify-around">
                    <div className="flex flex-col gap-y-8">
                        <InputFilesField
                            id="backdrop-images-upload"
                            accept="image/*"
                            text="Upload backdrop images"
                            multiple
                            onChange={(e) => handleFiles(e, setUploadedBackdrops)}
                        />
                        <div className="flex flex-col items-center gap-y-3">
                            <ListBox
                                width={350}
                                height={300}
                                array={uploadedBackdrops.map(file => file.name)}
                                textWhenEmpty="No backdrops uploaded yet."
                                onClick={(index) => removeFile(setUploadedBackdrops, index)}
                            />
                            <div className="text-[20px] font-semibold">
                                Click a backdrop to remove
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-8">
                        <InputFilesField
                            id="poster-images-upload"
                            accept="image/*"
                            text="Upload poster images"
                            multiple
                            onChange={(e) => handleFiles(e, setUploadedPosters)}
                        />
                        <div className="flex flex-col items-center gap-y-3">
                            <ListBox
                                width={350}
                                height={300}
                                array={uploadedPosters.map(file => file.name)}
                                textWhenEmpty="No posters uploaded yet."
                                onClick={(index) => removeFile(setUploadedPosters, index)}
                            />
                            <div className="text-[20px] font-semibold">
                                Click a poster to remove
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-8">
                        <InputFilesField
                            id="gallery-images-upload"
                            accept="image/*"
                            text="Upload gallery images"
                            multiple
                            onChange={(e) => handleFiles(e, setUploadedGalleryImages)}
                        />
                        <div className="flex flex-col items-center gap-y-3">
                            <ListBox
                                width={350}
                                height={300}
                                array={uploadedGalleryImages.map(file => file.name)}
                                textWhenEmpty="No gallery images uploaded yet."
                                onClick={(index) => removeFile(setUploadedGalleryImages, index)}
                            />
                            <div className="text-[20px] font-semibold">
                                Click an image to remove
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-8">
                        <InputFilesField
                            id="main-page-banner-image-upload"
                            accept="image/*"
                            text="Upload main page banner images"

                            onChange={(e) => handleFileMainPageBanner(e, setUploadedMainPageBanner)}
                        />
                        <div className="flex flex-col items-center gap-y-3">
                            <MainPageBox
                                width={350}
                                height={300}
                                file={uploadedMainPageBanner}
                                textWhenEmpty="No banner uploaded yet."
                                onClick={() => setUploadedMainPageBanner(undefined)}
                            />
                            <div className="text-[20px] font-semibold">
                                Click an image to remove
                            </div>
                        </div>
                    </div>
                </div>
                <Delimiter />
                <div className="flex flex-col items-center gap-y-10 mb-7">
                    <div className="w-full flex justify-center gap-x-20">
                        <div className="flex flex-col items-center gap-y-3">
                            <div className="text-[20px] font-semibold">Countries of origin</div>
                            <InputField type="text" isRounded placeholder="Countries" onChange={setCountryOfOrigin} />
                        </div>
                        <div className="flex flex-col items-center gap-y-3">
                            <div className="text-[20px] font-semibold">Filming locations</div>
                            <InputField type="text" isRounded placeholder="Locations" onChange={setFilmingLocation} />
                        </div>
                        <div className="flex flex-col items-center gap-y-3">
                            <div className="text-[20px] font-semibold">Production companies</div>
                            <InputField type="text" isRounded placeholder="Company names" onChange={setProductionCompanies} />
                        </div>
                    </div>
                    <div className="w-full flex justify-center gap-x-20">
                        <div className="flex flex-col items-center gap-y-3">
                            <div className="text-[20px] font-semibold">Budget</div>
                            <InputField type="text" isRounded placeholder="Budget" onChange={setBudget} />
                        </div>
                        <div className="flex flex-col items-center gap-y-3">
                            <div className="text-[20px] font-semibold">Gross worldwide</div>
                            <InputField type="text" isRounded placeholder="Gross worldwide" onChange={setGrossWorldwide} />
                        </div>
                    </div>
                </div>
                <Button width={150} height={60} fontSize={20} text="Add movie" onClick={upload} />
            </div>
        </div>
    )
}

export default page