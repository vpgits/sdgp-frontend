
import React from 'react'
import { Button } from '../ui/button'

export default function Notificationpage() {
  return (
    <div className="flex flex-col">
    <header className="flex items-center justify-between px-6 py-4 border-b">
      <h1 className="text-2xl font-bold">Notifications</h1>
      <Button variant="outline">Mark All as Read</Button>
    </header>
    <main className="flex-1 overflow-y-auto p-6">
      <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
        <span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-blue-500" />
        <div className="grid gap-1">
          <p className="text-sm font-medium">you have  a new message.</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">5 min ago</p>
        </div>
      </div>
      <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
        <span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-blue-500" />
        <div className="grid gap-1">
          <p className="text-sm font-medium">Your quiz is redy !</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">1 min ago</p>
        </div>
      </div>
      <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
        <span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-blue-500" />
        <div className="grid gap-1">
          <p className="text-sm font-medium">Your subscription is expiring soon!</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</p>
        </div>
      </div>
    </main>
  </div>
  )
}