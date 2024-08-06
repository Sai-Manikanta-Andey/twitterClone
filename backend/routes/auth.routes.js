import { Router } from "express";
import { protectRoute } from "../middleware/protectedRoute.js";
import { signup,login,logout, getMe } from "../controllers/auth.controller.js";

const router = Router();

router.get("/me", protectRoute,getMe);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
