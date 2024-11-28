import express from "express"
import {getAllServices, getSingleService} from "../controllers/serviceController.js"

const router = express.Router()


router.get("/", getAllServices)
router.get("/:id", getSingleService)

export default router