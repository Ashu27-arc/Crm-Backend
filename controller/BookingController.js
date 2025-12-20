import Booking from "../models/BookingSchema.js";

export const BookCounseller = async (req, res) => {
  try {
    const io = req.app.get("io");  

    const { name, email, phoneNumber, BookedCounseller, courses ,Date} = req.body;

    if (!name || !email || !phoneNumber || !BookedCounseller || !courses ||!Date) {
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
      Date
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
