import React from "react";
import { BsTwitter, BsGithub } from "react-icons/bs";

import Grid from "../../Assets/Grid.svg";
import Ankit from "../../Assets/Ankit.png";
import Atharv from "../../Assets/Atharv.png";
import Mridul from "../../Assets/Mridul.png";

const Team = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-[50px] w-full z-[inherit]">
            <h2 className="font-mammoth text-primaryBlack font-medium text-3xl text-center">
                Our Team
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-between w-full max-w-[1000px] z-[inherit]">
                <ProfileCard src={Ankit} name="Ankit Choudhary" roles="Blockchain Developer" github="ankit7241" twitter="ankit7241" />
                <ProfileCard src={Atharv} name="Atharv Varshney" roles="Front-End Developer" github="atharv777" twitter="Atharvvarshney7" />
                <ProfileCard src={Mridul} name="Mridul Gupta" roles="Front-End Developer" github="MridulGupta007" twitter="" />
            </div>

        </div>
    );
};

export default Team;

const ProfileCard = ({ name, roles, src, github, twitter }) => {
    return (
        <div
            style={{ "--IMG-URL": `url('${Grid}')` } as React.CSSProperties}
            className="cursor-default flex flex-col items-center justify-between py-7 w-[300px] h-[300px] bg-primaryBlack border-[1.5px] border-white/1 rounded-2xl z-[inherit] my-5 md:m-0"
        >
            <div className=" h-24 w-24 border-4 border-white/20 rounded-full relative team_card">
                <img className=" z-[3] w-full h-full rounded-full" src={src} alt="PFP" />
            </div>
            <div className="flex flex-col items-center gap-[5px]">
                <h2 className="text-[20px] font-semibold text-white">{name}</h2>
                <p className="text-[13px] text-white/25">{roles}</p>
            </div>
            <div className="flex justify-center items-center gap-[30px]">
                <a href={`https://github.com/${github}/`} >
                    <BsGithub size="25px" className="text-white transition hover:text-white/50" />
                </a>
                <a href={`https://twitter.com/${twitter}/`}>
                    <BsTwitter size="25px" className="text-white transition hover:text-blue-400" />
                </a>
            </div>
        </div>
    );
};