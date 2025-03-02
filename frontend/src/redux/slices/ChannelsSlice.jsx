import axios from 'axios';

import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../../routes.js';

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

const channelsAdapter = createEntityAdapter();

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState({
    activeChannelId: null
  }),
  reducers: {
    setActiveChannel(state, { payload }) {
      state.activeChannelId = payload;
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
      });
  }
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);
