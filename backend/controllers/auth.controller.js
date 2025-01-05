import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const createAccount = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res
      .status(400)
      .json({ error: true, message: "All fields are required" });
  }

  try {
    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.json({ error: true, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ fullName, email, password: hashedPassword });
    await user.save();

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.json({
      error: false,
      user: { id: user._id, fullName: user.fullName, email: user.email },
      accessToken,
    });
  } catch (err) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.json({ error: false, message: "Login successful", accessToken });
  } catch (err) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

export const getUser = async (req, res) => {
  const userId = req.user.userId;
  try {
    const user = await User.findById(userId, { password: 0 });
    if (!user) {
      return res.status(404).json({ error: true, message: "User not found" });
    }
    return res.json({
      error: false,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        createdOn: user.createdOn,
      },
      message: "User data retrieved successfully",
    });
  } catch (error) {
    console.error("Error retrieving user:", error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};
