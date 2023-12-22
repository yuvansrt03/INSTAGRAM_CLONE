import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatFriends: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addChatFriends: (state, action) => {
      if (!state.chatFriends.some((obj) => obj._id === action.payload._id)) {
        state.chatFriends.push(action.payload);
      }
    },
    clearFriends: (state) => {
      state.chatFriends = [];
    },
    removeFriend: (state, action) => {
      state.chatFriends = state.chatFriends.filter(
        (friend) => friend._id !== action.payload
      );
    },
  },
});

export const { addChatFriends, clearFriends, removeFriend } = chatSlice.actions;
export default chatSlice.reducer;
