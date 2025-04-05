const User = require("../models/User");

exports.addFinancialData = async (req, res) => {
  try {
    const { year, amount, cagr, profitMargin, roi, customerRetentionRate } =
      req.body;
    const business = await User.findById(req.user._id);

    if (business.role !== "business") {
      return res
        .status(403)
        .json({ message: "Only business users can update financials" });
    }

    if (year && amount) business.financials.revenue.push({ year, amount });
    if (cagr) business.financials.cagr = cagr;
    if (profitMargin) business.financials.profitMargin = profitMargin;
    if (roi) business.financials.roi = roi;
    if (customerRetentionRate)
      business.financials.customerRetentionRate = customerRetentionRate;

    await business.save();
    res.json({
      message: "Financial data added",
      financials: business.financials,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFinancials = async (req, res) => {
  try {
    const business = await User.findById(req.params.businessId);
    if (!business || business.role !== "business") {
      return res.status(404).json({ message: "Business not found" });
    }
    res.json(business.financials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Financial Data (Business only)
exports.updateFinancials = async (req, res) => {
  try {
    const business = await User.findById(req.params.businessId);

    if (!business || business.role !== "business") {
      return res.status(404).json({ message: "Business not found" });
    }

    // Authorization check: Only the owner can update
    if (req.user._id.toString() !== req.params.businessId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Update specific fields if provided
    const { year, amount, cagr, profitMargin, roi, customerRetentionRate } =
      req.body;

    if (cagr !== undefined) business.financials.cagr = cagr;
    if (profitMargin !== undefined)
      business.financials.profitMargin = profitMargin;
    if (roi !== undefined) business.financials.roi = roi;
    if (customerRetentionRate !== undefined)
      business.financials.customerRetentionRate = customerRetentionRate;

    if (year && amount) {
      business.financials.revenue.push({ year, amount });
    }

    await business.save();

    res.json({
      message: "Financial data updated successfully",
      financials: business.financials,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
