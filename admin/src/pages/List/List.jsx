import React, { useEffect }  from 'react'
import './List.css'
import axios from 'axios'
import  { useState } from 'react'
const List = ({url}) => {
  console.log(url);
  
  const [list,setList]= useState([])
 

  const fetchList = async () =>{
    let response = await axios.get(url + "/api/products/get")
    if (response.data.success) {
      console.log(response.data);
      setList(response.data.Data)
      console.log(response.data.Data);
      
    }
    else{
      console.log("error");
      
    }
  }
  let removeData =async (itemid) =>{
    let response = await axios.post(url+"/api/products/remove" ,{id:itemid})
    await fetchList();
    if (response.data.success){
      console.log(response.data.message);
      
    }
    else{
      console.log(response.data.message);
      
    }
  }
    // to reload the page whenever the data is added
  useEffect(()=>{
    fetchList();
  },[])
  return ( 
    <div className='List add flex-col' >
      <p>All Food List</p>
      <div className="List-table">
        <div className="list-table-format">
          <b> Image</b>
          <b> Name</b>
          <b> Category</b>
          <b> Price</b>
          <b> Action</b>
        </div>
        {list.map((item,index)=>{
          return(
            <div key={index} className="list-table-format">
              <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p className='cursor'  onClick={()=>removeData(item._id) }>x</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List