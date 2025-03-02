import { ListGroup } from 'react-bootstrap';

const Message = ({ messageData }) => (
  <ListGroup.Item className="text-break mb-2 border-0">
    <strong>{messageData.username}</strong>
    :
    {messageData.body}
  </ListGroup.Item>
);

export default Message;
