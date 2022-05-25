import express from "express";

import { getCartItems, createCartItem } from "../controllers/cartController.js";
const router = express.Router();

router.use(express.json()).route("/").get(getCartItems).post(createCartItem);
export default router;
