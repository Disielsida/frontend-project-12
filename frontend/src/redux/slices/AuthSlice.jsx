import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../../routes.js';

export const logIn = createAsyncThunk(
  'auth/logIn',
  async (loginObject, { rejectWithValue }) => {
    try {
      const response = await axios.post(routes.loginPath(), loginObject);
      localStorage.setItem('authToken', response.data.token);
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
  }
);

const AuthSlice = createSlice({
  name: 'authorization',
  initialState: { loggedIn: localStorage.getItem('authToken') !== null, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logOut.fulfilled, (state) => {
      state.loggedIn = false;
    });
    builder.addCase(logIn.fulfilled, (state) => {
      state.loggedIn = true;
    });
    builder.addCase(logIn.rejected, (state, action) => {
      state.error = action.payload;
      console.log(action.payload);
    });
  }
});

export default AuthSlice.reducer;
