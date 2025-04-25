import React, { useContext } from 'react'
import './SingleProduct.css'
import { StoreContext } from '../../context/StoreContext'
import Furnitureitems from '../Furnitureitems/Furnitureitems'
import { Link } from 'react-router-dom'
const SingleProduct = () => {
  const { product_list, id, setID, category,addtoCart,removeFromCart,cartitems,url} = useContext(StoreContext)
  // console.log(id);
  
  return (
    <div className='SingleProduct' id='SingleProduct'>
      {product_list.map((item, index) => {
        if (item._id === id) {
          return (
            <>
              <div key={index} className='single-product-data'  >
                <div className="left">
                  <img src={url+"/images/"+item.image} alt="" className='img' />
                </div>
                <div className="right">
                  <h3>{item.name}</h3>
                  <p>${item.price}</p>
                  <hr />
                  <div className="description">
                    {item.description}
                  </div>
                  <div className="addtocart-quantity">
                    <div className="input-left" onClick={()=>removeFromCart(item._id)}>-</div>
                    <input type="number" placeholder='0' value={cartitems[id]}/>
                    <div className="input-right" onClick={()=>addtoCart(item._id)}>+</div>
                    <button onClick={()=>addtoCart(item._id)}>ADD TO CART</button>
                  </div>
                </div>
              </div>
              <div className="related-products-Details">
                <h1>Related Products</h1>
                <hr />
                <div className="related-products"> 
                  {product_list
                    // 1. keep only same-category items (and skip the one we're viewing)
                    .filter(item => item.category === category && item._id !== id)
                    // 2. take only the first 8
                    .slice(0, 8)
                    .map((item, index) => {
                      {
                      
                        
                        return (
                          <div  key={index} onClick={() => {
                            setID(item._id);
                            // scroll up
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}>
                            <Link to='/product-detail' className="img" key={index} >
                              <Furnitureitems image={item.image} name={item.name} description={item.description} price={item.price} id={item._id} category={item.category} />
                            </Link></div>
                        )
                      }
                    })}</div></div>
                   
                     {
                       <div className="written-details">
                       <p> The bed is one of the most important pieces of furniture in any home. It is where we start and end each day, so it’s important to choose a bed that provides both comfort and style. Furniture stores have a variety of bed designs to choose from, but finding the perfect one can be overwhelming. That’s why we’ve created a comprehensive guide to help you choose the right bed design for your home.</p>
                       <p>In Pakistan, the bed design industry has been growing rapidly in recent years. With a focus on quality, comfort, and affordability, Pakistani bed design has become a popular choice for furniture buyers all over the world. Whether you’re looking for a traditional or contemporary design, you’re sure to find something that fits your style and budget at a furniture store in Pakistan.</p>
                       <p>When shopping for a bed, it’s important to consider the size of your room and the size of the bed you need. If you have a small room, you may want to consider a twin or full-size bed. If you have a larger room, you can choose a queen, king size bed. It’s important to measure your room and make sure you have enough space for the bed you want.</p>
                       <p>Another important consideration when choosing a bed is the type of bed frame you want. There are many different types of bed frames to choose from, including metal, wood, and upholstered. The type of bed frame you choose will depend on your personal style, as well as the style of your room. If you’re looking for a traditional look, you may want to consider a wooden bed frame. If you’re looking for something more modern, you may want to choose a metal or upholstered bed frame.</p>
                       <p>One of the most popular bed designs in Pakistan is the traditional four-poster bed. This style of bed has been used for centuries and is still popular today. The four posters add an elegant touch to any room.</p>
                       <p>Another popular bed design in Pakistan is the contemporary platform bed. This style of bed is simple and modern, and it’s perfect for those who want a clean, uncluttered look in their bedroom. Platform beds are available in a variety of materials, including wood and metal, and they’re often upholstered for added comfort.</p>
                       <p>If you’re looking for something unique, you may want to consider a custom bed design. Custom beds are made to order, so you can choose the exact style, size, and materials you want. Whether you’re looking for a traditional or contemporary design, you’re sure to find something that fits your personal style and budget.</p>
                     </div>
                    }
             
            </>
          )
        }
      })}
    </div >
  )
}

export default SingleProduct