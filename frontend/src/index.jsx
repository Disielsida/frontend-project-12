import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import store from './redux/index.jsx';
import initI18n from './initI18n.jsx';
import App from './components/App';
import './index.css';
import './assets/application.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import SocketProvider from './SocketContext.jsx';
import rollbarConfig from './rollbarConfig.js';

const app = async () => {
  const root = ReactDOM.createRoot(document.querySelector('#chat'));
  const i18n = await initI18n();

  root.render(
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <SocketProvider>
          <Provider store={store}>
            <I18nextProvider i18n={i18n}>
              <App />
            </I18nextProvider>
          </Provider>
        </SocketProvider>
      </ErrorBoundary>
    </RollbarProvider>,
  );
};

app();
