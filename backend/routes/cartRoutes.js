import express from "express";

import {
  getCartItems,
  createCartItem,
  getCartItemById,
  deleteCart,
} from "../controllers/cartController.js";
const router = express.Router();

router
  .use(express.json())
  .route("/")
  .get(getCartItems)
  .post(createCartItem)
  .delete(deleteCart);
router.use(express.json()).route("/:id").get(getCartItemById);
export default router;
