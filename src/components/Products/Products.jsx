import React, { useContext, useEffect, useState } from 'react'
import './Products.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ProductDetails from './../ProductDetails/ProductDetails';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast'
import { WishListContext } from '../../Context/WishListContext';

export default function Products() {


  let {addProductToWish,wished,setWished,getWishList} = useContext(WishListContext)
  let {addProductToCart , setCount , count ,getCart} = useContext(CartContext)
  let [products, setProducts] = useState([])
  let [valueSearch, setValueSearch] = useState("")
  let [isloading, setisloading] = useState(false)
  useEffect(() => {
    getProducts()
    getCartInfo()
    getWishListInfo()
    setWished(localStorage.getItem("wishId")?.split(","))
  }, [])


    

  async function getWishListInfo() {
    setisloading(true)
    let res = await getWishList()
    setWished(localStorage.getItem("wishId")?.split(","))
    setisloading(false)
  }


  async function getCartInfo() {
    let res = await getCart()
    localStorage.setItem("count", res.numOfCartItems)
    setCount(res.numOfCartItems)


  }




  async function addToWishlistItem(id){
    setisloading(true)
    let res= await  addProductToWish(id)
    setisloading(false)
    setWished(localStorage.getItem("wishId").split(","))
    toast.success("item added to your wish list")
  }


  async function addToCartItem(id){
    setisloading(true)
    let aaa= await  addProductToCart(id)
    setisloading(false)
    setCount(localStorage.getItem("count"))
    toast.success("item added to your cart")
  }
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  


  function search(event) {
    setValueSearch(event.target.value)
  }






  function getProducts() {
    setisloading(true)
    axios.get('https://ecommerce.routemisr.com/api/v1/products')
      .then(res => {
        setisloading(false)
        setProducts(res.data.data)    
      })
      .catch(err => {
        setisloading(false)
      })
  }


  return (
    <>
      {isloading ? <div className="z-50 bg-gray-400 opacity-60 flex fixed top-0 bottom-0 left-0 right-0 justify-center items-center"><i className='fa fa-spinner fa-spin scale-500'></i></div> : null}
      <div className='w-full flex justify-center items-center'>
      <input type='text' placeholder='search' className='mt-32 mb-6 border-gray-300 w-8/12 rounded-md input-isFocused' onChange={(e) => search(e)}></input>
      </div>
      <div className='flex flex-wrap  w-full px-5 container'>



        {products.map(product =>
          
            <div key={product.id} className={classNames(
              product.title.split(" ").splice(0, 2).join(" ").toLowerCase().includes(valueSearch.toLowerCase()) ? " " : "hidden", 'p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4')}>
              <div className={classNames(
                product.title.split(" ").splice(0, 2).join(" ").toLowerCase().includes(valueSearch.toLowerCase()) ? " " : "hidden", "w-full p-1  rounded-md overflow-hidden hover:shadow-lime-500 ")}>

                <div className="product flex flex-col pb-6   rounded-md overflow-hidden">
                  <Link to={`/ProductDetails/${product.id}`}>
                  <div>
                  <img src={product.imageCover} className='w-full' alt=''></img>
                  <p className='font-semibold text-lg pl-1 mb-4 text-emerald-500'>{product.category.name}</p>
                  <p className='font-semibold text-xl pl-1'>{product.title.split(" ").splice(0, 2).join(" ")}</p>
                  <div className='flex justify-between items-center pl-1'>
                    <p>{product.price} EGP</p>
                    <div className='flex text-center items-center justify-center gap-1 mr-1'>
                      <i className='fa fa-star text-amber-500 scale-125'></i>
                      <p>{product.ratingsAverage}</p>
                    </div>

                  </div>
                  </div>
                  </Link>
                  <i onClick={()=>addToWishlistItem(product.id)} className={classNames(wished?.includes(product.id)? "text-red-500" : "", "fa fa-heart  scale-200 mr-5 cursor-pointer self-end postion relative top-16")} ></i>
                <button  onClick={()=>addToCartItem(product.id)} className='self-center border px-2 py-2 w-3/5 rounded-md mt-10 bg-green-500 text-white hover-position-child'>+ add</button>


              </div>
            </div>
          </div>
          
        )}

      </div>
    </>
  )
}
