import dotenv from 'dotenv';
import { startBrowser } from './browser';
import { scrapeAll } from './scraperController';
import './cookies.json';

dotenv.config();

const browserInstance = startBrowser();

scrapeAll(browserInstance, 'https://music.amazon.in/');
