"use client"
import Image from 'next/image'
import logo from "@/public/logo.svg";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { PhotoIcon } from '@heroicons/react/24/solid'
import { useContext, useRef } from 'react';
import { SearchContext } from './context';
import { useRouter } from 'next/navigation';
import { getBase64 } from './context';

export default function Home() {
  const searchInputRef = useRef()
  const searchImageRef = useRef()
  const router = useRouter()
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

  return (
    <main className="bg-slate-100 w-screen h-screen">
      <form className="flex flex-col items-center pt-44 h-full w-full" onSubmit={updateSearchQueryFromText}>
          <div className="flex items-center w-3/5 sm:max-w-md">
            <Image 
              src={logo}
              alt="Pokedex image"
            />
          </div>
          <div className="flex flex-row rounded-full border border-slate-300 px-3 py-2 mt-8 items-center w-4/5 sm:max-w-lg">
            <MagnifyingGlassIcon className="h-6 mr-3 text-gray-500 flex-shrink-0" />
            <input type="text" className="focus:outline-none flex-grow text-slate-800 bg-inherit w-full" placeholder="Name" ref={searchInputRef}/>
            <label htmlFor="file-input" className="bg-red-700 flex-shrink-0 rounded-full h-7 w-7 flex justify-center items-center cursor-pointer">
              <PhotoIcon className="h-4 text-white"/>
            </label>
            <input id="file-input" type="file" accept="image/*" className="hidden" onChange={updateSearchQueryFromImage} ref={searchImageRef}/>
          </div>
          <div>
            <button className="text-slate-500 font-semibold font-sm px-4 py-2 rounded-lg ring-gray-400 ring-1 focus:outline-none hover:ring-2 mt-4">
              Gonna search 'em all
            </button>
          </div>
      </form>
    </main>
  )
}

