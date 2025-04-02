const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  business: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  description: String,
  price: Number,
  availability: Boolean,
});

module.exports = mongoose.model("Product", productSchema);
