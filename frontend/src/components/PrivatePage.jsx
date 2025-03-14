import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container, Row, Col, Stack,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import ChannelsList from './ChannelsList.jsx';
import MessagesList from './MessagesList.jsx';
import MessageForm from './MessageForm.jsx';
import { fetchChannels, channelsSelectors, actions as channelsActions } from '../redux/slices/ChannelsSlice.jsx';
import { fetchMessages, messagesSelectors } from '../redux/slices/MessagesSlice.jsx';
import useSocket from '../hooks/useSocket.jsx';

import getModal from './modals/index.js';

const renderModal = (modalInfo, handleCloseModal) => {
  if (!modalInfo.type) {
    return null;
  }

  const ModalComponent = getModal[modalInfo.type];
  return (
    <ModalComponent
      modalInfo={modalInfo}
      handleCloseModal={handleCloseModal}
    />
  );
};

const PrivatePage = () => {
  useSocket();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [modalInfo, setModalInfo] = useState({ type: null, channel: null });

  const handleOpenModal = (type, channel = null) => {
    setModalInfo({ type, channel });
  };
  const handleCloseModal = () => setModalInfo({ type: null, task: null });

  useEffect(() => {
    if (!navigator.onLine) {
      toast.error(t('toastify.errors.network'));
      return;
    }

    dispatch(fetchChannels());
    dispatch(fetchMessages());
  }, [dispatch, t]);

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

  return (
    <>
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <Col xs={4} md={2} className="border-end px-0 bg-light d-flex flex-column h-100">
            <ChannelsList
              channels={channels}
              activeChannelId={activeChannelId}
              handleSetActiveChannel={handleSetActiveChannel}
              handleOpenModal={handleOpenModal}
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
      {renderModal(modalInfo, handleCloseModal)}
    </>
  );
};

export default PrivatePage;
