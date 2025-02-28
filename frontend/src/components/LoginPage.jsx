import {
  Container, Row, Col, Card, Image, Form, Button
} from 'react-bootstrap';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../redux/slices/AuthSlice.jsx';
import loginImage from '../images/login.jpg';

const LoginPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const formControlRef = useRef();

  const { loggedIn, error } = useSelector((state) => state.authorization);
  const redirectPath = location.state?.from?.pathname || '/';

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
    onSubmit: async (values) => {
      const { username, password } = values;
      const loginObject = { username, password };
      try {
        await dispatch(logIn(loginObject));
        navigate(redirectPath, { replace: true });
      } catch (e) {
        console.error(e);
      }
    }
  });

  return (
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
                      placeholder="Ваш ник"
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
                    <Form.Label htmlFor="username">Ваш ник</Form.Label>
                  </Form.Group>

                  <Form.Group className="form-floating mb-4">
                    <Form.Control
                      type="password"
                      placeholder="Пароль"
                      name="password"
                      autoComplete="password"
                      required
                      id="password"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      isInvalid={error}
                    />
                    <Form.Label htmlFor="password">Пароль</Form.Label>
                    <Form.Control.Feedback type="invalid" className="invalid-tooltip">
                      {error}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button type="submit" variant="outline-primary" className="w-100 mb-3">Войти</Button>
                </Form>
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer className="p-4">
            <Container className="text-center">
              <span className="m-1">Нет аккаунта?</span>
              <a href="/signup">Регистрация</a>
            </Container>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginPage;
