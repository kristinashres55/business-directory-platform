const express = require("express");
const { getUserById, updateUser } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:id", protect, getUserById);
router.put("/:id", protect, updateUser);

module.exports = router;