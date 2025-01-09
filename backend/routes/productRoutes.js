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
  toggleStockStatus,
} from "../controllers/productController.js";
import { adminRoute, protectRoute } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/", protectRoute, adminRoute, createProduct);
router.get("/", getAllProducts);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);
router.get("/category/:category", getProductsByCategory);
router.get("/recommended", getRecommendedProducts);
router.patch("/:id",protectRoute ,adminRoute, toggleFeaturedProducts);
router.get("/featured", getFeaturedProducts);
router.get ("/search",searchProducts)
router.get("/:id", getSingleProduct);
router.patch("/:id/stock", protectRoute, adminRoute, toggleStockStatus);

export default router;
