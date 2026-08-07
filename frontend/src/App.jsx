import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Disclaimer from './pages/Disclaimer'
import Navbar from './components/Navbar'
import Home from './pages/Home' 
import Footer from './components/Footer'
import About from './pages/About'
import ReturnPolicy from './pages/ReturnPolicy'
import Shop from './pages/Shop'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Cart from './pages/Cart'
import Login from './pages/Login'
import ProductDetail from './pages/ProductDetails'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import AdminDashboard from './admin/AdminDashBoard';
import AddProduct from './admin/AddProduct';
import AdminProducts from './admin/AdminProducts';
import EditProduct from './admin/EditProduct';
import AdminOrders from './admin/AdminOrders';
import AdminUsers from './admin/AdminUsers';

const App = () => {
  return (
    <Router>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/return' element={<ReturnPolicy />} />
          <Route path='/disclaimer' element={<Disclaimer />} />
          <Route path='/shop' element={<Shop />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/ordersuccess" element={<OrderSuccess />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/edit-product/:id" element={<EditProduct />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/users" element={<AdminUsers />} />

        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
