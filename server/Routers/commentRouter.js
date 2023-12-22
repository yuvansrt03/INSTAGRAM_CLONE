import express from "express";
import { addComment, getComments } from "../Controllers/commentController.js";
const commentRouter = express.Router();

commentRouter.get("/:postId", getComments);
commentRouter.post("/:postId", addComment);
// commentRouter.delete("/:postId/:commentId", deleteComment);
export default commentRouter;
