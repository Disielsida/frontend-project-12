import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import socket from '../socket';
import { actions as messagesActions } from '../redux/slices/MessagesSlice';

const useSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.connect();

    socket.on('newMessage', (message) => {
      dispatch(messagesActions.addSocketMessage(message));
    });

    return () => {
      socket.off('newMessage');
    };
  }, [dispatch]);
};

export default useSocket;
