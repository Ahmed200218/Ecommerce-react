import React, { useContext, useEffect, useState } from 'react'
import './Cart.css'
import { CartContext } from '../../Context/CartContext'
import { useNavigate } from 'react-router-dom'

export default function Cart() {

  let [isloading, setisloading] = useState(false)
  let { getCart , removeProduct , updateProductCount , clearUserCart , setCartId , cartId , setCount} = useContext(CartContext)
  let [cartInfo, setCartInfo] = useState(null)
  let navigate = useNavigate()
  useEffect(() => {
    getCartInfo()
  }, [])


  async function getCartInfo() {
    setisloading(true)
    let res = await getCart()
    setisloading(false)
    setCartId(res.cartId)
   setCount(res.numOfCartItems)
    setCartInfo(res)
  }


  function check(){
    navigate(`/checkOut/${cartId}`)
  }

  async function clearCart() {
    setisloading(true)
    let res = await clearUserCart()
    setisloading(false)
    setCount(res.numOfCartItems)
    getCartInfo()
  }



  async function updateProduct(id,count) {
    setisloading(true)
    let res = await updateProductCount(id,count)
    setisloading(false)
    setCartInfo(res)
  }




  async function removeItem(id) {
    setisloading(true)
    let res = await removeProduct(id)
    setisloading(false)
    setCount(res.numOfCartItems)
    setCartInfo(res)
  }


  return (
    <>
      {isloading ? <div className="z-50 bg-gray-400 opacity-60 flex fixed top-0 bottom-0 left-0 right-0 justify-center items-center"><i className='fa fa-spinner fa-spin scale-500'></i></div> : null}
      <div className=' mt-40 flex justify-center items-center w-full mb-28'>
        {cartInfo?.numOfCartItems==0?
        <div className='  bg-[#F8F9FA] w-95 rounded-md pb-14'>
<h2 className='font-semibold text-4xl mt-14 ml-14'>Cart Shop</h2>
<h2 className='font-semibold text-4xl mt-14 ml-14'>Your cart is empty</h2>
        </div>
        :
        <div className='  bg-[#F8F9FA] w-95 rounded-md pb-14'>
          <div className='flex justify-between items-center'>
            <h2 className='font-semibold text-4xl mt-14 ml-14'>Cart Shop</h2>
            <button onClick={check} className='py-3 bg-[#0d6efd] hover:bg-[#0B5ED7] rounded-lg px-5 text-white text-xl mt-14 mr-14'>Check Out</button>
          </div>
          <div className='flex justify-between items-center'>
            <p className='font-semibold text-2xl mt-8 ml-14 mb-8'>total price: <span className='font-semibold text-2xl text-[#22DB14]'>{cartInfo?.data.totalCartPrice}</span> </p>
            <p className='font-semibold text-2xl mt-8 mr-14 mb-8'>total number of items: <span className='className=font-semibold text-2xl text-[#22DB14]'>{cartInfo?.numOfCartItems}</span></p>
          </div>

          {cartInfo?.data.products.map(ele =>
          <div key={ele._id} >
            <div key={ele._id} className='flex flex-col md:flex-row justify-start items-center mb-7'>

              <div className='w-full md:w-[13%] mb-5 ml-0 md:ml-14'>
                <img src={ele.product.imageCover} alt="" />
              </div>
              <div className='w-full md:w-[85%] flex flex-col md:flex-row justify-between items-center flex-grow'>
                <div className='ml-5'>
                  <p className='font-semibold text-2xl'>{ele.product.title}</p>
                  <p className='font-semibold text-lg'>{ele.price} EGP</p>
                  <button onClick={()=>removeItem(ele.product._id)} className='flex justify-center items-center mt-2 text-[#DC3545]'><i className='fa fa-trash'></i><p>Remove</p></button>
                  
                </div>

                <div className='flex justify-center items-center mr-14 mt-5'>
                  <button onClick={()=>updateProduct(ele.product._id,ele.count+1)} className='px-3 py-2 border-2 border-[#8DE987] rounded-lg'>+</button>
                  <p className='font-medium text-xl mx-5 '>{ele.count}</p>
                  <button onClick={()=>updateProduct(ele.product._id,ele.count-1)} className='px-3 py-2 border-2 border-[#8DE987] rounded-lg'>-</button>
                </div>
                
              </div>
              
            </div>
            <div className='w-10/12 mx-auto mb-2'>
              <hr/>
              </div>
            </div>
            
          )}
<div className='w-full flex justify-center items-center'>
  <button onClick={clearCart} className='py-3 px-5 text-2xl border-2 border-[#8DE987] rounded-lg mt-2'>Clear Your Cart</button>
</div>

          


        </div>}
        
      </div>
    </>
  )
}
