import React, { useEffect, useState } from 'react'
import './Register.css'
import { useFormik } from 'formik'
import axios from 'axios'
import * as  Yup from 'yup'
import { useNavigate } from 'react-router-dom'

export default function Register() {

  let [apiError, setApiError] = useState(null)
  let navigate = useNavigate()
  let [isloading, setisloading] = useState(false)




  useEffect(() => {
    
    localStorage.removeItem("token")
  }, [])

  function register(formvalue) {

    setApiError(null)
    setisloading(true)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', formvalue)
      .then(() => {
        setisloading(false)
        navigate("/login")
      })
      .catch((err) => {
        setisloading(false)
        setApiError(err.response.data.message)
      })
  }
  const validationSchema = () => {
    return Yup.object({
      name: Yup.string().min(3, "not less than 3").required("required"),
      email: Yup.string().email("invalid email").required("required"),
      password: Yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Minimum eight characters, at least one letter and one number").required("required"),
      rePassword: Yup.string().oneOf([Yup.ref('password')], "repassword is not equal to pasword").required("required"),
      phone: Yup.string().matches(/^01[0125][0-9]{8}$/, "invalid phone number").required("required")
    })
  }

  function classNamesx(...classes) {
    return classes.filter(Boolean).join(' ')
  }



  let myform = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    validationSchema,
    onSubmit: register
  })


  return (
    <>
      {isloading ? <div className="z-50 bg-gray-400 opacity-60 flex fixed top-0 bottom-0 left-0 right-0 justify-center items-center"><i className='fa fa-spinner fa-spin scale-500'></i></div> : null}

      <form onSubmit={myform.handleSubmit} className='mt-40  w-full container'>
        <div className='flex flex-col justify-center items-start mx-9'>
          {apiError && <div className="w-full mt-4 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{apiError}</span>
          </div>}
          <h1 className='text-4xl font-semibold self-start'>register now</h1>
          <label className='mt-5 font-medium text-gray-500' htmlFor="">Name :</label>
          <input id='name' className='w-full border-modify' onBlur={myform.handleBlur} onChange={myform.handleChange} name='name' value={myform.values.name} type="text" />
          {myform.errors.name && myform.touched.name ? <div className="w-full mt-4 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{myform.errors.name}</span>
          </div> : null}
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
          <label className='mt-5 font-medium text-gray-500' htmlFor="">Re-password :</label>
          <input className='w-full border-modify' onBlur={myform.handleBlur} onChange={myform.handleChange} name='rePassword' value={myform.values.rePassword} type="password" />
          {myform.errors.rePassword && myform.touched.rePassword ? <div className="w-full mt-4 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{myform.errors.rePassword}</span>
          </div> : null}
          <label className='mt-5 font-medium text-gray-500' htmlFor="">Phone :</label>
          <input className='w-full border-modify' onBlur={myform.handleBlur} onChange={myform.handleChange} name='phone' value={myform.values.phone} type="tel" />
          {myform.errors.phone && myform.touched.phone ? <div className="w-full mt-4 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{myform.errors.phone}</span>
          </div> : null}


          <button type="submit" disabled={myform.errors.phone || myform.errors.rePassword || myform.errors.password || myform.errors.email || myform.errors.name || myform.touched.name == undefined ? true : false} className={classNamesx(myform.errors.phone || myform.errors.rePassword || myform.errors.password || myform.errors.email || myform.errors.name || myform.touched.name == undefined ? "bg-white text-gray-500" : "bg-3FA43F text-white disabled", 'modify-border2 px-5 py-3 rounded-lg self-end text-2xl my-5 ')}>Register now</button>

        </div>
      </form>
    </>
  )
}
