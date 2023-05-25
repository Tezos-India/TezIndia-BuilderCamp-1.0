import React from "react";

const HelpCenter = () => {
  return (
    <>
    <div className="font-[Inter] hidden md:inline fixed bottom-0 left-0 mb-2">
      <div className="bg-[#7522E6] mx-6 rounded-md lg:rounded-xl  px-2  text-center max-w-[78%]">
        <div className="left-[35%] lg:left-[40%] bottom-[90%] text-[white] bg-[#7522E6] w-[50px] h-[50px] rounded-full border-2 text-center absolute hidden md:inline">
          <div className="text-2xl absolute left-[38%] top-[18%] border-[#fff] ">
            ?
          </div>
        </div>
        <div className="pt-5 text-white text-center text-sm md:text-lg">
          Help Center
          <br />
        </div>
        <div className=" text-white pt-[-10px] hidden lg:inline">
          Having difficulty in Ticketing. <br />
          <div className="hidden xl:inline">
            Please contact us for further inquiries <br />
          </div>
        </div>
        <div className="py-1">
          <button className="px-2 text-center bg-white text-[#7522E6] rounded-md mb-[10%] w-[88%] text-xs md:text-lg">
            Go to Help Center
          </button>
        </div>
      </div>
    </div>

    <div className="md:hidden">
    <div className="fixed bottom-0 left-0 mb-4 ml-4">
      <div className="w-12 h-12 rounded-full text-white bg-[#7522E6] flex items-center justify-center">
      <svg fill="white" className="text-white" xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 96 960 960" width="48"><path d="M431 726q1-72 16.5-105t58.5-72q42-38 64.5-70.5T593 409q0-45-30-75t-84-30q-52 0-80 29.5T358 395l-84-37q22-59 74.5-100.5T479 216q100 0 154 55.5T687 405q0 48-20.5 87T601 574q-49 47-59 72t-11 80H431Zm48 250q-29 0-49.5-20.5T409 906q0-29 20.5-49.5T479 836q29 0 49.5 20.5T549 906q0 29-20.5 49.5T479 976Z"/></svg>

      </div>
    </div>
    </div>
    </>
  );
};

export default HelpCenter;

{
  /* 2nd help small */
}
