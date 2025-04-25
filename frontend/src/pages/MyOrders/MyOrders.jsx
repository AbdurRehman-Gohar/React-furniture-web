import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import {StoreContext} from '../../context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets'
const MyOrders = () => {

  const [data,setdata] = useState([])
  const {url,token} = useContext(StoreContext)

   
  const fetchOrders = async () =>{
    const responce = await axios.post(url + '/api/order/userorder' ,{} ,{headers:{token}})
    console.log(responce.data.data);
    setdata(responce.data.data)
    
  }
  useEffect(()=>{
  if(token){
    fetchOrders()
   
  }

  },[token])
  return (
    <div className='MyOrders'>
          <h2>My orders</h2>
          <div className="contanier">
            {
              data.map((order,index)=>{
                return (
                  
                  <div className="my-orders-order" key={index}>
                   <img src={assets.parcel_icon} alt="" />
                   <p>{order.items.map((item,index)=>{
                    if(index===order.items.length -1){
                      return item.name + "x" + item.quantity
                    }
                    else{
                      return item.name + "x" + item.quantity + ","
                    }
                    
                   })}</p>
                   <p>${order.amount}</p>
                   <p> Items :{order.items.length}</p>
                   <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                   <button>Track Order</button>
                  </div>
                )
              })
            }
          </div>
    </div>
  )
}

export default MyOrders