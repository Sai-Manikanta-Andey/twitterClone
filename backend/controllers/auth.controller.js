import User from "../models/user.model.js";
import generateTokenAndCookie from "../lib/utils/generateToken.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { fullname, email, password, username } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      console.log("Invalid email format");
      return res.status(400).json({ error: "invalid email" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log("Username already exists");
      return res.status(400).json({ error: "username already exists" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      console.log("Email already exists");
      return res.status(400).json({ error: "Email already exists" });
    }

    console.log("Creating new user");

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    console.log("User saved, generating token and cookie");

    generateTokenAndCookie(newUser._id, res);

    console.log("Token and cookie generated, sending response");

    res.status(201).json({
      _id: newUser._id,
      fullname: newUser.fullname,
      username: newUser.username,
      email: newUser.email,
      followers: newUser.followers,
      following: newUser.following,
      profileImg: newUser.profileImg,
      coverImg: newUser.coverImg,
      message: "user created",
    });
  } catch (error) {
    console.error("Error in signup controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
