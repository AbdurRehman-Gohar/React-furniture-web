import React from 'react'
import "./Header.css"
import { assets } from '../../assets/assets'
const Header = () => {
  return (
    <div className='Header'>
      <img src={assets.header} alt="" />
    </div>
  )
}

export default Header