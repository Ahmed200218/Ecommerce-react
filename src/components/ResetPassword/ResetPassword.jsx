import React, { useEffect, useState } from 'react'
import './ResetPassword.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import * as  Yup from 'yup'
import { useNavigate } from 'react-router-dom'

export default function ResetPassword() {

  let [apiError, setApiError] = useState(null)
  let navigate = useNavigate()
  let [isloading, setisloading] = useState(false)

  function resetPassword(formvalue) {

    setApiError(null)
    setisloading(true)
    axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', formvalue)
      .then(() => {
        setisloading(false)
        navigate("/home")
      })
      .catch((err) => {
        setisloading(false)
        setApiError(err.response.data.message)
      })
  }
  const validationSchema = () => {
    return Yup.object({
      email: Yup.string().email("invalid email").required("required"),
      newPassword: Yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Minimum eight characters, at least one letter and one number").required("required")
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
      newPassword: "",
    },
    validationSchema,
    onSubmit: resetPassword
  })


  return (
    <>
      {isloading ? <div className="z-50 bg-gray-400 opacity-60 flex fixed top-0 bottom-0 left-0 right-0 justify-center items-center"><i className='fa fa-spinner fa-spin scale-500'></i></div> : null}
      <form onSubmit={myform.handleSubmit} className='mt-40  w-full container'>
        <div className='flex flex-col justify-center items-start mx-9'>
          {apiError && <div className="w-full mt-4 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{apiError}</span>
          </div>}
          <h1 className='text-4xl font-semibold self-start'>reset your account password</h1>
          <label className='mt-5 font-medium text-gray-500' htmlFor="">Email :</label>
          <input className='w-full border-modify' onBlur={myform.handleBlur} onChange={myform.handleChange} name='email' value={myform.values.email} type="email" />
          {myform.errors.email && myform.touched.email ? <div className="w-full mt-4 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{myform.errors.email}</span>
          </div> : null}
          <label className='mt-5 font-medium text-gray-500' htmlFor="">Password :</label>
          <input className='w-full border-modify' onBlur={myform.handleBlur} onChange={myform.handleChange} name='newPassword' value={myform.values.newPassword} type="password" />
          {myform.errors.newPassword && myform.touched.newPassword ? <div className="w-full mt-4 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{myform.errors.newPassword}</span>
          </div> : null}
          <button type="submit" className="bg-white text-green-700 hover:bg-green-700 hover:text-white modify-border2 px-5 py-3 rounded-lg self-start text-2xl my-5 ">reset password</button>
        </div>
      </form>
    </>
  )
}

