import express from 'express';
import { addComment } from '../Controllers/commentController.js';
const commentRouter=express.Router();

commentRouter.put('/:postId',addComment);

export default commentRouter;