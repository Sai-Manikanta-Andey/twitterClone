import express from "express";
import dotenv from "dotenv";
import connectMongoDB from "./db/connectDb.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";

// routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import notificationRoutes from "./routes/notification.routes.js";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({ origin: "http://localhost:3000", credentials: true,methods: ["GET", "POST", "PUT", "DELETE"] }));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notification", notificationRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectMongoDB();
});
