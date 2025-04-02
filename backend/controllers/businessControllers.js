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
    const businesses = await Business.find({ role: "business" }).select(
      "-password"
    );
    res.json(businesses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get a business by ID
// @route GET /api/businesses/:id
// @access Public
const getBusinessById = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }
    res.json(business);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update business
// @route PUT /api/businesses/:id
// @access Private (Business Users Only)
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

// @desc Delete business
// @route DELETE /api/businesses/:id
// @access Private (Business Users Only)
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
