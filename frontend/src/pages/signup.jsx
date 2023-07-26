import React , { useState } from 'react'
import './styles/signUpstyle.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import googleIcon from '../assets/gooleIcon.png'

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    if (!username | !password){
      document.querySelector('.error').innerHTML = 'please fill all the fields';
    } 
    else {
        axios.post("http://localhost:5000/user/signup",{username,password})
        .then(res => {
          if (res.status === 200){
            navigate('/login')
          }
        })
        .catch(error =>{
          console.log(error)
        })
    }
  }

  return (
    <div className='signUp'>
      <div className='local--auth'>
        <label htmlFor="username">username</label>
        <input type="text" name='username' placeholder='username' onChange={e => setUsername(e.target.value)}/>
        <label htmlFor="password">password</label>
        <input type="password" name='password' placeholder='password' onChange={e => setPassword(e.target.value)}/>
        <div className='error'></div>
        <button onClick={() => handleSignup()}>signup</button>
      </div>

      <div className='gmail' >
        <a href="http://localhost:5000/user/googleauth" >
        <img src={googleIcon} alt="google Icon" /> signup with google</a>
      </div>
      <div className='loginOption'>have an account? <Link to={'/login'}>login</Link></div>
    </div>
  )
}


export default Signup
