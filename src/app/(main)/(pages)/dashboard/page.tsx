'use client'

import React from 'react'
import dynamic from 'next/dynamic'


const DashboardPage = () => {
  
  return (
    <div className="flex rounded-xl flex-col gap-4 relative">
      <h1 className="text-4xl  sticky top-0 z-[10] p-6 bg-background/50 backdrop-blur-lg flex items-center border-b">
        Dashboard
      </h1>
    </div>
  )
}

export default dynamic (() => Promise.resolve(DashboardPage), {ssr: false})