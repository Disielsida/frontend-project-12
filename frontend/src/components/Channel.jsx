import {
  Nav, Button, ButtonGroup, Dropdown
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const BaseChannelButton = ({ channelData, activeChannelId, handleSetActiveChannel }) => (
  <Button
    variant={activeChannelId === channelData.id ? 'secondary' : 'light'}
    className="w-100 rounded-0 text-start"
    onClick={() => handleSetActiveChannel(channelData.id)}
    aria-label={channelData.name}
  >
    <span className="me-1" aria-hidden="true">#</span>
    {channelData.name}
  </Button>
);

const Channel = ({
  channelData, activeChannelId, handleSetActiveChannel, handleOpenModal
}) => {
  const { t } = useTranslation();

  return (
    <Nav.Item className="w-100">
      {channelData.removable ? (
        <ButtonGroup as="div" role="group" className="d-flex dropdown btn-group">
          <BaseChannelButton
            channelData={channelData}
            activeChannelId={activeChannelId}
            handleSetActiveChannel={handleSetActiveChannel}
          />
          <Dropdown>
            <Dropdown.Toggle
              variant={activeChannelId === channelData.id ? 'secondary' : 'light'}
              className="flex-grow-0 dropdown-toggle-split"
              id={`dropdown-${channelData.id}`}
              style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            />
            <span className="visually-hidden">{t('placehaolders.channelManagement')}</span>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleOpenModal('removing', channelData)}>{t('channelsList.channel.delete')}</Dropdown.Item>
              <Dropdown.Item onClick={() => handleOpenModal('renaming', channelData)}>{t('channelsList.channel.rename')}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </ButtonGroup>
      ) : (
        <BaseChannelButton
          channelData={channelData}
          activeChannelId={activeChannelId}
          handleSetActiveChannel={handleSetActiveChannel}
        />
      )}
    </Nav.Item>
  );
};

export default Channel;
