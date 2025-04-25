import React, { useContext } from 'react'
import "./Collection.css"
import { collection_list } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'



const Collection = () => {
  const {setCategory,category} =useContext(StoreContext)
  // console.log(category);
  
  return (
    <div className='Collection' id='Collection'>
       <div className="all_collections">
        <h1> Furniture Collections</h1>
        <p>There's a reason Furniture.ca is a top choice for quality furniture online. When it comes to furniture at FCA, quality is our top priority. Furniture.ca only offers furniture that is expertly-crafted, durable, and beautifully designed. We stand behind the quality of our furniture with strong customer service and warranties on most items. Our reputation for excellence in the industry is proven through our customer relationships.</p>
        <hr />
        <div className="collection-list">
            {collection_list.map((item,index)=>{
                return(
                    <div key={index}className='collection-list-items'>
                        <div className="items" onClick={() => {
                            // scroll up
                            window.scrollTo({ top: 0, behavior: 'smooth' })}}>
                     <Link to='/product'>  <img onClick={()=> setCategory(item.collection_name)} src={item.collection_image} alt="" /></Link> 
                      <Link to='/product'> <span onClick={()=> setCategory(item.collection_name)} className='nameofcol'>{item.collection_name}</span></Link> 
                        </div>
                      
                    </div>
                    

                )
            })}
        </div>
        </div> 
    </div>
  )
}

export default Collection