import express from "express";
import multer from "multer";
import { AddEvent, GetAllEvents } from "../controller/EventController.js";
import {verifyToken}from "../middleware/auth.js";
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post("/add", upload.single("image"),verifyToken, AddEvent);
router.get("/all", GetAllEvents);

export default router;
