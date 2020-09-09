import React, { useEffect, useRef } from 'react'
import { NotesAppBar } from './NotesAppBar'
import { useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'

export const NoteScreen = () => {

  const { active:note } = useSelector( state => state.notes)
  const [ formValues, handleInputChange, reset ] = useForm(note)
  const activeId = useRef( note.id )

  useEffect(() => {
    if( note.id !== activeId.current ) {
      reset(note)
      activeId.current = note
    }
  }, [ note, reset ])

  return (
    <div className="notes__main">
      <NotesAppBar />

      <div className="notes__content">
        <form>
          <input type="text" placeholder="Some awesome title" name="title" className="notes__input" value={ formValues.title } onChange={ handleInputChange } />
          <textarea name="note" cols="5" rows="10" placeholder="What happend today" className="notes__textarea" value={ formValues.body } onChange={ handleInputChange } ></textarea>
        </form>

        <div className="notes__image">
          { note.url &&
            <img src="https://images6.alphacoders.com/857/857790.jpg" alt="note"/>
          }
        </div>
      </div>
    </div>
  )
}
