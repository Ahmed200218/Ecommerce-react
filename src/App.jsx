import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Cart from './components/Cart/Cart';
import Wishlist from './components/Wishlist/Wishlist';
import Products from './components/Products/Products';
import Categories from './components/Categories/Categories';
import Brands from './components/Brands/Brands';
import Notfound from './components/Notfound/Notfound';
import Code from './components/Code/Code';
import ResetPassword from './components/ResetPassword/ResetPassword';
import UserTokencontextProvider, { UserTokencontext } from './Context/UserTokenContext';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartContextProvider from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import CheckOut from './components/CheckOut/CheckOut';
import WishListContextProvider from './Context/WishListContext';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';



const routes = createBrowserRouter([
  {
    path: "", element: <Layout />, children: [
      { path:"register", element: <Register /> },
      { path: "login", element: <Login /> },
      { index: true, element: <Home /> },
      { path: "cart", element: <Cart /> },
      { path: "wishlist", element: <Wishlist /> },
      { path: "products", element: <Products /> },
      { path: "categories", element: <Categories /> },
      { path: "brands", element: <Brands /> },
      { path: "forgotPassword", element: <ForgotPassword /> },
      { path: "code", element: <Code /> },
      { path: "resetPassword", element: <ResetPassword /> },
      { path: "productDetails/:id", element: <ProductDetails /> },
      { path: "checkOut/:cartId", element: <CheckOut /> },


      { path: "*", element: <Notfound /> },
    ]
  }
])

function App() {


  <Toaster

  />

  return (
    <>
      <UserTokencontextProvider>
        <CartContextProvider>
          <WishListContextProvider>
            <RouterProvider router={routes}></RouterProvider>
          </WishListContextProvider>
        </CartContextProvider>
      </UserTokencontextProvider>
      <Toaster position="bottom-center" reverseOrder={false}></Toaster>

    </>
  )
}

export default App
