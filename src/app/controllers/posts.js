/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import { clientLogin } from '../helpers';

const getToken = async (req, res) => {
  const token = await clientLogin()
    .then((data) => data)
    .catch((err) => console.log(err));
  res.send(token);
};

export { getToken };
