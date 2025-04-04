const mongoose = require("mongoose");

const financialSchema = {
  revenue: [
    {
      year: Number,
      amount: Number,
    },
  ],
  cagr: { type: Number, default: 0 },
  profitMargin: { type: Number, default: 0 },
  roi: { type: Number, default: 0 },
  customerRetentionRate: { type: Number, default: 0 },
};

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["general", "business"], default: "general" },
  description: String,
  phone: String,
  businessType: String,
  location: String,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  financials: financialSchema,
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
});

module.exports = mongoose.model("User", userSchema);
