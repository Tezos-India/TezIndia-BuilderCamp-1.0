import React from 'react'
import {useState} from 'react'
import {motion} from 'framer-motion'

export function HostNotification(props) {
    const [hostNotification,setHostNotification]=useState(false)

    return (
        <div className='flex  justify-between mr-8 '>
              <div className='text-[#0a0909] font-[700] py-1'>Foundership - Web3 Startup Launcher</div>
              <div className='flex items-center justify-center'>
                <div onClick={()=>setHostNotification(!hostNotification)} 
                className={`flex w-8 h-5  rounded-full cursor-pointer border border-solid-3 bg-[#7522e6] ${ hostNotification ? "justify-end pr-1":"justify-start pl-1"} pt-1 pb-1`}>
                  <motion.div
                    className={`h-3 w-3 rounded-full   bg-white`}
                    layout
                    transition={{type:"spring",stiffness:700,damping:30}}
                    />{console.log(hostNotification)}
                </div>
              </div>
        </div>
    )
}
