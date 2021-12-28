import { env } from 'process';
import dotenv from 'dotenv';
dotenv.config();

export = {
  port: 1337,
  host: 'localhost',
  dbUri: `mongodb://${
    env.MONGO_DB_HOST_IP ?? '127.0.0.1'
  }:27017/rest-counter?serverSelectionTimeoutMS=2000`,
};
