// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    setLogout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    setUser:(state,action)=>{
      state.user=action.payload;
    }
  },
});

export const { setLogin, setLogout,setUser } = authSlice.actions;
export default authSlice.reducer;
