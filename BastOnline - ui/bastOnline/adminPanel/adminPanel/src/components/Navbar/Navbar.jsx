import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import './Navbar.css';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    
    localStorage.removeItem("token");
    localStorage.removeItem("admin-token");
    localStorage.removeItem("user");

    
    window.location.replace("http://localhost:3001/");
  };

  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt="Logo" />

      <div className="profile-container" onClick={() => setShowDropdown(!showDropdown)}>
        <img className='profile' src={assets.profile_image} alt="Profile" />

        {showDropdown && (
          <div className="dropdown">
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
