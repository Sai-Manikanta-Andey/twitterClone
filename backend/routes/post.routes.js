import express from "express"
import { protectRoute } from "../middleware/protectedRoute.js";
import { createPost, deletePost,commentOnPost,likeUnlikePost,getAllPost,getLikedposts,getFollowingPosts } from "../controllers/post.controller.js";

const router = express.Router();

router.get("/allposts", protectRoute,getAllPost)
router.get("/followingposts", protectRoute,getFollowingPosts)
router.get("/likes/:id", protectRoute,getLikedposts)
router.post("/create", protectRoute,createPost)
router.post("/likepost/:id", protectRoute,likeUnlikePost)
router.post("/comment/:id", protectRoute,commentOnPost)
router.post("/:id", protectRoute,deletePost)

export default router