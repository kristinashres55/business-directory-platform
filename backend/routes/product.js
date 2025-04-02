const express = require("express");
const {
  createProduct,
  getProductsByBusiness,
  getAllProducts,
} = require("../controllers/productController");
const { protect, businessOnly } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", protect, businessOnly, createProduct);
router.get("/", getAllProducts);
router.get("/:businessId", getProductsByBusiness);

module.exports = router;
