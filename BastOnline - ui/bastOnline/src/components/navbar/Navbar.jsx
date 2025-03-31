import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
const Navbar = () => {
    const [menu,setMenu] = useState("home");
  return (
    <div className='navbar'>
        <img src = {assets.logo} alt="" className="logo" />
        <ul className="navbar-menu">
            <li onClick ={() => setMenu("home")} className={menu==="home"?"active":""}>Home</li>
            <li onClick ={() => setMenu("products")} className={menu==="products"?"active":""}>Products </li>
            <li onClick ={() => setMenu("contactUs")} className={menu==="contactUs"?"active":""}>Contact us</li>
        </ul>
        <div className='navbar-right'>
           <img src= {assets.searchIcon} alt="" width="40" height="40"/>
           <div className="navbar-search-icon">
            <img src = {assets.shoppingBasket} alt="" width="40" height="40"/>
            <div className="dot">
            </div>
           </div>
           <button>Sign in</button>
        </div>
    </div>
  )
}

export default Navbar