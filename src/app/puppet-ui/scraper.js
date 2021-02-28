/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import dotenv from 'dotenv';
import fs from 'fs';
import cookiesString from './cookies.json';

dotenv.config();

// url: https://music.amazon.in/
const scraper = async (browser, url) => {
  const page = await browser.newPage();
  console.log(`Navigating to ${url}...`);
  await page.goto(url, {
    waitUntil: 'networkidle0',
    timeout: 0,
  });
  if (!Object.keys(cookiesString).length) {
    console.log('You are not logged in to Amazon Prime music...');
    console.log("Hang in there, we're logging you in...");
    const avatar = '';
    if (avatar) {
      await page.click('.LhgAq6jInDWa1D5X66h7H > .hydrated', {
        waitUntil: 'networkidle0',
      });
    }
    await page.click('#signInButton');
    console.log('Redirecting to Amazon login...');
    await page.waitFor('#ap_email');
    console.log('Submitting your amazon credentials...');
    await page.type('#ap_email', process.env.AMAZON_USER);
    await page.type('#ap_password', process.env.AMAZON_PWD);
    await page.waitFor('#signInSubmit');
    await page.click('#signInSubmit', {
      waitUntil: 'networkidle0',
    });
    console.log('Redirecting you to Amazon Prime Music');
    // saving page cookies
    const cookies = await page.cookies();
    await fs.writeFile('../cookies.json', JSON.stringify(cookies, null, 2));
  } else {
    // set cookies
    const cookies = fs.readFileSync('cookies.json', 'utf8');
    const deserializedCookies = JSON.parse(cookies);
    await page.setCookie(...deserializedCookies);
    console.log('Looks like you are already logged in...');
  }
  // logged in
  console.log('Login complete!');
  // wait for redirection to complete
  await page.waitForNavigation({
    waitUntil: 'networkidle0',
    timeout: 0,
  });

  // get list of songs in user's spotifiy database
};

const searchNAdd = async (page, track) => {
  await page.waitForNavigation({
    waitUntil: 'networkidle0',
    timeout: 0,
  });
  await page.waitFor('#navbarSearchInput');
  await page.type('#navbarSearchInput', track);
  await page.click('#navbarSearchInputButton', {
    waitUntil: 'networkidle0',
  });
  await page.click(
    '.hydrated:nth-child(1) > div > .hydrated > .hydrated:nth-child(1) > .hydrated:nth-child(2)',
    {
      waitUntil: 'networkidle0',
    },
  );
  await page.waitFor('#contextMenuOption1');
  await page.click('#contextMenuOption1', {
    waitUntil: 'networkidle0',
  });
  await page.click(
    '._2bCICKG6mVSppz-HHoWSaY > .hydrated:nth-child(3) > .hydrated',
    {
      waitUntil: 'networkidle0',
    },
  );
};

async function getPlaylistNames(page) {
  // const elements = document.querySelectorAll(
  //   'music-shoveler[primary-text="My Playlists"] > music-vertical-item',
  // );
  const elements = await page.evaluate(
    'music-shoveler[primary-text="My Playlists"] > music-vertical-item',
  );
  const playlistNames = [];
  elements.forEach((element) => playlistNames.add(element.primaryText));
  return playlistNames;
}

async function createPlaylist(page, playlist) {
  await page.click('._2_399KOSMaMITdNQ_lXtMD > .hydrated', {
    waitUntil: 'networkidle0',
  });
  await page.type('._3QpxCCZ2ZUyhnlmpwSU7as', playlist);
  await page.click('#dialogButton1');
  await page.waitForNavigation({
    waitUntil: 'networkidle0',
    timeout: 0,
  });
  return playlist;
}

export { scraper, searchNAdd, getPlaylistNames, createPlaylist };
