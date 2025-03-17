import {
  BrowserRouter as Router, Routes, Route, Navigate, useLocation,
} from 'react-router-dom';
import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import Header from './Header.jsx';
import LoginPage from './LoginPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import PrivatePage from './PrivatePage.jsx';
import RegistrationPage from './RegistrationPage.jsx';
import routes from '../routes.js';
import { actions as authActions } from '../redux/slices/AuthSlice.jsx';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { loggedIn } = useSelector((state) => state.authorization);

  return (
    loggedIn ? children : <Navigate to={routes.loginPagePath()} state={{ from: location }} />
  );
};

const App = () => {
  const dispatch = useDispatch();
  const { token, username } = useSelector((state) => state.authorization);

  useEffect(() => {
    if (token) {
      dispatch(authActions.setUser({ token, loggedIn: !!token, username }));
    }
  }, [dispatch, token, username]);

  return (
    <Router>
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
