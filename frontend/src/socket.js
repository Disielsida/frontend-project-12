import { io } from 'socket.io-client';
import routes from './routes.js';

const socket = io('', {
  path: routes.webSocketPath()
});

export default socket;
