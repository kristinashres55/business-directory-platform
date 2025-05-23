const express = require("express");
const {
  createBusiness,
  getBusinesses,
  getBusinessById,
  updateBusiness,
  deleteBusiness,
  getFilteredBusinesses,
} = require("../controllers/businessControllers");
const { protect, businessOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// Routes
router.post("/", protect, businessOnly, createBusiness);
router.get("/", getBusinesses);
router.get("/search", getFilteredBusinesses);
router.get("/:id", protect, getBusinessById);
router.put("/:id", protect, businessOnly, updateBusiness);
router.delete("/:id", protect, businessOnly, deleteBusiness);

module.exports = router;
