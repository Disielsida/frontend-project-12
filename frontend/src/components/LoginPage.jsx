import {
  Container, Row, Col, Card, Image, Form, Button
} from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import routes from '../routes.js';
import { logIn } from '../redux/slices/AuthSlice.jsx';
import loginImage from '../images/login.jpg';

const LoginPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const formControlRef = useRef();
  const [error, setError] = useState(null);

  const { loggedIn } = useSelector((state) => state.authorization);
  const redirectPath = location.state?.from?.pathname || routes.chatsPath();

  useEffect(() => {
    if (loggedIn) {
      navigate(redirectPath, { replace: true });
    }
    formControlRef.current.focus();
  }, [loggedIn, redirectPath, navigate]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: async (values, { setSubmitting }) => {
      const { username, password } = values;
      const loginObject = { username, password };
      try {
        await dispatch(logIn(loginObject)).unwrap();
        navigate(redirectPath, { replace: true });
      } catch (e) {
        setError(e);
        setSubmitting(false);
      }
    }
  });

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="p-5">
              <Row>
                <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                  <Image src={loginImage} className="rounded-circle" alt="Войти" />
                </Col>
                <Col xs={12} md={6} className="mt-3 mt-md-0">
                  <Form onSubmit={formik.handleSubmit}>
                    <h1 className="text-center mb-4">{t('login')}</h1>
                    <Form.Group className="form-floating mb-3">
                      <Form.Control
                        placeholder={t('yourNick')}
                        name="username"
                        autoComplete="username"
                        required
                        id="username"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        isInvalid={error}
                        ref={formControlRef}
                      />
                      <Form.Label htmlFor="username">{t('yourNick')}</Form.Label>
                    </Form.Group>

                    <Form.Group className="form-floating mb-4">
                      <Form.Control
                        type="password"
                        placeholder={t('password')}
                        name="password"
                        autoComplete="password"
                        required
                        id="password"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        isInvalid={error}
                      />
                      <Form.Label htmlFor="password">{t('password')}</Form.Label>
                      <Form.Control.Feedback type="invalid" className="invalid-tooltip">
                        {error}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Button disabled={formik.isSubmitting} type="submit" variant="outline-primary" className="w-100 mb-3">{t('login')}</Button>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="p-4">
              <Container className="text-center">
                <span className="m-1">{t('noAccount')}</span>
                <Link to="/signup">{t('registration')}</Link>
              </Container>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
