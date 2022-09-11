import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { userAuth } from '../shared/api';

export const userThunk = createAsyncThunk('users/info', async (data) => {
  const response = await userAuth.useAccess(data);
  return response.data;
});

const initialState = {};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [userThunk.fulfilled.type](state, action) {
      state = action.payload;
      return state;
    }
  }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
