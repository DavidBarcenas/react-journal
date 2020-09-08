import React from 'react'
import { Sidebar } from './Sidebar'
import { MainEmpty } from './MainEmpty'
import { NoteScreen } from '../notes/NoteScreen'
import { useSelector } from 'react-redux'

export const JournalScreen = () => {

  const { active } = useSelector( state => state.notes )

  return (
    <div className="journal__wrapper">
      <Sidebar />

      <main className="journal__wrapper-main">
        {
          ( active ) ? <NoteScreen /> : <MainEmpty />
        }
      </main>
    </div>
  )
}
