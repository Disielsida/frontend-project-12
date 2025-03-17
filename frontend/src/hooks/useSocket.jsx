import { useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import SocketContext from '../contexts/index.jsx';
import { actions as messagesActions } from '../redux/slices/MessagesSlice';
import { actions as channelsActions } from '../redux/slices/ChannelsSlice';

const useSocket = () => {
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

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

    socket.on('renameChannel', (payload) => {
      dispatch(channelsActions.renameSocketChannel(payload));
    });

    return () => {
      socket.off('newMessage');
      socket.off('newChannel');
      socket.off('removeChannel');
      socket.off('renameChannel');
    };
  }, [dispatch, socket]);
};

export default useSocket;
