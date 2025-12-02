import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/AdminRoutes.js";
import notificationRoutes from "./routes/NotificationRoute.js";
import eventRoutes from "./routes/EventRoutes.js";
import Counseller from "./routes/Counseller.js"

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
app.set("io", io);
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
connectDB();
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/counseller",Counseller );
io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);
  socket.on("disconnect", () => console.log("🔴 User disconnected:", socket.id));
});
app.get("/", (req, res) => {
  res.status(200).json({
    message: "CRM Backend is running 🔥",
    status: "ok",
  });
});

// Health check 
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
