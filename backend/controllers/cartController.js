import Cart from "../models/cartModel.js";
const getCartItems = async (req, res) => {
  console.log(" :", req.body);
  const CartItems = await Cart.find({});

  res.json(CartItems);
};
const getCartItemById = async (req, res) => {
  
  const CartItems = await Cart.find({});
  const items = CartItems.map((item) => {
    const { user } = item;

    if (user.id == req.params.id) {
      return item;
    }
  });
  res.json(items);

  // if (user) {
  //   const { id } = user;
  //   if (id === req.params.id) {
  //     return item;
  //   }
  // }

  // if (product) {
  //   res.json(product);
  // } else {
  //   res.status(404).json({ message: "Product not found" });
  // }
};

const createCartItem = async (req, res) => {
  const cartItem = new Cart({
    cartItems: req.body.cartItems,
    user: req.body.user,
  });
  const createdCartItem = await cartItem.save();
  console.log("createdCartItem :", createdCartItem);

  res.status(201).json(createdCartItem);
};
const deleteCart = async (req, res) => {
  try {
    await Cart.deleteMany();

    console.log("Cart Deleted");
  } catch (error) {}
};
export { createCartItem, getCartItems, getCartItemById, deleteCart };
