"use client"
import React, { useState } from 'react'
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle'
import SelectDuration from './_components/SelectDuration'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import CustomLoading from './_components/CustomLoading'
import { v4 as uuidv4 } from 'uuid';

const scriptData = "Once upon a time, in a city filled with quirky inventions, lived a girl named Lily and her robot dog, Sparky.."
const FILEURL = 'https://firebasestorage.googleapis.com/v0/b/autoreel-aivideogenerator.firebasestorage.app/o/autoreel-ai-short-video-files%2F30ab1558-5be3-443f-8372-2cdfcee0c3b1.mp3?alt=media&token=8cbfe31b-da89-4517-a652-a251fe2c63c8'
function CreateNew() {


  const [formData,setFormData] = useState([])
  const [loading,setLoading] = useState(false);
  const [videoScript,setVideoScript] = useState();
  const [audioFileUrl,setAudioFileUrl] = useState();
  const [caption,setcaptions]=useState();

  const onHandleInputChange=(fieldName,fieldValue)=>{
    console.log(fieldName,fieldValue)

    setFormData(prev=>({
      ...prev,
      [fieldName]:fieldValue
    }))
  }

  const onCreateClickHandler=()=>{
    // GetVideoScript();
    // GenerateAudioFile(scriptData);
    GenerateAudioCaption(FILEURL)
  }

  //Get Video Script

  const GetVideoScript =async()=>{
    setLoading(true)
    const prompt = 'write a script to generate '+formData.duration+' video on topic : '+formData.topic+' along with AI image prompt in '+formData.imageStyle+' format for each scene and give me result in JSON format with imagePrompt and contentText as field,No Plain text'
    console.log(prompt)
    const result =await axios.post('/api/get-video-script',{
      prompt : prompt
    }).then(resp=>{
      console.log(resp.data);
      setVideoScript(resp.data.result);
      GenerateAudioFile(resp.data.result);
    });
    setLoading(false)
  }

  // create audio file
  const GenerateAudioFile=async(videoScriptData)=>{
    setLoading(true)
    let script = '';
    const id = uuidv4();
    // videoScriptData.forEach(item=>{
    //   script = script+item.contentText+' ';
    // })

    await axios.post('/api/generate-audio',{
      text:videoScriptData,
      id:id
    }).then(resp=>{
      // console.log(resp.data);
      setAudioFileUrl(resp.data.result)
    })
    setLoading(false)
  }

  const GenerateAudioCaption=async(fileUrl)=>{
    setLoading(true)

    await axios.post('/api/generate-caption',{
      audioFileUrl:fileUrl
    }).then(resp=>{
      console.log(resp.data.result);
      setcaptions(resp?.data?.result)
      
    })
    setLoading(false)
  }
  

  return (
    <div className='md:px-20'>
      <h2 className='font-bold text-4xl text-primary text-center'>Create New</h2>

      <div className='mt-10 shadow-md p-10'>
        {/* Select Topic */}
        <SelectTopic onUserSelect={onHandleInputChange}/>

        {/* Select Style */}
        <SelectStyle onUserSelect={onHandleInputChange}/>

        {/* Duration */}
        <SelectDuration onUserSelect={onHandleInputChange}/>

        {/* Create Button */}
        <Button className="mt-10 w-full" onClick={onCreateClickHandler}>Create Short Video</Button>


      </div>

      <CustomLoading loading={loading} />

    </div>
  )
}

export default CreateNew
