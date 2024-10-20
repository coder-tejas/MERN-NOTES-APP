import NotesModel from "../models/note.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const AddNote = async (req,res,next) =>{

    const {title,content,tags} = req.body;
    // console.log(req.body)
   console.log(req.user)
    const {id}= req.user
    
    if(!title){
        return req.status(400).json({
            message:"Title is required",
            success:false
        });
    }
    if(!content){
        return req.status(400).json({
            message:"Content is required",
            success:false
        });
    }
    
    try{

     const addNote = new NotesModel({
        userId: id,
        title,
        content,
        tags: tags || [],
    })

    await addNote.save()

    res.status(201).json({
        message:"Note Added Successfully",
        success:true,addNote
    })}
    catch(error){
        console.log(error,"hiiiii")
        next(error)
    }

}

export const editNote = async (req,res,next) =>{
    
    const note  = await NotesModel.findById(req.params.noteId)
    
    if(!note){
        return next(errorHandler(404,"Note not found"))
    }
    if(req.user.id !== note.userId){
        return next(errorHandler(401,"You can only update your own note"))
    }
    const { title, content, tags, isPinned } = req.body
    
    if (!title && !content && !tags) {
      return next(errorHandler(404, "No changes provided"))
    }  
    try{
        if (title) {
            note.title = title
        }
        if (content) {
            note.content = content
        }

        if (tags) {
            note.tags = tags
        }
        if (isPinned) {
            note.isPinned = isPinned
        }

        await note.save()

        res.status(200).json({
            message:"Note updated",
            success:"true",
            note
        })
    }catch(error){console.log(error)
        next(error)
    }
}

export const getAllNotes = async (req,res,next)=>{
    const userId = req.user.id
    try{
        const notes = await NotesModel.find({userId:userId}).sort({isPinned:-1})
        res.status(200).json({message:"Notes Fetched Successfully",
            success:true,
            notes
        })
    }catch(error){
        console.log(error)
        next(error)

    }

}

export const deleteNotes = async (req,res,next) =>{

    const noteId = req.params.noteId
    const note = await NotesModel.deleteOne({_id:noteId,userId:user.id})

    if (!note) {
        return res.status(404).json({
            message:"Note not found",
            success:false
        })
    }
    try{
        await NotesModel.deleteOne({_id:noteId,userId:req.user.id})
    }catch(error){console.log(error) 
        next(error)}

}

export const updateNotePinned  = async (req,res,next) =>{
    
    const noteId = req.param.noteId
    
    try{
    const note = await NotesModel.findById(noteId)

    if(!note){
        return errorHandler(404,"Note not found");

    }
    if (req.user.id !== note.userId) {
        return next(errorHandler())
    }

        const {isPinned} = req.body

        note.isPinned = isPinned

        await note.save()

        res.status(200).json({
            success:true,
            message:"Note Pinned "
        })


    }catch(error){
        console.log(error)
        next(error)
    }

}

export const searchNote = async (req, res, next) => {
    const { query } = req.query
  
    if (!query) {
      return next(errorHandler(400, "Search query is required"))
    }
  
    try {
      const matchingNotes = await Note.find({
        userId: req.user.id,
        $or: [
          { title: { $regex: new RegExp(query, "i") } },
          { content: { $regex: new RegExp(query, "i") } },
        ],
      })
  
      res.status(200).json({
        success: true,
        message: "Notes matching the search query retrieved successfully",
        notes: matchingNotes,
      })
    } catch (error) {
      next(error)
    }
  }