import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router'

function NavSettings() {
    // ?
    const url = useRouter();
    console.log("nav+", url.pathname);
  return (
    <div>
        {/* Navigation tabs*/}
      <div className=' flex pb-2 space-x-4 font-[Inter] font-[700] text-[#a2a2a2] text-sm ' >
        <Link href="/Settings">
        <div className={'cursor-pointer text-[#a2a2a2] '}>
          Account
        </div>
        </Link>
        <div className='cursor-pointer '>
            Preferences</div>
        <Link href="/Settings/security">
        <div className='cursor-pointer underline underline-offset-4 decoration-2 text-[#000]'>Security</div>
        </Link>
        <Link href="/Settings/notifications ">
        <div className='cursor-pointer '>Notification</div>
        </Link>
      </div>
    </div>
  )
}

export default NavSettings