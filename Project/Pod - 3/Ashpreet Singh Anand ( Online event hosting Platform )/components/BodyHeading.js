import React from "react";
import StepProgressBar from "./StepProgressBar";
import Router, { useRouter } from "next/router";

const BodyHeading = ({text, hasButton, hasProgressBar}) => {
  const router = useRouter();
  
  const segments = router.pathname.split('/')
  
  const url = '/'+segments[1];
  
  const isEventPage = url === '/events';
  const isHomePage = url ==='/'


  return (

    <div className="bg-white flex flex-col md:flex-row px-5 py-3  my-4 mx-5 items-center justify-between rounded-lg font-brandonBoldItalic">
      <div className="text-[#0A0909] font-[700] text-sm md:text-lg text-center">{text}</div>
      <div className="">
        {
          isHomePage &&(

            <button className= "flex items-center bg-[#7522E6] rounded-md px-2 py-1 text-white text-xs lg:text-lg ml-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5 md:h-6 md:w-6 md:inline"
                    >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                &nbsp;Create Event
            </button> 
          
        )
      }
      </div>
          {isEventPage ?(
          <StepProgressBar/>    
          ):(<p className="hidden"></p>)}
     
    </div>
  );

};
export default BodyHeading;
