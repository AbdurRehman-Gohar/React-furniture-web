import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Cart from './pages/Cart/Cart'
import { useEffect } from "react";
import Footer from './components/Footer/Footer'
import { Route, Routes,useLocation, useNavigate } from 'react-router-dom'
import Home from "./pages/Home/Home"
import Product from './pages/product/Product'
import SingleProduct from './components/SingleProduct/SingleProduct'
import PlaceOrder from './pages/Placeorder/PlaceOrder';
import LoginPoupup from './components/LoginPoupup/LoginPoupup';
import Shop from './pages/Shop/Shop';
import Verify from './pages/Verify/Verify'
import MyOrders from "./pages/MyOrders/MyOrders"
const App = () => {
 const[showLogin,setShowLogin] = useState(false)
  
  return (
   <> <div>
     {showLogin?<LoginPoupup setShowLogin={setShowLogin}/>:<></>}
      <div className="app">
     
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/product' element={<Product/>}/>
        <Route path='/product-detail' element={<SingleProduct/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>
        <Route path='/Shop'  element={<Shop/>}/>
        <Route path='/verify'  element={<Verify/>}/>
        <Route path='/myorders'  element={<MyOrders/>}/>
      </Routes>
      </div>
     
    </div>
     <Footer/>
     </>
  )
}

export default App