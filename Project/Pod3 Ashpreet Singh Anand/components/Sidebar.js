import SidebarMenuItem from "./SidebarMenuItem";
import { useState } from "react";

function Sidebar() {
  
  return (
    <div className= "flex flex-auto flex-col h-full bg-white overflow-y-auto font-brandonBlack">
      {/* Heading queque*/}
      <div className="text-[#0C0B0B] pt-3.5 ml-[11.5%] font-[400] text-sm md:text-2xl lg:text-4xl">
        <h1>Array</h1>
      </div>

       {/* Menu items */}
      <div className="flex flex-col gap-0 h-full py-8">
       <SidebarMenuItem
          text="Home"
          Icon="Icons/Icon-material-home.svg"
          href="/"
          redirectlink={"/"}
        />
        <SidebarMenuItem
          text="Analytics"
          Icon= "Icons/data-analytics.svg"
          href="Home" 
          redirectlink={"/analytics"}
        />
       
       <div  >
           <SidebarMenuItem
            text=" Create Events"
            Icon="/Icons/Icon-material-event.svg"
            href="Home"
            redirectlink={"/events"}
          /> 
          <SidebarMenuItem
            text="Manage Events"
            Icon="/Icons/Icon-material-event.svg"
            href="Home"
            redirectlink={"/events/manage"}
          /> 
       </div> 

          <SidebarMenuItem text="Email" 
          Icon="Icons/Icon-material-email.svg" 
          hasProgressBar />
          
          <SidebarMenuItem text="Integration" 
          Icon="Icons/wedding-rings.svg"
          redirectlink={"/integrations"} href="/integrations" />
          
          <SidebarMenuItem text="Settings" 
          Icon="Icons/settings.svg" 
          redirectlink={"/Settings"} href="/Settings"/>
          
          <SidebarMenuItem text="Logout" 
          Icon="Icons/logout.svg"
          />
      </div> 
    </div>

  );
}

export default Sidebar;
