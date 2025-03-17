import 'dotenv/config';

const rollbarConfig = {
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  environment: 'production',
};

export default rollbarConfig;
