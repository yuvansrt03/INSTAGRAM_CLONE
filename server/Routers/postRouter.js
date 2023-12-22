import express from "express";
import {
  deletePost,
  getPost,
  getPosts,
  updatePost,
  updatePostLike,
} from "../Controllers/postController.js";
import commentRouter from "./commentRouter.js";
const postRouter = express.Router();
postRouter.use("/comment", commentRouter);
postRouter.get("/", getPosts);
postRouter.get("/:postId", getPost);
postRouter.delete("/:postId", deletePost);
postRouter.put("/:postId", updatePost);
postRouter.put("/:postId/:userId", updatePostLike);
export default postRouter;
