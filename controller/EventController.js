import EventSchema from "../models/EventSchema.js";
import path from "path";
import fs from "fs";

export const AddEvent = async (req, res) => {
  try {
    const io = req.app.get("io");

    const { description, date, city, country, state, time } = req.body;
    let imageUrl;

    if (req.file) {
      const imageName = Date.now() + "-" + req.file.originalname;
      const uploadPath = path.join("uploads", imageName);

      fs.writeFileSync(uploadPath, req.file.buffer);
      imageUrl = `/uploads/${imageName}`;
    }

    if (!description || !date || !imageUrl || !city || !country || !state || !time) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const newEvent = await EventSchema.create({
      description,
      date,
      image: imageUrl,
      city,
      state,
      country,
      time,
    });

    if (io) io.emit("event-added", newEvent);

    res.status(201).json({
      success: true,
      message: "Event added successfully",
      data: newEvent,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const GetAllEvents = async (req, res) => {
  try {
    const events = await EventSchema.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: events.length ? "Events fetched successfully" : "No events found",
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
