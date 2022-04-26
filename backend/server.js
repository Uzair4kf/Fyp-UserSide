import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
 
import productRoutes from "./routes/productRoutes.js";
const app = express();
dotenv.config();
connectDB();
const PORT = process.env.PORT || 5002;
app.listen(
  PORT,
  console.log(`Server running on ${process.env.NODE_ENV}mode on port ${PORT}`)
);

app.use("/products", productRoutes);
