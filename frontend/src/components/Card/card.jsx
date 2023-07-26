import React from 'react'
import './cardStyle.css'

function Card({detailhandler,imageUrl,date,author,title, desc}) {
  const cardClickHandler = () => {
    detailhandler()
    const newPaperData = {
      imageUrl : imageUrl,
      date : date.split(',')[0],
      author : author,
      title: title,
      desc : desc
    }

    // THIS INSTEAD OF USING REDUX STATE MANAGEMENT and SIMPLIFY THE PROCESS, but FOR PRODUCTION
    localStorage.setItem('newPaperData', JSON.stringify(newPaperData));
  }
  return (
    <div className='card' onClick={() =>cardClickHandler()}>
      <img src={imageUrl} alt="newImage" />
      <div className='card-date-topic-author'>
        <span className='card-date'>{date.split(',')[0]}</span>
        <span className='card-author'>@{author}</span>
      </div>
        <div className='card-title'>{title}</div>
      </div>
  )
}

export default Card
