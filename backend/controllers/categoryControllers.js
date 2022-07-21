import Category from "../models/categoryModel.js";
const getCategory = async (req, res) => {
  const categories = await Category.find({});

  res.json(categories);
};
export { getCategory };
