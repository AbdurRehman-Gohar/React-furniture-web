import React, { useContext } from 'react'
import './Shop.css'
import { StoreContext } from '../../context/StoreContext'
import Furnitureitems from '../../components/Furnitureitems/Furnitureitems'
import { Link } from 'react-router-dom'

const Shop = () => {
    const { product_list , setID,category,setCategory } = useContext(StoreContext)
      // Create a shuffled copy of the product list
      const shuffledProducts = [...product_list].sort(() => Math.random() - 0.5);
    return (
        <div className='Shop'>
            {shuffledProducts.map((item, index) => {
                return (
                    <div key={index} className='products' onClick={() => {
                        setID(item._id);
                        // scroll up 
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setCategory(item.category)
                      }}>
                      <Link to='/product-detail' className="img" key={index} >
                              <Furnitureitems image={item.image} name={item.name} description={item.description} price={item.price} id={item._id} category={item.category} />
                            </Link>
                    </div>) 
           } ) }
        </div> 
    )
}

export default Shop