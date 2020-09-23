import React from 'react'
import { Sidebar } from './Sidebar'
import { MainEmpty } from './MainEmpty'
import { NoteScreen } from '../notes/NoteScreen'
import { useSelector } from 'react-redux'

export const JournalScreen = () => {

  const { active } = useSelector( state => state.notes )

  return (
    <div className="animate__animated animate__fadeIn journal__wrapper">
      <Sidebar />

      <main className="journal__wrapper-main">
        {
          ( active ) ? <NoteScreen /> : <MainEmpty />
        }
      </main>
    </div>
  )
}
