import {
  Navbar, Container, Button
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from '../redux/slices/AuthSlice.jsx';
import routes from '../routes.js';

const Header = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state) => state.authorization);

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <Navbar expand="lg" bg="white" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to={routes.chatsPagePath()}>{t('header.brand')}</Navbar.Brand>
        {loggedIn ? <Button onClick={handleLogOut} type="button" className="fw-medium" variant="primary">{t('buttons.exit')}</Button> : null}
      </Container>
    </Navbar>
  );
};

export default Header;
