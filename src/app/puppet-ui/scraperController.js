/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import { scraper } from './scraper';

const scrapeAll = async (browserInstance, url) => {
  let browser;
  try {
    browser = await browserInstance;
    await scraper(browser, url);
  } catch (e) {
    console.error(`Could not resolve the browser instance: ${e}`);
  }
};

export { scrapeAll };
