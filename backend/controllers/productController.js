import Product from "../models/productModel.js";
import express from "express";

const getProducts = async (req, res) => {
  const products = await Product.find({});

  res.json(products);
  console.log(products);
};

export { getProducts };
