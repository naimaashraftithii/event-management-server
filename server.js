const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const productsRouter = require("./routes/products");
const bookingsRouter = require("./routes/bookings");

const app = express();

// Middleware
app.use(
  cors({
    origin: ["https://harmonious-concha-12cd95.netlify.app"],
    credentials: true,
  })
);
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Event Manager API running" });
});

// Routes
app.use("/api/products", productsRouter);
app.use("/api/bookings", bookingsRouter);

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ Missing MONGODB_URI in backend/.env");
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✔ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 API server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });
