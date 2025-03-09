import { ListGroup, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Message from './Message.jsx';

const MessagesList = ({ messages, activeChannel }) => {
  const { t } = useTranslation();
  const messagesCount = messages.length;

  return (
    <>
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
              {t('messagesList.messages.count', { count: messagesCount })}
            </span>
          </ListGroup>
        </Card.Body>
      </Card>
      <ListGroup id="messages-box" className="chat-messages overflow-auto px-5">
        {messages.map((message) => (
          <Message key={message.id} messageData={message} />
        ))}
      </ListGroup>
    </>
  );
};

export default MessagesList;
