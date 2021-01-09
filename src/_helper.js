/*
Purpose:: To verify and normalize incoming port from enviornment.
*/
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

export default { normalizePort };
