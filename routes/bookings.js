const express = require("express");
const Booking = require("../models/Booking");

const router = express.Router();

/**
 * GET /api/bookings
 * Optional: ?userEmail=someone@email.com
 */
router.get("/", async (req, res) => {
  try {
    const { userEmail } = req.query;

    const filter = {};
    if (userEmail) filter.userEmail = userEmail;

    const bookings = await Booking.find(filter).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error("GET /api/bookings error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * POST /api/bookings
 * Creates a booking from frontend payload
 */
router.post("/", async (req, res) => {
  try {
    const b = req.body;

    if (!b.productId) return res.status(400).json({ message: "productId is required" });
    if (!b.title) return res.status(400).json({ message: "title is required" });
    if (!b.userEmail) return res.status(400).json({ message: "userEmail is required" });

    const booking = await Booking.create({
      productId: b.productId,
      title: b.title,
      imageUrl: b.imageUrl || "",
      category: b.category || "",
      price: Number(b.price) || 0,
      currency: b.currency || "BDT",
      userEmail: b.userEmail,
      userName: b.userName || "",
      status: b.status || "pending",
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error("POST /api/bookings error:", err);
    res.status(400).json({ message: "Invalid booking data", error: err.message });
  }
});

/**
 * PATCH /api/bookings/:id
 * Example: { status: "confirmed" }
 */
router.patch("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    if (status && !["pending", "confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Booking not found" });
    res.json(updated);
  } catch (err) {
    console.error("PATCH /api/bookings/:id error:", err);
    res.status(400).json({ message: "Update failed", error: err.message });
  }
});

/**
 * DELETE /api/bookings/:id
 */
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