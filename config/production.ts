import { env } from 'process';
import dotenv from 'dotenv';
dotenv.config();

export = {
  port: env.PORT || 5000,
  host: '127.0.0.1',
  dbUri: `mongodb+srv://${env.DB_USER}:${
    env.DB_PASSWORD && encodeURIComponent(env.DB_PASSWORD)
  }@restcounter.6iflh.mongodb.net/RestCounter?retryWrites=true&w=majority`,
};
