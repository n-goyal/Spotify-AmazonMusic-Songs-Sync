/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line no-undef

import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import circularJSON from 'circular-json';
import { parse, stringify } from 'envfile';

import { Credentials, playlistsURI, tokenURI } from './endpoint';

dotenv.config();

const authString = Buffer.from(
  `${Credentials().clientId}:${Credentials().clientSecret}`,
).toString('base64');

console.log(authString);

// generate axios json for POST, GET requests
const apiReqJson = ({
  method = 'GET',
  data = {},
  accessToken,
  contentType = 'application/json',
  accept = '',
  authType = 'Bearer',
}) => {
  const headers = {
    'Content-Type': `${contentType}`,
    Authorization: `${authType} ${accessToken}`,
  };
  let params = {
    method: `${method}`,
  };
  if (data) {
    params = { ...params, ...data };
  }
  if (accept) {
    params = { ...params, accept };
  }
  const finalJson = {
    headers,
    ...params,
  };
  console.log(finalJson);
  return finalJson;
};

// get login token
const clientLogin = async () => {
  const data = await axios(
    tokenURI,
    apiReqJson({
      method: 'POST',
      data: {
        data: 'grant_type=client_credentials',
      },
      accessToken: authString,
      authType: 'Basic',
      contentType: 'application/x-www-form-urlencoded',
    }),
  )
    .then((res) => res.data.access_token)
    .catch((err) => console.log(err));
  return data;
};

// fetching user playlists
const fetchPlaylists = async () => {
  console.log('fetching playlists...');
  console.log(process.env.TOKEN);
  const data = await axios(
    playlistsURI,
    apiReqJson({
      accessToken: process.env.TOKEN,
      accept: 'application/json',
    }),
  )
    .then((play) => {
      console.log('processing data...');
      const str = circularJSON.stringify(play);
      const playlists = JSON.parse(str);
      return playlists;
    })
    .catch((err) => err.response);

  console.log(data);
  return data;
};

/*
Normalizing port value coming from environment
@param val: value of incoming port
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

/*
update environment variable value
@param key: environment variable name
@param value: environment variable value
*/
const updateENV = (key, value) => {
  console.log(`\n updating ${key}..with value ${value}\n`);
  const sourcePath = path.resolve('./src', '../.env');
  const source = fs.readFileSync(sourcePath, { encoding: 'utf8', flag: 'r' });
  console.log('source', source);
  const sourceObject = parse(source);
  sourceObject[key] = value;
  const str = stringify(sourceObject);
  console.log(str);
  fs.writeFileSync(sourcePath, str);
  console.log(`${key} has been updated.`);
};

export { clientLogin, normalizePort, fetchPlaylists, updateENV };
