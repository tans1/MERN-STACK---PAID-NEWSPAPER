import React, { useEffect,useState } from 'react'
import './styles/pymentOptionStyle.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { CircularProgress } from '@mui/material'


function PaymentOption() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(()=>{
      axios.get("http://localhost:5000/user/ispremium", { withCredentials: true })
      .then(res => {
        if (res.data.premium){
          navigate('/details')
        }
        setLoading(false);
      })
      .catch(error => navigate('/login'))
    },[navigate]
  )
  
  const oneTimeHandler = () => {
    const data = {
      paypalAmount : "0.5",
      chapaAmount : "5",
      paymentType : "one time"
    }

    navigate('/make-payment', { state: data });
  }

  const monthlyPremiumHandler = () => {
    const data = {
      paypalAmount : "5",
      chapaAmount : "40",
      paymentType : "monthly premium"
    }

    navigate('/make-payment', { state: data });
  }
  const yearlyPremiumHandler = () => {
    const data = {
      paypalAmount : "100",
      chapaAmount : "500",
      paymentType : "yearly premium"
    }

    navigate('/make-payment', { state: data });
  }




  return (
    <>
      {loading ? <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh"
      }}><CircularProgress size={100} thickness={5} /> </div> : 
      
      <div className='paymentOption'>
      <div className='paymentSuggestion'>MAKE YOU PAYMENT OPTION</div>
      <div className='options'>
        <div className='option-container one' onClick={() => {oneTimeHandler()}}>
            <div className='option type'>
                One News
            </div>
            <div className='option detail'>
                you will get access to current newspaper only
            </div>
            <div className='option amount'>0.5$</div>
        </div>
        <div className='option-container two' onClick={() => {monthlyPremiumHandler()}}>
        <div className='option type'>
                Monthly premium
            </div>
            <div className='option detail'>
                you will have an access to all new in the upcoming one month
            </div>
            <div className='option amount'>5.0$</div>
        </div>
        <div className='option-container three' onClick={() => {yearlyPremiumHandler()}}>
        <div className='option type'>
                Yearly premium
            </div>
            <div className='option detail'>
                you will have an access to all new in the upcoming one month
            </div>
            <div className='option amount'>25$</div>
        </div>
      </div>
    </div>
    }
    
    </>
    
  )
}

export default PaymentOption
