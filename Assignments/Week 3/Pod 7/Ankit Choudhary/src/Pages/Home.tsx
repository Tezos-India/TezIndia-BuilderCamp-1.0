import React, {useEffect} from 'react'

import GradientCirlceLeft from "../Assets/GradientCirlceLeft.svg";
import GradientCirlceRight from "../Assets/GradientCirlceRight.svg";

import HeroSection from '../Components/Home/HeroSection.tsx';
import Content from '../Components/Home/Content';
import Team from '../Components/Home/Team.tsx';

export default function Home() {

    useEffect(() => {
        document.body.style.overflowY = "scroll";
    }, [])
    

    return (
        <div 
        style={{"--IMG-URL-left": `url('${GradientCirlceLeft}')`, "--IMG-URL-right": `url('${GradientCirlceRight}')`} as React.CSSProperties} 
        className='flex flex-col justify-center items-center w-full h-full flex-1 px-20 gap-[70px] home z-[2]'>
            <HeroSection />
            <Content />
            <Team />
        </div>
    )
}
