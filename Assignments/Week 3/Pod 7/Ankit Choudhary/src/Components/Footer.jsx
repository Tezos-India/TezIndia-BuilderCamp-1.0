import React from 'react'
import { NavLink } from 'react-router-dom'

import Logo from "../Assets/LogoWhiteFilled.svg";

const Footer = () => {
    return (
        <div className='flex flex-col gap-[10px] md:gap-0 md:flex-row justify-between items-center py-10 px-30 mx-[20px] mb-[20px] mt-[50px] border-primaryWidth border-white/10 rounded-10 bg-primaryBlack'>
            <NavLink to="/" replace={true}>
                <div className="flex flex-row items-center justify-center gap-[15px]">
                    <img src={Logo} className="h-[40px] w-[40px] rounded-full" alt='Logo' />
                    <h1 className="text-white font-normal text-[25px] leading-[42px] text-center gotu">स्वयंसेवक</h1>
                </div>
            </NavLink>
            <h4 className='font-medium text-xs text-white/75 cursor-default'>Crafted with <span title='Love'>❤️</span> & <span title='Coffee'>☕</span> | Team Code Chain</h4>
            <h4 className='font-medium text-xs text-white/75 cursor-default'>Web3 INIT 2023</h4>
        </div>
    )
}

export default Footer;