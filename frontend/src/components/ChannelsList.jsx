import { Nav, Button, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Channel from './Channel.jsx';

const ChannelsList = ({
  channels, activeChannelId, handleSetActiveChannel, handleOpenModal
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Container className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4 align-items-center">
        <b>{t('channels')}</b>
        <Button onClick={() => handleOpenModal('adding')} variant="link" className="p-0 text-primary btn-group-vertical">
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
            handleOpenModal={handleOpenModal}
          />
        ))}
      </Nav>
    </>
  );
};

export default ChannelsList;
