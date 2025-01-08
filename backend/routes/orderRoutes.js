import express from "express";
import {
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { protectRoute, adminRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/my", protectRoute, getMyOrders);
router.get("/admin/all", protectRoute, adminRoute, getAllOrders);
router.put("/admin/:orderId", protectRoute, adminRoute, updateOrderStatus);

export default router;
