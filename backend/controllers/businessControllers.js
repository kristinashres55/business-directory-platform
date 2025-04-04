const Business = require("../models/User");

// @desc Create new business
// @route POST /api/businesses
// @access Private (Business Users Only)
const createBusiness = async (req, res) => {
  try {
    const { name, type, description, contact, products, services } = req.body;
    const business = new Business({
      name,
      type,
      description,
      contact,
      products,
      services,
      owner: req.user._id,
    });
    await business.save();
    res.status(201).json(business);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc Get all businesses
// @route GET /api/businesses
// @access Public
const getBusinesses = async (req, res) => {
  try {
    const { type, location, minRevenue, maxRevenue, sortBy } = req.query;
    let filter = { role: "business" };

    if (type) filter.businessType = type;
    if (location) filter.location = location;
    if (minRevenue || maxRevenue) {
      filter["financials.revenue"] = {};
      if (minRevenue) filter["financials.revenue"].$gte = Number(minRevenue);
      if (maxRevenue) filter["financials.revenue"].$lte = Number(maxRevenue);
    }

    let sort = {};
    if (sortBy === "revenue") sort["financials.revenue"] = -1;
    if (sortBy === "CAGR") sort["financials.CAGR"] = -1;
    if (sortBy === "profitMargin") sort["financials.profitMargin"] = -1;

    const businesses = await Business.find(filter)
      .sort(sort)
      .select("-password");
    res.json(businesses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBusinessById = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id)
      .populate("products") // <-- This pulls actual product docs
      .select("-password"); // optional: exclude sensitive fields

    if (!business || business.role !== "business") {
      return res.status(404).json({ message: "Business not found" });
    }

    res.json(business);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBusiness = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);

    if (!business || business.role !== "business") {
      return res.status(404).json({ message: "Business not found" });
    }

    if (req.user._id.toString() !== req.params.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    Object.assign(business, req.body);
    await business.save();

    res.json(business);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBusiness = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);

    if (!business || business.role !== "business") {
      return res.status(404).json({ message: "Business not found" });
    }

    if (req.user._id.toString() !== req.params.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await Business.deleteOne({ _id: req.params.id });
    res.json({ message: "Business removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBusiness,
  getBusinesses,
  getBusinessById,
  updateBusiness,
  deleteBusiness,
};
