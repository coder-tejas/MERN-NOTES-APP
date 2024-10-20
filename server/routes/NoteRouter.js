import express from "express"
import {verifyToken} from "../utils/verifyUser.js"
import {AddNote,searchNote,editNote,updateNotePinned,deleteNotes,getAllNotes} from "../controller/NoteController.js"


const router = express.Router()

router.post("/add",verifyToken,AddNote)
router.post("/edit/:noteId",verifyToken,editNote)
router.delete("/delete/noteId",verifyToken,deleteNotes)
router.get("/all",verifyToken,getAllNotes)
router.put("/update-note-pinned/:noteId",verifyToken,updateNotePinned)
router.get("/search",verifyToken,searchNote)

export default router