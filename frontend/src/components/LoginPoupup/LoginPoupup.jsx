import React, { useContext, useState } from 'react'
import './LoginPoupup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
const LoginPoupup = ({ setShowLogin }) => {
  let {url,setToken} = useContext(StoreContext)
  let [currState, setCurrState] = useState("login")
  let [Data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })
  let onchangeHandler = (event) => {
      let name = event.target.name
      let value = event.target.value
      setData(Data => ({...Data, [name] :value}))
  }
  const onlogin = async (event) =>{
    event.preventDefault()
    let newUrl=url
    if(currState==="login"){
        newUrl += "/api/user/login"
    }
    else{
      newUrl += "/api/user/register"
    }

    let response = await axios.post(newUrl,Data)
    if(response.data.success){
      setToken(response.data.token)
      localStorage.setItem("token",response.data.token)
      setShowLogin(false)
    } else {
      alert(response.data.message)
  }
  }
  return (

    <div className='LoginPoupup'>
      <form className='login-poupup-contanier' onSubmit={onlogin}>
        <div className="name">
          <p>{currState}</p>
          <img src={assets.cross_icon} onClick={() => setShowLogin(false)} alt="" />
        </div>
        <div className="inputs">
          {currState === "sign Up" ? <input type="text" placeholder="Your Name" name='name'onChange={onchangeHandler} value={Data.name} id="" required /> : <></>}
          <input type="text" name='email' placeholder='Your Email' required value={Data.email} onChange={onchangeHandler} />
          <input type="text" name='password' placeholder='Password' required value={Data.password} onChange={onchangeHandler}/>
        </div>
        <button>{currState === "login" ? "login" : "Create Account"}</button>
        <div className="login-poupup-condations">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "login" ?
          <p>create a new account <span onClick={() => setCurrState("sign Up")}>Click here</span> </p> : <p>Already have an account? <span onClick={() => setCurrState("login")}>Login here</span></p>}
      </form>
    </div>
  )
}

export default LoginPoupup