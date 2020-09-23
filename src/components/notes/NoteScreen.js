import React, { useEffect, useRef } from 'react'
import { NotesAppBar } from './NotesAppBar'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { activeNote } from '../../actions/notes'

export const NoteScreen = () => {

  const dispatch = useDispatch()
  const { active:note } = useSelector( state => state.notes)
  const activeId = useRef( note.id )
  const [ formValues, handleInputChange, reset ] = useForm(note)

  useEffect(() => {
    if( note.id !== activeId.current ) {
      reset(note)
      activeId.current = note.id
    }
  }, [ note, reset ])

  useEffect(() => {
    dispatch(activeNote(formValues.id, {...formValues}))
  }, [formValues, dispatch])

  return (
    <div className="notes__main">
      <NotesAppBar />

      <div className="notes__content">
        <form>
          <input type="text" placeholder="Some awesome title" name="title" className="notes__input" value={ formValues.title } onChange={ handleInputChange } />
          <textarea name="body" cols="5" rows="10" placeholder="What happend today" className="notes__textarea" value={ formValues.body } onChange={ handleInputChange } ></textarea>
        </form>

        <div className="notes__image">
          { note.url &&
            <img src={ note.url } alt={ note.title } />
          }
        </div>
      </div>
    </div>
  )
}
