import React from 'react'
import { useDispatch } from 'react-redux'
import { format } from 'date-fns'
import { activeNote } from '../../actions/notes'

export const JournalEntry = ({ body, date, title, id, url }) => {

  const dispatch = useDispatch()

  const handleEntryClick = () => {
    dispatch(activeNote( id, { body, date, title, id, url } ))
  }
  
  return (
    <div className="animate__animated animate__fadeInUp animate__faster journal__entry" onClick={ handleEntryClick }>
      { url &&
        <div className="journal__entry-picture" style={{backgroundImage: `url(${ url })`}}> </div>
      }
        

      <div className="journal__entry-body">
        <p className="journal__entry-title">{ title }</p>
        <p className="journal__entry-content">{ body }</p>
      </div>

      <div className="journal__entry-date">
        <span className="journal__entry-day">{ format(new Date( date ), "EEEE") }</span>
        <span className="journal__entry-num">{ format(new Date( date ), "io") }</span>
      </div>
    </div>
  )
}
