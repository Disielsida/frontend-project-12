import { io } from 'socket.io-client';
import routes from './routes.js';
import SocketContext from './contexts/index.jsx';

const SocketProvider = ({ children }) => {
  const socket = io('', {
    path: routes.webSocketPath(),
  });

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
