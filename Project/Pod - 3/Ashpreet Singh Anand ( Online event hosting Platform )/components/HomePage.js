import React from 'react'
import Image from "next/image";

function HomePage() {
  return (
    <div className='ml-[10%] lg:ml-[14.63%] mr-[5%] md:mr-20 relative'>

        <div className= 'absolute z-[-1] right-[-520px] -translate-y-80 rotate-[-12deg]'>
            <Image src="/LandingPageIconReverse.png" width={1200} height={1200}/>
        </div>

        <div className= 'absolute z-[-1] left-[-1050px] -translate-y-76 rotate-[-12deg]'>
            <Image src="/LandingPageIconReverse.png" width={1200} height={1200}/>
        </div>

        {/* Component 1 */}
    <div className='mt-36 mb-60'>
        <div className='relative font-bold text-4xl md:text-6xl mb-4'>
            <div className='z-10'>
            <p className=''>Host Your Events,</p>
            <p>Mint Memberships &</p>
            <p>Coupon Any
                <span className='text-[#5456DE] animate-Anytime absolute'>time</span>
                <span className='text-[#5456DE] animate-Anywhere absolute'>where</span>
                
            </p>
            </div>
        </div>

        <div className='mb-4 mr-[10%] md:mr-[60%]'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi quos possimus voluptas consectetur eveniet suscipit soluta sed accusamus autem. Blanditiis.
        </div>

        <div className='flex space-x-3'>
            <button className='bg-[#5456DE] rounded-3xl px-3 py-2 text-white '>Launch App</button>
            <button className='rounded-3xl border border-3 border-gray-700 px-3 py-2'>Book Demo</button>
        </div>

        <div className='text-xl mt-2 '>
            Powered By polygon
        </div>
    </div>

    {/* component 2 */}
    <div className='mb-72'>
        <p className='font-bold text-4xl md:text-6xl mb-10'>Why Queue Protocol ?</p>
        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <div className='drop-shadow-lg h-[350px] bg-gradient-to-br from-pink-600 to-green-500 rounded-lg'></div>
            <div className='drop-shadow-lg h-[350px] bg-gradient-to-br from-pink-600 to-blue-200 rounded-lg'></div>
            <div className='drop-shadow-lg h-[350px] bg-gradient-to-br from-pink-600 to-yellow-200 rounded-lg'></div>
            <div className='drop-shadow-lg h-[350px] bg-gradient-to-br from-pink-600 to-gray-300 rounded-lg'></div>
            
        </div>
    </div>


    {/* component 3 */}
    <div className='mb-72'>
        <div>
            <p className='font-bold text-6xl mb-4'>All in One Place</p>
            <p className= 'mr-[10%] md:mr-[50%] mb-4'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis labore quae maxime accusantium. Facere repellendus officiis error ea voluptate praesentium, tenetur odit voluptas nihil at placeat esse consequuntur, ratione iusto?</p>
            <button className='bg-[#5456DE] rounded-3xl px-3 py-2 text-white'>Go to Dashboard</button>
        </div>
    </div>

    {/* signup 4th component */}
        <div className='flex flex-col justify-center mr-[5%]'>
            <div className='px-5 md:px-48 xl:px-96'>
            <p className='text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit amet facilis at reiciendis harum sit.</p>
            </div>

                {/* state add */}
            <div className='flex flex-col justify-center items-center space-y-4 mt-4 px-2 md:px-24'>
                <input type="text" placeholder='Your Name' className='h-10 px-2 border-2 rounded-lg bg-sky-100 focus:bg-white mt-4 md:w-1/2 focus:drop-shadow-lg drop-shadow-sm'/>
                <input type="text" placeholder='Your Email' className='h-10 px-2 border-2 rounded-lg bg-sky-100 focus:bg-white md:w-1/2 drop-shadow-sm focus:drop-shadow-lg' />
                </div>
            
            <center><button className=' bg-green-600 w-fit px-3 py-2 rounded-lg mt-4 text-white font-medium'>Sign Up</button></center>

            <p className='text-center mt-4'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus, saepe.</p>

            <div className=' flex space-x-4 justify-center mt-4 mb-16'>
                <p>icon</p>
                <p>icon</p>
                <p>icon</p>
                <p>icon</p>
            </div>
        </div>

    </div>
  )
}

export default HomePage