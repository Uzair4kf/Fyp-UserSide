import express from "express";
import { getSliders } from "../controllers/sliderController.js";
const router = express.Router();

router.use(express.json()).route("/").get(getSliders);

export default router;
