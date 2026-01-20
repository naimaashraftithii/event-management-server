const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    eventDate: { type: Date, required: true },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },

    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
