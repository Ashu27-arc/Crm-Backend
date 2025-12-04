import mongoose, { model } from "mongoose";

const bookingSchema=new mongoose.Schema({

name:{
    type:String,
    required:true
},
email:{
type:String,
required:true
},
phoneNumber:{
    type:String,
    required:true
},
BookedCounseller:{
type:String,
required:true
},
courses:{
    type:String,
    required:true
},
},
{timestamps:true})
const Booking=mongoose.model('BookingDetail',bookingSchema)
export default Booking