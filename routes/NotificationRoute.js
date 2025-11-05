import express from "express";
import { AddNotification, GetAllNotifications } from "../controller/NotificationController.js"; // 👈 Added .js

const router = express.Router();


router.post("/add", AddNotification);

router.get("/all", GetAllNotifications);

export default router;
