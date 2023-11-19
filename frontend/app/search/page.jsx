"use client"

import { useContext, useEffect, useState, useRef } from 'react';
import { SearchContext } from '../context';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { PhotoIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import logo from "@/public/logo.svg";
import { useRouter } from 'next/navigation';
import PokemonCard from './pokemon-card';
import LoadingPokemonCard from './loading-pokemon-card';
import { getBase64, extractBase64 } from '../context';

export default function Search() {
    const searchInputRef = useRef()
    const searchImageRef = useRef()
    const router = useRouter()
    const [results, setResults] = useState([])
    const [loaded, setLoaded] = useState(false)

    let { searchQuery, setSearchQuery } = useContext(SearchContext)

    const updateSearchQueryFromText = (e) => {
        e.target[0].blur()
        e.preventDefault()
        localStorage.setItem('searchQuery', searchInputRef.current.value)
        setSearchQuery(searchInputRef.current.value)
        router.push("/search")
    }

    const updateSearchQueryFromImage = (e) => {
        getBase64(searchImageRef.current.files[0]).then(base64 => {
            localStorage.setItem('searchQuery', base64)
        });
        setSearchQuery(searchImageRef.current.files[0])
        router.push("/search")
    }


    useEffect(() => {
        
        const fetchDataFromText = async(input) => {
            const searchText = input.trim()
            const response = await fetch(`http://localhost:5000/api/pokedex?text=${searchText}`)
            const json = await response.json()
            return json
        }

        const fetchDataFromImage = async(input) => {
            const formData = new FormData()
            formData.append("file", input)
            const response = await fetch(`http://localhost:5000/api/pokedex`, {
                method: "POST",
                body: formData
            })
            const json = await response.json()
            return json
        }

        setLoaded(false)
        
        if(searchQuery==null){
            let localStorageSearchQuery = localStorage.getItem('searchQuery')
            if (localStorageSearchQuery.startsWith("data:image")){
                extractBase64(localStorageSearchQuery).then((res)=>{
                    setSearchQuery(res)
                })
            }
            else if (localStorageSearchQuery){
                setSearchQuery(localStorageSearchQuery)
            }
        }

        if(searchQuery instanceof File || typeof searchQuery === "object"){
            console.log("file")
            fetchDataFromImage(searchQuery).then((res) => {
                setResults(res)
                setLoaded(true)
            })
        }
        else if (typeof searchQuery === 'string'){
            console.log("text")
            fetchDataFromText(searchQuery).then((res) => {
                setResults(res)
                setLoaded(true)
            })
        }
        else{
            console.log("nope")
        }
      }, [searchQuery])


    return (
        <main className="w-full h-full min-h-screen bg-[linear-gradient(to_right_bottom,rgba(15,12,41,0.7),rgba(48,43,99,0.7)),url('/bg.jpg')] bg-cover bg-center">
            <header className="flex items-center content-center w-full px-0 pb-4 pt-6 border-b-2 border-gray-200 bg-slate-100 sm:px-4">
                <Image
                    src={logo} 
                    alt="Pokedex image"
                    height={40}
                    onClick={() => router.push("/")}
                    className="cursor-pointer mx-4"
                />
                <form className="flex flex-row rounded-full border border-slate-100 px-3 py-2 mx-1 items-center flex-grow shadow-lg max-w-2xl sm:mx-6
                " onSubmit={updateSearchQueryFromText}>
                    <MagnifyingGlassIcon className="h-6 mr-3 text-gray-500 flex-shrink-0" />
                    <input type="text" className="focus:outline-none flex-grow text-slate-800 bg-inherit w-full" placeholder="Pokemon name" ref={searchInputRef}/>
                    <label htmlFor="file-input" className="bg-red-700 rounded-full h-7 w-7 flex-shrink-0 flex justify-center items-center cursor-pointer">
                    <PhotoIcon className="h-4 w-4 text-white"/>
                    </label>
                    <input id="file-input" type="file" accept="image/*" className="hidden" onChange={updateSearchQueryFromImage} ref={searchImageRef}/>
                </form>

            </header>
            <div className="w-100vw h-100vh p-4">
                <div className="w-full gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {
                    !loaded?
                    //loading
                    [...Array(5).keys()].map((result, i) => (
                        <LoadingPokemonCard key={i} />
                    ))
                    :loaded && results && results.length>0? 
                    //all ready
                        results.map((result, i) => (
                            <PokemonCard specs={result} key={i} />
                        )) 
                    : <div className="p-4 text-slate-200 italic text-xl">
                        <p>No results found.</p>
                    </div>
                }
                </div>
            </div>
        </main>
    )
}