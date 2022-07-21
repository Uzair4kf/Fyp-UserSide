import express from "express";
import {
  getCategory,
  
} from "../controllers/categoryControllers.js";
const router = express.Router();
router.use(express.json()).route("/").get(getCategory);
 
export default router;
