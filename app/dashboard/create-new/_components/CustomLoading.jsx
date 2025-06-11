import React from 'react'
import Image from 'next/image'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

function CustomLoading({loading}) {
  return (
      <AlertDialog open={loading}>
        <AlertDialogTitle></AlertDialogTitle>
        <AlertDialogContent>
            <div className='flex flex-col items-center my-10 justify-center'>
                <Image src={'/loading.gif'} alt='loading' width= {100} height={100}></Image>
                <h2 className='mt-1 font-bold'>Generating Your Video... Do not Refresh</h2>
            </div>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default CustomLoading
