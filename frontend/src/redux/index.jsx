import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/AuthSlice.jsx';

const store = configureStore({
  reducer: {
    authorization: authReducer
  }
});

export default store;
