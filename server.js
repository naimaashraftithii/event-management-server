// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const productsRouter = require("./routes/products");
const bookingsRouter = require("./routes/bookings");

const app = express();

app.use(
  cors({
    origin: [process.env.CORS_ORIGIN || "http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Event Manager API running" });
});

app.use("/api/products", productsRouter);
app.use("/api/bookings", bookingsRouter);

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ Missing MONGODB_URI in .env");
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
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });