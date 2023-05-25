import Events from '@/components/Event/AboutEvent'
import ThreeColumnLayout from '@/components/ThreeColumnLayout'
import React from 'react'
import CoverPhoto from '@/components/Event/CoverPhoto'

function events() {
  return (
    <ThreeColumnLayout headerText={"Events-About"}>
        <CoverPhoto/>
        <Events/>

    </ThreeColumnLayout>
  )
}

export default events