import axios from 'axios';

import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../../routes.js';

import socket from '../../socket.js';

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async () => {
    const token = localStorage.getItem('authToken');

    const response = await axios.get(routes.channelsPath(), {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }
);

export const addChannel = createAsyncThunk(
  'channels/addChannel',
  async (channel) => {
    const token = localStorage.getItem('authToken');

    const response = await axios.post(routes.channelsPath(), channel, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }
);

export const removeChannel = createAsyncThunk(
  'channels/removeChannel',
  async (id) => {
    const token = localStorage.getItem('authToken');

    const response = await axios.delete(routes.removeChannelPath(id), {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }
);

const channelsAdapter = createEntityAdapter();

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState({
    activeChannelId: null
  }),
  reducers: {
    setActiveChannel(state, { payload }) {
      state.activeChannelId = payload;
    },
    addSocketChannel: channelsAdapter.addOne,
    removeSocketChannel: channelsAdapter.removeOne
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, (state, { payload }) => {
        const channelsSortedById = payload.reduce((accumulator, channel) => (
          { ...accumulator, [channel.id]: channel }
        ), {});

        state.entities = channelsSortedById;
        state.ids = Object.keys(channelsSortedById);

        const [firstChannelId] = state.ids;

        if (!state.activeChannelId && state.ids.length > 0) {
          state.activeChannelId = firstChannelId;
        }
      })
      .addCase(fetchChannels.rejected, (_, { error }) => {
        console.error('Ошибка при загрузке каналов: ', error);
      })
      .addCase(addChannel.fulfilled, (state, { payload }) => {
        channelsAdapter.addOne(state, payload);
        socket.emit('newChannel', payload);
      })
      .addCase(addChannel.rejected, (_, { error }) => {
        console.error('Ошибка при добавлении канала: ', error);
      })
      .addCase(removeChannel.fulfilled, (state, { payload }) => {
        channelsAdapter.removeOne(state, payload.id);
        socket.emit('removeChannel', payload);
      })
      .addCase(removeChannel.rejected, (_, { error }) => {
        console.error('Ошибка при удалении канала: ', error);
      });
  }
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);
