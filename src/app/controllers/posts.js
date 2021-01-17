/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import { clientLogin, updateENV } from '../helpers';

const getToken = async (req, res) => {
  const token = await clientLogin()
    .then((data) => {
      console.log('processing data..');
      console.log(data);
    })
    .catch((err) => console.log(err));
  updateENV('TOKEN', token);
  res.send(token);
};

export { getToken };
