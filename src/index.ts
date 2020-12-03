import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import compression from 'compression';
import mongoose from 'mongoose';
import { User } from './models/user';

const app = express();
app.use(json());
app.use(compression());

app.get('/', async (req: Request, res: Response) => {
  res.send('Hello world. Welcome to node app typescript simple boilerplate.');
});

app.get('/healthcheck', async (req: Request, res: Response) => {
  res.status(201).send('App is running');
});

app.get('/api/users', async (req: Request, res: Response) => {
  const users = await User.find({});
  res.status(201).send(users);
});

app.post('/api/users', async (req: Request, res: Response) => {
  const body = req.body;
  const user = User.build({
    email: body.email,
    password: body.password,
  });

  await user.save();
  res.status(201).send(user);
});

const start = async () => {
  try {
    const hostname = process.env.MONGO_HOSTNAME || '127.0.0.1';
    await mongoose.connect(`mongodb://${hostname}:27017/my_app`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('mongodb connected !!!');
  } catch (error) {
    console.log(error);
  }

  app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running!!!!`);
  });
};

start();
