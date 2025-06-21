"use client"
import React, { use, useEffect, useState } from 'react'
import Header from './_components/Header'
import SideNavBar from './_components/SideNavBar'
import { VideoDataContext } from '../_context/VideoDataContext'
import { UserDetailContext } from '../_context/UserDetailContext'
import { useUser } from '@clerk/nextjs'
import { Users } from '@/configs/schema'
import { db } from '@/configs/db'
import { eq } from 'drizzle-orm'

function DashboardLayout({children}) {
  const [videoData,setVideoData] = useState([])
  const [userDetail,setUserDetail]=useState([])
  const {user} = useUser();

  useEffect(()=>{
    user&&GetUserDetail()
  },[user])


  const GetUserDetail=async()=>{
    const result = await db.select().from(Users)
    .where(eq(Users.email,user?.primaryEmailAddress?.emailAddress))
    setUserDetail(result[0])
  }

  return (
    <UserDetailContext.Provider value={{userDetail,setUserDetail}}>
    <VideoDataContext.Provider value={{videoData,setVideoData}}>
    <div>
        <div className='hidden md:block h-screen bg-white fixed mt-[88px] w-64'>
            <SideNavBar />
        </div>
        <div>
            <Header />
            <div className='md:ml-64 p-10'>
                {children}
            </div>
        </div>
    </div>

    </VideoDataContext.Provider>
    </UserDetailContext.Provider>
  )
}

export default DashboardLayout
