import express from 'express';
import { addComment, deleteComment } from '../Controllers/commentController.js';
const commentRouter=express.Router();

commentRouter.put('/:postId',addComment);
commentRouter.delete('/:postId/:commentId',deleteComment);
export default commentRouter;