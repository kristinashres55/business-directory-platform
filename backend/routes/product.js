
const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductsByBusiness,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect, businessOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.get("/", getAllProducts);
router.get("/business/:businessId", getProductsByBusiness);

// Business-protected routes
router.post("/", protect, businessOnly, createProduct);
router.put("/:id", protect, businessOnly, updateProduct);
router.delete("/:id", protect, businessOnly, deleteProduct);


module.exports = router;


