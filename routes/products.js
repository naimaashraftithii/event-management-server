const express = require("express");
const Product = require("../models/Product");

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
// SEED 3 default products (run once)
router.post("/seed", async (req, res) => {
  try {
    const count = await Product.countDocuments();
    if (count > 0) {
      return res.status(200).json({ ok: true, message: "Already seeded", count });
    }

    const seed = [
      {
        title: "Starter Wedding Package",
        shortDescription: "Simple wedding décor with stage + lighting.",
        description:
          "Includes basic stage setup, flower panels, LED lighting, couple seating, and a small photo corner.",
        price: 55000,
        priority: "medium",
        imageUrl: "https://i.ibb.co.com/5hTqdw4G/4d1a6dbeec8ac59cd7783679dc9c11f7.jpg",
        category: "Wedding",
        currency: "BDT",
      },
      {
        title: "Birthday Premium Decoration",
        shortDescription: "Premium birthday décor with balloons and theme backdrop.",
        description:
          "Theme backdrop, balloon arch, cake table styling, fairy lights, and photo booth props.",
        price: 22000,
        priority: "high",
        imageUrl: "https://i.ibb.co.com/JWZjpV2r/3ef3e78f7998e8b2e457667b6a92862c.jpg",
        category: "Birthday",
        currency: "BDT",
      },
      {
        title: "Corporate Meeting Setup",
        shortDescription: "Minimal corporate setup with branding + screen.",
        description:
          "Conference seating, branded backdrop, PA system, projector/screen setup, and basic lighting.",
        price: 27000,
        priority: "low",
        imageUrl: "https://i.ibb.co.com/tTzDzw6h/office2.jpg",
        category: "Corporate",
        currency: "BDT",
      },
    ];

    const inserted = await Product.insertMany(seed);
    res.status(201).json({ ok: true, message: "Seeded 3 products", inserted });
  } catch (err) {
    console.error("POST /api/products/seed error:", err);
    res.status(500).json({ message: "Seed failed", error: err.message });
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
