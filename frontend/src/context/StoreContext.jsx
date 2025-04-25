import { createContext, useState, useEffect, use } from "react";
import { product_list } from "../assets/assets";
import axios from 'axios'
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    // Load category from localStorage or default to an empty string
    const [category, setCategory] = useState(() => {
        return localStorage.getItem("category") || "";
    });
    const url = "http://localhost:4000"
    const [product_list, setProductlist] = useState([])
    const [token,setToken] = useState("")
    // console.log(token);
    
    const [id,setID] =useState(() => {
        return localStorage.getItem("id") || "";
    });
   const [cartitems,setCartitems]= useState({})
// console.log(cartitems);

   const addtoCart = async (itemId) =>{
     if (!cartitems[itemId]) {
        setCartitems((prev)=> ({...prev,[itemId]:1}))
     }
     else {
        setCartitems((prev)=>({...prev,[itemId]: prev[itemId]+1}))
     }
     if(token){
        await axios.post(url + "/api/user/add" , {itemId}, {headers:{token}})
     }
     
   }
   
   const removeFromCart = async (itemId) => {
    if(cartitems[itemId]>0){
    setCartitems((prev)=>({...prev,[itemId] : prev[itemId] - 1 }))}
    if(token){
        await axios.post(url + "/api/user/remove" , {itemId}, {headers:{token}})
    }
   }
 const getTotalCartAmount = ()=>{
    let totalamount = 0
    for( const item in cartitems){
        if (cartitems[item]>0) {
            let iteminfo = product_list.find((product)=>product._id===item)
            totalamount += iteminfo.price * cartitems[item]
        }
        return totalamount
    }
 }
 const getData = async() =>{
    let response = await axios.get(`${url}/api/products/get`)
    setProductlist(response.data.Data)
    // console.log(response.data);
    

 }

 const getCart = async (token) =>{
    let response = await axios.post(url + "/api/user/get",{}, { headers: { token } })
    setCartitems(response.data.cartData)

 }
 useEffect(() => {

    async function loadData() {
       
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"))
            await getCart(localStorage.getItem("token"))
        }
    }
    loadData();
}, [])
  // Fetch product data on mount
  useEffect(() => {
    getData();
}, []);

    // Update localStorage whenever category changes
    useEffect(() => {
       
        localStorage.setItem("category", category);
        localStorage.setItem("id", id);
    }, [category,id]);

    const contextValue = {
        category,
        setCategory,
        product_list,
        id,
        setID,
        addtoCart,
        removeFromCart,
        cartitems,
        getTotalCartAmount,
        url,
        setToken,
        token
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;