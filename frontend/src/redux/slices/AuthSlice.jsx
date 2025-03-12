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
      if (error.response.status === 401) {
        return rejectWithValue('Неверные имя пользователя или пароль');
      }

      return error;
    }
  },
);

export const logOut = createAsyncThunk(
  'auth/logOut',
  async () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    return {};
  },
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (newUserData, { rejectWithValue }) => {
    try {
      const response = await axios.post(routes.signupPath(), newUserData);
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('username', response.data.username);
      return response.data;
    } catch (error) {
      if (error.response.status === 409) {
        return rejectWithValue('Такой пользователь уже существует');
      }

      return error;
    }
  },
);

const AuthSlice = createSlice({
  name: 'authorization',
  initialState:
    {
      token: null,
      loggedIn: false,
      username: null,
    },
  reducers: {
    setUser: (state, { payload }) => ({
      ...state,
      token: payload.token,
      loggedIn: payload.loggedIn,
      username: payload.username,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(logOut.fulfilled, (state) => ({
        ...state,
        loggedIn: false,
        username: null,
      }))
      .addCase(logOut.rejected, (_, { error }) => {
        console.error('Ошибка при выходе из профиля: ', error);
      })
      .addCase(logIn.fulfilled, (state, { payload }) => ({
        ...state,
        token: payload.token,
        loggedIn: true,
        username: payload.username,
      }))
      .addCase(logIn.rejected, (_, { error }) => {
        console.error('Ошибка при авторизации: ', error);
      })
      .addCase(signUp.fulfilled, (state, { payload }) => ({
        ...state,
        token: payload.token,
        loggedIn: true,
        username: payload.username,
      }));
  },
});

export const { actions } = AuthSlice;
export default AuthSlice.reducer;
