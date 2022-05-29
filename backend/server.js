import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import connectDB from "./config/db.js";
import cors from "cors";
import auth from "./middleware/auth.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import User from "./models/userModel.js";
import session from "express-session";
import { Socket } from "socket.io";
import * as http from "http";
import { createServer } from "http";
import { Server } from "socket.io";
const app = express();
dotenv.config();
connectDB();
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost/3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Authorization"
  );
  next();
});
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
// app.use(
//   session({
//     secret: "keyboard cat",
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true },
//   })
// );

const PORT = process.env.PORT || 5002;
app.listen(
  PORT,
  console.log(`Server running on ${process.env.NODE_ENV} mode on port ${PORT}`)
);
app.use(express.json());
app.post("/api/register", auth, async (req, res) => {
  console.log(req.headers.authorization);
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
app.post("/api/login", auth, async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "admin123"
    );
    return res.json({ status: "ok", user: true, token });
  } else {
    return res.json({ status: "error", user: false });
  }
});

//server
