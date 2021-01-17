/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { fetchPlaylists } from '../helpers';

const getPlaylists = async (req, res) => {
  const playlists = await fetchPlaylists()
    .then((data) => data)
    .catch((err) => {
      console.log(err.response.headers);
    });
  console.log(`coming as ${playlists}`);
  res.send(playlists);
};

export { getPlaylists };
