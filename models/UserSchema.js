import mongoose from "mongoose";

const user=new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true

    },
    password:{
type:String,
required:true
}
})
const UserSchema= mongoose.model("User",user)

export default UserSchema