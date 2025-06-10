"use client"
import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea'


function SelectTopic({onUserSelect}) {

  const options = ['Custom Prompt','Random AI Story','Scary Story','Historical Facts']
  const [selectedOptions,setselectedOptions] = useState()
  return (
    <div>
      <h2 className='font-bold text-2xl text-primary'>Content</h2>
      <p className='text-black'>What is the topic of your video</p>

      <Select onValueChange={(value) =>{
        setselectedOptions(value)
        value!='Custom Prompt'&&onUserSelect('topic',value)
        }}>
        <SelectTrigger className="w-full mt-2 p-6 text-lg">
          <SelectValue placeholder="Content Type" />
        </SelectTrigger>
        <SelectContent>
          {options.map((item,index)=>(
            <SelectItem value={item} key={index} >{item} </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {selectedOptions == 'Custom Prompt'&&
        <Textarea className='mt-3'
        onChange={(e)=>onUserSelect('topic',e.target.value)}
        placeholder="Write a prompt on Which yoy want to generate a vedio"/>
      }
    </div>
  )
}

export default SelectTopic
