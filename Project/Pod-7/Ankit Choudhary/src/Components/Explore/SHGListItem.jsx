import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SHGListItem({ ShgName, ShgDesc, members, established, slug }) {

    const [formattedDate, setFormattedDate] = useState("--");

    useEffect(() => {
        const DateObj = new Date(parseInt(established));

        const formatedEst = DateObj.toLocaleString("en-us", {
            month: "short",
            year: "numeric",
        });
        setFormattedDate(formatedEst);
    }, [established]);

    return (
        <Link to={`/explore?join-shg=${slug}`} replace={true}>
            <div
                title="Click to join"
                className="flex flex-col md:flex-row items-center py-10 px-30 bg-primaryBlack rounded-20 gap-[20px] cursor-pointer hover:scale-[1.02] transition"
            >
                <div className="flex flex-col md:flex-row items-center gap-[12.5px] w-full">
                    <h3 className="font-semibold text-xl text-white whitespace-nowrap w-max">
                        {ShgName}
                    </h3>

                    <p className="hidden md:block font-medium text-2xl text-white/50 text-center w-[15px]">
                        -
                    </p>

                    <p className="font-medium text-sm leading-[22.5px] text-white/50 w-full h-[45px] line-clamp-2 text-ellipsis">
                        {ShgDesc}
                    </p>
                </div>

                <div className="flex flex-row items-center justify-center gap-[10px] w-[275px] min-w-[240px]">
                    <p className="font-medium text-base lg:text-lg text-white whitespace-nowrap w-max">
                        {members.length} Members
                    </p>

                    <p className="font-medium text-base lg:text-lg text-white/50 w-[25px] lg:w-[30px] text-center">
                        •
                    </p>

                    <p className="font-medium text-base lg:text-lg text-white whitespace-nowrap w-max">
                        {formattedDate}
                    </p>
                </div>
            </div>
        </Link>
    );
}
