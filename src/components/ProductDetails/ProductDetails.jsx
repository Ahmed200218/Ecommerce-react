import React, { useContext, useEffect, useState } from 'react'
import './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Slider from 'react-slick'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { WishListContext } from '../../Context/WishListContext'

export default function ProductDetails() {


  let {addProductToWish,wished,setWished,getWishList} = useContext(WishListContext)
  let {addProductToCart , setCount , count} = useContext(CartContext)
  let [productDetails, setProductDetails] = useState()
  let { id } = useParams()
  let [isloading, setisloading] = useState(false)


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

 async function addToCartItem(id){
  setisloading(true)
  let aaa= await  addProductToCart(id)
  setisloading(false)
  setCount(localStorage.getItem("count"))

  toast.success("item added to your cart")
  
  }



  async function getWishListInfo() {
    setisloading(true)
    let res = await getWishList()
    setWished(localStorage.getItem("wishId").split(","))
    setisloading(false)
  }



  async function addToWishlistItem(id){
    setisloading(true)
    let res= await  addProductToWish(id)
    
    setWished(localStorage.getItem("wishId").split(","))
    setisloading(false)
    toast.success("item added to your wish list")
  }



  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  function getProductDetails() {
    setisloading(true)
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProductDetails(data.data)
        setisloading(false)
      })


      .catch(({ err }) => {
        setisloading(false)
        return err
      })


  }


  useEffect(() => {
    getProductDetails()
    setWished(localStorage.getItem("wishId").split(","))
    getWishListInfo()
  }, [])


  return (
    <>
    {isloading ? <div className="z-50 bg-gray-400 opacity-60 flex fixed top-0 bottom-0 left-0 right-0 justify-center items-center"><i className='fa fa-spinner fa-spin scale-500'></i></div> : null}
      <div className=' flex flex-col md:flex-row justify-center items-center w-full container pt-24 pb-24 md:pb-0 px-4'>
        <div className='w-full md:w-4/12 mb-9'>


          <Slider {...settings}>
{productDetails?.images.map(src=><img key={src} className='w-full' src={src}></img>)}


          </Slider>
        </div>
        <div className='w-full md:w-8/12 flex flex-col ml-8'>
          <p className='font-semibold text-4xl'>{productDetails?.title}</p>
          <p className=' text-lg mt-3'>{productDetails?.description}</p>
          <div className='w-full mt-5 flex justify-between items-center'>
            <p>{productDetails?.price} EGP</p>
            <div className='flex text-center items-center justify-center gap-1 mr-6'>
              <i className='fa fa-star text-amber-500 scale-125'></i>
              <p>{productDetails?.ratingsAverage}</p>
            </div>

          </div>


          <button onClick={()=>addToCartItem(productDetails?.id)} className='self-center border px-2 py-2 w-3/5 rounded-md bg-emerald-500 text-white hover-position-child relative bottom-44'>+ add</button>
          <i onClick={()=>addToWishlistItem(productDetails?.id)} className={classNames(wished.includes(productDetails?.id)? "text-red-500" : "", "fa fa-heart scale-200 mr-5 cursor-pointer self-end postion relative  top-0 right-3")} ></i>
        </div>
      </div>
    </>
  )
}
