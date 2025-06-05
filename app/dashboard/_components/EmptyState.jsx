import React from 'react'
import { Button} from '@/components/ui/button'
import Link from 'next/link'
function EmptyState() {
  return (
    <div className='p-5 py-24 flex items-center flex-col mt-10 border-2 border-dashed'>
        <h2 className='mb-5 text-xl'>You don't have any Short video created</h2>
        <Link href = {'/dashboard/create-new'}>
          <Button className='h-12'>Create New Short Video</Button>
        </Link>
    </div>
  )
}

export default EmptyState
