import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Checkout from './Components/Checkout'
import Login from './Components/Login'
import NavBar from './Components/NavBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

        <BrowserRouter>
          <div /*ClassName={theme}*/ >
            <NavBar />
            <h1>React Demo App!</h1>
            <Routes>

              <Route path='/checkout' Component={Checkout}/>
              <Route path='/login' Component={Login}/>

            </Routes>
            
          </div>
        </BrowserRouter>

      
    </>
  )
}

export default App
