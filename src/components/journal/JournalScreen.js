import React from 'react'
import { Sidebar } from './Sidebar'
// import { MainEmpty } from './MainEmpty'
import { NoteScreen } from '../notes/NoteScreen'

export const JournalScreen = () => {
  return (
    <div className="journal__wrapper">
      <Sidebar />

      <main className="journal__wrapper-main">
        <NoteScreen />
        {/* <MainEmpty /> */}
      </main>
    </div>
  )
}
