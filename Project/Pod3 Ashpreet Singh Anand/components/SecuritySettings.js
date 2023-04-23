import React from 'react'
import NavSettings from './NavSettings'

function SecuritySettings() {
  return (  
      
      <div className='bg-white rounded-lg mx-6 px-3 py-2 my-1 h-full'>
        <NavSettings/>
        <div>
            <p className='font-[700] py-1'>Password</p>
            <p className='pb-1'>You have not set up a password for your account.</p>
            <button className='bg-[#7522E6] rounded-md mb-2 px-2 py-1 text-white'>Set a Password</button>
        </div>

        <div>
            <p className='font-[700] py-1'>Two Factor Authentication</p>
            <p className='pb-1'>Protect your account by setting up two-factor authentication</p>
            <button className='bg-[#7522E6] rounded-md mb-2 px-2 py-1 text-white'>Enable Two-Factor Authentication</button>
        </div>

        <div className='mt-3'>
            <p className='font-[700] py-1'>Delete Account</p>
            <p className='pb-1'>If you no longer want to use Luma, you can permanently delete your account.</p>
            <p className='pb-1'> <span className='font-[600]'>Note</span>- You can't undo this action</p>
            <button className='bg-[#A2A2A2] rounded-md mb-2 px-2 text-red-100' >
                Delete My Account
            </button>
        </div>
    </div>
  )
}

export default SecuritySettings