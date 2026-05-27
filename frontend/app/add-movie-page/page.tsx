"use client"

import Button from '@/components/buttons/Button';
import InputFilesField from '@/components/buttons/InputFilesField';
import Footer from '@/components/Footer';
import ComboBox from '@/components/interractibles/ComboBox';
import InputField from '@/components/interractibles/InputField'
import ListBox from '@/components/interractibles/ListBox';
import Delimiter from '@/components/static/Delimiter'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import React from 'react'

interface SelectData {
    actors: Array<string>;
    categories: Array<string>;
    backdrops: Array<string>;
    posters: Array<string>;
    galleryImages: Array<string>;
}

const selectDataTest: SelectData = {
    actors: [
        "Leonardo DiCaprio",
        "Christian Bale",
        "Anne Hathaway",
        "Morgan Freeman",
        "Tom Holland",
        "Zendaya",
        "Timothee Chalamet",
        "Matt Damon",
        "Sandra Bullock",
        "Keanu Reaves",
        "Laurence Fishburne",
        "Brad Pitt",
        "Robert Downey Jr.",
        "Chris Hemsworth",
        "Chris Evans",
        "Tom Hiddleston",
        "Chris Pratt",
        "Cillian Murphy",
        "Emily Blunt"
    ],
    categories: [
        "Action",
        "Adventure",
        "Animation",
        "Comedy",
        "Crime",
        "Documentary",
        "Drama",
        "Family",
        "Fantasy",
        "Historical",
        "Horror",
        "Musical",
        "Romance",
        "Science Fiction",
        "Sports",
        "Thriller",
        "Western"
    ],
    backdrops: [

    ],
    posters: [

    ],
    galleryImages: [

    ]
}

const selectData = selectDataTest;

const page = () => {
    const [selectedActors, setSelectedActors] = useState<{ name: string, role: string }[]>([]);
    const [currentActor, setCurrentActor] = useState("");
    const [currentRole, setCurrentRole] = useState("");

    const addActor = () => {
        if (currentActor && currentRole) {
            setSelectedActors([...selectedActors, { name: currentActor, role: currentRole }]);
            setCurrentActor("");
            setCurrentRole("");
        }
    }

    const removeActor = (indexToRemove: number) => {
        setSelectedActors(selectedActors.filter((_, index) => index !== indexToRemove));
    }

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [currentCategory, setCurrentCategory] = useState("");

    const addCategory = () => {
        if (currentCategory) {
            setSelectedCategories([...selectedCategories, currentCategory]);
            setCurrentCategory("");
        }
    }

    const removeCategory = (indexToRemove: number) => {
        setSelectedCategories(selectedCategories.filter((_, index) => index !== indexToRemove));
    }

    const [uploadedBackdrops, setUploadedBackdrops] = useState<string[]>([]);
    const [uploadedPosters, setUploadedPosters] = useState<string[]>([]);
    const [uploadedGalleryImages, setUploadedGalleryImages] = useState<string[]>([]);

    const handleFiles = (e: ChangeEvent<HTMLInputElement>, setter: Dispatch<SetStateAction<string[]>>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files).map(file => file.name);
            setter(prev => [...prev, ...newFiles])
            e.target.value = "";
        }
    }

    const removeFile = (setter: Dispatch<SetStateAction<string[]>>, indexToRemove: number) => {
        setter(prevArray => prevArray.filter((_, index) => index !== indexToRemove));
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
                            <InputField type="text" isRounded placeholder="Title" />
                        </div>
                        <div className="flex flex-col gap-y-3">
                            <div>Release date</div>
                            <InputField type="date" isRounded />
                        </div>
                        <div className="flex flex-col gap-y-3">
                            <div>Duration</div>
                            <InputField type="text" isRounded placeholder="Duration (in minutes)" />
                        </div>
                        <div className="flex flex-col gap-y-3">
                            <div>Director</div>
                            <InputField type="text" isRounded placeholder="Full name" />
                        </div>
                        <div className="flex flex-col gap-y-3">
                            <div>Writer</div>
                            <InputField type="text" isRounded placeholder="Full name" />
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
                            />
                        </div>
                        <div className="flex justify-center gap-x-10 font-semibold">
                            <div className="flex flex-col items-center gap-y-3">
                                <div className="text-[20px] font-semibold">Trailer link</div>
                                <InputField type="text" isRounded placeholder="Link" />
                            </div>
                            <div className="flex flex-col items-center gap-y-3">
                                <div className="text-[20px] font-semibold">Streaming link</div>
                                <InputField type="text" isRounded placeholder="Link" />
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
                            <ComboBox
                                label="Category"
                                value={currentCategory}
                                onChange={setCurrentCategory}
                                defaultText="Select a category"
                                array={selectData.categories}
                            />
                            <Button
                                text="Add category"
                                width={150}
                                onClick={addCategory}
                            />
                        </div>
                        {/*Category select list box*/}
                        <div className="flex flex-col items-center gap-y-3">
                            <ListBox
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
                    <Delimiter width={"100%"} isHorizontal />
                    {/*Actor select*/}
                    <div className='flex justify-center items-center gap-x-10'>
                        {/*Actor select fields + Button*/}
                        <div className="flex flex-col justify-center items-center gap-y-10 font-semibold">
                            <ComboBox
                                label="Actor"
                                value={currentActor}
                                onChange={setCurrentActor}
                                defaultText="Select an actor"
                                array={selectData.actors}
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
                                                        <div><strong>{actor.name}</strong> as {actor.role}</div>
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
                                array={uploadedBackdrops}
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
                                array={uploadedPosters}
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
                                array={uploadedGalleryImages}
                                textWhenEmpty="No gallery images uploaded yet."
                                onClick={(index) => removeFile(setUploadedGalleryImages, index)}
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
                            <InputField type="text" isRounded placeholder="Countries" />
                        </div>
                        <div className="flex flex-col items-center gap-y-3">
                            <div className="text-[20px] font-semibold">Filming locations</div>
                            <InputField type="text" isRounded placeholder="Locations" />
                        </div>
                        <div className="flex flex-col items-center gap-y-3">
                            <div className="text-[20px] font-semibold">Production companies</div>
                            <InputField type="text" isRounded placeholder="Company names" />
                        </div>
                    </div>
                    <div className="w-full flex justify-center gap-x-20">
                        <div className="flex flex-col items-center gap-y-3">
                            <div className="text-[20px] font-semibold">Budget</div>
                            <InputField type="text" isRounded placeholder="Budget" />
                        </div>
                        <div className="flex flex-col items-center gap-y-3">
                            <div className="text-[20px] font-semibold">Gross worldwide</div>
                            <InputField type="text" isRounded placeholder="Gross worldwide" />
                        </div>
                    </div>
                </div>
                <a href="/main-page">
                    <Button width={150} height={60} fontSize={20} text="Add movie" />
                </a>
            </div>
            <Footer />
        </div>
    )
}

export default page