import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    removeUserInfo: (state, action) => {
      state.userInfo = [];
    },
  },
});

export const { setUserInfo, removeUserInfo } = userSlice.actions;

export default userSlice.reducer;
