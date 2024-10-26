// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
// import { FaMagnifyingGlass } from "react-icons/fa6"
// import { IoMdClose } from "react-icons/io"
import {ProfileInfo} from './ProfileInfo.jsx'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signoutFailure, signoutStart, signoutSuccess} from '../redux/userSlice'
import axios from 'axios'


// const dispatch = useDispatch()
// eslint-disable-next-line react/prop-types
const SearchBar = ({ value, onChange, handleSearch }) => {
  return (
    
<form className="w-80 mx-auto">   
    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input value={value} onChange={onChange} type="text" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search " required />
        <button onClick={handleSearch} type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
</form>
  
  )
}



// eslint-disable-next-line react/prop-types
const Navbar = ({userInfo}) => {
  const [searchQuery, setSearchQuery] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()



  const handleSearch = () => {
            if(searchQuery){
              
              // 
            }
  }

  const onClearSearch = () => {
    setSearchQuery("")
  }
  const onLogout = async () =>{
    try{
            dispatch(signoutStart())
            const res = await axios.get("http://localhost:8080/api/auth/signout",{withCredentials:true})
       if (res.data.success===false) {
        dispatch(signoutFailure(res.data.message))
        return 
       }
       dispatch(signoutSuccess())
       navigate("/login")
    }
    catch(error){
      dispatch(signoutFailure(error.message))
    }
  }
   
   

  return (
    <div className=' shadow-custom-blue
    bg-slate-100 py-4 m-0  flex justify-between'>
      <div className='text-black font-extrabold text-[30px] ml-4'>Notes</div>
      <SearchBar
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />
      <div>
      <ProfileInfo userInfo={userInfo} onLogout={onLogout}/>
      </div>
    </div>
  )
}

export default Navbar
