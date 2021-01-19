import dotenv from 'dotenv';

dotenv.config();

const Credentials = () => ({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

const tokenURI = 'https://accounts.spotify.com/api/token';

const playlistsURI =
  // 'https://api.spotify.com/v1/playlists/6HoRmJutXDtSZazGUBAQs3/tracks';
  'https://api.spotify.com/v1/users/313forcuq3z67ivb3vdh7ctpn5ha/playlists';

export { Credentials, tokenURI, playlistsURI };
