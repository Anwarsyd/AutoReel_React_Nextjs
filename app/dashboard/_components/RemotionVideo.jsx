import React from 'react'
import { AbsoluteFill, Sequence, useVideoConfig } from 'remotion'

function RemotionVideo({script,imageList,audioFileUrl,captions,setDurationInFrame}) {

  const {fps}=useVideoConfig();
  const getDureationFrame=()=>{
    setDurationInFrame[captions[captions?.length-1]?.end/1000*fps]
    return captions[captions?.length-1]?.end/100*fps
  }

  return (
    <AbsoluteFill className='bg-black'>
      {imageList?.map((item,index)=>{
        <>
          <Sequence key={index} from={((index*getDureationFrame()/imageList?.length))} durationInFrames={getDureationFrame}>
          <Img 
          src={item} style={{
            width:'100%',
            height:'100%',
            objectFit:'cover'
          }}
          />
          </Sequence>
        </>
      })}
      <Audio src={audioFileUrl}/>
    </AbsoluteFill>
  )
}

export default RemotionVideo
