const mongoose = require("mongoose");

const financialSchema = {
  revenue: [Number],
  CAGR: Number,
  profitMargin: Number,
  ROI: Number,
  customerRetentionRate: Number,
};

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["general", "business"], default: "general" },
  description: String,
  contactDetails: String,
  businessType: String,
  location: String,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  financials: financialSchema,
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
});

module.exports = mongoose.model("User", userSchema);
