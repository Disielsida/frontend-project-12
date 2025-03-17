import axios from 'axios';

import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../../routes.js';

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (_, { getState }) => {
    const { token } = getState().authorization;

    const response = await axios.get(routes.channelsPath(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
);

export const addChannel = createAsyncThunk(
  'channels/addChannel',
  async ({ channel, socket }, { getState }) => {
    const { token } = getState().authorization;

    const response = await axios.post(routes.channelsPath(), channel, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    socket.emit('newChannel', response.data);
    return response.data;
  },
);

export const removeChannel = createAsyncThunk(
  'channels/removeChannel',
  async ({ id, socket }, { getState }) => {
    const { token } = getState().authorization;

    const response = await axios.delete(routes.removeOrRenameChannelPath(id), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    socket.emit('removeChannel', response.data);
    return response.data;
  },
);

export const renameChannel = createAsyncThunk(
  'channels/renameChannel',
  async ({ id, editedChannel, socket }, { getState }) => {
    const { token } = getState().authorization;

    const response = await axios.patch(routes.removeOrRenameChannelPath(id), editedChannel, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    socket.emit('renameChannel', response.data);
    return response.data;
  },
);

const channelsAdapter = createEntityAdapter();

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState({
    activeChannelId: null,
  }),
  reducers: {
    setActiveChannel(state, { payload }) {
      return {
        ...state,
        activeChannelId: payload,
      };
    },
    addSocketChannel: channelsAdapter.addOne,
    removeSocketChannel(state, { payload }) {
      const newState = { ...state };
      channelsAdapter.removeOne(newState, payload);

      if (newState.activeChannelId === payload) {
        newState.activeChannelId = newState.ids.length > 0 ? newState.ids[0] : null;
      }
      return newState;
    },
    renameSocketChannel(state, { payload }) {
      channelsAdapter.updateOne(state, {
        id: payload.id,
        changes: { name: payload.name },
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, (state, { payload }) => {
        const channelsSortedById = payload.reduce((accumulator, channel) => (
          { ...accumulator, [channel.id]: channel }
        ), {});

        const newState = {
          ...state,
          entities: channelsSortedById,
          ids: Object.keys(channelsSortedById),
        };

        const [firstChannelId] = newState.ids;

        if (!newState.activeChannelId && newState.ids.length > 0) {
          newState.activeChannelId = firstChannelId;
        }

        return newState;
      })
      .addCase(fetchChannels.rejected, (_, { error }) => {
        console.error('Ошибка при загрузке каналов: ', error);
      })
      .addCase(addChannel.fulfilled, (state, { payload }) => {
        const newState = { ...state };
        channelsAdapter.addOne(newState, payload);

        newState.activeChannelId = payload.id;

        return newState;
      })
      .addCase(removeChannel.fulfilled, (state, { payload }) => {
        channelsAdapter.removeOne(state, payload.id);
      })
      .addCase(renameChannel.fulfilled, (state, { payload }) => {
        channelsAdapter.updateOne(state, {
          id: payload.id,
          changes: { name: payload.name },
        });
      });
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);
