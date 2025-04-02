import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
        
        <div className="footer-content-left">
        <img src = {assets.logo} alt=""/>
            <p className='text'>We are a passionate team dedicated to bringing you
            the finest organic food straight from local farms. Our mission is to provide fresh, healthy, and sustainably sourced fruits, vegetables, eggs, and dairy products, ensuring every meal is both nutritious and delicious. With a commitment to quality and environmental responsibility, we carefully select and deliver only the best to your doorstep. Experience the taste of nature with us!</p>

        </div>
        <div className="footer-content-center">
            <h2>DELIVERY</h2>
            <p><br></br>Free delivery via Express delivery services!</p>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul><br></br>
            <li>contact@farmonline.com</li>
                <li>+38160012345</li>
                
            </ul>
        </div>
        </div>
        <p className="footer-copyright">Copyright © 2025 farmonline.com - All rights reserved.</p>
        </div>
  )
}

export default Footer