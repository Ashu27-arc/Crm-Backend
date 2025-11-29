import express from "express"
import { BookCounseller, GetCounseller } from "../controller/BookingController.js"
import { verifyToken } from "../middleware/auth.js"
const router=express.Router()

router.get('/booking-details',verifyToken,GetCounseller)
router.post('/book',BookCounseller)
export default router