import React from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Order from './pages/Order/Order'
import Add from './pages/Add/Add'
import List from './pages/List/List'

const App = () => {
  return (
    <div>
      <Navbar/>
      <hr/>
      <div className="app-content">
      <Sidebar/>
      <Routes>
        <Route path="/add" element={<Add/>}/>
        <Route path="/list" element={<List/>}/>
        <Route path="/orders" element={<Order/>}/> 
      </Routes>
      </div>
    </div>
  )
}

export default App

