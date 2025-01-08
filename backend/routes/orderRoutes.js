import express from "express";
import {
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  getOrderDetails,
} from "../controllers/orderController.js";
import { protectRoute, adminRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/my", protectRoute, getMyOrders);
router.get("/admin/all", protectRoute, adminRoute, getAllOrders);
router.put("/admin/:orderId", protectRoute, adminRoute, updateOrderStatus);
router.get("/admin/:orderId", protectRoute, adminRoute, getOrderDetails);

export default router;
