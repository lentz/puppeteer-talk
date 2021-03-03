import assert from 'assert';
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();

const page = await browser.newPage();

await page.goto('http://www.iotait.com');

// Wait for element to be visible with a timeout
// This will throw an error if the timeout is exceeded
await page.waitForSelector('.banner-social-buttons a', { timeout: 3000 });

// Get elements by selector without waiting
const buttons = await page.$('.banner-social-buttons a');

// Assert that they are not falsey
assert.ok(buttons);

console.log('Test PASSED!');

await browser.close();
