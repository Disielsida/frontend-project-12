const routes = {
  loginPath: () => 'api/v1/login',
  channelsPath: () => '/api/v1/channels',
  messagesPath: () => '/api/v1/messages',
  webSocketPath: () => '/socket.io',
  removeOrRenameChannelPath: (id) => `/api/v1/channels/${id}`
};

export default routes;
