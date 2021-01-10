/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */

import axios from 'axios';

import { Credentials, tokenURI } from './__creds';

console.log(Credentials());

const authString = Buffer.from(
  `${Credentials().clientId}:${Credentials().clientSecret}`,
).toString('base64');

console.log(authString);

const clientLogin = async () => {
  const data = await axios(tokenURI, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      // eslint-disable-next-line no-undef
      Authorization: `Basic ${authString}`,
    },
    data: 'grant_type=client_credentials',
    method: 'POST',
  })
    .then((res) => res.data.access_token)
    .catch((err) => console.log(err));
  return data;
};

export { clientLogin };
