import React from 'react'
import logo from '../../assets/pychart.jpg'
import './headerStyle.css'

function HomeHeader() {
  return (
    <div className='homePage-header' >
      <div className='header-logo'>
        <img src={logo} alt="log" />
        <span>global News</span>
      </div>
      <div className='header-desc-container'>
        <div className='motto'>Unveiling Truth, Empowering Change !!!</div>

        <div className='header-desc'>Transparency in Reporting. Empowering Communities.
            Igniting Conversations. Our mission is to deliver credible news that sparks
            awareness, engagement, and meaningful impact in a rapidly evolving world.
        </div>
      </div>
    </div>
  )
}

export default HomeHeader
