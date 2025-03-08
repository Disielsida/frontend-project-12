import { useFormik } from 'formik';
import { useEffect } from 'react';
import * as Yup from 'yup';
import {
  Form, InputGroup, Button, Container
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../redux/slices/MessagesSlice.jsx';

const MessageForm = ({ activeChannelId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.authorization.username);

  const validationSchema = Yup.object({
    body: Yup.string().trim().required(t('errors.emptyMessage'))
  });

  const formik = useFormik({
    initialValues: { body: '' },
    validationSchema,
    onSubmit: async (values, { setFieldValue, setTouched }) => {
      const message = { body: values.body, channelId: activeChannelId, username };
      await dispatch(addMessage(message)).unwrap();
      setFieldValue('body', '');
      setTouched({ body: false });
    }
  });

  const { resetForm } = formik;

  useEffect(() => {
    resetForm();
  }, [activeChannelId, resetForm]);

  return (
    <Container className="mt-auto px-5 py-3">
      <Form noValidate className="border rounded-2" onSubmit={formik.handleSubmit}>
        <InputGroup hasValidation>
          <Form.Control
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.body}
            name="body"
            aria-label={t('newMessage')}
            placeholder={t('placeholders.messageControl')}
            className="border-0 p-0 ps-2 form-control"
            isInvalid={!!formik.errors.body}
          />
          <Form.Control.Feedback type="invalid" className="custom-invalid-tooltip">
            {formik.errors.body}
          </Form.Control.Feedback>
          <Button type="submit" disabled={formik.isSubmitting || !!formik.errors.body} className="btn-group-vertical">
            <i className="bi bi-send fw-bold" style={{ fontWeight: 'bold', fontSize: '25px', color: 'light' }} />
            <span className="visually-hidden">{t('send')}</span>
          </Button>
        </InputGroup>
      </Form>
    </Container>
  );
};

export default MessageForm;
