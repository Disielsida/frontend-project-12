import { Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import notFoundImage from '../images/notFound.svg';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <Container className="text-center">
      <Image alt="Страница не найдена" className="img-fluid w-25" src={notFoundImage} />
      <h1 className="h4 text-muted">{t('notFound')}</h1>
      <p className="text-muted">
        {t('butYouCanGo')}
        <Link className="p-1" to="/">{t('onMainPage')}</Link>
      </p>
    </Container>
  );
};

export default NotFoundPage;
