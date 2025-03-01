import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container, Row, Col, Button
} from 'react-bootstrap';

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
        <Col xs={4} md={2} className="border-end px-0 bg-light d-flex flex-column h-100">
          <Container className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4 align-items-center">
            <b>Каналы</b>
            <Button variant="link" className="p-0 text-primary btn-group-vertical">
              <i className="bi bi-shield-plus" style={{ fontSize: '23px', color: 'currentColor' }} />
              <span className="visually-hidden">+</span>
            </Button>
          </Container>
          <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
            <li className="nav-item w-100">
              <button type="button" className="w-100 rounded-0 text-start btn btn-secondary">
                <span className="me-1">#</span>
                general
              </button>
            </li>
            <li className="nav-item w-100">
              <button type="button" className="w-100 rounded-0 text-start btn">
                <span className="me-1">#</span>
                random
              </button>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default PrivatePage;
