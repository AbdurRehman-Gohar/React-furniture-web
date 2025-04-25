import React, { useContext } from  'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'
const Cart = () => {
  const { product_list, cartitems, removeFromCart ,getTotalCartAmount ,url} = useContext(StoreContext)
  const Navigate = useNavigate()
  return (
    <div className='Cart'>
      <div className="cart-items">
        <div className="cart-items-tittle">
          <p>Items</p>
          <p>Tittle</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>   
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {product_list.map((item,index) =>{
          if (cartitems[item._id]>0) {
            return(
              <div>
                 <div className="cart-items-tittle  cart-items-item">
                  <img src={ url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                  <p>{cartitems[item._id]}</p>
                  <p>{cartitems[item._id]*item.price}</p>
                  <p className='cross' onClick={()=>removeFromCart(item._id)}>x</p>
                 </div>   
                 <hr />
              </div>
            )
          }
        })}
        </div>
        <div className="cart-bottom">
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
              <p>${getTotalCartAmount()===0?0:8}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+8}</b>
            </div>
          </div>
          <button onClick={()=>Navigate('/order')} >Proceed To CheckOut</button>
        </div>
        <div className="cart-promocode">
          <p>If you have a promocode,Enter it here</p>
          <div className="cart-promocode-input">
            <input type="text" placeholder='promo code' />
            <button>Submit</button>
          </div>
        </div>
      </div>
 
    </div>
  )
}

export default Cart