/* eslint-disable import/prefer-default-export */

const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (Number.isNaN) {
    return val;
  }
  if (port > 0) {
    return port;
  }
  return false;
};

export { normalizePort };
