import express from "express";
import multer from "multer";
import { AddEvent, GetAllEvents } from "../controller/EventController.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post("/add", upload.single("image"), AddEvent);
router.get("/all", GetAllEvents);

export default router;
