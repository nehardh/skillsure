import React from 'react'
import DashboardHeader from '@/app/dashboard/_components/DashboardHeader'

function CourseViewLayout({ children }) {
  return (
    <div>
        <DashboardHeader/>
        <div className="">
            {children}
        </div>
    </div>
  )
}

export default CourseViewLayout