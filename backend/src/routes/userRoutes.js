import express from "express"
import { getUser, Login, Register } from "../controller/userController.js"
import { protectedRoute } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/register", Register)
router.post("/Login", Login) 
router.get("/user-details",protectedRoute, getUser) 

export default router