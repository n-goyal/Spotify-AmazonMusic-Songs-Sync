#!/usr/bin/env node
/* eslint-disable no-console */

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import app from '../app';

import { normalizePort } from '../__helper';

const port = normalizePort(process.env.port || '5000');

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('listening');
});
