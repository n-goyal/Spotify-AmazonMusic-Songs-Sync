/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';

import { getPlaylists, getToken, getSongsList } from './controllers/gets';

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hi All!');
});

app.get('/login', (req, res) => getToken(req, res));

app.get('/playlists', (req, res) => getPlaylists(req, res));

app.get('/songs/:playlist', (req, res) => getSongsList(req, res));

export default app;
