import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import {
  Modal, FormGroup, FormControl, Form, Button,
} from 'react-bootstrap';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { renameChannel, channelsSelectors } from '../../redux/slices/ChannelsSlice';

const RenameModal = ({ modalInfo, handleCloseModal }) => {
  const { t } = useTranslation();
  const formControlRef = useRef();
  const dispatch = useDispatch();

  const { id, name } = modalInfo.channel;

  const channels = useSelector(channelsSelectors.selectAll);
  const channelsNames = channels.map((channel) => channel.name);

  useEffect(() => {
    formControlRef.current.focus();
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required(t('errors.RequiredField'))
      .min(3, t('errors.minMaxRange'))
      .max(20, t('errors.minMaxRange'))
      .notOneOf(channelsNames, t('errors.mustBeUnique')),
  });

  const formik = useFormik({
    initialValues: {
      name,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      if (!navigator.onLine) {
        toast.error(t('toastify.errors.network'));
        setSubmitting(false);
        handleCloseModal();
        return;
      }

      try {
        const editedChannel = values;

        dispatch(renameChannel({ id, editedChannel }));
        toast.success(t('toastify.channelRenamed'), {
          autoClose: 3000,
        });
      } catch (error) {
        console.error(t('errors.channelNotRename'), error);
      } finally {
        setSubmitting(false);
        handleCloseModal();
      }
    },
  });

  return (
    <Modal show onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title className="h4">{t('modals.renameModal.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup controlId="name">
            <FormControl
              type="text"
              name="name"
              className="mb-2"
              onChange={formik.handleChange}
              value={formik.values.name}
              ref={formControlRef}
              isInvalid={formik.submitCount > 0 && !!formik.errors.name}
            />
            <Form.Label className="visually-hidden">{t('placeholders.channelName')}</Form.Label>
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
          </FormGroup>
          <div className="d-flex justify-content-end mt-3">
            <Button variant="secondary" onClick={handleCloseModal} className="me-2">
              {t('buttons.cancel')}
            </Button>
            <Button disabled={formik.isSubmitting} type="submit" variant="primary">
              {t('buttons.send')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameModal;
