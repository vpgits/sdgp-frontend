import React from 'react'
import { Button } from "@/components/ui/button"


export default function page() {
  return (
    <div className='h-screen w-screen flex flex-col bg-white'>
      <div className='dashboard'>
       <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-8">Quiz Dashboard</h1>
      <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
        <Button className="h-24">Category 1</Button>
        <Button className="h-24 ">Category 2</Button>
        <Button className="h-24">Category 3</Button>
        <Button className="h-24">Category 4</Button>
        <Button className="h-24">Category 5</Button>
        <Button className="h-24">Category 6</Button>
        <Button className="h-24">Category 7</Button>
        <Button className="h-24">Category 8</Button>
       
      </div>
      </div>

    
        </div>
    </div>
  )
}
