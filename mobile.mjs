import puppeteer from 'puppeteer';
const iPhone = puppeteer.devices['iPhone 11 Pro'];

const browser = await puppeteer.launch({ headless: false });

const page = await browser.newPage();

// Emulate an iPhone for this page
await page.emulate(iPhone);

await page.goto('http://www.iotait.com');

await page.waitForTimeout(30000);

await browser.close();
