import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'
import { Routes , Route } from "react-router-dom"
import Add from './pages/Add/Add'
import Order from './pages/Order/Order'
import List from './pages/List/List'
const App = () => {

   const url = "http://localhost:4000"
  return (
    <div>
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path='/add' element={<Add url={url}/>}></Route>
          <Route path='/list' element={<List url={url}/>}></Route>
          <Route path='/order' element={<Order url={url}/>}></Route>

        </Routes>
      </div>
    </div>
  )
}

export default App