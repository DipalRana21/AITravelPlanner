import express from "express"
import dotenv from "dotenv"
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.route.js";

dotenv.config();

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoute);

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

try {
    await mongoose.connect(MONGO_URI)

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    console.log("MongoDB connected");

} catch (error) {
    console.error("MongoDB connection failed", error.message);
    process.exit(1);
}

