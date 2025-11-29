import mongoose, { Schema } from "mongoose";

const notificationSchema = new mongoose.Schema({
  description: { 
    type: String, 
    required: true 
  },
  course: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now  
  }
});

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
