import express from "express";
import { getCartItems, createCartItem } from "../controllers/cartController.js";

const router = express.Router();

router.route("/").get(getCartItems).post(createCartItem);
