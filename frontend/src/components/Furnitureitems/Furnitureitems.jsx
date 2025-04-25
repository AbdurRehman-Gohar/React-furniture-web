import React, { useContext, } from 'react'
import './Furnitureitems.css'
import { assets } from '../../assets/assets'
import { useLocation, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'


const Furnitureitems = ({ id, name, image, price, description,category}) => {
  const {url} = useContext(StoreContext)
  // console.log("Image URL:", url + "/images/" + image);
  return (
   <>
    
    <div className='Furnitureitems'>
      <div className="items-image-contanier">
        <img src={url+"/images/"+image} className="items-image" alt="" />

      </div>
      <div className="item-info">
        <div className="item-name-rating">
          <p className='item-name'>{name}</p>
          <img src={assets.rating_starts} alt="" className='image'/>
        </div>
        <p className="item-price">
        ${price}
        </p>
      </div>
      
    </div> 
    </> 
  )
}

export default Furnitureitems