import React, { useEffect } from 'react'
import './styles/makePayment.css'
import axios from 'axios'
import paypalLogo from '../assets/PayPal-Logo.png'
import chapaLogo from '../assets/chapa.jpg'
import { useLocation } from 'react-router-dom';
import { CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

function MakePayment() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const location = useLocation();
    const paypalAmount = location.state.paypalAmount;
    const chapaAmount = location.state.chapaAmount
    const paymentType = location.state.paymentType

    useEffect(()=>{
        axios.get('http://localhost:5000/user/isloggedIn', { withCredentials : true })
            .then(res => {
                if (res.status === 200){
                    setLoading(false)
                }
                else {
                    navigate('/login')
                }
            })
            .catch( err => {
                navigate('/login')
            })


    },[navigate])

    const paypalHandler = () => {
        axios.post("http://localhost:5000/payment/paypal/pay",{paypalAmount,paymentType})
            .then(res => {
                console.log(res.data)
            }
            )
            .catch(error => console.log(error))
    }

    const chapaHandler = () => {
        axios.post("http://localhost:5000/payment/chapa/pay",{chapaAmount,paymentType})
            .then(res => {
                console.log(res.data)
            }
            )
            .catch(error => console.log(error))
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
        }}><CircularProgress size={100} thickness={5} /> </div> 
    : 
        <div className='payment'>
        <div className='payment-type'>
            <div className='paypal' onClick={() => {paypalHandler()}}>
                <img src={paypalLogo} alt="paypal logo" />
                <div className='payment-desc'>
                    <span>{paymentType}</span>
                    <span>{paypalAmount} $</span>
                </div>
            </div>
            <div className='chapa' onClick={() => {chapaHandler()}}>
            <img src={chapaLogo} alt="chapa logo" />
                <div className='payment-desc'>
                    <span>{paymentType}</span>
                    <span>{chapaAmount} ETB</span>
                </div>
            </div>
        </div>
        </div>
    }
    </>
    
  )
}

export default MakePayment
