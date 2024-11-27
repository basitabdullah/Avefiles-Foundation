import {Router} from "express"
import { checkout, checkoutSuccess, createCheckoutSession } from "../controllers/paymentController.js"
 import {protectRoute} from "../middlewares/authMiddleware.js"

const router = Router()

router.post("/create/checkout/session",protectRoute,createCheckoutSession)
router.post("/checkout-success", protectRoute, checkoutSuccess);
router.post("/checkout", checkout);

export default router