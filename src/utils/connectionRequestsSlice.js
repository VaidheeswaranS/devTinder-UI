import { createSlice } from "@reduxjs/toolkit";

const connectionRequestsSlice = createSlice({
  name: "connectionRequests",
  initialState: [],
  reducers: {
    addConnectionRequest: (state, action) => {
      return action.payload;
    },

    removeConnectionRequest: (state, action) => {
      // this is removing the user profile from "requests" page and removing the requestId from the state if requestId from payload and requestId already in state are same
      const newState = state.filter((req) => req._id !== action.payload);
      return newState; // this will be the new state value for "connectionRequests"
    },
    clearConnectionRequests: (state, action) => {
      return [];
    },
  },
});

export const {
  addConnectionRequest,
  removeConnectionRequest,
  clearConnectionRequests,
} = connectionRequestsSlice.actions;

export default connectionRequestsSlice.reducer;
