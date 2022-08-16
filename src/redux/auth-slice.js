import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userAuth } from "../shared/api";

export const userThunk = createAsyncThunk(
  "users/info",
  async (data, thunkAPI) => {
    const response = await userAuth.useAccess(data);
    return response.data;
  }
);

const initialState = {};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userThunk.fulfilled, (state, action) => {
      state = action.payload;
      return state;
    });
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
