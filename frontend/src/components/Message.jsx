import { ListGroup } from 'react-bootstrap';
import { useTransition } from 'react';

const Message = ({ messageData }) => {
  const { t } = useTransition();

  return (
    <ListGroup.Item className="text-break mb-2 border-0" aria-label={t('messageList.newMessage')}>
      <strong>{messageData.username}</strong>
      :&nbsp;
      {messageData.body}
    </ListGroup.Item>
  );
};

export default Message;
