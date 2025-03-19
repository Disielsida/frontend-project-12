const rollbarConfig = {
  accessToken: import.meta.senv.VITE_ROLLBAR_ACCESS_TOKEN,
  environment: 'production',
};

export default rollbarConfig;
