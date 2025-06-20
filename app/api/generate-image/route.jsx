// make sure npm install replicate
import { storage } from "@/configs/FirebaseConfig";
import { auth } from "@clerk/nextjs/dist/types/server"
import axios from "axios";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { NextResponse } from "next/server";
import Replicate from "replicate" 
export async function POST(req) {
    try {
        const {prompt} = await req.json()
        const replicate = new Replicate({
            auth: process.env.NEXT_REPLICATE_API_KEY
        });

        const input = {
            prompt : prompt,
            height : 1280,
            width : 1024,
            num_outputs : 1
        }

        const output = await replicate.run("bytedance/sdxl-lightinig-4stepkjfbhjahjfHhjvfJVGFVGFVw",{input})
 
        // save to firebase
        const base64Image = "data:image/png;base64,"+await ConvertImage(output[0])

        const fileName = 'autoreel-ai-short-video-files/'+Date.now()+".png"

        const storageRef=ref(storage,fileName);

        await uploadString(storageRef,base64Image,'data_url')
        const downloadUrl = await getDownloadURL(storageRef)
        console.log(downloadUrl);
        return NextResponse.json({'result' : downloadUrl}


        )
    } catch (e) {
        
    }
}

const ConvertImage=async(imageUrl)=>{
    try {
        const resp = await axios.get(imageUrl,{responseType:'arraybuffer'})

        const base64Image = Buffer.from(resp.data).toString('base64')

        return base64Image;
    } catch (error) {
        console.log('Error:',e);
        
    }
}