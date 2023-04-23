import Link from 'next/link'
import React from 'react'

function SocialMediaAccount({text,color,content}) {
    
  return (
    <div className='border border-5 border-gray-500 rounded-lg p-3 relative'>
        <div className='font-[700] text-md'>
            {text}
        </div>
        <div className='text-xs pt-1 pb-12'>
            {content}
        </div>
        <center>
            <Link href="#">
            <div style={{backgroundColor:color}} className={`w-11/12 absolute bottom-0 mb-3 flex justify-center p-1 items-center text-white rounded-md`}>
                Connect {text}
            </div>
            </Link>
        </center>

    </div>
  )
}

export default SocialMediaAccount