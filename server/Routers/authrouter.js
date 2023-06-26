import express from 'express';
import {  findUser } from '../Controllers/authController.js';
const authrouter=express.Router();

authrouter.post('/login',findUser);

export default authrouter;