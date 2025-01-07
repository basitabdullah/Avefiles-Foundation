import {Router} from "express"
import { checkout, checkoutSuccess, createCheckoutSession, getKey, paymentVerification } from "../controllers/paymentController.js"
import {protectRoute} from "../middlewares/authMiddleware.js"

const router = Router()

router.post("/create/checkout/session",protectRoute,createCheckoutSession)
router.post("/checkout-success", protectRoute, checkoutSuccess);
router.post("/checkout", protectRoute, checkout);
router.post("/paymentverification", protectRoute, paymentVerification);
router.get("/getkey", getKey);

export default router