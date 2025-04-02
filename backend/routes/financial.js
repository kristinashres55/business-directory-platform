const express = require("express");
const {
  getFinancials,
  updateFinancials,
  addFinancialData,
} = require("../controllers/financialController");
const { protect, businessOnly } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", protect, businessOnly, addFinancialData); // Add financial data
router.get("/:businessId", protect, getFinancials);
router.put("/:businessId", protect, businessOnly, updateFinancials);

module.exports = router;
