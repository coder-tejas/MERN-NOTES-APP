// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6"
import { IoMdClose } from "react-icons/io"
import { ProfileInfo } from './ProfileInfo.jsx'
// import handleClearSearch from "../pages/Home.jsx"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  signoutFailure,
  signoutStart,
  signoutSuccess
} from '../redux/userSlice'
import axios from 'axios'

// const dispatch = useDispatch()
// eslint-disable-next-line react/prop-types
// eslint-disable-next-line react/prop-types
const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="w-40 sm:w-60 md:w-80 flex  items-center px-4 bg-slate-100 rounded-md">
      <input
        type="text"
        placeholder="Search Notes..."
        className="w-full text-xs bg-transparent py-[11px] outline-none border-slate-600"
        value={value}
        onChange={onChange}
      />

      {value && (
        <IoMdClose
          className="text-slate-900 text-xl cursor-pointer hover:text-black mr-3"
          onClick={onClearSearch}
        />
      )}

      <FaMagnifyingGlass
        className="text-slate-900 text-xl cursor-pointer hover:text-black mr-3"
        onClick={handleSearch}
      />
    </div>
  )
}


// eslint-disable-next-line react/prop-types
export const Navbar = ({ userInfo,  onSearchNote , handleClearSearch}) => {
  const [searchQuery, setSearchQuery] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSearch = (e) => {
e.preventDefault()
    if (searchQuery) {
      onSearchNote(searchQuery)
    }
  }

  const onClearSearch = () => {
    setSearchQuery("")
    handleClearSearch()
  }
  const onLogout = async () => {
    try {
      dispatch(signoutStart())
      const res = await axios.get('http://localhost:8080/api/auth/signout', {
        withCredentials: true
      })
      if (res.data.success === false) {
        dispatch(signoutFailure(res.data.message))
        return
      }
      dispatch(signoutSuccess())
      navigate('/login')
    } catch (error) {
      dispatch(signoutFailure(error.message))
    }
  }

  return (
    <div
      className=' shadow-custom-blue
    bg-slate-400 py-4 m-0  flex justify-between'
    >
      <div className='text-black font-extrabold text-[30px] ml-4'>Notes</div>
      <SearchBar
        value={searchQuery}
        onChange={({target}) => setSearchQuery(target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />
      
      <div>
        <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
      </div>
    </div>
  )
}

export default Navbar
