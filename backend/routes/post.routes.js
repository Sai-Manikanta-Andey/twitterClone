import express from "express"
import { protectRoute } from "../middleware/protectedRoute.js";
import { createPost, deletePost,commentOnPost,likeUnlikePost } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", protectRoute,createPost)
router.post("/likepost/:id", protectRoute,likeUnlikePost)
router.post("/comment/:id", protectRoute,commentOnPost)
router.post("/:id", protectRoute,deletePost)

export default router