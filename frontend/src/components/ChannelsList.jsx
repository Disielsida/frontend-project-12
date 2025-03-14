import { Nav, Button, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useRef, useEffect } from 'react';
import Channel from './Channel.jsx';

const ChannelsList = ({
  channels, activeChannelId, handleSetActiveChannel, handleOpenModal,
}) => {
  const { t } = useTranslation();

  const channelListRef = useRef();
  const prevChannelsCount = useRef(channels.length);

  const addChannelButtonRef = useRef();
  const generalChannelId = channels.length > 0 ? channels[0].id : null;
  const generalChannelActiveState = activeChannelId === generalChannelId;

  useEffect(() => {
    if (channels.length > prevChannelsCount.current) {
      channelListRef.current.scrollTop = channelListRef.current.scrollHeight;
    } else if (
      (channels.length < prevChannelsCount.current) && generalChannelActiveState) {
      channelListRef.current.scrollTop = 0;
    }

    prevChannelsCount.current = channels.length;
  }, [channels.length, generalChannelActiveState]);

  const handleAddChannel = () => {
    handleOpenModal('adding');
    addChannelButtonRef.current.blur();
  };

  return (
    <>
      <Container className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4 align-items-center">
        <b>{t('channelsList.channels')}</b>
        <Button
          onClick={handleAddChannel}
          variant="link"
          className="p-0 text-primary btn-group-vertical"
          ref={addChannelButtonRef}
        >
          <i className="bi bi-shield-plus" />
          <span className="visually-hidden">+</span>
        </Button>
      </Container>
      <Nav
        id="channels-box"
        className="flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
        ref={channelListRef}
      >
        {channels.map((channel) => (
          <Channel
            key={channel.id}
            channelData={channel}
            handleSetActiveChannel={handleSetActiveChannel}
            activeChannelId={activeChannelId}
            handleOpenModal={handleOpenModal}
          />
        ))}
      </Nav>
    </>
  );
};

export default ChannelsList;
