import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import notificationRoutes from "./routes/NotificationRoute.js";
import eventRoutes from "./routes/EventRoutes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: "*", // Replace with frontend IP when deploying
    methods: ["GET", "POST"],
  },
});


app.use(cors());
app.use(express.json());


connectDB();


app.set("io", io);
app.use("/api/notifications", notificationRoutes);
app.use("/api/events", eventRoutes);
io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

app.get("/", (req, res) => {
  res.send("✅ CRM Backend API is running...");
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
