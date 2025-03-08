import {
  Nav, Button, ButtonGroup, Dropdown
} from 'react-bootstrap';

const BaseChannelButton = ({ channelData, activeChannelId, handleSetActiveChannel }) => (
  <Button
    variant={activeChannelId === channelData.id ? 'secondary' : 'light'}
    className="w-100 rounded-0 text-start"
    onClick={() => handleSetActiveChannel(channelData.id)}
  >
    <span className="me-1">#</span>
    {channelData.name}
  </Button>
);

const Channel = ({
  channelData, activeChannelId, handleSetActiveChannel, handleOpenModal
}) => (
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
          <span className="visually-hidden">Управление каналом</span>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleOpenModal('removing', channelData.id)}>Удалить</Dropdown.Item>
            <Dropdown.Item onClick={() => console.log('Удалить', channelData.id)}>Переименовать</Dropdown.Item>
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

export default Channel;
