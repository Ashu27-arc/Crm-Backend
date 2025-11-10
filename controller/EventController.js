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
export const DeleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEvent = await EventSchema.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    const io = req.app.get("io");
    if (io) {
      io.emit("delete-event", id);
      console.log("🗑️ Emitted delete-event:", id);
    }

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
      data: deletedEvent,
    });
  } catch (error) {
    console.error("❌ Error deleting event:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const UpdateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const io = req.app.get("io");

    const { description, date, city, country, state, time } = req.body;
    let updatedFields = { description, date, city, country, state, time };
    if (req.file) {
      const imageName = Date.now() + "-" + req.file.originalname;
      const uploadPath = path.join("uploads", imageName);
      fs.writeFileSync(uploadPath, req.file.buffer);
      updatedFields.image = `/uploads/${imageName}`;
    }

    const updatedEvent = await EventSchema.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    if (!updatedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    if (io) io.emit("event-updated", updatedEvent);

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: updatedEvent,
    });
  } catch (error) {
    console.error(" Error updating event:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


