import Link from 'next/link'
import React from 'react'

function Description() {
  return (
    <div className='rounded-lg bg-white mx-6 px-4 py-2'>
        {/* short description */}
        <div className='mb-1'>
            <p className='font-[700] py-1'>Write a short description about your event.</p>
            <textarea name="" id="" cols="50" rows="2" className='border-2 rounded-md w-full p-2'></textarea>
        </div>
        
        {/* long description */}
        <div className='mb-1'>
            <p className='font-[700] py-1'>Write a long description about your event.</p>
            <textarea name="" id="" cols="30" rows="5" className='border-2 rounded-md w-full p-2'></textarea>
        </div>

        {/* add image */}
        <div className='mb-1'>
            <p className='font-[700] '>Add image/video to your event page</p>
            <p className='font-[700] py-1'>Ticket Image</p>

            <p className='pb-1'>Add a logo/Image for the ticket of your event's NFT.</p>
            <input type="image" src="" alt="" className='border border-dashed border-gray-rg800  bg-gray-100 w-1/4 aspect-video rounded-md' />
        </div>

        {/* back and next */}
        <div className='flex justify-end space-x-3'>
            <div>
                <button className='bg-[#a2a2a2] rounded-md text-white p-1 px-2'>Back</button>
            </div>
            <Link href="/events/preview">
            <div>
                <button className='bg-[#7522E6] rounded-md text-white p-1 px-2'>Preview</button>
            </div>
            </Link>
        </div>
    </div>
  )
}

export default Description