import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
const Navbar = () => {
  return (
    <div className='Navbar'>
      <img src={assets.logo} alt="" className='img1' />
      <img src={assets.profile_image} alt="" className='profile' />
    </div>
  )
}

export default Navbar