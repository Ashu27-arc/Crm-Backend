import express from "express"
import { BookCounseller, DeleteCounseller, GetCounseller } from "../controller/BookingController.js"
import { verifyToken } from "../middleware/auth.js"
const router=express.Router()

router.get('/booking-details',verifyToken,GetCounseller)
router.post('/book',BookCounseller)
router.post('/delete',DeleteCounseller)
export default router