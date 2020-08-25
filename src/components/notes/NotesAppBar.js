import React from 'react'

export const NotesAppBar = () => {
  return (
    <div className="notes__appbar">
      <span className="notes__appbar-date"> 28 de Agosto de 2020 </span>
      <div>
        <button className="btn"> pic </button>
        <button className="btn"> Save </button>
      </div>
    </div>
  )
}
