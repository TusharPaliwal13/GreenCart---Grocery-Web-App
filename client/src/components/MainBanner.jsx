import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const MainBanner = () => {
  return (
    <div className='relative'>
      <img src={assets.main_banner_bg} alt="banner" className='w-full hidden md:block' />
      <img src={assets.main_banner_bg_sm} alt="banner" className='w-full md:hidden' />

      <div className='absolute inset-0 flex flex-col items-center md:justify-center px-4 md:pl-18 lg:pl-24 md:pb-0 md:items-start justify-end pt-20'>
        <h1 className='text-3xl font-bold md:text-4xl lg:text-5xl text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15'>
          Freshness You Can Trust, Savings You will Love!
        </h1>

        <div className='flex items-center mt-6 font-medium'>
          <Link to={"/products"} className='flex items-center gap-2 px-7 py-3 bg-primary hover:bg-primary-dull transition text-white rounded cursor-pointer'>
            Show now
            <img className='md:hidden transition group-focus transform translate-x-1' src={assets.white_arrow_icon} alt="arrow" />
          </Link>

          <Link to={"/products"} className='group hidden md:flex items-center gap-2 px-9 py-3 cursor-pointer'>
            Explore deals
            <img className='transition group-hover:translate-x-1' src={assets.black_arrow_icon} alt="arrow" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MainBanner
