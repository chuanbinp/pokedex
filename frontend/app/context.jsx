"use client"

import { createContext, useState } from 'react';

export const SearchContext = createContext();

export const getBase64 = (file) => {
    return new Promise((resolve,reject) => {
       const reader = new FileReader();
       reader.onload = () => resolve(reader.result);
       reader.onerror = error => reject(error);
       reader.readAsDataURL(file);
    })
}

export const extractBase64 = async(base64) => {
    const blob = await fetch(base64).then((res) => res.blob())
    const file = new File([blob], "name");
    return file
}

export function Context({children}){
    const [searchQuery, setSearchQuery] = useState();

    return (
        <SearchContext.Provider value={{searchQuery, setSearchQuery}}>
            {children}
        </SearchContext.Provider>
    ); 
}


