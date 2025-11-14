import express from "express";
import { AddNotification, GetAllNotifications,DeleteNotification } from "../controller/NotificationController.js"; 
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();


router.post("/add",verifyToken, AddNotification);

router.get("/all",GetAllNotifications);
router.delete("/delete/:id",verifyToken,DeleteNotification)
export default router;
