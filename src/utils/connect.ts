import mongoose from "mongoose";
import * as config from "config";
import { logger } from "./logger";

export async function connect() {
  const dbUri = config.get<string>('dbUri');

  try {
    await mongoose.connect(dbUri);
    logger.info('DB connected');
  } catch {
    logger.error('Could not connect to DB');
  }
}