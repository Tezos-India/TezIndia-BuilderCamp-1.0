import React from 'react'
import NavSettings from '@/components/NavSettings'
import Sidebar from '@/components/Sidebar'
import Searchbar from '@/components/Searchbar'
import BodyHeading from '@/components/BodyHeading'
import NotificationSettings from '@/components/NotificationSettings'
import Preview from '@/components/Preview'
import HelpCenter from '@/components/HelpCenter'

function notifications() {
  return (
    <main className="flex flex-auto h-full">
    <div className="order-1 md:basis-1/5">
      <Sidebar />
    </div>
    <div className="order-2 flex-1">
    <Searchbar/>
    <BodyHeading
    text="Settings"/>
    <NotificationSettings/>
    </div>
    <div className="order-3 basis-1/5">
    <Preview/>
    </div>
    {/* help box */}
<div className="absolute bottom-0 left-0 ml-1 mb-2">
  <HelpCenter/>
</div> 
</main>
  )
}

export default notifications