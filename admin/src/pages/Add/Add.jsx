import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import './Add.css'
import axios from "axios"
const Add = ({url}) => {
  
  const [image, setImage] = useState(false)
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Sofas"
  })
  console.log(data);


  let onChangeHandler = (event) => {
    let name = event.target.name
    let value = event.target.value
    setData(data => ({ ...data, [name]: value }))

  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", data.price)
    formData.append("category", data.category)
    formData.append("image", image)
    let responce = await axios.post(`${url}/api/products/add`, formData)
    if(responce.data.success){
      setData({
        name: "",
        description: "",
        price: "",
        category: "Sofas"
      })
      setImage(false)
      console.log(responce.data.message);
      
    }else{
      console.log(responce.data.message);
      
    }

  }
  return (
    <div className='add'>
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-image-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input type="text" name='name' placeholder='Type here' onChange={onChangeHandler} value={data.name} />
        </div>
        <div className="add-product-Description flex-col">
          <p>Product Description</p>
          <textarea name='description' placeholder='Write content here' rows="6" onChange={onChangeHandler} value={data.description} />
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>product Category</p>
            <select name="category" onChange={onChangeHandler} value={data.category}  >
              <option value="Beds">Beds</option>
              <option value="Center table">Center table</option>
              <option value="Sofas">sofas</option>
              <option value="Dressing table">Dressing table</option>
              <option value="Chair">Chair</option>
              <option value="Office chair">Office chair</option>
              <option value="Console table">Console table</option>
              <option value="L shaped sofa">L shaped sofa</option>
              <option value="Wardrobe">Wardrobe</option>
              <option value=" Dining table">Dining table</option>
              <option value="Divan">Divan</option>
              <option value="Showcase">Showcase</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input type="Number" name='price' placeholder='$20' onChange={onChangeHandler} />
          </div>
        </div>
        <button type='submit' className='add-btn' value={data.price}>ADD</button>
      </form>
    </div>
  )
}

export default Add