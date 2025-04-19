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

export const registerUser = createAsyncThunk("auth/signup", async (data, thunkAPI) => {
  try {
    const res = await Api.post("signup", data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || { msg: "Something went wrong." });
  }
});

export const loginUser = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const res = await Api.post("login", data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || { msg: "Something went wrong." });
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.response = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER USER
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.response = action.payload.msg;
        if (action.payload.success) {
          state.isSuccess = true;
          state.profile = action.payload;
          state.user = action.payload.user;
        } else {
          state.isError = true;
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.response = action.payload?.msg || "Registration failed.";
      })

      // LOGIN USER
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.response = action.payload.msg;
        if (action.payload.success) {
          state.isSuccess = true;
          state.user = action.payload.user;
          state.profile = action.payload;
        } else {
          state.isError = true;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.response = action.payload?.msg || "Login failed.";
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
