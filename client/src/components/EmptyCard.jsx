// eslint-disable-next-line no-unused-vars
import React from 'react'

// eslint-disable-next-line react/prop-types
export const EmptyCard = ({imgSrc,message}) => {
  return (
    <div className='flex flex-col items-center justify-center mt-20'>
     <img src={imgSrc} alt='NO NOTES FOUND'   className='w-60'/>
      EmptyCard
      <p className='w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-5'>
      {message}
      </p>
    </div>
  )
}

export default EmptyCard
