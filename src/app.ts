import express, {Application, Request, Response, NextFunction} from 'express';
import dotenv from 'dotenv';
dotenv.config();
import config from 'config';
import { logger } from './utils/logger';
import { connect } from './utils/connect';
import { FolderModel } from './model/folder.model';
import { Error } from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';

const app: Application = express();

const port = config.get<number>('port');
const host = config.get<string>('host');

app.use(helmet());
app.use(cors());

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Rest counter v1.0');
});

app.get('/:folder([A-z0-9_-]+)', async (req: Request, res: Response) => {
  let caughtError: Error | string = 'Error';
  let prevFolder = await FolderModel.findOne(
    {name: req.params.folder}
  ) ?? null;
  
  try {
    if(prevFolder === null) {
      const folder = new FolderModel();
      folder.name = encodeURIComponent(req.params.folder);
      folder.save();
      logger.info(`Inserted ${folder.name}`);
      res.json(folder);
      return;
    }
  
    if(prevFolder !== null) {
      const folderId = prevFolder.folderId;
      const newCount = prevFolder.count + 1;
      const folder = await FolderModel.updateOne({folderId: folderId}, {count: newCount});
      logger.info(`${prevFolder.name} updated at count ${newCount}`);

      const updatedFolder = await FolderModel.findOne({folderId});
      if(folder.modifiedCount !== 1) {
        throw new Error('Failed updating count');
      }
      if(updatedFolder === null) {
        throw new Error('Failed fetching updated folder');
      }

      res.json(updatedFolder);
      return;
    }
  } catch(error) {
    if(error instanceof Error) {
      caughtError = error;
    }
    logger.error(error);
  }
  
  res.status(500).json({
    error: caughtError,
  });
});

app.listen(port, async () => {
  logger.info(`Server is running at http://${host}:${port}`);

  await connect();
});
