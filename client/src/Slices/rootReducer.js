import { combineReducers } from "@reduxjs/toolkit";
import authReducer from './authSlice'
import postReducer from './postSlice'
import userReducer from './userSlice'
const rootReducer=combineReducers({
    auth:authReducer,
    post:postReducer,
    user:userReducer,
})
    
export default rootReducer;