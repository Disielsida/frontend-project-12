import {
  Container, Row, Col, Card, Image, Form, Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import loginImage from '../images/login.jpg';

const LoginPage = () => {
  const { t } = useTranslation();

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
                  <Form>
                    <h1 className="text-center mb-4">{t('login')}</h1>
                    <Form.Group className="form-floating mb-3">
                      <Form.Control
                        placeholder="Ваш ник"
                        name="username"
                        autoComplete="username"
                        required
                        id="username"
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
                      />
                      <Form.Label htmlFor="password">Пароль</Form.Label>
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
    </Container>
  );
};

export default LoginPage;
