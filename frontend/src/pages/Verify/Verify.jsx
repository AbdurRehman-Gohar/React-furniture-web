import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/Storecontext';
import axios from 'axios';
const Verify = () => {

  const[searchParams,setserchParams] = useSearchParams();
  const success = searchParams.get("success")
  const orderID = searchParams.get("orderId")

  const {url} = useContext(StoreContext)
 const navigate = useNavigate()
  const verifyPayment = async () =>{
    const responce = await axios.post(url+'/api/order/verify',{success,orderID})
    if(responce.data.success){
   navigate('/myorders')
    }
    else{
      navigate("/")
    }

  }
  useEffect(()=>{
    verifyPayment()
  },[])
  return (
    <div className='Verify'>
       <div className="spinner">

       </div>
     </div>
   
  )
}

export default Verify