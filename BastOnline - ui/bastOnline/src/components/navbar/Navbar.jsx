import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");
    const { getTotalCartAmount } = useContext(StoreContext);
    const navigate = useNavigate();
    const location = useLocation();

    const scrollToProducts = () => {
        setMenu("products");
        if (location.pathname !== "/") {
            navigate("/", { replace: false });
            setTimeout(() => {
                const productsSection = document.getElementById('explore-menu');
                if (productsSection) {
                    productsSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100); 
        } else {
            const productsSection = document.getElementById('explore-menu');
            if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const scrollToContact = () => {
        setMenu("contact");
        if (location.pathname !== "/") {
           
            setTimeout(() => {
                const contactSection = document.getElementById('footer');
                if (contactSection ) {
                    contactSection .scrollIntoView({ behavior: 'smooth' });
                }
            }, 100); 
        } else {
            const contactSection  = document.getElementById('footer');
            if (contactSection ) {
                contactSection .scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <div className='navbar'>
            <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
            <ul className="navbar-menu">
                <Link  to='/' onClick={() => setMenu("home")}  className={menu === "home" ? "active" : ""}>Home</Link>
                <a onClick={scrollToProducts} className={menu === "products" ? "active" : ""}>Products</a>
                <a onClick={scrollToContact} className={menu === "contactUs" ? "active" : ""}>Contact us</a>
            </ul>
            <div className='navbar-right'>
                <img src={assets.searchIcon} alt="" />
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.shoppingBasket} alt="" /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
                <button onClick={() => setShowLogin(true)}>Sign in</button>
            </div>
        </div>
    );
};

export default Navbar;
