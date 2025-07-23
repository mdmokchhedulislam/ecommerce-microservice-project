import React from 'react'
import cn from '../../utils/cn'

function ImageCard({children,className,image,title, des,price }) {
  return (
    <>
    <div className={cn(`max-w-[306px] h-[337px] relative mx-auto col-span-12  md:col-span-6 lg:col-span-3 transition-all duration-400 hover:scale-105 `, className)}>
        <img className=" w-[306px] h-[253px] " src={image} alt="" />
        <div className='flex gap-2 absolute top-2 right-3 bg-white p-2 rounded-full'>
          <img src="/images/describe/3.png" alt="" />
          <p>Blizzard</p>
        </div>
        <div className='max-w-[244px] gap-[16px] mt-[16px]'>
            <h1 className='font-onest font-bold text-[16px] leading-[30px]'>{title}</h1>
            <p className='font-onest text-[14px] leading-[30px] text-secondary'>{des}</p>
            <p className='font-onest font-bold text-[16px] leading-[30px]'>${price}</p>

        </div>
    </div>
      
    </>
  )
}

export default ImageCard
