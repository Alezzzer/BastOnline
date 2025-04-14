import React, { useState } from 'react'
import Navbar from './components/navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import MyProfile from './pages/MyProfile/MyProfile'
import UserOrders from './pages/UserOrders/UserOrders'
import Register from './components/Auth/Register'
const App = () => {

  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
   <div className='app'>
    <Navbar setShowLogin={setShowLogin}/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path ='/cart' element={<Cart/>}/>
      <Route path ='/checkout' element={<PlaceOrder />}/>
      <Route path="/profile" element={<MyProfile />} />
      <Route path="/myorders" element={<UserOrders userId={1} />}/>
      <Route path='/register' element = {<Register />}></Route>
   
    </Routes>
   </div>
   <Footer />
   </>
  )
}

export default App

