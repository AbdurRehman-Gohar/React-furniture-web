import React, { useContext, useState } from 'react'
import "./Navbar.css" 
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({setShowLogin}) => {

  let [menu,setMenu] = useState("Home")
  let {token , setToken} = useContext(StoreContext)

  
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/")


  } 
  return (
    <div className='Navbar'>
     <Link to='/'> <img src={assets.logo} alt="" className='logo'/> </Link>
      <ul className="navbar-menu">
        <Link to="/" className={menu==="Home"? "active":""} onClick={()=>setMenu("Home")}>Home</Link>
        <a href='#Collection' className={menu==="Collections"? "active":""} onClick={()=>setMenu("Collections")}>Collections</a>
        <li className={menu==="Contact us"? "active":""} onClick={()=>setMenu("Contact us")}>Contact us</li>
        <Link to='/Shop' className={menu==="Shop"? "active":""} onClick={()=>setMenu("Shop")}>Shop</Link>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="cart-button">
         <Link to="/Cart"><img src={assets.basket_icon} alt="" /></Link> 
        </div>
        <div className="btn">
        {!token ? <button onClick={() => setShowLogin(true)}>sign in</button> : <div className='navbar-profile'>
          <img src={assets.profile_icon} alt="" />
          <ul className="navprofile-dropdown">
            <li onClick={()=>navigate("/myorders")}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
            <hr />
            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>logout</p></li>
          </ul>
        </div>}
        </div>
 
      </div>
    </div> 
  )
}   

export default Navbar