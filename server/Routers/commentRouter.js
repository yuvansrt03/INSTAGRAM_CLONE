import express from 'express'
const commentRouter = express.Router();

commentRouter.get('/');
commentRouter.get('/:postId')
commentRouter.get('/:postId/:commentId')
commentRouter.delete('/:postId/:commentId');

export default commentRouter;
