const Credentials = () => ({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

const tokenURI = 'https://accounts.spotify.com/api/token';

export { Credentials, tokenURI };
