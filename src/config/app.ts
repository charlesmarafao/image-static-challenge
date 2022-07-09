import 'dotenv/config';
export type AppConfig = {
  name: string;
  encryption_key: string;
  port: number;
  env: string;
};

export default {
  name: process.env.APP_NAME,
  encryption_key:
    process.env.ENCRYPTION_KEY ||
    'asdasdasdas234234234234234234234efsfsdfsdfsdfsfsdfsdf',
  port: process.env.PORT || 9090,
  env: process.env.NODE_ENV || 'development',
};
