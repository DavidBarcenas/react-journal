import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote } from '../../actions/notes'

export const NotesAppBar = () => {

  const dispatch = useDispatch()
  const { active } = useSelector(state => state.notes)

  const handleSave = () => {
    dispatch(startSaveNote( active ))
  }

  return (
    <div className="notes__appbar">
      <span className="notes__appbar-date"> 28 de Agosto de 2020 </span>
      <div>
        <button className="btn"> pic </button>
        <button className="btn" onClick={ handleSave }> Save </button>
      </div>
    </div>
  )
}
