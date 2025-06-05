import React from 'react'
import Header from './_components/Header'
import SideNavBar from './_components/SideNavBar'

function DashboardLayout({children}) {
  return (
    <div>
        <div className='hidden md:block h-screen bg-white fixed mt-[88px] w-64'>
            <SideNavBar />
        </div>
        <div>
            <Header />
            <div className='md:ml-64'>
                {children}
            </div>
        </div>
    </div>
  )
}

export default DashboardLayout
