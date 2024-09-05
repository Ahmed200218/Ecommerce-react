import React, { useContext, useEffect, useState } from 'react'
import './CheckOut.module.css'
import { useFormik } from 'formik'
import { CartContext } from '../../Context/CartContext'
import * as  Yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function CheckOut() {

let {cartId}=useParams()
  let{cashOnDelivery ,setCount}=useContext(CartContext)
  let [apiError] = useState(null)
  let [isloading] = useState(false)
  let navigate = useNavigate()
  let [disabledButton,setDisabledButton]=useState(false)


  const validationSchema = () => {
    return Yup.object({
      details: Yup.string().required("required"),
      phone: Yup.string().matches(/^01[0125][0-9]{8}$/, "invalid phone number").required("required"),
      city: Yup.string().required("required")
    })
  }



  let myform = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: ""
    },
    validationSchema,
    onSubmit: pay
  })

  function classNamesx(...classes) {
    return classes.filter(Boolean).join(' ')
  }



async  function pay() {
  setDisabledButton(true)
let res=await cashOnDelivery(cartId , myform.values )
localStorage.setItem("count",0)
setCount(0)
toast.success("Done")
navigate("/home")
  }

  useEffect(() => {setDisabledButton(false) }, [])

  return (
    <>

      {isloading ? <div className="z-50 bg-gray-400 opacity-60 flex fixed top-0 bottom-0 left-0 right-0 justify-center items-center"><i className='fa fa-spinner fa-spin scale-500'></i></div> : null}
      <form onSubmit={myform.handleSubmit} className='mt-40  w-full container'>
        <div className='flex flex-col justify-center items-start mx-9'>
          {apiError && <div className="w-full mt-4 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{apiError}</span>
          </div>}
          <label className='mt-5 font-medium text-gray-500' htmlFor="">details :</label>
          <input id='details' className='w-full border-modify' onBlur={myform.handleBlur} onChange={myform.handleChange} name='details' value={myform.values.details} type="text" />
          {myform.errors.details && myform.touched.details ? <div className="w-full mt-4 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{myform.errors.details}</span>
          </div> : null}
          <label className='mt-5 font-medium text-gray-500' htmlFor="">Phone :</label>
          <input className='w-full border-modify' onBlur={myform.handleBlur} onChange={myform.handleChange} name='phone' value={myform.values.phone} type="tel" />
          {myform.errors.phone && myform.touched.phone ? <div className="w-full mt-4 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{myform.errors.phone}</span>
          </div> : null}
          <label className='mt-5 font-medium text-gray-500' htmlFor="">city :</label>
          <input className='w-full border-modify' onBlur={myform.handleBlur} onChange={myform.handleChange} name='city' value={myform.values.email} type="text" />
          {myform.errors.city && myform.touched.city ? <div className="w-full mt-4 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{myform.errors.city}</span>
          </div> : null}


          <button  type="submit" disabled={myform.errors.phone || myform.errors.city || myform.errors.details || myform.touched.details == undefined || disabledButton  ? true : false} className={classNamesx(myform.errors.phone || myform.errors.city  || myform.errors.details || myform.touched.details == undefined ? "bg-white text-gray-500" : "bg-3FA43F text-white disabled", 'modify-border2 px-5 py-3 rounded-lg self-end text-2xl my-5 w-full')}>Pay now</button>

        </div>
      </form>

    </>
  )
}
