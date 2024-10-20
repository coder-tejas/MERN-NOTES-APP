// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import PropTypes from 'prop-types';
import {  MdClose ,MdAdd} from 'react-icons/md';

const TagInput = ({tags,setTags}) => {

     const [inputvalue,setInputvalue] = useState()

    const handleInputChange =(e)=>{


      setInputvalue(e.target.value)
    }
    const addNewTag = () =>{
      if (inputvalue.trim !== "") {
        setTags([...tags,inputvalue.trim()]);
        setInputvalue("");
      }
    }
    const handleKeyDown = (e) =>{
      if (e.key==="Enter") {
        addNewTag();
      }
    }
      const handleRemoveTag = (tagtoremove)=>{
setTags(tags.filter((tags)=>tags !== tagtoremove))
  }
  return (
    <div>
      {tags?.length > 0 && (
        <div className='flex items-center gap-2 flex-wrap mt-2'>
        {
           tags.map((tags,index)=>(

            <span key={index} className='flex items-center gap-2 text-sm 
            text-slate-900 bg-slate-100 px-3 py-1 rounded '>
            #{tags}
            <button onClick={()=>{handleRemoveTag(tags)}}>
              <MdClose />
            </button>
            </span>
           
           ))
        }
        </div>
      )}
      <div className='flex items-center gap-4 mt-3'>
      <input 
        type="text"
        value={inputvalue}
        className='text-md bg-transparent border px-3 py-2 rounded outline-none'
        placeholder='Add Tags'
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button className='w-8 h-8 flex items-center  justify-center rounded border-blue-700
      hover:bg-blue-700 ' onClick={()=>{addNewTag()}}><MdAdd className='text-2xl text-blue-700 hover:text-white'/></button>
      </div>
    </div>
  )
}

TagInput.propTypes= {
  tags: PropTypes.string,
  setTags : PropTypes.bool
}

export default TagInput
