import ReactDOM from 'react-dom/client';
import init from './init.jsx';
import './index.css';
import './assets/application.scss';

const app = async () => {
  const root = ReactDOM.createRoot(document.querySelector('#chat'));
  root.render(await init());
};

app();