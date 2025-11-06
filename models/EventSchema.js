import mongoose from "mongoose";
const eventSchema=new mongoose.Schema({

date:{
type:Date,
default:Date.now
},
description:{
type:String,
required:true
},
image:{
   type: String, 
   required: true 

},
city:{
    type:String,
    required:true

},
country:{
    type:String,
    required:true
},
state:{
    type:String,
    required:true

},
time:{
type:String,
required:true
}


})
const EventSchema=mongoose.model('Event',eventSchema);

export default EventSchema;
