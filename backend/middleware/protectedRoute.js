import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
   try {
     const token = req.cookies.token;
     if (!token) {           
         return res.status(401).json({ message: "Unauthorized" });
     } 
     const decoded = jwt.verify(token, process.env.JWT_SECRET);
     if (!decoded) {
         return res.status(401).json({ message: "Unauthorized" });
     }
     console.log(decoded);
     
     const user = await User.findById(decoded.userId).select("-password");
    
     
     req.user = user;
     next();
   } catch (error) {
    console.log("Error in protected route:", error);
    return res.status(500).json({ message: "Internal Server Error" });
    
   }  }