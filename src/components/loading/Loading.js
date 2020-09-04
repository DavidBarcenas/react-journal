import React from 'react'

export const Loading = ({ color }) => {
  return (
    <div className="fa-3x" style={ {color: color} }>
      <i className="fas fa-spinner fa-spin"></i>
    </div>
  )
}
