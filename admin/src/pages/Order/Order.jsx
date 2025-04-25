import React from 'react'
import './Order.css'
import { useState } from 'react'
import axios from'axios'
import {toast} from "react-toastify"
import { useEffect } from 'react'
import {assets} from '../../../src/assets/assets'
const Order = ({url}) => {
  const [orders,setOrders] = useState([])

  const fetchOrders = async () =>{
   const responce = await axios.get(url+"/api/order/list");
   if(responce.data.success){
    setOrders(responce.data.data)
   
   }
   else{
    toast.error("Error")
   }
  }
  useEffect(()=>{
  fetchOrders()
  },[])
 
  
  return (
    <div className='Order add'> 
    <h3>Order page</h3>
    <div className="order-list">
      {orders.map((order,index)=>{
        return(
          <div className="order-item" key={index}>
          <img src={assets.parcel_icon} alt="" />
          <div>
          <p className='order-item-products'>
            {order.items.map((item,index)=>{
               if(index===order.items.length -1){
                return item.name + "x" + item.quantity
              }
              else{
                return item.name + "x" + item.quantity + ","
              }
            })}
          </p>
          <p className="order-item-name">
            {order.address.firstname+""+order.address.lastName}
          </p>
          <div className="order-item-adress">
            <p>{order.address.street+""}</p>
            <p>{order.address.city+"" +order.address.state +"" +order.address.country+""+order.address.zipcode }</p>
          </div>
          <p className="order-item-phone">
            {order.address.phone}
          </p>
          <p> Items:{order.items.length}</p>
          <p>pkr{order.amount}</p>
          </div>
        </div>
        )
      
       
      })}
    </div>
    </div>
  )
}

export default Order 