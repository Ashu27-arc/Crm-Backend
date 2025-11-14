import Notification from "../models/notificationSchema.js";

export const AddNotification = async (req, res) => {
  try {
    const { description, course, state, date } = req.body;

    // Validate fields
    if (!course || !description || !state || !date) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const newNotification = await Notification.create({
      description,
      course,
      state,
      date,
    });

    
    const io = req.app.get("io");
    if (io) {
      io.emit("new-notification", newNotification);
      console.log("📢 Emitted real-time notification:", newNotification._id);
    }

    // Respond to API
    res.status(201).json({
      success: true,
      message: "Notification added successfully",
      data: newNotification,
    });
  } catch (error) {
    console.error(" Error adding notification:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const GetAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ date: -1 }); // newest first

    res.status(200).json({
      success: true,
      message:
        notifications.length > 0
          ? "Notifications fetched successfully"
          : "No notifications found",
      data: notifications,
    });
  } catch (error) {
    console.error("❌ Error fetching notifications:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const DeleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if ID exists in DB
    const deletedNotification = await Notification.findByIdAndDelete(id);

    if (!deletedNotification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    // Emit socket event if needed
    const io = req.app.get("io");
    if (io) {
      io.emit("delete-notification", id);
      console.log("🗑️ Emitted delete-notification event:", id);
    }

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
      data: deletedNotification,
    });
  } catch (error) {
    console.error("❌ Error deleting notification:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
