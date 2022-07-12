import 'dotenv/config';
export type AppConfig = {
  name: string;
  encryption_key: string;
  port: number;
  env: string;
};

export default {
  name: process.env.APP_NAME,
  encryption_key: process.env.ENCRYPTION_KEY || '',
  port: process.env.PORT || 9090,
  env: process.env.NODE_ENV || 'production',
  host: process.env.HOST || 'http://localhost',
};
