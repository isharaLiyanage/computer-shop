import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
  name: "Auth",
  initialState: {
    Auth: [],
    isFetching: false,
    success: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getLogStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getLogSuccess: (state, action) => {
      state.isFetching = false;
      state.Auth = action.payload;
    },
    getLogFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //sign
    getSignStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getSignSuccess: (state, action) => {
      state.isFetching = false;
      state.Auth = action.payload;
    },
    getSignFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updateUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateUserSuccess: (state, action) => {
      state.isFetching = false;
      state.success = true;
      state.Auth = action.payload;
    },
    updateUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    Logout: (state, action) => {
      state.Auth = [];
    },
  },
});

export const {
  getLogStart,
  getLogSuccess,
  getLogFailure,
  getSignFailure,
  getSignStart,
  getSignSuccess,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  Logout,
} = AuthSlice.actions;

export default AuthSlice.reducer;
