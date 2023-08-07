// src/features/posts/postsSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state,action)=>{
      state.posts=action.payload;
    },
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    setPost: (state,action)=>{
      state.posts=state.posts.map((item)=>{
        if(item._id===action.payload._id)return action.payload;
        return item;
      })
    },
  },
});

export const { setPosts,addPost,setPost } = postsSlice.actions;
export default postsSlice.reducer;
