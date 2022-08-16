import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const initialState = {};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {}
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
