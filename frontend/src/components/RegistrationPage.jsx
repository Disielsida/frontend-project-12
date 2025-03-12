import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container, Row, Col, Card, Image, Form, Button
} from 'react-bootstrap';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import routes from '../routes';

import registrationImage from '../images/registration.jpg';
import { signUp } from '../redux/slices/AuthSlice';

const RegistrationPage = () => {
  const { t } = useTranslation();
  const formControlRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [networkError, setNetworkError] = useState(null);

  const redirectPath = routes.chatsPagePath();
  const { loggedIn } = useSelector((state) => state.authorization);

  useEffect(() => {
    if (loggedIn) {
      navigate(redirectPath, { replace: true });
    }
    formControlRef.current.focus();
  }, [loggedIn, redirectPath, navigate]);

  const validationSchema = Yup.object({
    username: Yup.string()
      .trim()
      .required(t('errors.RequiredField'))
      .min(3, t('errors.minMaxRange'))
      .max(20, t('errors.minMaxRange')),
    password: Yup.string()
      .required(t('errors.RequiredField'))
      .min(6, t('errors.atLeastSix')),
    confirmPassword: Yup.string()
      .required(t('errors.RequiredField'))
      .oneOf([Yup.ref('password'), null], t('errors.passwordsMustMatch'))
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      if (!navigator.onLine) {
        toast.error(t('toastify.errors.network'));
        setSubmitting(false);
        return;
      }

      const { username, password } = values;
      const newUserData = { username, password };
      try {
        await dispatch(signUp(newUserData)).unwrap();
        navigate(redirectPath, { replace: true });
      } catch (e) {
        setNetworkError(e);
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
                  <Image src={registrationImage} className="rounded-circle" alt="Войти" />
                </Col>
                <Col xs={12} md={6} className="mt-3 mt-md-0">
                  <Form onSubmit={formik.handleSubmit}>
                    <h1 className="text-center mb-4">{t('registrationPage.registration')}</h1>
                    <Form.Group className="form-floating mb-3">
                      <Form.Control
                        placeholder={t('placeholders.userName')}
                        name="username"
                        autoComplete="username"
                        required
                        id="username"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        isInvalid={
                          formik.touched.username
                          && (!!formik.errors.username || !!networkError)
                        }
                        ref={formControlRef}
                      />
                      <Form.Label htmlFor="username">{t('placeholders.userName')}</Form.Label>
                      <Form.Control.Feedback type="invalid" className="invalid-tooltip">
                        {formik.errors.username}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="form-floating mb-4">
                      <Form.Control
                        type="password"
                        placeholder={t('placeholders.password')}
                        name="password"
                        autoComplete="placeholders.password"
                        required
                        id="password"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        isInvalid={
                          formik.touched.password
                          && (!!formik.errors.password || !!networkError)
                        }
                      />
                      <Form.Label htmlFor="password">{t('placeholders.password')}</Form.Label>
                      <Form.Control.Feedback type="invalid" className="invalid-tooltip">
                        {formik.errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="form-floating mb-4">
                      <Form.Control
                        type="password"
                        placeholder={t('placeholders.confirmPassword')}
                        name="confirmPassword"
                        autoComplete="confirmPassword"
                        required
                        id="confirmPassword"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                        isInvalid={
                          formik.touched.confirmPassword
                          && (!!formik.errors.confirmPassword || networkError)
                        }
                      />
                      <Form.Label htmlFor="confirmPassword">{t('placeholders.confirmPassword')}</Form.Label>
                      <Form.Control.Feedback type="invalid" className="invalid-tooltip">
                        {formik.errors.confirmPassword || networkError}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Button
                      disabled={formik.isSubmitting}
                      type="submit"
                      variant="outline-primary"
                      className="w-100 mb-3"
                    >
                      {t('buttons.toRegistrate')}
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationPage;
