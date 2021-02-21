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
  } else {
    console.log('Looks like you are already logged in...');
  }
  // logged in
  console.log('Login complete!');
  // wait for redirection to complete
  await page.waitForNavigation({
    waitUntil: 'networkidle0',
    timeout: 0,
  });
  // set page cookies
  const cookies = await page.cookies();
  await fs.writeFile('../cookies.json', JSON.stringify(cookies, null, 2));
};

export { scraper };
