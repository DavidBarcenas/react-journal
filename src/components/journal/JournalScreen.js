import React from 'react'
import { Sidebar } from './Sidebar'

export const JournalScreen = () => {
  return (
    <div className="joutnal__wrapper">
      <Sidebar />
      <main><h1>Main content</h1></main>
    </div>
  )
}
