import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import {
  Modal, FormGroup, FormControl, Form, Button
} from 'react-bootstrap';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { addChannel, channelsSelectors } from '../../redux/slices/ChannelsSlice';

const AddModal = ({ handleCloseModal }) => {
  const { t } = useTranslation();
  const formControlRef = useRef();
  const dispatch = useDispatch();

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
      .notOneOf(channelsNames, t('errors.mustBeUnique'))
  });

  const formik = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema,
    onSubmit: (values) => {
      const { name } = values;
      const channel = { name };

      dispatch(addChannel(channel));
      handleCloseModal();
      toast.success(t('modals.addModal.channelCreated'), {
        autoClose: 3000
      });
    }
  });

  return (
    <Modal show onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title className="h4">{t('modals.addModal.addChannel')}</Modal.Title>
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

export default AddModal;
