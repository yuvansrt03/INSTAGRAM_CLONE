import express from 'express';
import { createUser, findUser } from '../Controllers/authController.js';
const authrouter=express.Router();

authrouter.post('/register',createUser);
authrouter.post('/login',findUser);

export default authrouter;