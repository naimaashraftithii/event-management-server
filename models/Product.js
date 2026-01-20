const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },

    price: { type: Number, required: true },
    date: { type: Date, default: null },

    priority: {
      type: String,
      enum: ["low", "medium", "high", "very-high"],
      default: "medium",
    },

    imageUrl: { type: String, default: "" },
    category: { type: String, default: "Event" },
    currency: { type: String, default: "BDT" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
