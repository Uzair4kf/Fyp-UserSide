import Cart from "../models/cartModel.js";
const getCartItems = async (req, res) => {
  const CartItems = await Cart.find({});

  res.json(CartItems);
};
const createCartItem = async (req, res) => {
  console.log(req.body);
  const cartItem = new Cart({
    product: req.body.product,
    quantity: req.body.product,
    user: req.body.user,
  });
  const createdCartItem = await cartItem.save();

  res.status(201).json(createdCartItem);
};
export { createCartItem, getCartItems };
