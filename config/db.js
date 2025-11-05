import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
const connectDB=async()=>{
try {
    mongoose.connection.on("connected",()=>{
console.log("Monog DB is connected successfully")

})
mongoose.connection.on("error",(err)=>{

console.error("Mongo DB connection error",err.message)

})
mongoose.connection.on("disconnected",()=>{
console.log("Mongo DB is disconnected")
})
await mongoose.connect(process.env.MONGO_URI)

} catch (error) {
    console.error("Mongo DB connection failed",error.message)
    process.exit(1)
    
}

}
export default connectDB;