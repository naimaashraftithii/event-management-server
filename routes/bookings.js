const express = require("express");
const Booking = require("../models/booking");

const router = express.Router();

// GET all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("productId")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    console.error("GET /api/bookings error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST create booking
router.post("/", async (req, res) => {
  try {
    const body = req.body;

    const booking = new Booking({
      name: body.name,
      email: body.email,
      phone: body.phone || "",
      productId: body.productId,
      eventDate: body.eventDate,
      notes: body.notes || "",
      status: body.status || "pending",
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    console.error("POST /api/bookings error:", err);
    res.status(400).json({ message: "Invalid booking data", error: err.message });
  }
});

// DELETE booking
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Booking.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Booking deleted" });
  } catch (err) {
    console.error("DELETE /api/bookings/:id error:", err);
    res.status(400).json({ message: "Delete failed", error: err.message });
  }
});

module.exports = router;
