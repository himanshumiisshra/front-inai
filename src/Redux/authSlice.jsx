import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "./API.js";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  user: {},
  profile: "",
  response: "",
};

export const registerUser = createAsyncThunk("auth/signup", async (data) => {
  return await Api.post(`signup`, data)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err.response;
    });
});

export const loginUser = createAsyncThunk("auth/login", async (data) => {
  return await Api.post(`login`, data)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err.response;
    });
});

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //  REGISTER USER
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.response = action.payload.data.msg;
        // console.log(action.payload);
        if (action.payload.data.success) {
          state.isSuccess = true;
          state.profile = action.payload.data;

          state.user = action.payload.data.user;
        } else {
          state.isSuccess = false;
          state.isError = true;
        }
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      })

      // LOGIN USER
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.response = action.payload.data.msg;

        console.log(action.payload);
        if (action.payload.data.success) {
          state.isSuccess = true;
          state.user = action.payload.data.user;
          state.profile = action.payload.data;
        } else {
          state.isSuccess = false;
          state.isError = true;
        }
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      });
  },
});

export default authSlice.reducer;