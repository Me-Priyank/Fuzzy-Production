"use client"
import dynamic from 'next/dynamic'


import Navbar from "@/components/global/Navbar"

 function Home(){
  return(
    <main>
      <Navbar/>
    </main>
  )
}

export default dynamic (() => Promise.resolve(Home), {ssr: false})
