import express from 'express';
import { getMyOrders } from '../controllers/orderController.js';
import { protectRoute } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/my', protectRoute, getMyOrders);

export default router; 