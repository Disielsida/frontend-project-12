import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container, Row, Col, Stack, Card, ListGroup
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import ChannelsList from './ChannelsList.jsx';
import MessagesList from './MessagesList.jsx';
import MessageForm from './MessageForm.jsx';
import { fetchChannels, channelsSelectors, actions as channelsActions } from '../redux/slices/ChannelsSlice.jsx';
import { fetchMessages, messagesSelectors } from '../redux/slices/MessagesSlice.jsx';
import Message from './Message.jsx';
import useSocket from '../hooks/useSocket.jsx';

import getModal from './modals/index.js';

const renderModal = (modalInfo, closeModal) => {
  if (!modalInfo.type) {
    return null;
  }

  const ModalComponent = getModal(modalInfo.type);
  return (
    <ModalComponent
      modalInfo={modalInfo}
      closeModal={closeModal}
    />
  );
};

const PrivatePage = () => {
  useSocket();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const username = useSelector((state) => state.authorization.username);

  const [modalInfo, setModalInfo] = useState({ type: null, channel: null });

  const openModal = (type, task = null) => setModalInfo({ type, task });
  const closeModal = () => setModalInfo({ type: null, task: null });

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

  return (
    <>
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <Col xs={4} md={2} className="border-end px-0 bg-light d-flex flex-column h-100">
            <ChannelsList
              channels={channels}
              activeChannelId={activeChannelId}
              handleSetActiveChannel={handleSetActiveChannel}
            />
          </Col>
          <Col className="p-0 h-100">
            <Stack direction="vertical" className="h-100">
              <MessagesList messages={filteredMessages} activeChannel={activeChannel} />
              <MessageForm activeChannelId={activeChannelId} />
            </Stack>
          </Col>
        </Row>
      </Container>
      {renderModal(modalInfo, closeModal)}
    </>
  );
};

export default PrivatePage;
