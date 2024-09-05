import React, { useEffect, useState } from 'react'
import './Layout.module.css'
import { Outlet } from 'react-router-dom'
import Navbar from './../Navbar/Navbar';

export default function Layout() {

  useEffect(() => { }, [])
  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <Navbar/>
      <Outlet/>
    </div>
  )
}
