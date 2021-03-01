import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();

const page = await browser.newPage();

// Begin tracing page performance
await page.tracing.start({
  path: 'profile.json',
  screenshots: true,
});

// Load the page
await page.goto('http://www.iotait.com');

// Stop tracing page performance
await page.tracing.stop();

await browser.close();
