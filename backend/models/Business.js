const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true }, // e.g., Private, Corporation, Partnership
    description: { type: String },
    contact: {
      email: { type: String, required: true },
      phone: { type: String },
      address: { type: String },
    },
    products: [{ name: String, price: Number, description: String }],
    services: [{ name: String, description: String }],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Business = mongoose.model("Business", businessSchema);
module.exports = Business;
