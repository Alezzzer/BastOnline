import React, { useState } from 'react'
import Navbar from './components/navbar/Navbar'

import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import MyProfile from './pages/MyProfile/MyProfile'
import UserOrders from './pages/UserOrders/UserOrders'
import { useContext } from 'react';
import { StoreContext } from './context/StoreContext';

import { Route, Routes, Navigate } from 'react-router-dom';

const App = () => {

  const [showLogin, setShowLogin] = useState(false)
  const { user } = useContext(StoreContext);
  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
   <div className='app'>
    <Navbar setShowLogin={setShowLogin}/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path ='/cart' element={<Cart/>}/>
      <Route path="/checkout" element={<PlaceOrder />} />
      <Route path="/profile" element={<MyProfile />} />
      <Route path="/myorders" element={<UserOrders userId={1} />}/>
   
    </Routes>
   </div>
   <Footer />
   </>
  )
}

export default App

