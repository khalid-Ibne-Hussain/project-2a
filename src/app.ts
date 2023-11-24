import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';
const app: Application = express();
// const port = 3000

// parser
app.use(express.json());
app.use(cors());

// application routes______________
app.use('/api/users', UserRoutes);

const getAController = (req: Request, res: Response) => {
  res.send('Hello World!');
};

app.get('/', getAController);

// console.log(process.cwd());

export default app;
