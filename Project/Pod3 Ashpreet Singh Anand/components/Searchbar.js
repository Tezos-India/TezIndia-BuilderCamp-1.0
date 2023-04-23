import React from 'react'
import Sidebar from './Sidebar';
import { SearchIcon } from "@heroicons/react/outline";

const Searchbar=()=> {
    return (
        <div className='sticky top-0 flex items-center bg-white p-5 z-50 font-brandonRegularItalic '>
                    <SearchIcon className="h-5 z-50 text-gray-500 cursor-pointer"/>
                    <input
                        type="text"
                        className="z-25 w-full rounded-md px-11 py-1 border-solid border border-[#a2a2a2] border-spacing-5 focus:shadow-md ml-[-26px] placeholder:text-xs md:placeholder:text-lg bg-slate-100 focus:bg-white focus:font-brandonMediumItalic"
                        placeholder="Search"
                    />
        </div>
    )
}

export default Searchbar;
