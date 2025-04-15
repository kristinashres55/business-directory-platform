const User = require("../models/User");

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Get user error:", err.message);
    res.status(500).json({ message: "Failed to fetch user profile" });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user._id.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Not authorized" });

    Object.assign(user, req.body);
    await user.save();
    res.json(user);
  } catch (err) {
    console.error("Update user error:", err.message);
    res.status(500).json({ message: "Failed to update user" });
  }
};

module.exports = { getUserById, updateUser };
