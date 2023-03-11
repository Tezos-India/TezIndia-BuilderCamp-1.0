"use client"
import Image from 'next/image'
import { Inter, Poppins } from '@next/font/google'
import styles from './page.module.css'
import Card from './Card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs'
import Footer from './footer'
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { aiTools, AiToolsDetails } from './aiList'
import Navbar from './Navbar'
import Section from './Animate'
import { registerIdea } from "../utils/operation";
import { fetchStorage } from "../utils/storage";
import { useEffect, useState } from 'react'

const poppins = Poppins({ subsets: ['latin'], weight: ['500', '300', '800'], })

export interface AiToolsCard extends AiToolsDetails {
  index: number
}

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    url: "",
  })
  const [isSubmit, setIsSubmit] = useState(false);
  const onchangeData = (e: any) => {
    let name = e.target.name;
    let value = e.target.value;
    setFormData({ ...formData, [name]: value });

  }

  const onClick = async (e: any) => {
    e.preventDefault();
    setIsSubmit(true);
    if (formData.desc && formData.name && formData.url) {
      await registerIdea(formData.desc, formData.name, formData.url);
    }
    setFormData({
      name: "",
      desc: "",
      url: "",
    });
    setIsSubmit(false);

  }
  useEffect(() => {
    (async () => {
      await fetchStorage();
    })()
  }, [])
  return (
    <div className='p-2 flex flex-col items-center'>

      <div className='w-full overflow-hidden'>
        <Section duration='0.1s' translate='translateX(100px)' >
          <Navbar />
        </Section>
      </div>

      <h1 className={`header text-2xl text-center font-normal mt-8 mb-10 leading-[1.5]  ${poppins.className}
                      md:text-4xl md:mt-12 md:mb-10
                      xl:text-6xl xl:leading-[1.5]`}  >
        Patent Your Ideas With <br /> Patent-India
      </h1>

      <Tabs defaultValue="all">
        <div className='w-full flex justify-center'>
          <TabsList >
            <TabsTrigger value="all" className={`text-xs font-light ${poppins.className}`}>Your Patent Ideas</TabsTrigger>
            <TabsTrigger value="creative" className={`text-xs font-light ${poppins.className}`}>All Patent Ideas</TabsTrigger>
            <TabsTrigger value="productive" className={`text-xs font-light ${poppins.className}`}>Register Your Ideas</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="all" className='w-full border'>
          <div className='w-full gap-4 grid grid-cols-1 max-w-7xl
                      md:grid-cols-2 
                      lg:grid-cols-3'>
            {
              aiTools.map((data: AiToolsDetails, index: number) => (
                <Card
                  name={data.name}
                  link={data.link}
                  caption={data.caption}
                  image={data.image}
                  category={data.category}
                  index={index}
                  key={index}
                />
              ))
            }
          </div>
        </TabsContent>
        <TabsContent value="creative">
          <div className='w-full gap-4 grid grid-cols-1 max-w-7xl
                      md:grid-cols-2 
                      lg:grid-cols-3'>
            {
              aiTools.filter(item => item.category == "creative").map((data: AiToolsDetails, index: number) => (
                <Card
                  name={data.name}
                  link={data.link}
                  caption={data.caption}
                  image={data.image}
                  category={data.category}
                  index={index}
                  key={index}
                />
              ))
            }
          </div>
        </TabsContent>
        <TabsContent value="productive">
          <div className="flex justify-center items-center flex-col">

            <form>
              <label className="Label text-white" htmlFor="name">
                Product Name
              </label>
              <input onChange={(e) => { onchangeData(e) }} type="text" className="Input bg-black text-white mb-3" id="name" placeholder='Nikku876' name='name' value={formData.name} />

              <label className="Label text-white" htmlFor="desc">
                Product Description
              </label>
              <input onChange={(e) => { onchangeData(e) }} type="text" className="Input mb-3 bg-black text-white" id="desc" placeholder='Description...' name='desc' value={formData.desc} />


              <label className="Label text-white" htmlFor="url">
                Image Url
              </label>
              <input onChange={(e) => { onchangeData(e) }} type="url" className="Input bg-black text-white" id="url" placeholder='Paste Image Url' name='url' value={formData.url} />

              <button
                className=" rounded-md inline-flex mt-4 items-center justify-center text-white p-2 border focus:shadow-[0_0_0_2px] focus:shadow-black cursor-pointer"

                onClick={onClick}
              >
                {isSubmit ? "Loading..." : "Patent Idea"}
              </button>
            </form>

          </div>
        </TabsContent>
      </Tabs>

      <Footer />

    </div>
  )
}
