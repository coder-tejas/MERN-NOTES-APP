// eslint-disable-next-line no-unused-vars
import React from 'react'
import moment from "moment"
import {MdCreate, MdOutlinePushPin,MdDelete} from 'react-icons/md'
// eslint-disable-next-line react/prop-types
export default function NoteCard({title,date,isPinned,onPinNote,content,onEdit,onDelete,tags}) {
    
    return (
        <div className='border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out'>
          <div className='flex items-center justify-between'> 
             <div>
                 <h6 className='text-sm font-medium'> 
                        {title}
                 </h6>
                 <span className='text-sm text-green-700'>{moment(date).format("Do MMM YYYY")}</span>

             </div>
             <MdOutlinePushPin className={`hover:text-blue-700 ${isPinned ? "text-blue-700" : "text-slate-300"}`} onClick={onPinNote}/>
          </div>
          <p className='text-s text-slate-600 mt-2'>{content?.slice(0,60)}</p>
          <div className='flex items-center justify-between mt-2'>
          <div className='text-xs text-slate-500 '>
           {tags.map((item)=>`#${item} `)}
          </div>
          <div className='flex gap-1'>
            <MdCreate className="hover:text-blue-600" onClick={onEdit}/>
            <MdDelete className='text-slate-500 hover:text-red-600 size={20}' onClick={onDelete}/>
          </div>
          </div>
        </div>
    )
}


