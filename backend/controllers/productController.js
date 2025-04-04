const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  const { name, description, price, availability } = req.body;
  try {
    const product = await Product.create({
      business: req.user._id,
      name,
      description,
      price,
      availability,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("business", "name email");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductsByBusiness = async (req, res) => {
  try {
    const products = await Product.find({ business: req.params.businessId });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
