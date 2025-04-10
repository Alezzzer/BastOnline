import React from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Order from './pages/Order/Order'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
import Users from './pages/User/Users'

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr/>
      <div className="app-content">
      <Sidebar/>
      <Routes>
        <Route path="/add" element={<Add/>}/>
        <Route path="/list" element={<List/>}/>
        <Route path="/orders" element={<Order/>}/> 
        <Route path="/users" element={<Users/>}/> 
      </Routes>
      </div>
    </div>
  )
}

export default App

