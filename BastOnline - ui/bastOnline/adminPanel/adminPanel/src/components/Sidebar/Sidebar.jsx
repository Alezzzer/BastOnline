import React from 'react'
import {assets} from '../../assets/assets'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/add' className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Add items</p>
        </NavLink>
        <NavLink to = '/list' className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>List items</p>
        </NavLink>
        <NavLink to = '/orders' className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Orders</p>
        </NavLink>
        <NavLink to = '/users' className="sidebar-option">
          <img src={assets.user_icon} width={30} height={30} alt="" />
          <p>Users</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar