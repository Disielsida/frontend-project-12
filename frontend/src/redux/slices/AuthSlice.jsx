import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../../routes.js';

export const logIn = createAsyncThunk(
  'auth/logIn',
  async (loginObject, { rejectWithValue }) => {
    try {
      const response = await axios.post(routes.loginPath(), loginObject);
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('username', response.data.username);
      return response.data;
    } catch (error) {
      return rejectWithValue('Неверные имя пользователя или пароль');
    }
  }
);

export const logOut = createAsyncThunk(
  'auth/logOut',
  async () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    return {};
  }
);

const AuthSlice = createSlice({
  name: 'authorization',
  initialState:
    {
      loggedIn: localStorage.getItem('authToken') !== null,
      username: localStorage.getItem('username') || null
    },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logOut.fulfilled, (state) => {
        state.loggedIn = false;
        state.username = null;
      })
      .addCase(logIn.fulfilled, (state, { payload }) => {
        state.loggedIn = true;
        state.username = payload.username;
      });
  }
});

export default AuthSlice.reducer;
