/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { fetchPlaylists, clientLogin, updateENV } from '../helpers';

const getPlaylists = async (req, res) => {
  const playlists = await fetchPlaylists()
    .then((data) => data)
    .catch((err) => {
      console.log(err.response.headers);
    });
  console.log(`coming as ${playlists}`);
  res.send(playlists);
};

const getToken = async (req, res) => {
  const token = await clientLogin()
    .then((data) => {
      console.log('processing data..');
      console.log(data);
      return data;
    })
    .catch((err) => console.log(err));
  updateENV('TOKEN', token);
  res.send(token);
};

export { getPlaylists, getToken };
