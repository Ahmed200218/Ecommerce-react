import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import Products from './../Products/Products';
import Slider from 'react-slick';
import axios from 'axios';
import slider1 from "../../assets/images/slider-image-1.jpeg"
import slider2 from "../../assets/images/slider-image-2.jpeg"
import slider3 from "../../assets/images/slider-image-3.jpeg"
import { UserTokencontext } from '../../Context/UserTokenContext';




export default function Home() {
  let [categories, setCategories] = useState([])
  let tokenContext = useContext(UserTokencontext)


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1
  };
  var settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };


  function getCategories() {

    axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      .then(({ data }) => {
        setCategories(data.data);
      })
      .catch(err =>err)
  }


 

  useEffect(() => {
    tokenContext.setToken(localStorage.getItem("token"))
    getCategories()

  }, [])


  return (
    <>
      <div className='w-full flex justify-center items-center '>
        <div className='mb-20 fix-slider2 md:w-1/2 flex flex-col md:flex-row justify-center items-center'>
          <div className='w-full md:w-1/2'>
            <Slider {...settings2}>
              <img className='w-full h-[500px]' src={slider1} />
              <img className='w-full h-[500px]' src={slider2} />
              <img className='w-full h-[500px]' src={slider3} />
            </Slider>
          </div>
          <div className='flex flex-col w-full md:w-1/2'>
            <div className='w-full'><img className='h-[250px] w-full md:w-10/12' src={slider1} alt="" /></div>
            <div className=' w-full'><img className='h-[250px] w-full md:w-10/12' src={slider2} alt="" /></div>
          </div>
        </div>
      </div>
      <div className='w-full overflow-hidden'>
        <div className='w-full fix-slider overflow-hidden min-w-[1650px]'>
          <Slider {...settings}>
            {categories.map(category =>
              <div className='min-w-[300px]' key={category.name}><img className='w-full min-w-[300px] h-[300px]' src={category.image} alt="" />
                <h2 className='text-3xl'>{category.name}</h2>
              </div>

            )}
          </Slider>
        </div>
      </div>
      <Products></Products>

    </>
  )
}
