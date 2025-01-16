import { useState, createContext, useContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Checkout from './Components/Checkout'
import Login from './Components/Login'
import NavBar from './Components/NavBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.css'
import Department from './Components/Department'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { CartProvider } from './Components/cart'

function App() {
  const [count, setCount] = useState(0)
  

  return (
    <>
      {/* <CartProvider> */}
        <BrowserRouter>
          <div /*ClassName={theme}*/ >
            <NavBar />
            
            <Routes>

              <Route path='/checkout' Component={Checkout}/>
              <Route path='/login' Component={Login}/>
              <Route path='/department' Component={Department}/>

            </Routes>
            
          </div>
        </BrowserRouter>
      {/* </CartProvider> */}
    </>
  )
}

export default App
