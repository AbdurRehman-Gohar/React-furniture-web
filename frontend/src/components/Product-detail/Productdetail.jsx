import React, { useContext } from 'react'
import "./Productdetail.css"
import Furnitureitems from '../Furnitureitems/Furnitureitems'
import { StoreContext } from '../../context/StoreContext'
import { Link } from 'react-router-dom'
const Productdetail = () => {

  const { setCategory, category, product_list, id, setID ,url } = useContext(StoreContext)
  // console.log(category);
  // console.log(id);

  return (
    <>
      <h1 className='tittle'> {category}</h1>
      <div className='display-list'>
        {product_list.map((item, index) => {
          if (category === item.category) {
            return (
              <>
                <div  key={index} onClick={() => {
                  setID(item._id);
                  // scroll up
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} >
                  <Link to='/product-detail' className="img" key={index} >
                    <Furnitureitems image={item.image} name={item.name} description={item.description} price={item.price} id={item._id} category={item.category} />
                  </Link>
                </div></>
            )
          }
        })}
      </div></>
  )
}

export default Productdetail