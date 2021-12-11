import express, {Application, Request, Response, NextFunction} from 'express';

const app: Application = express();

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello');
});

app.get('/:folder', (req: Request, res: Response) => {
  res.send(`hello ${req.params.folder}`);
});

app.listen(5000, () => console.log('Server is running'));
