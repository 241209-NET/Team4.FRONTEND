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

  return (
    <>
      <CartProvider>
        <BrowserRouter>
        {(window.location.href.includes("/Department")
         || window.location.href.includes("/checkout")) 
         && !window.location.href.includes("/login") && <NavBar/>}
          <div /*ClassName={theme}*/ >
            <Routes>

              <Route path='/checkout' Component={Checkout}/>
              <Route path='/login' Component={Login} />
              <Route path='/Department' Component={Department}/>

            </Routes>
            
          </div>
        </BrowserRouter>
      </CartProvider>
    </>
  )
}

export default App
