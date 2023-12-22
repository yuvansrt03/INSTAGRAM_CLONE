import { combineReducers } from "@reduxjs/toolkit";
import authReducer from './authSlice'
import postReducer from './postSlice'
import userReducer from './userSlice'
import chatReducer from './chatSlice'
const rootReducer=combineReducers({
    auth:authReducer,
    post:postReducer,
    user:userReducer,
    chat:chatReducer,
})
    
export default rootReducer;