import puppeteer from 'puppeteer';
import assert from 'assert';

const browser = await puppeteer.launch();

const page = await browser.newPage();

await page.goto('http://www.iotait.com');

// Wait for element to be visible with a timeout
// This will throw an error if the timeout is exceeded
await page.waitForSelector('.banner-social-buttons a', { timeout: 5000 });

// Get elements by selector without waiting
const buttons = await page.$('.banner-social-buttons a');

// Assert that they are not falsey
assert.ok(buttons);

await browser.close();
