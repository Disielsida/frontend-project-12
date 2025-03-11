import axios from 'axios';

import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../../routes.js';

import socket from '../../socket.js';

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (_, { getState }) => {
    const { token } = getState().authorization;

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
  async (channel, { getState }) => {
    const { token } = getState().authorization;

    const response = await axios.post(routes.channelsPath(), channel, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    socket.emit('newChannel', response.data);
    return response.data;
  }
);

export const removeChannel = createAsyncThunk(
  'channels/removeChannel',
  async (id, { getState }) => {
    const { token } = getState().authorization;

    const response = await axios.delete(routes.removeOrRenameChannelPath(id), {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    socket.emit('removeChannel', response.data);
    return response.data;
  }
);

export const renameChannel = createAsyncThunk(
  'channels/renameChannel',
  async ({ id, editedChannel }, { getState }) => {
    const { token } = getState().authorization;

    const response = await axios.patch(routes.removeOrRenameChannelPath(id), editedChannel, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    socket.emit('renameChannel', response.data);
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
    removeSocketChannel(state, { payload }) {
      channelsAdapter.removeOne(state, payload);

      if (state.activeChannelId === payload) {
        state.activeChannelId = state.ids.length > 0 ? state.ids[0] : null;
      }
    },
    renameSocketChannel(state, { payload }) {
      channelsAdapter.updateOne(state, {
        id: payload.id,
        changes: { name: payload.name }
      });
    }
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

        const { id } = payload;
        state.activeChannelId = id;
      })
      .addCase(removeChannel.fulfilled, (state, { payload }) => {
        channelsAdapter.removeOne(state, payload.id);
      })
      .addCase(renameChannel.fulfilled, (state, { payload }) => {
        channelsAdapter.updateOne(state, {
          id: payload.id,
          changes: { name: payload.name }
        });
      });
  }
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);
