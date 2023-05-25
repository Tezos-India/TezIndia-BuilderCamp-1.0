import Link from 'next/link'
import React, { useState } from 'react'

function Events() {
  const [whereEvent, setWhereEvent] = useState('zoom')
  const [whenEvent, setWhenEvent] = useState('single')

  return (
    <form className='bg-white mx-6 p-4 rounded-lg mb-10'>
      <div className='mb-2'>
        <p className='font-[700]'>Event Name</p>
        <input type="text" className= 'p-3 text-xl w-10/12 border-b-2 border-gray-400' placeholder='My Own Show' />
      </div>

      <div className=''>
        <div className='flex space-x-[20%]'>
          <div className='my-2 flex flex-col'>
            <p className='font-[700] pb-1'>Where is the event taking place?</p>

            <div className=' flex border-2 border-[#a2a2a2] rounded-lg'>

              <div onClick={()=> setWhereEvent('zoom')} className={`w-[33%] cursor-pointer  p-1  border-2 ${ whereEvent === "zoom"? "border-white bg-[#a2a2a2] text-[#fff] rounded-lg" : " text-[#a2a2a2]" }`}>
                Zoom
              </div>

              <div className='h-[50%] border-2 border-[#707070]  bg-[#707070] mt-auto mb-auto'></div>

              <div onClick={()=> setWhereEvent('virtual')} className={`w-[33%] cursor-pointer p-1  border-2 ${ whereEvent === "virtual"? "border-white bg-[#a2a2a2] text-[#fff] rounded-lg" : " text-[#a2a2a2]" }`}>
                Virtual
              </div>

              <div className='h-[50%] border-2 border-[#707070]  bg-[#707070] mt-auto mb-auto'></div>

              <div onClick={()=> setWhereEvent('in person')} className={`w-[33%] cursor-pointer p-1  border-2 ${ whereEvent === "in person"? "border-white bg-[#a2a2a2] text-[#fff] rounded-lg" : " text-[#a2a2a2]" }`}>
                In Person
              </div>

            </div>
        </div>

        <div className='my-2 flex flex-col'>
            <p className='font-[700] '>When is the event taking place?</p>

            <div className='space-x-1 flex border-2 border-[#a2a2a2]  rounded-lg'>


              <div onClick={()=>setWhenEvent('single event')} className={`cursor-pointer p-1 pr-4 border-2 ${ whenEvent === "single event"? "border-white bg-[#a2a2a2] text-[#fff] rounded-lg" : " text-[#a2a2a2]" }`}>
                Single Event
              </div>

              <div className='h-[50%] border-2 border-[#707070]  bg-[#707070] mt-auto mb-auto'></div>

              <div onClick={()=>setWhenEvent('event series')} className={`cursor-pointer p-1 pr-4 border-2 ${ whenEvent === "event series"? "border-white bg-[#a2a2a2] text-[#fff] rounded-lg transition-transform ease-in-out  duration-300 " : " text-[#a2a2a2]" }`}>
                Event Series
              </div>

            </div>
        </div>


          </div>

          <div>
            <p className='font-[700]'>Once you link your Zoom account, we can automatically generate Zoom meeting.</p>
            <div className='flex gap-4'>
              <label htmlFor="" className='flex flex-col py-1'>
                Meeting Date
              <input type='date' className=' rounded-md border px-1 my-1'/>
              </label>
              <label htmlFor="" className='flex flex-col py-1'>
                Start Time
              <input type='time' className=' rounded-md border px-1 my-1'/>
              </label>
              <label htmlFor="" className='flex flex-col py-1'>
                End Time
              <input type='time' className=' rounded-md border px-1 my-1'/>
              </label>
            </div>
          </div>

          <div>
            <button className='bg-[#2D8CFF] rounded-md text-white px-2 py-1 my-2'>Link Zoom Account</button>
          </div>

          <div className='space-x-2'>
            <p className=' font-[700]'>Or you can enter meeting information:</p>
            <div className='flex gap-4 py-2'>
              <div>
                <p>Zoom Meeting URL:</p>
                <input type="text" className='border rounded-md px-2' />
              </div>
              <div>
                <p>Zoom Meeting ID</p>
                <input type="text" className='border rounded-md px-2'/>
              </div>
              <div>
                <p>Zoom Meeting Password</p>
                <input type="text" className='border rounded-md px-2'/>
              </div>
            </div>

          <div className='flex space-x-7'>
            <div className='font-[700]'>
              <p className=''>Access</p>
              <label htmlFor="">
                <input type="checkbox" placeholder='Requires' className='' />
                Requires Registration Approval <br />
                <p className='font-[400] text-sm'>If selected, a join link will only be sent to manually approved guests.</p>
              </label>
            </div>
          </div>
            <Link href="/events/description" className='flex justify-end p-2'>
              <button className='bg-[#7522E6] rounded-md px-3 py-1 text-white '>Next Step</button>
            </Link>
        </div>
        </div>


    </form>
  )
}

export default Events