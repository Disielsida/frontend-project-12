import axios from 'axios';

import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../../routes.js';

import socket from '../../socket.js';

import { actions as channelsActions } from './ChannelsSlice.jsx';

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

export const addMessage = createAsyncThunk(
  'messages/addMessage',
  async (message) => {
    const token = localStorage.getItem('authToken');

    const response = await axios.post(routes.messagesPath(), message, {
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
  reducers: {
    addSocketMessage: messagesAdapter.addOne
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, (state, { payload }) => {
        const messagesSortedById = payload.reduce((accumulator, message) => (
          { ...accumulator, [message.id]: message }
        ), {});

        state.entities = messagesSortedById;
        state.ids = Object.keys(messagesSortedById);
      })
      .addCase(fetchMessages.rejected, (_, { error }) => {
        console.error('Ошибка при загрузке сообщений: ', error);
      })
      .addCase(addMessage.fulfilled, (state, { payload }) => {
        messagesAdapter.addOne(state, payload);
        socket.emit('newMessage', payload);
      })
      .addCase(addMessage.rejected, (_, { error }) => {
        console.error('Ошибка при добавлении сообщения: ', error);
      })
      .addCase(channelsActions.removeSocketChannel, (state, { payload }) => {
        const filtredMessagesIds = Object.values(state.entities)
          .filter((message) => message.channelId === payload)
          .map((message) => message.id);

        messagesAdapter.removeMany(state, filtredMessagesIds);
      });
  }
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;
export const messagesSelectors = messagesAdapter.getSelectors((state) => state.messages);
