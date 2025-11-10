import express from "express";
import multer from "multer";
import { AddEvent, DeleteEvent, GetAllEvents, UpdateEvent } from "../controller/EventController.js";
import {verifyToken}from "../middleware/auth.js";
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post("/add", upload.single("image"),verifyToken, AddEvent);
router.get("/all", GetAllEvents);
router.delete('/delete/:id',verifyToken,DeleteEvent)
router.put("/update/:id", upload.single("image"), verifyToken,UpdateEvent);
export default router;
