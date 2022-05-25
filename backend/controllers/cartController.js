import Cart from "../models/cartModel.js";
const getCartItems = async (req, res) => {
  const CartItems = await Cart.find({});

  res.json(CartItems);
};
const createCartItem = async (req, res) => {
  const cartItem = new CartItem({
    product: req.body.product,
    quantity: req.body.product,
  });
  const createdCartItem = await cartItem.save();

  res.status(201).json(createdCartItem);
};
export default { createCartItem, getCartItems };
