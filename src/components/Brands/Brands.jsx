import React, { useEffect, useState } from 'react'
import './Brands.css'
import axios from 'axios'

export default function Brands() {


  let [isloading, setisloading] = useState(false)
  let [brands, setBrands] = useState([])
  let [isBrands, setIsBrands] = useState(false)
  let [brandName, setBrandName] = useState(null)
  let [brandImg, setBrandimg] = useState(null)

  const buttonClicked = (e) => {
    e.stopPropagation();
}



  function setbrandsfalse(){
    setIsBrands(false)

  }




  function setbrandstrue(name,img){
    setIsBrands(true)
    setBrandName(name)
    setBrandimg(img)
    
      }

  function getBrands() {
    setisloading(true)
    axios.get('https://ecommerce.routemisr.com/api/v1/brands')
      .then(res => {
        (res.data.data);
        setBrands(res.data.data)
        setisloading(false)
      })
      .catch(err => {
        setisloading(false)
        return err.results
      })
  }


  useEffect(() => {
    getBrands()
  }, [])
  return (
    <>
      {isloading ? <div className="z-50 bg-gray-400 opacity-60 flex fixed top-0 bottom-0 left-0 right-0 justify-center items-center"><i className='fa fa-spinner fa-spin scale-500'></i></div> : null}
      {isBrands ? <div onClick={setbrandsfalse}  className='z-50 bg-[#58585899]  flex fixed top-0 bottom-0 left-0 right-0 justify-center items-start'>
        <div onClick={ (e) => buttonClicked(e) } className="bg-white w-[550px]  border rounded-lg move absolute mt-14">
          <div className='flex justify-end items-center border-b py-4'><i onClick={setbrandsfalse}  className='fa fa-x scale-150 text-gray-500 mr-5 self-end cursor-pointer'></i></div>
        <div className='w-full mb-14 flex'>
          <div className='w-1/2 flex flex-col justify-center items-start mt-12 ml-7'>
            <p className='text-5xl font-semibold text-[#4FA74F] mb-5'>{brandName}</p>
            <p>{brandName.toLowerCase()}</p>
          </div>
          <div><img src={brandImg} alt="" /></div>
        </div>
        <div className='flex justify-end items-center border-t py-4'><button onClick={setbrandsfalse} className='bg-[#5C636A] px-4 py-3 rounded-lg mr-4 text-white'>Close</button></div>
        </div>
        </div> : null}
      <div className='w-full mt-24 mb-24'>
        <h2 className='text-center text-5xl font-semibold text-[#4FA74F] mt-5 mb-10'>All Brands</h2>
        <div className='flex justify-start items-center w-full flex-wrap container mx-auto'>

          {brands?.map(brands => <div key={brands._id} className='w-full md:w-1/4 p-4'> <div onClick={()=>setbrandstrue(brands.name,brands.image)} className='  flex flex-col justify-center items-center rounded-md border border-gray-400 hover-shadow'>
            <div className='w-full h-[200px] '><img className='w-full h-[200px] img-style relative top-0 bottom-0 left-0 right-0' src={brands.image} /></div>
            <p
              className='text-xl my-8'>{brands.name}</p>
          </div>
          </div>
          )}
        </div>
      </div>
    </>
  )
}