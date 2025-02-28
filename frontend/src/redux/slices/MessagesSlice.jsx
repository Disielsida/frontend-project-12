import axios from 'axios';

import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../../routes.js';

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async () => {
    const token = localStorage.getItem('authToken');

    const response = await axios.get(routes.messagesPath(), {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  }
);

const messagesAdapter = createEntityAdapter();

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, (state, { payload }) => {
        const messagesSortedById = payload.reduce((accumulator, channel) => (
          { ...accumulator, [channel.id]: channel }
        ), {});

        state.entities = messagesSortedById;
        state.ids = Object.keys(messagesSortedById);
      })
      .addCase(fetchMessages.rejected, (_, { error }) => {
        console.error('Ошибка при загрузке сообщений: ', error);
      });
  }
});

export default messagesSlice.reducer;
export const messagesSelectors = messagesAdapter.getSelectors((state) => state.messages);
