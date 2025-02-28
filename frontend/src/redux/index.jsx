import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/AuthSlice.jsx';
import channelsReducer from './slices/ChannelsSlice.jsx';
import messagesReducer from './slices/MessagesSlice.jsx';

const store = configureStore({
  reducer: {
    authorization: authReducer,
    channels: channelsReducer,
    messages: messagesReducer
  }
});

export default store;
