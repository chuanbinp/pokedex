import { UserPlusIcon } from '@heroicons/react/24/outline'

export default function Footer() {
    return (
        <div className="fixed bottom-0 left-0 w-screen bg-gray-400 px-1 sm:px-4 py-2 shadow flex items-center justify-between">
            <div className="text-xs text-white sm:text-sm">
                © 2023 Pokedex Image Search - Chuan Bin
            </div>
            <div className="flex space-x-5">
                <a href="https://www.linkedin.com/in/chuanbinphoe/" 
                className="text-white text-xs sm:text-sm hover:text-gray-200 flex gap-x-1 items-center">
                    <UserPlusIcon className="h-4 w-4 sm:h-5 sm:w-5 "/>
                    <div className="text-center"> Connect with me</div>
                </a>
            </div>
        </div>
    )
}