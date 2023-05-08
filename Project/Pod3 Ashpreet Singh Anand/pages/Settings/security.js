
import BodyHeading from '@/components/BodyHeading'
import HelpCenter from '@/components/HelpCenter'
import Preview from '@/components/Preview'
import Searchbar from '@/components/Searchbar'
import SecuritySettings from '@/components/SecuritySettings'
import Sidebar from '@/components/Sidebar'
import React from 'react'
import NavSettings from '@/components/NavSettings'

function security() {
  return (
    <main className="flex flex-auto h-full">
          <div className="order-1 md:basis-1/5">
            <Sidebar />
          </div>
          <div className="order-2 flex-1">
          <Searchbar/>
          <BodyHeading
          text="Settings"/>
          <SecuritySettings/>
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

export default security