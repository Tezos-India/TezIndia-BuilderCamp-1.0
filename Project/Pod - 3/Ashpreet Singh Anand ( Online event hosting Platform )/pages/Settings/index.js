import React from 'react'
import Sidebar from '@/components/Sidebar'
import BodyHeading from '@/components/BodyHeading'
import Preview from '@/components/Preview'
import Searchbar from '@/components/Searchbar'
import HelpCenter from '@/components/HelpCenter'
import ThreeColumnLayout from '@/components/ThreeColumnLayout'
import Accounts from '@/components/Accounts'

function index() {
  return (
    <ThreeColumnLayout headerText={"Settings"}>
      <Accounts/>
    </ThreeColumnLayout>
  )
}

export default index