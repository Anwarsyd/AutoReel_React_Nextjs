import { Button } from '@/components/ui/button'
import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'

function Header() {
  return (
    <div className='p-3 px-5 flex item-center justify-between shadow-md'>
        <div className='flex items-center'>
            <Image src = {'/logoreel.jpg'} alt = 'image' width = {80} height = {80} />
            <h1 className='font-bold text-xl'>AutoReel</h1>
        </div>
        <div className='flex gap-3 items-center'>
            <Button>Dashboard</Button>
            <UserButton />
        </div>
    </div>
  )
}

export default Header
