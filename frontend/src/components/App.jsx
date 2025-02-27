import { useTranslation } from 'react-i18next';
import {
  BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation
} from 'react-router-dom';
import {
  Navbar, Container
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import LoginPage from './LoginPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';

const PrivateRoute = ({ children }) => {
  const { loggedIn } = useSelector((state) => state.authorization);
  const location = useLocation();

  return (
    loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => {
  const { t } = useTranslation();

  return (
    <Router>
      <div className="d-flex flex-column h-100">
        <Navbar expand="lg" bg="white" className="shadow-sm">
          <Container>
            <Navbar.Brand as={Link} to="/">{t('brand')}</Navbar.Brand>
          </Container>
        </Navbar>

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
};

export default App;
