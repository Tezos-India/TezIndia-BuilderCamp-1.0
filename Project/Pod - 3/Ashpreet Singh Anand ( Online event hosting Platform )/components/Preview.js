import React from 'react'
import ImagePicker from './ImagePicker'


function Preview() {
  return (
    <div className='bg-white font-brandonMediumItalic h-full flex flex-auto p-5 text-xs sm:text-sm md:text-md lg:text-lg' >
        <div className='flex flex-auto justify-between'>
            <div className='flex flex-row'>
                <div>
                    <button className='text-black mr-2'>
                        Create Event
                    </button>
                </div>
                <ImagePicker/>
            </div>
            <div>
                <label htmlFor="name">Ashpreet Singh Anand</label>
                <select name="options" id="options" className='selectHide optionCSS'>
                <option value="Lo">Home</option>
                <option value="Logout">Logout</option>
                </select>
            </div>
        </div>
    </div>
  )
}

export default Preview