import express, {Application, Request, Response, NextFunction} from 'express';
import config from 'config';
import { logger } from './utils/logger';
import { connect } from './utils/connect';
import { FolderModel, FolderDocument } from './model/folder.model';

const app: Application = express();

const port = config.get<number>('port');
const host = config.get<string>('host');

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello');
});

app.get('/:folder', async (req: Request, res: Response) => {
  let prevFolder: FolderDocument | null = null;
  
  prevFolder = await FolderModel.findOne({name: req.params.folder}).exec();
  
  // TODO: Validate the request
  // TODO: Prevent multiple concurrent requests
  if(prevFolder === null) {
    const folder = new FolderModel();
    folder.name = encodeURIComponent(req.params.folder);
    folder.save();
    res.json(folder);
    return;
  }

  if(prevFolder !== null) {
    const removed = await FolderModel.deleteOne({id: prevFolder.id});
    // TODO: Handle removal error - removed.deletedCount
    const newFolder = new FolderModel();
    newFolder.name = prevFolder.name;
    newFolder.count = prevFolder.count + 1;
    newFolder.save();
    logger.info(`${newFolder.name} saved at count ${newFolder.count}`);
    res.json(newFolder);
    return;
  }

  res.send('error');
});

app.listen(port, async () => {
  logger.info(`Server is running at http://${host}:${port}`);

  await connect();
});
