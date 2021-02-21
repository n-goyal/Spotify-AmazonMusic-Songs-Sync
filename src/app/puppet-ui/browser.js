/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import puppeteer from 'puppeteer';

async function startBrowser() {
  let browser;
  try {
    console.log('opening the browser...');
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--user-agent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36"',
      ],
      ignoreHTTPSErrors: true,
    });
    // '--window-size=1920,0',
    const context = browser.defaultBrowserContext();
    context.overridePermissions('https://music.amazon.in/', []);
  } catch (e) {
    console.error(`Couldn't create the browser instance: ${e}`);
  }
  return browser;
}

export { startBrowser };
