// validators/product.schema.js
const { z } = require("zod");

const productCreateSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  shortDescription: z
    .string()
    .min(10, "Short description must be at least 10 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  price: z.number().nonnegative("Price must be >= 0"),
  date: z.string().optional().nullable(),
  priority: z.enum(["low", "medium", "high", "very-high"]).optional(),
  imageUrl: z.string().url("Image URL must be a valid URL").optional().or(z.literal("")),
  category: z.string().min(2, "Category is required").optional(),
  currency: z.string().optional(),
});

module.exports = { productCreateSchema };