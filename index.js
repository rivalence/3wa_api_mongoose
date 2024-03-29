import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import mangaRoutes from "./routes/mangaRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to app");
});

// Routes
app.use("/", mangaRoutes, authRoutes);

// Database
const mongoConnect = process.env.MONGO_URI;
mongoose.connect(mongoConnect);

const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${port}`);
});
