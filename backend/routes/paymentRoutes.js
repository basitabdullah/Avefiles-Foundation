import {Router} from "express"
import { checkout, checkoutSuccess, createCheckoutSession, getKey, paymentVerification } from "../controllers/paymentController.js"
import { donationCheckout, donationVerification, getAllDonations, getDonationById, getDonationStats } from "../controllers/donationController.js"
import {protectRoute, adminRoute} from "../middlewares/authMiddleware.js"

const router = Router()

router.post("/create/checkout/session",protectRoute,createCheckoutSession)
router.post("/checkout-success", protectRoute, checkoutSuccess);
router.post("/checkout", protectRoute, checkout);
router.post("/paymentverification", protectRoute, paymentVerification);

router.post("/donation-checkout", protectRoute, donationCheckout);
router.post("/donation-verification", protectRoute, donationVerification);

router.get("/donations", protectRoute, adminRoute, getAllDonations);
router.get("/donations/:id", protectRoute, adminRoute, getDonationById);
router.get("/donation-stats", protectRoute, adminRoute, getDonationStats);

router.get("/getkey", getKey);

export default router