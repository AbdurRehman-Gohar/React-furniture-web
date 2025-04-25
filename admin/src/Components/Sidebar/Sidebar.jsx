import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className='Sidebar'>
      <div className="sidebar-options">
        <NavLink to='/add' className="add-product same ">
          <img src={assets.add_icon} alt="" />
          <p>Add Product</p>
        </NavLink>
        <NavLink to='list' className="product-list same">
          <img src={assets.order_icon} alt="" />
          <p>Products List</p>
        </NavLink>
        <NavLink to='order' className="order same">
          <img src={assets.order_icon} alt="" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar 