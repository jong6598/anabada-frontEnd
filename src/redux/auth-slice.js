import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userAuth } from "../shared/api";

export const userThunk = createAsyncThunk(
  "users/info",
  async (data, thunkAPI) => {
    const response = await userAuth.useAccess(data);
  }
);

const initialState = {};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userThunk.fulfilled, (state, action) => {
      console.log("state ::: ", state);
      console.log("payload ::: ", action.payload);
      return (state = action.payload);
    });
    // 이거 어떻게 쓰는거지?
    builder.addCase(userThunk.rejected, (state, action) => {
      console.log("state ::: ", state);
      console.log("payload ::: ", action.payload);
      return (state = action.payload);
    });
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
