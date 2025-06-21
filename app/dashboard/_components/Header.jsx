import { Button } from '@/components/ui/button'
import React, { useContext } from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { UserDetailContext } from '../_context/UserDetailContext';

function Header() {
  const {userDetail,setUserDetail}=useContext(UserDetailContext)

  return (
    <div className='p-3 px-5 flex item-center justify-between shadow-md'>
        <div className='flex items-center'>
            <Image src = {'/logoreel.jpg'} alt = 'image' width = {80} height = {80} />
            <h1 className='font-bold text-xl'>AutoReel</h1>
        </div>
        <div className='flex gap-3 items-center'>
          <div className='flex gap-2 items-center'>
            <Image src={'/coin_icon.png'} width={20} height={20}/>
            <h2>{userDetail?.credits}</h2>
          </div>
            <Button>Dashboard</Button>
            <UserButton />
        </div>
    </div>
  )
}

export default Header
