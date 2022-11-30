import React from 'react'
import { Link } from 'react-router-dom'
import { RiHome4Fill } from "react-icons/ri";
const Banner = () => {
  return (
    <div className="banner">
        <div>

       <a href="HOME"className='homeicone'><RiHome4Fill className='homelogo'/></a>
        <a href="/HOME">HOME</a>
        <a href="/MAIL">MAIL</a>
        <a href="/MAIL">NEWS</a>
        <a href="/MAIL">FINANCE</a>
        <a href="/MAIL">SPORTS</a>
        <a href="/MAIL">ENTERTAINMENT</a>
        <a href="/MAIL">LIFE</a>
        <a href="/MAIL">SEARCH</a>
        <a href="/MAIL">SHOPPING</a>
        <a href="/MAIL">YAHOO PLUS</a>
        <a href="/MAIL">MORE...</a>
        </div>
        <div className='last'>
            <span>

        <img src="/Images/Capture.PNG" alt='logo'/>
            </span>
        <button className='Upgradebutt'>Upgrade Now</button>
        </div>
    </div>
  )
}

export default Banner