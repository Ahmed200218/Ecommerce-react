import React, { useEffect, useState } from 'react'
import './Categories.css'
import axios from 'axios';

export default function Categories() {

  let [isloading, setisloading] = useState(false)
  let [categories, setCategories] = useState([])
  let [categoriesName, setCategoriesName] = useState(null)
  let [subCategories, setSubCategories] = useState([])


  function getsubcategories(id,name) {
    setisloading(true)
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
      .then(res => {
        setSubCategories(res.data.data)
        setCategoriesName(name+" "+"subcategories")
        setisloading(false)
      })
      .catch(err => {
        setisloading(false)
        return err.statusText
      })
  }


  function getCategories() {
    setisloading(true)
    axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      .then(res => {
        setCategories(res.data.data)
        setisloading(false)
      })
      .catch(err => {
        setisloading(false)
        return err.statusText
      })
  }



  useEffect(() => {
    getCategories()
  }, [])
  return (
    <>
      {isloading ? <div className="z-50 bg-gray-400 opacity-60 flex fixed top-0 bottom-0 left-0 right-0 justify-center items-center"><i className='fa fa-spinner fa-spin scale-500'></i></div> : null}
      <div className='w-full mt-24 mb-24'>
        <div className='flex justify-start items-center w-full flex-wrap container mx-auto'>
          {categories?.map(category => <div key={category._id} className='w-full md:w-1/3 p-4'> <div onClick={()=>getsubcategories(category._id ,category.name)} className='  flex flex-col justify-center items-center rounded-md border border-gray-400 hover-shadow'>
            <div className='w-full h-[350px] '><img className='w-full h-[350px] img-style relative top-0 bottom-0 left-0 right-0' src={category.image} /></div>
            <p
            className='text-3xl font-semibold text-[#198754] my-8'>{category.name}</p>
          </div>
          </div>)}
        </div>
        <div className='flex flex-col justify-center items-center'>
          <h2 className='text-4xl font-semibold text-[#4FA74F] text-center'>{categoriesName}</h2>
          <div className=' flex justify-start items-center w-full flex-wrap container mx-auto'>
          {subCategories?.map(subCategory =><div className='w-full md:w-1/3 p-4 '>
            <p key={subCategory._id} className='w-full text-center text-3xl border px-5 py-5 font-semibold rounded-lg border-gray-400 hover-shadow'>{subCategory.name}</p>
            </div>
          )}
            </div>
          </div>
      </div>
    </>
  )
}
