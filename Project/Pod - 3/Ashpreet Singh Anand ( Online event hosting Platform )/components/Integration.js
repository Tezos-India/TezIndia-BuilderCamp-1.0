import React from 'react'
import SocialMediaAccount from './SocialMediaAccount'


function Integration() {
  return (
    <div className='bg-white mx-5 rounded-lg'>
        <div className='text-xl font-[700] mx-6 py-1 my-1'>
            Connected Accounts
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-col-4 gap-2 mx-6'>
            <SocialMediaAccount
                text ="Zoom"
                color="#2D8CFF"
                // Icon={}
                content="Link your Zoom account to auto-create Zooms and view attendance data."
            />
            <SocialMediaAccount
                text ="Twitter"
                color="#1DA1F2"
                content="Link your Twitter account to show on your profile page."

            />
            <SocialMediaAccount
                text ="Discord"
                color="#5865F2"
                content="Link your Discord account to sign in with Discord."
            />
            <SocialMediaAccount
                text ="Google"
                color="#4285F4"
                content="Link your Google email to sign in with Google."
            />
            <SocialMediaAccount
                text ="Instagram"
                color="#D92D7F"
                content="Link your Instagram account to show on your profile page."
            />
            <SocialMediaAccount
                text ="Ethereum"
                color="#7522E6"
                content="Link your Ethereum wallet to register for token gated events."
            />
        </div>

        <div className='font-[700] text-md mx-6 py-1'>
            API KEYS 
        </div>
        <div className='text-sm mx-6 py-1'>
            Create API keys to send data to <span className='font-[700]'>Queue</span> or use our <span className='font-[700]'>beta API</span>
        </div>

        <center>
        <div className='inline-block border border-gray-600 rounded-md p-3 mx-3 mt-8 cursor-pointer'> 
            Upgrade to <span className='font-[700]'>Queue</span> Protocol Plus to create <span className='font-[700]'>API keys.</span>
        </div>
        </center>
    </div>
  )
}

export default Integration