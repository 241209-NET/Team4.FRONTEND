import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <nav>
        <ul>
            {/* Link to my Checkout component */}
            <li><Link to='/checkout'>Checkout</Link></li>
            {/* Link to my Login component */}
            <li><Link to='/login'>Login</Link></li>
        </ul>
    </nav>
  )
}

export default NavBar