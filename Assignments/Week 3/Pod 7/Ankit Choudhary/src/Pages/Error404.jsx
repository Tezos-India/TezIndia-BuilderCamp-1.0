import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CgArrowLongLeft } from 'react-icons/cg';

import Err404 from "../Assets/Err404.svg";
import Button from '../Components/Button';

export default function Error404() {

    useEffect(() => {
        document.body.style.overflowY = "scroll";
    }, [])

    return (
        <div className="w-screen h-calc(100vh-20px) max-h-[calc(100vh-20px)] flex flex-col justify-center items-center">

            <img src={Err404} className="h-[calc((100vh-20px)*3/4)] w-full" />

            <p className='text-primaryBlack/70 text-2xl font-medium mt-3 lg:w-1/2 text-center mb-5'>Looks like the page you are looking for doesn't exists or is shifted to a new address</p>

            <Link to="/"><Button varient="dark" gradient={false} weight={"bold"}><CgArrowLongLeft className='mr-1 text-xl text-white/80' /> Go Back</Button></Link>

        </div>
    )
}
