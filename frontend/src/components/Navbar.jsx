import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import '../styles/navbar.css'
import { AuthContext } from '../context/AuthContext'
import logo from "../images/Logo.png";
import { useContext } from 'react'
import {useSelector} from 'react-redux'
const Navbar = () => {
  // kyunki yha pe user ki janari aur logout wali cheeze dikh rhi hongi 
  const {user,logout}= useContext(AuthContext)
  // auth context ke andar value hai jo ham abhi le rhe hai thik hai 

  // basically hamne jo store bnaya the wha pe cart naam ke reducers se isne .cartItems banaya hai 

  const cartItems = useSelector(
  (state) => state.cart?.cartItems || []
);
  // cartItems intialstate hai jo hamne slice bnate waqt likhi thi 

  const navigate =useNavigate();
  const isAdmin = (user?.role || 'user').toLowerCase() === 'admin';

  const handleLogout =()=> {
    logout();
    // it will take you back to the login page 
    navigate('/login')
  }
  return (
    // basically we are making a navbar so to make it beautiful we will use the css for that we are using the classname 
    <nav className='navbar'>
      <div className='navbar-brand'>
        {/* so I want ki hamare paas ek logo aaye jisme ki ham click kare to kuch ho  */}
        <Link to="/">
        <img src={logo} alt='lallu' className='navbar-logo' style={{ height: '36px', width: '36px', borderRadius: '8px', objectFit: 'cover', filter: 'drop-shadow(0 2px 8px rgba(249, 115, 22, 0.35))' }}/>
           ShopNest      
        </Link>
      </div>
      <ul className='navbar-links'>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/cart">Cart ({cartItems.length})</Link></li>
        {user ? (
          <>
          <li><Link to="/profile">Hi! {user.name}</Link></li>
          {/* if it is a admin then make a link which  will redirect to the admin page  */}
          {isAdmin && <li><Link to="/admin">Admin</Link></li>}
          <li><button onClick={handleLogout} className='btn-logout'>Logout</button></li>
          </>
        ): (<Link to="/login">Login</Link>)
        }
      </ul>
    </nav>
  )
}

export default Navbar
