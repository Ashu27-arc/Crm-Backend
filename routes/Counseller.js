import express from "express"
import { BookCounseller, DeleteCounseller, GetCounseller, GetCounsellerByEmail, takenAction } from "../controller/BookingController.js"
import { verifyToken } from "../middleware/auth.js"
const router = express.Router()

router.get('/booking-details', GetCounseller)
router.post('/book', BookCounseller)
router.post('/delete', DeleteCounseller)
router.get('/counseller-by-email', GetCounsellerByEmail)
router.patch('/action-taken', takenAction)
export default router