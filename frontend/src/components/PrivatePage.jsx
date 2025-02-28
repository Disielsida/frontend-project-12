import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row } from 'react-bootstrap';

import { fetchChannels, channelsSelectors } from '../redux/slices/ChannelsSlice.jsx';
import { fetchMessages, messagesSelectors } from '../redux/slices/MessagesSlice.jsx';

const PrivatePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChannels());
    dispatch(fetchMessages());
  }, [dispatch]);

  const channels = useSelector(channelsSelectors.selectAll);
  console.log(channels);

  const messages = useSelector(messagesSelectors.selectAll);
  console.log(messages);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        disielsida#1
      </Row>
    </Container>
  );
};

export default PrivatePage;
