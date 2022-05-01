import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import User from "./models/userModel.js";
const app = express();
dotenv.config();
connectDB();
app.use(cors());

const PORT = process.env.PORT || 5002;
app.listen(
  1337,
  console.log(`Server running on ${process.env.NODE_ENV}mode on port ${PORT}`)
);
app.use(express.json());
app.post("/api/register", async (req, res) => {
  try {
    await User.create({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
    });
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "Duplicate email" });
  }
});
app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    return res.json({ status: "ok", user: true });
  } else {
    return res.json({ status: "error", user: false });
  }
});
app.use("/products", productRoutes);
