import React, { useState } from 'react'
import Image
 from 'next/image'
function SelectStyle({onUserSelect}) {

    const [selectedOptions,setSelectedOptions] = useState()
    const styleOptions=[
        {
            name : "Realistic",
            image : '/realistic.jpeg'
        },
        {
            name : "Cartoon",
            image : "/cartoon.jpeg"
        },
        {
            name : "Comic",
            image : "/comics.jpeg"
        },
        {
            name : "WaterColor",
            image :"/watercolor.jpeg" 
        },
        {
            name : "GTA",
            image : "/gta.jpeg"
        }
        
    ]
  return (
    <div className='mt-7'>
      <h2 className='font-bold text-2xl text-primary'>Style</h2>
      <p className='text-black'>Select your vedio style</p>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-3'>
        {styleOptions.map((item,index)=>(
            <div className = {`relative hover:scale-105 transition-all cursor-pointer rounded-xl
            ${selectedOptions==item.name&&'border-5 border-primary'}
            `} key={index}>
                <Image src = {item.image} alt='image' width = {100} height = {100} 
                className='h-48 object-cover rounded-lg w-full '
                onClick={()=>{setSelectedOptions(item.name)
                    onUserSelect('imageStyle',item.name)
                }}
                />
                <h2 className='absolute p-1 bg-black bottom-0 w-full text-white text-center rounded-b-lg'>{item.name}</h2>
            </div>
        ))}
      </div>


    </div>
  )
}

export default SelectStyle
