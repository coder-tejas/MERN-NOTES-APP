/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { MdClose } from 'react-icons/md'
import TagInput from "../components/TagInput"
import axios from "axios"
export const AddEditNotes = ({onClose,type,noteData,getAllNotes}) => {

  const [title ,setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags,setTags] = useState(noteData?.tags || ["hehehaslelerinkiakepapa"]);
  const [error,setError] = useState("");



  const editNote = async()=>{
     const noteId = noteData._id
    //  console.log(noteId)

     try{
           const res = await axios.post(`http://localhost:8080/api/note/edit/${noteId}`,{title,content,tags},{withCredentials:true})
           console.log(res.data)
           if (res.data.success === false) {
             console.log(res.data.message)
             setError(res.data.message)
             return
            }
        getAllNotes()
        onClose()
     }
     catch(error){
      console.log(error)
      setError(error)
     }

  }
   
  const addNewNote = async () =>{
    try{
          const res = await axios.post("http://localhost:8080/api/note/add",{title,content,tags},{withCredentials:true})
          if (res.data.success === false) {
   console.log(res.data.message)
   setError(res.data.message)
              return 
          }
          getAllNotes()
          onClose()

    }catch(error){
          console.log(error)
          setError(error)
    }
  }

  const handleAddNote = () =>{
    if (!title) {
       setError("pls enter the title "); return
    }
    if (!content) {
       setError("pls enter the content "); return
                    
    } 
    setError("")

   if (type === "edit") {
    editNote();
   }else{addNewNote();}

  } 

  return (
    <div className='relative flex flex-col'>
      <button className='w-10 h-10 rounded-full  flex items-center justify-center 
      absolute -top-3 -right-3 hover:bg-slate-50'
      onClick={onClose}>
        <MdClose className='text-xl text-slate-400 '/>
      </button>
      <div className='flex flex-col gap-2'>
        <label className='text-sm text-red-400 uppercase '>Title</label>

        <input type='text' 
         className='text-2xl text-slate-950  outline-none' 
         placeholder='Dolore in commodo sunt cupidatat laboris.'
         value={title}
         onChange={({target})=>{setTitle(target.value)}}

        />
       <div className='flex flex-col gap-2 mt-4'>
          <label className='text-xs text-red-400 uppercase '>Content</label>
         <textarea className='text-sm text-slate-950 outline-none 
          bg-slate-50 p-2 rounded' placeholder='Content' 
           rows={10} value={content} 
           onChange={({target})=>{setContent(target.value)}}
       
       >
       
       {" "}</textarea>
       </div>
        <div className='mt-3'>
             <label className='text-red-400 uppercase'> tags</label>
             <TagInput tags={tags} setTags={setTags}/>
        </div>
      </div>
       <button className='bg-blue-600 text-white rounded font-medium mt-5 p-3  ' onClick={handleAddNote}>{type === "edit" ? "Update" :"Add"}</button>
    </div>
  )
};

export default AddEditNotes
