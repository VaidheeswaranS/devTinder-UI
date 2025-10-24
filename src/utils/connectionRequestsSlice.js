import { createSlice } from "@reduxjs/toolkit";

const connectionRequestsSlice = createSlice({
  name: "connectionRequests",
  initialState: [],
  reducers: {
    addConnectionRequest: (state, action) => {
      return action.payload;
    },

    removeConnectionRequest: (state, action) => {
      return action.payload;
    },
  },
});

export const { addConnectionRequest, removeConnectionRequest } =
  connectionRequestsSlice.actions;

export default connectionRequestsSlice.reducer;
