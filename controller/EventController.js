import EventSchema from "../models/EventSchema.js";

export const AddEvent = async (req, res) => {
  try {
    const io = req.app.get("io"); 

    const { description, date, city, country, state, time } = req.body;
    let image = req.body.image;

    if (req.file) {
      image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
    }

    if (!description || !date || !image || !city || !country || !state || !time) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const newEvent = await EventSchema.create({
      description,
      date,
      image,
      city,
      state,
      country,
      time,
    });

    
    if (io) {
      io.emit("event-added", newEvent);
    }

    res.status(201).json({
      success: true,
      message: "Event added successfully",
      data: newEvent,
    });
  } catch (error) {
    console.error("Error adding event:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const GetAllEvents = async (req, res) => {
  try {
    const events = await EventSchema.find().sort({ date: -1 });

    res.status(200).json({
      success: true,
      message: events.length > 0 ? "Events fetched successfully" : "No events found",
      data: events,
    });
  } catch (error) {
    console.error("Error fetching events:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
