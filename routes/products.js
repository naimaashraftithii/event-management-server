const express = require("express");
const Product = require("../models/product"); // ✅ lowercase file name

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error("GET /api/products error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET product by id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    console.error("GET /api/products/:id error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST create product
router.post("/", async (req, res) => {
  try {
    const body = req.body;

    const product = new Product({
      title: body.title,
      shortDescription: body.shortDescription,
      description: body.description,
      price: Number(body.price),
      date: body.date || null,
      priority: body.priority || "medium",
      imageUrl: body.imageUrl || "",
      category: body.category || "Event",
      currency: body.currency || "BDT",
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error("POST /api/products error:", err);
    res.status(400).json({ message: "Invalid product data", error: err.message });
  }
});

// PUT update product
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.json(updated);
  } catch (err) {
    console.error("PUT /api/products/:id error:", err);
    res.status(400).json({ message: "Update failed", error: err.message });
  }
});

// DELETE product
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error("DELETE /api/products/:id error:", err);
    res.status(400).json({ message: "Delete failed", error: err.message });
  }
});

module.exports = router;