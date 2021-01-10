/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';

import { getToken } from './__controller';

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hi All!');
});

app.get('/login', getToken());

export default app;
