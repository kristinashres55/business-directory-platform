const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  const { name, description, price, availability } = req.body;
  const product = await Product.create({
    business: req.user._id,
    name,
    description,
    price,
    availability,
  });
  res.status(201).json(product);
};

exports.getProductsByBusiness = async (req, res) => {
  const products = await Product.find({ business: req.params.businessId });
  res.json(products);
};
