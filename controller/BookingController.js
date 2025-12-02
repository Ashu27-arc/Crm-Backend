import Booking from "../models/BookingSchema.js";

export const BookCounseller = async (req, res) => {
  try {
    const io = req.app.get("io");
  const { name, email, phoneNumber, BookedCounseller, courses } = req.body;

    if (!name || !email || !phoneNumber || !BookedCounseller || !courses) {
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
    });
    io.emit("booking-created", booking);

    res.status(201).json({
      success: true,
      message: "Booking successful",
      data: booking,
    });
  } catch (error) {
    console.log("Booking Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
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

