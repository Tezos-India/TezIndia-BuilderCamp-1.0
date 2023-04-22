import React from "react";
import { Link } from "react-router-dom";

import Button from '../Button';
import Arrow from "../../Assets/Arrow.svg";

import AOS from 'aos';
AOS.init();

const HeroSection = () => {

    return (

        <div 
            data-aos="fade-up" 
            data-aos-anchor-placement="top-center" 
            data-aos-duration={1000} 
            data-aos-delay={200} 
            className='bg-primaryBlack flex justify-center items-center py-[50px] h-[calc(var(--hero-section-height)-200px)] md:h-[var(--hero-section-height)] w-full rounded-30 z-[inherit]'
        >
            <div
                style={{ "--IMG-URL": `url('${Arrow}')` } as React.CSSProperties}
                className={`w-full max-w-[1300px] h-full max-h-[700px] flex flex-col justify-center items-center hero_section relative`}>    

                <div className='hidden md:flex flex-row justify-between items-center w-full h-1/4 px-10 md:px-50'>
                    <p
                        data-aos="fade-down"
                        data-aos-anchor-placement="top-center"
                        data-aos-duration={500}
                        data-aos-delay={1000}
                        className='font-normal text-[17px] lg:text-[25px] leading-[30px] lg:leading-[38px] text-center w-full md:w-[250px] lg:w-[310px] text-white'
                    >
                        Blockchain-based safe & secure SHGs
                    </p>
                    <p
                        data-aos="fade-down"
                        data-aos-anchor-placement="top-center"
                        data-aos-duration={500}
                        data-aos-delay={1200}
                        className='font-normal text-[17px] lg:text-[25px] leading-[30px] lg:leading-[38px] text-center w-full md:w-[250px] lg:w-[310px] text-white'
                    >
                        Lend tokens without any collateral
                    </p>
                </div>

                <div className='flex flex-col justify-center items-center gap-[10px] w-full h-full'>
                    <p className='font-bold text-[13px] leading-4 text-white/20 tracking-wider'>INTRODUCING</p>
                    <h1
                        data-aos="fade-down"
                        data-aos-anchor-placement="bottom-center"
                        data-aos-offset={-2000}
                        data-aos-duration={300}
                        data-aos-delay={700}
                        className='gotu text-[70px] lg:text-[80px] leading-[130px] text-center text-white'>स्वयंसेवक</h1>
                </div>

                <div className='hidden md:flex flex-row justify-between items-center w-full h-1/4 px-10 md:px-50'>
                    <p
                        data-aos="fade-down"
                        data-aos-anchor-placement="bootom-center"
                        data-aos-duration={500}
                        data-aos-delay={1400}
                        className='font-normal text-[17px] lg:text-[25px] leading-[30px] lg:leading-[38px] text-center w-full md:w-[250px] lg:w-[310px] text-white'
                    >
                        Deposit tokens each month in the SHG
                    </p>

                    <div className='md:flex flex-col lg:flex-row items-center justify-center p-0 gap-[20px] hidden'>

                        <Link to="/explore?add-shg=true" replace={true} className="z-20">
                            <Button varient="light" gradient={true} weight="bold">Create your own SHG</Button>
                            </Link>
                        <Link to="/dashboard" replace={true} className="z-20">
                            <Button varient="light" gradient={false} weight="semibold">Dashboard</Button>
                        </Link>

                    </div>

                    <p
                        data-aos="fade-down"
                        data-aos-anchor-placement="bootom-center"
                        data-aos-duration={500}
                        data-aos-delay={1600}
                        className='font-normal text-[17px] lg:text-[25px] leading-[30px] lg:leading-[38px] text-center w-full md:w-[250px] lg:w-[310px] text-white'
                    >
                        Democratically vote for every decision within the SHG
                    </p>
                </div>

                <div className='md:hidden flex-row items-center justify-center p-0 gap-[20px] flex'>

                        <Button varient="light" gradient={true} weight="bold">Create your own SHG</Button>
                        <Button varient="light" gradient={false} weight="semibold">Dashboard</Button>

                    </div>

            </div>
        </div>
    )
};

export default HeroSection;