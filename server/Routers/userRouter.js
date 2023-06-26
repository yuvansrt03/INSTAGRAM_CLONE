import express from 'express';
import { followId, getUser,friendUser,updateUser } from '../Controllers/userController.js';
import { getUsers } from '../Controllers/authController.js';
const userRouter=express.Router();

userRouter.get('/',getUsers);
userRouter.get('/:id',getUser);
userRouter.put('/:id',updateUser);

userRouter.put('/follow/:id/:friendId',followId);
userRouter.put('/friends/:id/:friendId',friendUser);

export default userRouter;