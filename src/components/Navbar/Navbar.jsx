import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom'
import logo from '../../assets/images/freshcart-logo.svg'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { UserTokencontext } from '../../Context/UserTokenContext';
import { CartContext } from '../../Context/CartContext';


const navigation = [
  { name: 'Home', href: 'home', current: false },
  { name: 'Cart', href: 'cart', current: false },
  { name: 'Wishlist', href: 'wishlist', current: false },
  { name: 'Products', href: 'products', current: false },
  { name: 'categories', href: 'categories', current: false },
  { name: 'Brands', href: 'brands', current: false }
]



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



export default function Navbar() {

  let { count } = useContext(CartContext)
  let {token,setToken} = useContext(UserTokencontext)
  
  useEffect(() => {
  }, [])

  function logout (){
    setToken(null)
    localStorage.removeItem("token")
  }


  return (
    <>
    <Disclosure as="nav" className="bg-F8F9FA fixed top-0 left-0 right-0 py-2 scroll z-40" id="nav">
      <div className="bg-F8F9FA lg:mx-24 px-2 sm:px-6 lg:px-8 ">
        <div className="relative flex h-16 items-center justify-between media-footer ">
          <Link to="home" className='text-4xl font-bold cursor-pointer min-w-36'><img className='min-w-36' src={logo} alt="" /></Link>
          <div className="absolute inset-y-0 flex items-center md:hidden right-2">

            {/* Mobile menu button*/}
            <DisclosureButton className=" group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 focus:bg-gray-700 focus:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-center">

            <div className="hidden sm:ml-6 md:block">
              {token?<div className="flex space-x-4 self-start">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-black font-bold' : 'text-gray-500 focus:text-black',
                      'rounded-md px-1 py-2 text-sm font-medium text-base2 hover-link',
                    )}
                  >
                    {item.name}
                  </NavLink>

                )
                )
                }
                
              </div>:<div></div>}
            </div>
          </div>
          {token?<div className=' justify-center items-center gap-10 hidden md:flex pl-8'>
          <Link to="cart">
            <i className="fas fa-shopping-cart scale-200 color-575757 hover-link"></i>
            <div className='w-6 h-6 bg-4FA74F text-white font-bold border-rounded text-center relative my-modify bottom-10 left-4'>{count}</div>
            </Link>
            <Link to="login" onClick={logout}><p className='hover-link color-575757'>log out</p></Link>
            </div>:<div className=' justify-center items-center gap-10 hidden md:flex pl-8'> 
            <Link to="login" ><p className='hover-link color-575757'>log in</p></Link>
            <Link to="" ><p className='hover-link color-575757'>Register</p></Link>
              </div>}
        
        </div>
       
      </div>

      <DisclosurePanel className="md:hidden">
        {token?<div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-900 text-black font-bold' : 'text-gray-500 focus:text-black',
                'block rounded-md px-3 py-2 text-base font-medium hover-link',
              )}
            >
              
              {item.name}
              
            </NavLink>
          ))}
          
        </div>:<div></div>}
        {token?<div className=' justify-center items-center gap-7 flex pl-8 flex-col '>
          <Link to="cart">
            <i className="fas fa-shopping-cart scale-200 color-575757 hover-link"></i>
            <div className='w-6 h-6 bg-4FA74F text-white font-bold border-rounded text-center relative my--20 bottom-3 left-4'>{count}</div>
            </Link>
            <Link to="login" onClick={logout} ><p className='hover-link color-575757'>log out</p></Link>
          </div>:<div className=' justify-center items-center gap-7 flex pl-8 flex-col '>
          <Link to="" ><p className='hover-link color-575757'>Register</p></Link>
          <Link to="login" ><p className='hover-link color-575757'>log in</p></Link>
            </div>}
      </DisclosurePanel>
      
    </Disclosure>
    </>
  )
}
