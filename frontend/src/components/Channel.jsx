import { Nav, Button } from 'react-bootstrap';

const Channel = ({ channelData, activeChannelId, handleSetActiveChannel }) => (
  <Nav.Item className="w-100">
    <Button
      variant={activeChannelId === channelData.id ? 'secondary' : 'light'}
      className="w-100 rounded-0 text-start"
      onClick={() => handleSetActiveChannel(channelData.id)}
    >
      <span className="me-1">#</span>
      {channelData.name}
    </Button>
  </Nav.Item>
);

export default Channel;
