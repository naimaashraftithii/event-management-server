// models/Booking.js
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    // snapshot fields (so product delete হলেও booking info থাকে)
    title: { type: String, required: true },
    imageUrl: { type: String, default: "" },
    category: { type: String, default: "" },
    price: { type: Number, default: 0 },
    currency: { type: String, default: "BDT" },

    // user info (from NextAuth session)
    userEmail: { type: String, required: true },
    userName: { type: String, default: "" },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);