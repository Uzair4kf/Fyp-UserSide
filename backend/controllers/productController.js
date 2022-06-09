import Product from "../models/productModel.js";
import express from "express";

const getProducts = async (req, res) => {
  const products = await Product.find({});

  res.json(products);
};

const createProductReview = async (req, res) => {
  const { rating, comment, currentUser } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.id.toString() === currentUser.id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: currentUser.name,
      rating: Number(rating),
      comment,
      user: currentUser,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
};

export { getProducts, createProductReview };
