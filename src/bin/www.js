#!/usr/bin/env node
/* eslint-disable no-console */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import dotenv from 'dotenv';

import app from '../app';
import { normalizePort } from '../app/helpers';

dotenv.config();

const port = normalizePort(process.env.PORT || '5000');

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('listening');
});
