/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { fetchPlaylists, clientLogin, updateENV, fetchSongs } from '../helpers';

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

const getSongsList = async (req, res) => {
  console.log('fetching songs...');
  const playlistId = req.params.playlist;
  // api request for list of songs in the playlist
  console.log(`playlist ${playlistId}`);
  const songs = await fetchSongs(playlistId)
    .then((data) => {
      console.log('processing data...');
      console.log(data);
      return data;
    })
    .catch((err) => console.error(err));
  res.send(songs);
};

export { getPlaylists, getToken, getSongsList };
