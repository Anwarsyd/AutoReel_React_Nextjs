"use client"
import React, { useContext, useEffect, useState } from 'react'
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle'
import SelectDuration from './_components/SelectDuration'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import CustomLoading from './_components/CustomLoading'
import { v4 as uuidv4 } from 'uuid';
import { VideoDataContext } from '@/app/_context/VideoDataContext'

// const scriptData = "Once upon a time, in a city filled with quirky inventions, lived a girl named Lily and her robot dog, Sparky.."
// const FILEURL = 'https://firebasestorage.googleapis.com/v0/b/autoreel-aivideogenerator.firebasestorage.app/o/autoreel-ai-short-video-files%2F30ab1558-5be3-443f-8372-2cdfcee0c3b1.mp3?alt=media&token=8cbfe31b-da89-4517-a652-a251fe2c63c8'
// const videoSCRIPT=[
//   {
//     "imagePrompt": "Realistic depiction of a shadowy figure delivering a sealed letter in a dark alleyway, late at night, mysterious atmosphere, moonlit sky",
//     "contentText": "One night, a mysterious figure delivers a sealed letter to Giovanni's master, a message that changes everything. It's a coded warning about a plot against the Medici family..."
//   },
//   {
//     "imagePrompt": "Realistic image of Giovanni deciphering a coded message, candlelight illuminating his face, intense focus, parchment covered in complex symbols",
//     "contentText": "Giovanni, despite his youth, possesses a talent for codes. He deciphers the message, revealing a conspiracy far greater than he could have imagined..."
//   },
// ]




function CreateNew() {
  const [formData,setFormData] = useState([])
  const [loading,setLoading] = useState(false);
  const [videoScript,setVideoScript] = useState();
  const [audioFileUrl,setAudioFileUrl] = useState();
  const [captions,setcaptions]=useState();
  const [imageList,setImageList] = useState();

  const {videoData,setVideoData} = useContext(VideoDataContext)

  const onHandleInputChange=(fieldName,fieldValue)=>{
    console.log(fieldName,fieldValue)

    setFormData(prev=>({
      ...prev,
      [fieldName]:fieldValue
    }))
  }

  const onCreateClickHandler=()=>{
    GetVideoScript();
    // GenerateAudioFile(scriptData);
    // GenerateAudioCaption(FILEURL)
    // GenerateImage();
  }

  //Get Video Script

  const GetVideoScript =async()=>{
    setLoading(true)
    const prompt = 'write a script to generate '+formData.duration+' video on topic : '+formData.topic+' along with AI image prompt in '+formData.imageStyle+' format for each scene and give me result in JSON format with imagePrompt and contentText as field,No Plain text'
    console.log(prompt)
    const result =await axios.post('/api/get-video-script',{
      prompt : prompt
    })
    // .then(resp=>{
    //   console.log(resp.data);
    //   setVideoScript(resp.data.result);
    //   GenerateAudioFile(resp.data.result);
    // });
    // setLoading(false)

    if(resp.data.result){
      // console.log(resp.data.result);
      setVideoData(prev=>({
        ...prev,
        'videoScript': resp.data.result
      }))
      setVideoScript(resp.data.result)
      await GenerateAudioFile(resp.data.result)

      
    }
  }

  // create audio file
  //Generate audio file and save to firebase
  const GenerateAudioFile=async(videoScriptData)=>{
    setLoading(true)
    let script = '';
    const id = uuidv4();
    videoScriptData.forEach(item=>{
      script = script+item.contentText+' ';
    })

    const resp = await axios.post('/api/generate-audio',{
      text:script,
      id:id
    })

    setVideoData(prev=>({
        ...prev,
        'audioFileUrl': resp.data.result
      }))
      // console.log(resp.data);
      setAudioFileUrl(resp.data.result);//get File URL
      resp.data.result && await GenerateAudioCaption(resp.data.result,videoScriptData)
    setLoading(false)
  }

  // Generate captions from audio file
  const GenerateAudioCaption=async(fileUrl,videoScriptData)=>{
    setLoading(true)

    await axios.post('/api/generate-caption',{
      audioFileUrl:fileUrl
    }).then(resp=>{
      setVideoData(prev=>({
        ...prev,
        'captions': resp.data.result
      }))
      setcaptions(resp?.data?.result)
      resp.data.result&&GenerateImage(videoScriptData);
    })
    setLoading(false)
  }

  // Geneate AI images
  const GenerateImage=async(videoScriptData)=>{
    setLoading(true)


    let images=[]
    // videoScript.forEach(async(element) => {
    // videoSCRIPT.forEach(async(element) => {
    // await videoScriptData.forEach(async(element) => {
    //   await axios.post('/api/generate-image',{
    //     prompt:element?.imagePrompt
    // }).then(resp=>{
    //   console.log(resp.data.result);
    //   images.push(resp.data.result)
    // })
  // })

    for(const element of videoScriptData)
    {
      try {
        const resp = await axios.post('/api/generate-image',{
          prompt : element.imagePrompt
        })
        console.log(resp.data.result);
        images.push(resp.data.result);
        
      } catch (e) {
        console.log("Error:"+e);        
      }
    }
    console.log(images);
    console.log(images,videoScript,audioFileUrl,captions);
    
    setVideoData(prev=>({
        ...prev,
        'imageList': images
      }))

    setImageList(images)
    setLoading(false)
  }

  useEffect(()=>{
    console.log(videoData);
  },[videoData])
  

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
