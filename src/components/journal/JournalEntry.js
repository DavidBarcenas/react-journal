import React from 'react'

export const JournalEntry = () => {
  return (
    <div className="journal__entry">
      <div className="journal__entry-picture" style={{backgroundImage: 'url(https://www.bmw-m.com/content/dam/bmw/marketBMW_M/common/topics/magazine-article-pool/2019/bmw-m-wallpaper/bmw-m8-gran-coupe-1-of-8_mi-01.jpg.asset.1585240389318.jpg)'}}>
      </div>

      <div className="journal__entry-body">
        <p className="journal__entry-title">Un nuevo día</p>
        <p className="journal__entry-content">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>

      <div className="journal__entry-date">
        <span className="journal__entry-day">Wednesday</span>
        <span className="journal__entry-num">28</span>
      </div>
    </div>
  )
}
