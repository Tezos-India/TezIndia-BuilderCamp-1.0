import React from 'react'
import NavSettings from './NavSettings'
import { useState } from 'react'
import {motion} from 'framer-motion'
import { HostNotification } from './HostNotification'

function NotificationSettings() {
  const [emailNotification,setEmailNotification]=useState(false)
  const [smsNotification,setSmsNotification]=useState(false)
  const [newSessionsNotification,setNewSessionsNotification]=useState(false)
  const [hostMessagesNotification,setHostMessagesNotification]=useState(false)
  const [feedbackResponsesNotification,setFeedbackResponsesNotification]=useState(false)
  const [newGuestRegisteredNotification,setNewGuestRegisteredNotification]=useState(false)
  const [newFollowerNotification,setNewFollowerNotification]=useState(false)
  const [newSubscriberNotification,setNewSubscriberNotification]=useState(false)


  return (
    <div className='bg-white rounded-lg mx-6 px-3 py-2 my-1 h-full font-[400]'>
        <NavSettings/>
        <div className='flex flex-wrap'>

          <div className='w-1/2 '>
            <div className='text-[#0a0909] font-[700] py-1'>Email</div>
            <div>Choose what emails you wish to receive. This applies to all calendars & events.</div>


            <div className='text-[#0a0909] font-[700] py-1'>As Event Guest</div>

            <div className='flex justify-between mr-8 py-1'>
              <div>Email Reminders</div>
              <div className='flex items-center justify-center'>
                <div onClick={()=>setEmailNotification(!emailNotification)} 
                className={`flex w-8 h-5  rounded-full cursor-pointer border border-solid-3 bg-[#7522e6] ${ emailNotification ? "justify-end pr-1":"justify-start pl-1"} pt-1 pb-1`}>
                  <motion.div
                    className={`h-3 w-3 rounded-full   bg-white`}
                    layout
                    transition={{type:"spring",stiffness:700,damping:30}}
                    />{console.log(emailNotification)}
                </div>
              </div>
            </div>

            <div className='flex justify-between mr-8 py-1'>
              <div>SMS Reminders</div>
              <div className='flex items-center justify-center'>
                <div onClick={()=>setSmsNotification(!smsNotification)} 
                className={`flex w-8 h-5  rounded-full cursor-pointer border border-solid-3 bg-[#7522e6] ${ smsNotification ? "justify-end pr-1":"justify-start pl-1"} pt-1 pb-1`}>
                  <motion.div
                    className={`h-3 w-3 rounded-full   bg-white`}
                    layout
                    transition={{type:"spring",stiffness:700,damping:30}}
                    />{console.log(smsNotification)}
                </div>
              </div>
            </div>

            <div className='flex justify-between mr-8 py-1'>
              <div>New Sessions</div>
              <div className='flex items-center justify-center'>
                <div onClick={()=>setNewSessionsNotification(!newSessionsNotification)} 
                className={`flex w-8 h-5  rounded-full cursor-pointer border border-solid-3 bg-[#7522e6] ${ newSessionsNotification ? "justify-end pr-1":"justify-start pl-1"} pt-1 pb-1`}>
                  <motion.div
                    className={`h-3 w-3 rounded-full   bg-white`}
                    layout
                    transition={{type:"spring",stiffness:700,damping:30}}
                    />{console.log(newSessionsNotification)}
                </div>
              </div>
            </div>

            <div className='flex justify-between mr-8 py-1'>
              <div>Host Messages</div>
              <div className='flex items-center justify-center'>
                <div onClick={()=>setHostMessagesNotification(!hostMessagesNotification)} 
                className={`flex w-8 h-5  rounded-full cursor-pointer border border-solid-3 bg-[#7522e6] ${ hostMessagesNotification ? "justify-end pr-1":"justify-start pl-1"} pt-1 pb-1`}>
                  <motion.div
                    className={`h-3 w-3 rounded-full   bg-white`}
                    layout
                    transition={{type:"spring",stiffness:700,damping:30}}
                    />{console.log(hostMessagesNotification)}
                </div>
              </div>
            </div>

            <div className='text-[#0a0909] font-[700]'>As Event Host</div>

            <div className='flex  justify-between mr-8 py-1'>
              <div>Feedback Responses</div>
              <div className='flex items-center justify-center'>
                <div onClick={()=>setFeedbackResponsesNotification(!feedbackResponsesNotification)} 
                className={`flex w-8 h-5  rounded-full cursor-pointer border border-solid-3 bg-[#7522e6] ${ feedbackResponsesNotification ? "justify-end pr-1":"justify-start pl-1"} pt-1 pb-1`}>
                  <motion.div
                    className={`h-3 w-3 rounded-full   bg-white`}
                    layout
                    transition={{type:"spring",stiffness:700,damping:30}}
                    />{console.log(feedbackResponsesNotification)}
                </div>
              </div>
            </div>

            <div className='flex  justify-between mr-8 py-1'>
              <div>New Guest Registered</div>
              <div className='flex items-center justify-center'>
                <div onClick={()=>setNewGuestRegisteredNotification(!newGuestRegisteredNotification)} 
                className={`flex w-8 h-5  rounded-full cursor-pointer border border-solid-3 bg-[#7522e6] ${ newGuestRegisteredNotification ? "justify-end pr-1":"justify-start pl-1"} pt-1 pb-1`}>
                  <motion.div
                    className={`h-3 w-3 rounded-full   bg-white`}
                    layout
                    transition={{type:"spring",stiffness:700,damping:30}}
                    />{console.log(newGuestRegisteredNotification)}
                </div>
              </div>
            </div>

            <div className='flex  justify-between mr-8 py-1'>
              <div>New Follower</div>
              <div className='flex items-center justify-center'>
                <div onClick={()=>setNewFollowerNotification(!newFollowerNotification)} 
                className={`flex w-8 h-5  rounded-full cursor-pointer border border-solid-3 bg-[#7522e6] ${ newFollowerNotification ? "justify-end pr-1":"justify-start pl-1"} pt-1 pb-1`}>
                  <motion.div
                    className={`h-3 w-3 rounded-full   bg-white`}
                    layout
                    transition={{type:"spring",stiffness:700,damping:30}}
                    />{console.log(newFollowerNotification)}
                </div>
              </div>
            </div>

            <div className='text-[#0a0909] font-[700] py-1'>As Calender Admin</div>

            <div className='flex  justify-between mr-8  py-1'>
              <div>New Subscriber</div>
              <div className='flex items-center justify-center'>
                <div onClick={()=>setNewSubscriberNotification(!newSubscriberNotification)} 
                className={`flex w-8 h-5  rounded-full cursor-pointer border border-solid-3 bg-[#7522e6] ${ newSubscriberNotification ? "justify-end pr-1":"justify-start pl-1"} pt-1 pb-1`}>
                  <motion.div
                    className={`h-3 w-3 rounded-full   bg-white`}
                    layout
                    transition={{type:"spring",stiffness:700,damping:30}}
                    />{console.log(newSubscriberNotification)}
                </div>
              </div>
            </div>

          </div>

          
          

          <div className='w-1/2 '>
            <div className='text-[#0a0909] font-[700] py-1'>Hosts</div>
            <div>When you turn off host notifications, you won't receive any emails from that host including any emails for their events.</div>
            <div className='flex  justify-between mr-8 py-1'>
              <div className='text-[#0a0909] font-[700] py-1'>New Subscriber</div>
              <div className='flex items-center justify-center'>
                <div onClick={()=>setNewSubscriberNotification(!newSubscriberNotification)} 
                className={`flex w-8 h-5  rounded-full cursor-pointer border border-solid-3 bg-[#7522e6] ${ newSubscriberNotification ? "justify-end pr-1":"justify-start pl-1"} pt-1 pb-1`}>
                  <motion.div
                    className={`h-3 w-3 rounded-full   bg-white`}
                    layout
                    transition={{type:"spring",stiffness:700,damping:30}}
                    />{console.log(newSubscriberNotification)}
                </div>
              </div>
            </div>

            <div className='flex justify-between mr-8'>
              <div className='text-[#0a0909] font-[700] py-1'>New Subscriber</div>
              <div className='flex items-center justify-center'>
                <div onClick={()=>setNewSubscriberNotification(!newSubscriberNotification)} 
                className={`flex w-8 h-5  rounded-full cursor-pointer border border-solid-3 bg-[#7522e6] ${ newSubscriberNotification ? "justify-end pr-1":"justify-start pl-1"} pt-1 pb-1`}>
                  <motion.div
                    className={`h-3 w-3 rounded-full   bg-white`}
                    layout
                    transition={{type:"spring",stiffness:700,damping:30}}
                    />{console.log(newSubscriberNotification)}
                </div>
              </div>
            </div>

            <HostNotification/>

          </div>
        </div>
    </div>
  )
}

export default NotificationSettings