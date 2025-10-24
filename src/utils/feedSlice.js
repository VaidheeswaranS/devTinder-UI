import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addUsersToFeed: (state, action) => {
      return action.payload;
    },
    removeUserFromFeed: (state, action) => {
      // this is removing the user profile from "feed" page and removing the userId from the state if userId from payload and userId already in state are same
      const newArray = state.filter((user) => user._id !== action.payload);
      return newArray; // this will be the new state value for "connectionRequests"
    },
  },
});

export const { addUsersToFeed, removeUserFromFeed } = feedSlice.actions;

export default feedSlice.reducer;
