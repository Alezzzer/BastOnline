import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';

const Navbar = ({setShowLogin}) => {
    const [menu,setMenu] = useState("home");
    
    const scrollToProducts = () => {
        setMenu("products");
        const productsSection = document.getElementById('explore-menu');
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className='navbar'>
            <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
            <ul className="navbar-menu">
                <Link to='/' onClick={() => setMenu("home")} className={menu==="home"?"active":""}>Home</Link>
                <a href="#explore-menu" onClick={scrollToProducts} className={menu==="products"?"active":""}>Products</a>
                <li onClick={() => setMenu("contactUs")} className={menu==="contactUs"?"active":""}>Contact us</li>
            </ul>
            <div className='navbar-right'>
                <img src={assets.searchIcon} alt="" />
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.shoppingBasket} alt="" /></Link>
                    <div className="dot"></div>
                </div>
                <button onClick={()=>setShowLogin(true)}>Sign in</button>
            </div>
        </div>
    )
}

export default Navbar