import React, { useEffect, useState } from 'react'
import HomeHeader from '../components/header/header'
import ImageSlider from '../components/imageSlider/imageSlider'
import Card from '../components/Card/card'
import './styles/homeStyle.css'
import Footer from '../components/footer/footer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { CircularProgress } from '@mui/material'

function Home() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState('general');
  const [news, setNews] = useState([]);
  const [imageSlide, setImageSlide] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(()=> {
    axios.get(`http://localhost:5000/news/all/${topic}`)
      .then(res => {
        const result = res.data
        setNews(result)
        setImageSlide(result.slice(0,5))
        setLoading(false)
      })
      .catch(err => console.log(err))
  },[topic]);

  const detailHandler = ()=>{
    axios.get('http://localhost:5000/user/isloggedIn', { withCredentials : true })
      .then(res => {
        navigate('/payment-option')
      })
      .catch( err => {
        navigate('/login')
      })
  }


  return (
    <>
    
    { loading ? 
    
    <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh"
    }}><CircularProgress size={100} thickness={5} /> </div> :
    <>
    <div style={{  padding: "0 50px"}}>
      <HomeHeader />
      <ImageSlider imageSlide = {imageSlide}/>
      <nav >
        <ul>
          <li onClick={()=>{setTopic('general')}}>#general</li>
          <li onClick={()=>{setTopic('business')}}>#business</li>
          <li onClick={()=>{setTopic('health')}}>#health</li>
          <li onClick={()=>{setTopic('science')}}>#science</li>
          <li onClick={()=>{setTopic('technology')}}>#technology</li>
          <li onClick={()=>{setTopic('sports')}}>#sports</li>
          <li onClick={()=>{setTopic('entertainment')}}>#entertainment</li>
        </ul>
      </nav>

      <div style={{display: 'grid', gridTemplateColumns: "1fr 1fr", gap: "50px", marginLeft : "100px"}}>
        {
          news.map((item, index) => 
            <Card key={index} detailhandler = {() => detailHandler()} 
              imageUrl={item.imageUrl} date={item.date}  author={item.author} title = {item.title} desc = {item.desc}/>
          )

        }
      </div>
      
      
    </div>
    <Footer /> 
    </>
    }
  </>
  )
}

export default Home
