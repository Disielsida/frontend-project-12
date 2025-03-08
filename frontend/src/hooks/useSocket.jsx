import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import socket from '../socket';
import { actions as messagesActions } from '../redux/slices/MessagesSlice';
import { actions as channelsActions } from '../redux/slices/ChannelsSlice';

const useSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.connect();

    socket.on('newMessage', (message) => {
      dispatch(messagesActions.addSocketMessage(message));
    });

    socket.on('newChannel', (channel) => {
      dispatch(channelsActions.addSocketChannel(channel));
    });

    socket.on('removeChannel', (payload) => {
      dispatch(channelsActions.removeSocketChannel(payload.id));
    });

    return () => {
      socket.off('newMessage');
      socket.off('newChannel');
      socket.off('removeChannel');
    };
  }, [dispatch]);
};

export default useSocket;
