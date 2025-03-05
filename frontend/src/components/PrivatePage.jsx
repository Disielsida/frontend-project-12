import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container, Row, Col, Button, Nav, Stack, Form, InputGroup, Card, ListGroup
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

import { fetchChannels, channelsSelectors, actions as channelsActions } from '../redux/slices/ChannelsSlice.jsx';
import { fetchMessages, addMessage, messagesSelectors } from '../redux/slices/MessagesSlice.jsx';
import Channel from './Channel.jsx';
import Message from './Message.jsx';
import useSocket from '../hooks/useSocket.jsx';

const PrivatePage = () => {
  useSocket();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const username = useSelector((state) => state.authorization.username);

  useEffect(() => {
    dispatch(fetchChannels());
    dispatch(fetchMessages());
  }, [dispatch]);

  const channels = useSelector(channelsSelectors.selectAll);
  const activeChannelId = useSelector((state) => state.channels.activeChannelId);
  const activeChannel = useSelector((state) => {
    if (activeChannelId) {
      return channelsSelectors.selectById(state, activeChannelId);
    }
    return null;
  });

  const handleSetActiveChannel = (id) => {
    dispatch(channelsActions.setActiveChannel(id));
  };

  const messages = useSelector(messagesSelectors.selectAll);
  const filteredMessages = messages.filter((message) => message.channelId === activeChannelId);
  const messagesCount = filteredMessages.length;

  const formik = useFormik({
    initialValues: {
      body: ''
    },
    onSubmit: async (values) => {
      const { body } = values;
      const message = { body, channelId: activeChannelId, username };
      await dispatch(addMessage(message)).unwrap();
      formik.setFieldValue('body', '');
    }
  });

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col xs={4} md={2} className="border-end px-0 bg-light d-flex flex-column h-100">
          <Container className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4 align-items-center">
            <b>{t('channels')}</b>
            <Button variant="link" className="p-0 text-primary btn-group-vertical">
              <i className="bi bi-shield-plus" />
              <span className="visually-hidden">+</span>
            </Button>
          </Container>
          <Nav id="channels-box" className="flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
            {channels.map((channel) => (
              <Channel
                key={channel.id}
                channelData={channel}
                handleSetActiveChannel={handleSetActiveChannel}
                activeChannelId={activeChannelId}
              />
            ))}
          </Nav>
        </Col>
        <Col className="p-0 h-100">
          <Stack direction="vertical" className="h-100">
            <Card className="bg-light mb-4 p-3 shadow-sm small rounded-0 border-0">
              <Card.Body className="p-0">
                <ListGroup id="messages-box" className="overflow-auto px-5">
                  <p className="m-0">
                    <b>
                      #
                      {activeChannel ? activeChannel.name : null}
                    </b>
                  </p>
                  <span className="text-muted">
                    &nbsp;
                    {t('messages.count', { count: messagesCount })}
                  </span>
                </ListGroup>
              </Card.Body>
            </Card>
            <ListGroup id="messages-box" className="chat-messages overflow-auto px-5">
              { filteredMessages.map((message) => (
                <Message
                  key={message.id}
                  messageData={message}
                />
              ))}
            </ListGroup>
            <Container className="mt-auto px-5 py-3">
              <Form noValidate className=" border rounded-2" onSubmit={formik.handleSubmit}>
                <InputGroup hasValidation>
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.body}
                    name="body"
                    aria-label="Новое сообщение"
                    placeholder="Введите сообщение..."
                    className="border-0 p-0 ps-2 form-control"
                  />
                  <Button type="submit" disabled="" className="btn-group-vertical">
                    <i className="bi bi-send fw-bold" style={{ fontWeight: 'bold', fontSize: '25px', color: 'light' }} />
                    <span className="visually-hidden">Отправить</span>
                  </Button>
                </InputGroup>
              </Form>
            </Container>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default PrivatePage;
