import express from "express"
import { AddNote, deleteNote, EditNote, getAllNotes, searchNote, updatePinned } from "../controller/NoteController.js"
import { protectedRoute } from "../middleware/authMiddleware.js"

const router = express.Router()
 
router.post("/create",protectedRoute, AddNote)
router.put("/edit/:noteid",protectedRoute, EditNote)
router.get("/",protectedRoute, getAllNotes)
router.delete("/delete/:noteid",protectedRoute, deleteNote)
router.put("/updatePinned/:noteid",protectedRoute, updatePinned)
router.get("/search", protectedRoute, searchNote);

export default router