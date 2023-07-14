import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  token: "",
};

export const tasksSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStateUpdated: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
  },
});

// Action creators are generated for each case reducer function
export const { authStateUpdated } = tasksSlice.actions;

export default tasksSlice.reducer;
