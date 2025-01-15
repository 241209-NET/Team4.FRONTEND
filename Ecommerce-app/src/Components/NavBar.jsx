import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <nav>
        
        {/* Link to my Login component */}
        <Link to='/login'>Login</Link>
        {/* Link to my Department component */}
        <Link to='/department'>Department</Link>
        {/* Link to my Checkout component */}
        <Link to='/checkout'>Checkout</Link>
        
    </nav>
  )
}

export default NavBar