const express = require("express");
const { getFinancials } = require("../controllers/financialController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/:businessId", protect, getFinancials);

module.exports = router;
