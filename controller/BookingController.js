import Booking from "../models/BookingSchema.js";

export const BookCounseller = async (req, res) => {
  try {
    const io = req.app.get("io");

    const { name, email, phoneNumber, BookedCounseller, courses, Date, Image, description, experience, action } = req.body;

    if (!name || !email || !phoneNumber || !BookedCounseller || !courses || !Date || !description || !experience || !Image || !action) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const booking = await Booking.create({
      name,
      email,
      phoneNumber,
      BookedCounseller,
      courses,
      Date,
      Image,
      description,
      experience,
      action
    });
    if (io) {
      io.emit("booking-created", booking);
    }

    res.status(201).json({
      success: true,
      message: "Booking successful",
      data: booking,
    });

  } catch (error) {
    console.log("Booking Error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const GetCounseller = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });

  } catch (error) {
    console.log("Fetch Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const DeleteCounseller = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const deletedCounsellor = await Booking.findOneAndDelete({ email });

    if (!deletedCounsellor) {
      return res.status(404).json({
        success: false,
        message: "Counsellor not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Counsellor deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const GetCounsellerByEmail = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const bookings = await Booking.find({ email }).sort({ createdAt: -1 });

    if (!bookings.length) {
      return res.status(404).json({
        success: false,
        message: "No counsellor booked with this email",
      });
    }

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });

  } catch (error) {
    console.log("Fetch Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const takenAction = async (req, res) => {
  try {
    const { id, action = "attended" } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Booking ID is required",
      });
    }

    if (!["pending", "attended"].includes(action)) {
      return res.status(400).json({
        success: false,
        message: "Action must be either 'pending' or 'attended'",
      });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { action },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Booking action updated successfully",
      data: updatedBooking,
    });
  } catch (error) {
    console.log("Taken Action Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};