import {
  BrowserRouter as Router, Routes, Route, Navigate, useLocation
} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Header from './Header.jsx';
import LoginPage from './LoginPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { loggedIn } = useSelector((state) => state.authorization);

  return (
    loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => (
  <Router>
    <div className="d-flex flex-column h-100">
      <Header />
      <Container fluid className="h-100">
        <Routes>
          <Route
            path="/"
            element={(
              <PrivateRoute>
                <div>Disielsida#1</div>
              </PrivateRoute>
            )}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
    </div>
  </Router>
);

export default App;
