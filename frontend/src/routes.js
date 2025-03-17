const routes = {
  loginPath: () => 'api/v1/login',
  channelsPath: () => '/api/v1/channels',
  messagesPath: () => '/api/v1/messages',
  removeOrRenameChannelPath: (id) => `/api/v1/channels/${id}`,
  signupPath: () => '/api/v1/signup',
  chatsPagePath: () => '/',
  loginPagePath: () => '/login',
  signupPagePath: () => '/signup',
};

export default routes;
