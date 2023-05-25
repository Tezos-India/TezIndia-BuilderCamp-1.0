import React from 'react'
import ImagePicker from './ImagePicker';


const BannerModal = ({  setOpenModal  })=> {
    return (
      <div>
         {/* <div className='cursor-pointer' onClick={()=> {setOpenModal(false)}}>Back</div> */}
         <div className='px-2 pb-3 bg-[#e6e1e1] py-2 rounded-lg'>
            <div className='flex flex-row gap-4'>
                <div className='w-[50rem]  border-2 border-[#a2a2a2] bg-white rounded-lg'></div>
                <label htmlFor="filePicker" className='border-black border-2 px-4 py-2 rounded-lg'>
                    Upload
                </label>
                <input type="file" id="filePicker" className="hidden w-full h-full" accept="image/*" />

                {/* <div className='cursor-pointer' onClick={()=> {setOpenModal(false)}}>Back</div> */}
            </div>
            <div>Gradient</div>
            <div className='grid grid-cols-5 gap-3 pt-2 pr-2'>
                <div className='bg-[#a2a2a2] h-[5.5rem] w-[11rem] rounded-xl'></div>
                <div className='bg-[#a2a2a2] h-[5.5rem] w-[11rem] rounded-xl'></div>
                <div className='bg-[#a2a2a2] h-[5.5rem] w-[11rem] rounded-xl'></div>
                <div className='bg-[#a2a2a2] h-[5.5rem] w-[11rem] rounded-xl'></div>
                <div className='bg-[#a2a2a2] h-[5.5rem] w-[11rem] rounded-xl'></div>
                <div className='bg-[#a2a2a2] h-[5.5rem] w-[11rem] rounded-xl'></div>
                <div className='bg-[#a2a2a2] h-[5.5rem] w-[11rem] rounded-xl'></div>
                <div className='bg-[#a2a2a2] h-[5.5rem] w-[11rem] rounded-xl'></div>
                <div className='bg-[#a2a2a2] h-[5.5rem] w-[11rem] rounded-xl'></div>
                <div className='bg-[#a2a2a2] h-[5.5rem] w-[11rem] rounded-xl'></div>
                <div className='bg-[#a2a2a2] h-[5.5rem] w-[11rem] rounded-xl'></div>
                <div className='bg-[#a2a2a2] h-[5.5rem] w-[11rem] rounded-xl'></div>
                <div className='bg-[#a2a2a2] h-[5.5rem] w-[11rem] rounded-xl'></div>
                <div className='bg-[#a2a2a2] h-[5.5rem] w-[11rem] rounded-xl'></div>
            </div>
         </div>
      </div>
       
      );
}

export default BannerModal

