import express from 'express';
import { addChats,getChats, getIndividualChats } from '../Controllers/chatController.js';
const chatRouter=express.Router();

chatRouter.post('/',addChats);
chatRouter.get('/',getChats);
chatRouter.get('/:userId/:friendId',getIndividualChats);

export default chatRouter;