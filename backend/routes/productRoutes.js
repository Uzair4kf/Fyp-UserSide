import express from "express";
import {
  getProducts,
  createProductReview,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/").get(getProducts);
router.use(express.json()).route("/:id/reviews").post(createProductReview);

export default router;
