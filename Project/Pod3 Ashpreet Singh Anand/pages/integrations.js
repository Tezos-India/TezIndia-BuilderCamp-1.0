import React from 'react'
import Integration from '@/components/Integration'
import Searchbar from '@/components/Searchbar'
import BodyHeading from '@/components/BodyHeading'
import Preview from '@/components/Preview'
import Sidebar from '@/components/Sidebar'
import HelpCenter from '@/components/HelpCenter'
import ThreeColumnLayout from '@/components/ThreeColumnLayout'

function integrations() {
  return (
      <ThreeColumnLayout headerText={"Integrations"}>
        <Integration/>
      </ThreeColumnLayout>
  )
}

export default integrations