import React ,{useContext, useEffect,useState} from 'react'
import './Wishlist.css'
import { WishListContext } from '../../Context/WishListContext'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'

export default function Wishlist() {
  let [isloading, setisloading] = useState(false)
  let [wishListInfo, setWishListInfo] = useState(null)
  let {getWishList,removeWishProduct,wished,setWished} = useContext(WishListContext)
  let {addProductToCart , setCount , count} = useContext(CartContext)



  async function addToCartItem(id){
    setisloading(true)
    let aaa= await  addProductToCart(id)
    setisloading(false)
    setCount(localStorage.getItem("count"))
    removeWishItem(id)
    toast.success("item added to your cart")
  }

  async function removeWishItem(id) {
    setisloading(true)
    let res = await removeWishProduct(id)
    setWished(localStorage.getItem("WishedId"))
    setisloading(false)
    getWishListInfo()
  }




  async function getWishListInfo() {
    setisloading(true)
    let res = await getWishList()
    setWished(localStorage.getItem("WishedId"))
    setisloading(false)
    setWishListInfo(res)
    
    
  }



    useEffect(()=>{
      getWishListInfo()
    },[])
  return (
    <>
      {isloading ? <div className="z-50 bg-gray-400 opacity-60 flex fixed top-0 bottom-0 left-0 right-0 justify-center items-center"><i className='fa fa-spinner fa-spin scale-500'></i></div> : null}
      <div className=' mt-40 flex justify-center items-center w-full mb-28'>
        {wishListInfo?.count==0?
        <div className='  bg-[#F8F9FA] w-95 rounded-md pb-14'>
<h2 className='font-semibold text-4xl mt-14 ml-14'>Wish list</h2>
<h2 className='font-semibold text-4xl mt-14 ml-14'>Your wish  is empty</h2>
        </div>
        :
        <div className='  bg-[#F8F9FA] w-95 rounded-md pb-14'>
          <div className='flex justify-between items-center mb-14'>
            <h2 className='font-semibold text-4xl mt-14 ml-14'>My wish List</h2>
          </div>

          {wishListInfo?.data.map(ele =>
          <div key={ele._id} >
            <div key={ele._id} className='flex flex-col md:flex-row justify-start items-center mb-7'>

              <div className='w-full md:w-[13%] mb-5 ml-0 md:ml-14'>
                <img src={ele.imageCover} alt="" />
              </div>
              <div className='w-full md:w-[85%] flex flex-row justify-between items-center flex-grow'>
                <div className='ml-5'>
                  <p className='font-semibold text-2xl'>{ele.title}</p>
                  <p className='font-semibold text-lg text-[#198754]'>{ele.price} EGP</p>
                  <button onClick={()=>removeWishItem(ele._id)} className='flex justify-center items-center mt-2 text-[#DC3545]'><i className='fa fa-trash'></i><p>Remove</p></button>
                  
                </div>

                <button onClick={()=>addToCartItem(ele._id)} className='px-3 py-2 border-2 border-[#8DEA87] text-2xl rounded-lg mr-16 relative top-3'>add to cart</button>
                
              </div>
              
            </div>
            <div className='w-10/12 mx-auto mb-2'>
              <hr/>
              </div>
            </div>
            
          )}

        </div>}
        
      </div>

    </>
  )
}
