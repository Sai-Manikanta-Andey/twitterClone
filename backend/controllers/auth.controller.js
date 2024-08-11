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

    if (password.length < 6) {
      console.log("Password too short");
      return res
        .status(400)
        .json({ error: "Password Should Be Atleast 6 Characters Long" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname,
      username,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      generateTokenAndCookie(newUser._id, res);
      await newUser.save();
      console.log("User saved, generating token and cookie");

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
      })
    }
    else{
      res.status(400).json({error:"Invalid User Data"})
    }
  } catch (error) {
    console.error("Error in signup controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ error: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!isPasswordCorrect) {
      console.log("Incorrect password");
      return res.status(400).json({ error: "Incorrect password" });
    }
    generateTokenAndCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      followers: user.followers,
      following: user.following,
      profileImg: user.profileImg,
      coverImg: user.coverImg,
      message: "user logged in",
    });
  } catch (error) {
    console.error("Error in login controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ message: "user logged out" });
  } catch (error) {
    console.log("Error in logout controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getMe controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
