import React, { use, useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const PlaceOrder = () => {
  const { getTotalCartAmount, token, product_list, cartitems, url } = useContext(StoreContext)

  const [data, setData] = useState({
    firstname: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })
  let onchangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData(data => ({ ...data, [name]: value }))
  }
  // useEffect(()=>{
  //   console.log(data);

  // },[data])
  const placeOrder = async (event) => {
    event.preventDefault()
    let orderitem = [];
    product_list.map((item)=>{
      if(cartitems[item._id]>0){
        let itemInfo = item;
        itemInfo["quantity"] = cartitems[item._id]
        orderitem.push(itemInfo)
      }
     
      
    })
    console.log(orderitem);

    let orderData = {
      address : data,
     items:orderitem,
     amount:getTotalCartAmount()+2 
    }
    let response = await axios.post(url+'/api/order/place',orderData,{headers:{token}})
    if (response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url)
      console.log(session_url);
      
    }
    else{
      alert("error")
    
    }
  }
  const navigate = useNavigate()
 useEffect(()=>{
  if(!token){
   navigate('/cart')
  
  }
  else if(getTotalCartAmount()===0){
    navigate('/cart')
  }
 },[token])

  return (

    <form className='Place-order' onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="tittle">Delivery Information</p>
        <div className="multi-fields">
          <input required type="text" placeholder='First name' name='firstname' onChange={onchangeHandler} value={data.firstname} />
          <input required type="text" placeholder='Last Name' name='lastName' onChange={onchangeHandler} value={data.lastName} />
        </div>
        <input required type="text" placeholder='Email' name='email' onChange={onchangeHandler} value={data.email} />
        <input  requiredtype="text" placeholder='Street' name='street' onChange={onchangeHandler} value={data.street} />
        <div className="multi-fields">
          <input required type="text" placeholder='City' name='city' onChange={onchangeHandler} value={data.city} />
          <input required type="text" placeholder='State' name='state' onChange={onchangeHandler} value={data.state} />
        </div>
        <div className="multi-fields">
          <input required type="text" placeholder='Zip Code' name='zipcode' onChange={onchangeHandler} value={data.zipcode} />
          <input  requiredtype="text" placeholder='Country' name='country' onChange={onchangeHandler} value={data.country} />
        </div>
        <input required type="text" placeholder='Phone' name='phone' onChange={onchangeHandler} value={data.phone} />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type='submit'>Proceed To CheckOut</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder