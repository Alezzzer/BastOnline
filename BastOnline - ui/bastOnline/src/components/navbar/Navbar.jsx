import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");
    const [searchQuery, setSearchQuery] = useState("");
    const { getTotalCartAmount, clearCart, user, logout } = useContext(StoreContext);
    const navigate = useNavigate();
    const location = useLocation();
    console.log("Navbar user:", user);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const handleSearchKeyDown = (e) => {
        if (e.key === 'Enter') {
            const query = searchQuery.trim();
            navigate(`/?search=${encodeURIComponent(query)}`);

            setTimeout(() => {
                const productsSection = document.getElementById('explore-menu');
                if (productsSection) {
                    productsSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    };

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
            navigate("/");
            setTimeout(() => {
                const contactSection = document.getElementById('footer');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            const contactSection = document.getElementById('footer');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const handleSignOut = () => {
        logout();
        clearCart();
        setShowUserMenu(false);
        navigate("/");
    };

    return (
        <div className='navbar'>
            <Link to='/'><img src={assets.logo} alt="Logo" className="logo" /></Link>
            <ul className="navbar-menu">
                <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
                <a onClick={scrollToProducts} className={menu === "products" ? "active" : ""}>Products</a>
                <a onClick={scrollToContact} className={menu === "contact" ? "active" : ""}>Contact us</a>
            </ul>
            <div className='navbar-right'>
                <input
                    type="text"
                    placeholder="Search products..."
                    className="navbar-search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                />
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.shoppingBasket} alt="Cart" /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>

                {user && user.email ? (
                    
  <div className="navbar-user-menu">
    <img
    
      src={assets.usericon}
      alt="User"
      className="navbar-user-icon"
      onClick={() => setShowUserMenu(!showUserMenu)}
    />
    {showUserMenu && (
      <div className="user-dropdown">
        <Link to="/profile" onClick={() => setShowUserMenu(false)}>My Profile</Link>
        <Link to="/myorders" onClick={() => setShowUserMenu(false)}>My Orders</Link>
        <button onClick={handleSignOut}>Log out</button>
      </div>
    )}
  </div>
) : (
  <button onClick={() => setShowLogin(true)}>Sign in</button>
)}

            </div>
        </div>
    );
};

export default Navbar;
