import React, { useEffect, useState } from 'react'
import './styles/detailsPageStyle.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { CircularProgress } from '@mui/material'

function Details() {
  const [news , setNews] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    axios.get("http://localhost:5000/user/ispremium", { withCredentials: true })
      .then(res => {
        if (!res.data.premium){
          navigate('/payment-option')
        } 
        else {
          const newPaperData = JSON.parse(localStorage.getItem('newPaperData'));
          setNews(newPaperData)
          setLoading(false)
          localStorage.clear();
        }
      })
      .catch(error => navigate('/login'))
  },[navigate])

  return (
    <>
      {loading ? 
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh"
      }}><CircularProgress size={100} thickness={5} /> </div> :
      
      <div className='details--container'>
        <img src={news?.imageUrl} alt="new image" />

        <div className='details-date-topic-author'>
          <span className='detail-date'>{news?.date}</span>
          <span className='detail-author'>@ {news?.author}</span>
        </div>
          <div className='detail-title'>{news?.title}</div>
          <div className='detail-description'>{news?.desc}</div>
      </div>
      }
    </>
    
  )
}

export default Details
