// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
// import { ArrowRight } from 'lucide-react'
// import Navbar from '../components/Navbar'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'

// eslint-disable-next-line react/prop-types
export const PasswordInput = ({ value, onChange }) => {
    const [isShowpassword, setIsshowpassword] = useState(false)
  
    const toggleShowPass = () => {
      setIsshowpassword(!isShowpassword)
    }
  
    return (
      <div>
        <div className='flex items-center justify-between'>
          <label htmlFor='' className='text-base font-medium text-gray-900'>
            Password
          </label>
          <a
            href='#'
            title='Forgot password'
            className='text-sm font-semibold text-black hover:underline'
          >
            Forgot password?
          </a>
        </div>
        <div className='mt-2 relative'>
          <input
            className='flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 pr-10 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
            type={isShowpassword ? 'text' : 'password'}
            placeholder='Password'
            value={value}
            onChange={onChange}
            name='password'
          />
          {isShowpassword ? (
            <FaRegEye
              size={20}
              onClick={toggleShowPass}
              className='absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-900 cursor-pointer'
            />
          ) : (
            <FaRegEyeSlash
              size={20}
              onClick={toggleShowPass}
              className='absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-900 cursor-pointer'
            />
          )}
        </div>
      </div>
    )
}
  