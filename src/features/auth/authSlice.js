import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null },
  reducers: {
    setCredentials(state, action) {
      const { token } = action.payload;

      state.token = token;
    },
    logOut(state) {
      state.token = null;
    },
  },
});

export const selectToken = (state) => state.auth.token;

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
