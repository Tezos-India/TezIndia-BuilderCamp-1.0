import Description from '@/components/Event/Description'
import ThreeColumnLayout from '@/components/ThreeColumnLayout'
import React from 'react'

function description() {
  return (
    <ThreeColumnLayout headerText={"Events-description"}>
        <Description/>
    </ThreeColumnLayout>
  )
}

export default description