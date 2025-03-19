import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { Provider, useDispatch } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { io } from 'socket.io-client';
import { useEffect } from 'react';
import leoProfanity from 'leo-profanity';
import store from './redux/index.jsx';
import initI18n from './initI18n.jsx';
import App from './components/App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import rollbarConfig from './rollbarConfig.js';
import SocketContext from './contexts/index.jsx';
import { actions as messagesActions } from './redux/slices/MessagesSlice.jsx';
import { actions as channelsActions } from './redux/slices/ChannelsSlice';

leoProfanity.add([...leoProfanity.getDictionary('ru'), ...leoProfanity.getDictionary('en')]);

const SocketProvider = ({ children }) => {
  const socket = io('');
  const dispatch = useDispatch();

  useEffect(() => {
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
  }, [dispatch, socket]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

const TestError = () => {
  throw new Error('wefe');
};

const app = async () => {
  const root = ReactDOM.createRoot(document.querySelector('#chat'));
  const i18n = await initI18n();
  root.render(
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <SocketProvider>
            <I18nextProvider i18n={i18n}>
              <TestError />
              <App />
            </I18nextProvider>
          </SocketProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>,
  );
};

app();
