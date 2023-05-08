import Link from "next/link";
import { useRouter } from 'next/router';
import Image from "next/image";
import { useState } from "react";


function SidebarMenuItem({ text, Icon, active, redirectlink, href ,setIsEvent ,setIsExpanded}) {

  // Event Button 

  const handleEventClick = () => {
    setIsExpanded((prev) => !prev);
  };
  //console.log("isExpanded, ", isExpanded)

  const router = useRouter();
  const segments = router.pathname.split('/')
  const url = '/'+segments[1];
  const isActive = url === redirectlink;

  const ButtonText = text;
  const Event = "Events";


  const isEventPage = router.pathname==="/events"
  //console.log("isEventPage", isEventPage)
  const isManageEventPage = router.pathname==="/events/manage"
  //console.log("isManageEventPage", isManageEventPage)

  const manageURL = "/events/manage"

  return (
    <div>
    
      <Link href={`${redirectlink}`}  className={` ${!isActive && "text-[#090909] font-[400] "} ${isActive && "text-white"} ` }>
        
        <div className={`rounded-md ${isActive && "bg-[#7522E6]"} flex py-2 space-x-3 mx-3 my-1 lg:my-2 font-brandonMediumItalic cursor-pointer ${!isActive &&  "hover:bg-gray-300"}`}>
          <Image src={Icon} width={50} height={50} className={`h-7 pl-3 pr-2 lg:pr-3 ${isActive && "text-white"}`} />
          {/* <div className="h-7 w-7 text-white bg-yellow-400 mx-10" >{Icon}</div> */}
              <div className="hidden md:inline">
              {text}
                </div>
        </div>
      </Link>
    </div>
    );
  }


export default SidebarMenuItem
