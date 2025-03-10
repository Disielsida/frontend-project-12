import {
  BrowserRouter as Router, Routes, Route, Navigate, useLocation
} from 'react-router-dom';
import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import Header from './Header.jsx';
import LoginPage from './LoginPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import PrivatePage from './PrivatePage.jsx';
import RegistrationPage from './RegistrationPage.jsx';
import routes from '../routes.js';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { loggedIn } = useSelector((state) => state.authorization);

  return (
    loggedIn ? children : <Navigate to={routes.loginPagePath()} state={{ from: location }} />
  );
};

const App = () => {
  const { t } = useTranslation();

  useEffect(() => {
    leoProfanity.loadDictionary('ru');

    const handleOffline = () => {
      toast.error(t('toastify.errors.network'));
    };

    const handleOnline = () => {
      toast.dismiss();
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    if (!navigator.onLine) {
      toast.error(t('toastify.errors.network'));
    }

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, [t]);

  return (
    <Router basename="/">
      <Container fluid className="d-flex flex-column h-100 p-0">
        <Header />
        <Routes>
          <Route
            path={routes.chatsPagePath()}
            element={(
              <PrivateRoute>
                <PrivatePage />
              </PrivateRoute>
          )}
          />
          <Route path={routes.loginPagePath()} element={<LoginPage />} />
          <Route path={routes.signupPagePath()} element={<RegistrationPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
      <ToastContainer />
    </Router>
  );
};

export default App;
