import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const loginAdmin = (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Received:", email, password);
    console.log("Expected:", process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);

    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { email, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
