import React, { useState } from 'react'
import './footerStyle.css'
import axios from 'axios';

function Footer() {
  const [senderEmail, setSenderEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const handleFeedback = () => {
    if ( !senderEmail | !feedback){
      document.querySelector('.error').innerHTML = 'please fill all the fields';
    } else {
      axios.post("http://localhost:5000/news/feedback",{senderEmail, feedback})
        .then(res => {
          if (res.status === 200){
            document.querySelector('.error').innerHTML = 'thanks for your feedback';
          }
        })
        .catch(error =>{console.log(error)})
    }
  }
  return (
    <div className='footer'>
        <div className='footer__content'>
            <span className='footer-motto'>Empowering Knowledge, Inspiring Perspectives, Shaping Tomorrow !!!</span>
            <div className='feedback'>
                <span>leave your feedback</span>
                <input type='text' placeholder='enter your email' onChange ={(e) => setSenderEmail(e.target.value)} />
                <textarea placeholder='your feedback' onChange ={(e) => setFeedback(e.target.value)}/>
                <div className='error'></div>
                <button onClick={()=> {handleFeedback()}}>send</button>
            </div>
        </div>
      
    </div>
  )
}

export default Footer
