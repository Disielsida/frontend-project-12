import {
  BrowserRouter as Router, Routes, Route, Navigate, useLocation
} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import Header from './Header.jsx';
import LoginPage from './LoginPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import PrivatePage from './PrivatePage.jsx';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { loggedIn } = useSelector((state) => state.authorization);

  return (
    loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => (
  <Router>
    <Container fluid className="d-flex flex-column h-100 p-0">
      <Header />
      <Routes>
        <Route
          path="/"
          element={(
            <PrivateRoute>
              <PrivatePage />
            </PrivateRoute>
          )}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Container>
    <ToastContainer />
  </Router>
);

export default App;
