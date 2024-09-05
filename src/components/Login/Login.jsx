import React, { useContext, useEffect, useState } from 'react'
import './Login.css'
import { useFormik } from 'formik'
import axios from 'axios'
import * as  Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { UserTokencontext } from '../../Context/UserTokenContext'

export default function Login() {

  let [apiError, setApiError] = useState(null)
  let navigate = useNavigate()
  let [isloading, setisloading] = useState(false)
  let tokenContext = useContext(UserTokencontext)



async  function login(formvalue) {

    setApiError(null)
    setisloading(true)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', formvalue)
      .then((res) => {
        
        let { data } = res;
        localStorage.setItem("token", data.token)
        tokenContext.setToken(data.token)

        navigate("/home")
        window.location.reload();
        setisloading(false)

      })
      .catch((err) => {
        setisloading(false)

        setApiError(err.response.data.message)
      })
  }
  const validationSchema = () => {
    return Yup.object({
      email: Yup.string().email("invalid email").required("required"),
      password: Yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Minimum eight characters, at least one letter and one number").required("required")
    })
  }







  function classNamesx(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  function navig() {
    navigate("/forgotPassword")
  }









  let myform = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: login
  })


  return (
    <>
      {isloading ? <div className="z-50 bg-gray-400 opacity-60 flex fixed top-0 bottom-0 left-0 right-0 justify-center items-center"><i className='fa fa-spinner fa-spin scale-500'></i></div> : null}
      <form onSubmit={myform.handleSubmit} className='mt-40  w-full container'>
        <div className='flex flex-col justify-center items-start mx-9'>
          {apiError && <div className="w-full mt-4 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{apiError}</span>
          </div>}
          <h1 className='text-4xl font-semibold self-start'>login now</h1>
          <label className='mt-5 font-medium text-gray-500' htmlFor="">Email :</label>
          <input className='w-full border-modify' onBlur={myform.handleBlur} onChange={myform.handleChange} name='email' value={myform.values.email} type="email" />
          {myform.errors.email && myform.touched.email ? <div className="w-full mt-4 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{myform.errors.email}</span>
          </div> : null}
          <label className='mt-5 font-medium text-gray-500' htmlFor="">Password :</label>
          <input className='w-full border-modify' onBlur={myform.handleBlur} onChange={myform.handleChange} name='password' value={myform.values.password} type="password" />
          {myform.errors.password && myform.touched.password ? <div className="w-full mt-4 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{myform.errors.password}</span>
          </div> : null}

          <div className='flex justify-between items-center w-full text-center'>
            <p className=" text-2xl text-center font-medium hover-color" onClick={navig}>forgot your password ?</p>
            <button type="submit" disabled={myform.errors.password || myform.errors.email || myform.touched.email == undefined ? true : false} className={classNamesx(myform.errors.password || myform.errors.email || myform.touched.email == undefined ? "bg-white text-gray-500" : "bg-3FA43F text-white disabled", 'modify-border2 px-5 py-3 rounded-lg self-end text-2xl my-5 ')}>login now</button>
          </div>
        </div>
      </form>
    </>
  )
}
