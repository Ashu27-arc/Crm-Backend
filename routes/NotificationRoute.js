import express from "express";
import { AddNotification, GetAllNotifications } from "../controller/NotificationController.js"; 
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();


router.post("/add",verifyToken, AddNotification);

router.get("/all",GetAllNotifications);

export default router;
