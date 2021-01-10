/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';

import { getToken } from './controllers/posts';

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hi All!');
});

app.get('/login', (req, res) => getToken(req, res));

export default app;
