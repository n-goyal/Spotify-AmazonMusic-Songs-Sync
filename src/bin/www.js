#!/usr/bin/env node

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import app from '../app';

import normalizePort from '../_helper';

const port = normalizePort(process.env.port || '5000');

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('listening');
});
