import React, { useState } from 'react'
import BannerModal from './BannerModal';
import NavSettings from './NavSettings'

function Accounts() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className='bg-white mx-5 rounded-lg'>
      {!openModal &&
      <div className='px-5 py-2'>
        <NavSettings/> 
      </div>
      }

      {openModal && <BannerModal setOpenModal={setOpenModal} />}
      {/* Images big and small */}
      {!openModal && (<div>
        <div className='bg-[#e6e1e1] border-[#a2a2a2] relative border-1 border-solid border rounded-md md:p-10 mx-4' onClick={()=>setOpenModal(true)}>
          <div className='flex justify-center items-center '>
            
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="20"><path d="M773 402v-86h-86v-60h86v-87h60v87h87v60h-87v86h-60ZM94 976q-24 0-42-18t-18-42V403q0-23 18-41.5T94 343h147l73-87h280v60H342l-73 87H94v513h680V496h60v420q0 24-18.5 42T774 976H94Zm339.5-146q72.5 0 121.5-49t49-121.5q0-72.5-49-121T433.5 490q-72.5 0-121 48.5t-48.5 121q0 72.5 48.5 121.5t121 49Zm0-60q-47.5 0-78.5-31.5t-31-79q0-47.5 31-78.5t78.5-31q47.5 0 79 31t31.5 78.5q0 47.5-31.5 79t-79 31.5Zm.5-110Z"/>
            </svg>
          
        </div>
        <div className="bg-[#a2a2a2] rounded-full absolute bottom-[-30%] left-4 p-6 md:p-8 border-[#fff] ml-5 ">
            <svg className='h-8 w-8'
            xmlns="http://www.w3.org/2000/svg" fill='white' stroke='white' height="25" viewBox="0 96 960 960" width="25"><path d="M773 402v-86h-86v-60h86v-87h60v87h87v60h-87v86h-60ZM94 976q-24 0-42-18t-18-42V403q0-23 18-41.5T94 343h147l73-87h280v60H342l-73 87H94v513h680V496h60v420q0 24-18.5 42T774 976H94Zm339.5-146q72.5 0 121.5-49t49-121.5q0-72.5-49-121T433.5 490q-72.5 0-121 48.5t-48.5 121q0 72.5 48.5 121.5t121 49Zm0-60q-47.5 0-78.5-31.5t-31-79q0-47.5 31-78.5t78.5-31q47.5 0 79 31t31.5 78.5q0 47.5-31.5 79t-79 31.5Zm.5-110Z"/>
            </svg>
        </div>
      </div>

      {/* Form */}
      <div className='flex flex-auto overflow-y-auto h-full'>
      <div className="p-4 w-full">
              <form className="bg-white shadow-md rounded-lg pt-6 pb-8 px-2">
                <div className=" flex flex-wrap mb-4">
                  <div className="w-1/2 pr-2 flex flex-col gap-1">
                    <label className="tracking-wide font-[700] text-gray-700 text-sm" htmlFor="first-name">
                      First Name
                    </label>
                    <input className="mt-1 appearance-none w-full font-[700] bg-white  text-[#a2a2a2] border border-gray-400 rounded-md py-1 px-4 focus:outline-none focus:border-gray-500 focus:text-[#090909]" id="first-name" type="text" placeholder="e.g. ASHPREET " />
                  </div>
                  <div className="w-1/2 px-1 flex flex-col gap-1">
                    <label className="tracking-wide font-[700] text-gray-700 text-sm"  htmlFor="last-name">
                      User Name
                    </label>
                    <div className='flex items-center'>
                      <div className='flex bg-[#a2a2a2] justify-center items-center py-1 px-2 mt-1 rounded-l-md border border-gray-400'>Queueprotocol.com/</div>
                      <input className="mt-1 appearance-none  font-[700] bg-white  text-[#a2a2a2] border border-gray-400 rounded-r-md py-1 px-4 focus:outline-none focus:border-gray-500 focus:text-[#090909]" id="first-name" type="text" />
                    </div>
                      
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block  tracking-wide font-[700] text-gray-700 text-sm mb-2"  htmlFor="bio">
                    Bio
                  </label>
                  <textarea cols="50" rows="2" className="appearance-none block w-full font-[700] bg-white text-[#a2a2a2] border-[#a2a2a2] border-2 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 focus:text-[#090909]" id="bio" placeholder="" >
                  </textarea>
                </div>
                <div className="flex flex-wrap mb-6">
                  <div className="w-1/2 pr-3">
                    <label className="block  tracking-wide font-[700] text-gray-700 text-sm mb-2"  htmlFor="website">
                      Website
                    </label>
                    <input className="appearance-none block w-full font-[700] bg-white text-[#a2a2a2] border border-gray-400 rounded-md py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 focus:text-[#090909]" id="website" type="text" rows={6}  cols={50} placeholder="https://queueprotocol.com/ "/>
                    <div className='text-[#090909] font-[700] test-xs'> 
                      Email and Phone Number
                    </div>
                    <div className='text-xs'>Manage the email and phone you use to sign into queue and get notifications about your account.</div>
                  </div>
                  <div className="w-1/2 pl-3">
                    <label className="block tracking-wide font-[700] text-gray-700 text-sm mb-2"  htmlFor="location">
                      Location
                    </label>
                    <input className="appearance-none block w-full font-[700] bg-white text-[#a2a2a2] border border-gray-400 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 focus:text-[#090909]" id="location" type="text" placeholder="What's the address?"/>
                  </div>
                </div>
                <div className="flex flex-wrap mb-6">

                  <div className="w-1/2 pr-3">
                    <label className="block tracking-wide font-[700] text-gray-700 text-sm  mb-2"  htmlFor="email">
                      Email
                    </label>
                    <div className=" flex flex-row">
                      <input className="appearance-none block w-full font-[700] bg-white text-[#a2a2a2] border border-gray-400 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 focus:text-[#090909]" id="email" type="email" placeholder="hello@gmail.com"/>
                      <button className="ml-2   bg-[#7522e6] text-white border border-gray-200 rounded-lg px-4">
                        Update
                      </button>
                    </div>
                    <div className='text-xs'>We will send you an email to verify your updated email address.</div>
                  </div>

                  <div className="w-1/2 pl-3">
                    <label className="block  tracking-wide font-[700] text-gray-700 text-sm  mb-2" htmlFor="phone">
                      Phone Number
                    </label>
                    <div className="flex flex-row">
                      <input className="appearance-none block w-full font-[700] bg-white text-[#a2a2a2] border border-gray-400 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:text-[#090909]" id="phone" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="+91 98181235"/>
                      <button className="ml-2  bg-[#7522e6] text-white border border-gray-200 rounded-lg px-4">
                        Update
                      </button>
                    </div>
                    <div className='text-xs'>We will send you a code to verify your updated phone number.</div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <button className="bg-[#7522e6] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Save Changes
                  </button>
                </div>
              </form>
        </div>
      </div>
      </div>)}
    </div>
  )
}

export default Accounts