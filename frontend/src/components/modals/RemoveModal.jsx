import { useDispatch } from 'react-redux';
import { useContext } from 'react';
import {
  Modal, Form, Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { removeChannel } from '../../redux/slices/ChannelsSlice';
import SocketContext from '../../contexts/index.jsx';

const RemoveModal = ({ modalInfo, handleCloseModal }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { id } = modalInfo.channel;

  const socket = useContext(SocketContext);

  const formik = useFormik({
    initialValues: {},
    onSubmit: async (_, { setSubmitting }) => {
      if (!navigator.onLine) {
        toast.error(t('toastify.errors.network'));
        setSubmitting(false);
        handleCloseModal();
        return;
      }

      try {
        await dispatch(removeChannel({ id, socket })).unwrap();

        toast.success(t('toastify.channelRemoved'), {
          autoClose: 3000,
        });
      } catch (error) {
        console.error(t('errors.channelNotDelete'), error);
      } finally {
        setSubmitting(false);
        handleCloseModal();
      }
    },
  });

  return (
    <Modal show onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title className="h4">{t('modals.removeModal.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <p className="lead">{t('modals.removeModal.areYouSure')}</p>
          <div className="d-flex justify-content-end mt-3">
            <Button variant="secondary" onClick={handleCloseModal} className="me-2">
              {t('buttons.cancel')}
            </Button>
            <Button type="submit" variant="danger">
              {t('buttons.delete')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveModal;
