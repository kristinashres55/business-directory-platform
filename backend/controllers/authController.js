const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

exports.register = async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    businessType,
    description,
    phone,
    location,
  } = req.body;
  try {
    // validation
    if (!name || name.length < 2) {
      return res
        .status(400)
        .json({ message: "Name must be at least 2 characters." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters." });
    }

    // Business-specific fields
    if (role === "business") {
      const phoneRegex = /^[0-9+\-()\s]{7,20}$/;
      if (!phone || !phoneRegex.test(phone)) {
        return res.status(400).json({ message: "Invalid phone number." });
      }
      if (!businessType) {
        return res.status(400).json({ message: "Business type is required." });
      }
      if (!location) {
        return res
          .status(400)
          .json({ message: "Business location is required." });
      }
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "Email is already registered. Please use new email" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      businessType,
      description,
      phone,
      location,
    });
    res.status(201).json({ token: generateToken(user._id), user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  res.json({ token: generateToken(user._id), user });
};
