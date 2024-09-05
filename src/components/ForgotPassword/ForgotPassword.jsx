import React ,{useEffect,useState} from 'react'
import './ForgotPassword.module.css'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import axios from 'axios'
import * as  Yup from 'yup'



export default function ForgotPassword() {

  let [apiError, setApiError] = useState(null)
  let navigate = useNavigate()
  let [isloading, setisloading] = useState(false)

  function forgotPassword(formvalue) {

    setApiError(null)
    setisloading(true)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', formvalue)
      .then(() => {
        setisloading(false)
        navigate("/code")
      })
      .catch((err) => {
        setisloading(false)
        setApiError(err.response.data.message)
      })
  }
  const validationSchema = () => {
    return Yup.object({
      email: Yup.string().email("invalid email").required("required"),
    })
  }


  let myform = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: forgotPassword
  })


  return (
    <>
      {isloading ? <div className="z-50 bg-gray-400 opacity-60 flex fixed top-0 bottom-0 left-0 right-0 justify-center items-center"><i className='fa fa-spinner fa-spin scale-500'></i></div> : null}
      <form onSubmit={myform.handleSubmit} className='mt-40  w-full container'>
        <div className='flex flex-col justify-center items-start mx-9'>
          {apiError && <div className="w-full mt-4 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{apiError}</span>
          </div>}
          <h1 className='text-4xl font-semibold self-start'>please enter your email</h1>
          <label className='mt-5 font-medium text-gray-500' htmlFor="">Email :</label>
          <input className='w-full border-modify' onBlur={myform.handleBlur} onChange={myform.handleChange} name='email' value={myform.values.email} type="email" />
          {myform.errors.email && myform.touched.email ? <div className="w-full mt-4 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{myform.errors.email}</span>
          </div> : null}
            <button type="submit" className= "bg-white text-green-700 hover:bg-green-700 hover:text-white modify-border2 px-5 py-3 rounded-lg self-start text-2xl my-5 ">Verify</button>
        </div>
      </form>
    </>
  )
}

