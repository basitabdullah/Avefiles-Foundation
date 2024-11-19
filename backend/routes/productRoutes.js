import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getFeaturedProducts,
  getProductsByCategory,
  getRecommendedProducts,
  getSingleProduct,
  searchProducts,
  toggleFeaturedProducts,
} from "../controllers/productController.js";
import { adminRoute, protectRoute } from "../middlewares/authMiddleware.js";
const router = express.Router();

// Product routes
router.post("/", protectRoute, adminRoute, createProduct);
router.get("/", getAllProducts);

// Specific routes come first
router.get("/search", searchProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/recommended", getRecommendedProducts);
router.get("/featured", getFeaturedProducts);

// Admin routes
router.get("/:id/toggle-featured", protectRoute, adminRoute, toggleFeaturedProducts); // Use more descriptive route
router.delete("/:id", protectRoute, adminRoute, deleteProduct);

// General single product route should come last
router.get("/:id", getSingleProduct);

export default router;
