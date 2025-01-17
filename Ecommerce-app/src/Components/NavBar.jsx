import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <nav id = "navBar">
        
        {/* Link to my Login component */}
        <button onClick={toLogin}>Log Out </button>
        {/* Link to my Department component */}
        <button onClick={toDept}>Department</button>
        {/* Link to my Checkout component */}
        <button onClick={toCheck}>Checkout</button>

    </nav>
  )
}

function toLogin(){
  window.location.href = "/login"
}
function toDept(){
  window.location.href = "/Department"
}
function toCheck(){
  window.location.href = "/checkout"
}
export default NavBar