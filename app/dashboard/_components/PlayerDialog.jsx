import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Player } from "@remotion/player";
import RemotionVideo from './RemotionVideo';
import { Button } from '@/components/ui/button'
import { db } from '@/configs/db';
import { VideoData } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';

function PlayerDialog({playVideo,videoId}) {

    const [openDialog,setopenDialog]=useState(false)
    const [videoData,setVideoData]=useState()
    const [durationInFrame,setDurationInFrame]=useState()
    const router = useRouter()


    useEffect(()=>{
        setopenDialog(!openDialog)
        videoId&&GetVideoData();
    },playVideo)

    const GetVideoData=async()=>{
        const result = await db.select().from(VideoData)
        .where(eq(VideoData.id,videoId))

        console.log(result);
        setVideoData(result[0])
        
    }

  return (
    <Dialog open={openDialog}>
        <DialogContent className='bg-white flex flex-col items-center'>
            <DialogHeader>
            <DialogTitle className='text-3xl font-bold my-5'>Your Video is Ready</DialogTitle>
            <DialogDescription>
                <Player
                    component={RemotionVideo}
                    durationInFrames={Number(durationInFrame.toFixed(0))}
                    compositionWidth={300}
                    compositionHeight={450}
                    fps={30}

                    controls={true}
                    inputProps={{
                        ...videoData,
                        setDurationInFrame:(frameValue)=>setDurationInFrame(frameValue)
                    }}
                />

                <div className='flex gap-10 mt-10'>
                    <Button varient="ghost" onClick={()=>{router.replace('/dashboard');setopenDialog(false)}}>Cancel</Button>
                    <Button>Export</Button>
                </div>
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

export default PlayerDialog
