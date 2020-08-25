import React from 'react'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
  return (
    <div className="notes__main">
      <NotesAppBar />

      <div className="notes__content">
        <form>
          <input type="text" placeholder="Some awesome title" name="title" className="notes__input"/>
          <textarea name="note" cols="5" rows="10" placeholder="What happend today" className="notes__textarea"></textarea>
        </form>

        <div className="notes__image">
          <img src="https://images6.alphacoders.com/857/857790.jpg" alt="note"/>
        </div>
      </div>
    </div>
  )
}
