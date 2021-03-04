import puppeteer from 'puppeteer';

// Open the browser, headless by default
const browser = await puppeteer.launch();

// Open a new tab
const page = await browser.newPage();

// Navigate to the iota IT home page
await page.goto('http://www.iotait.com');

// Take a screenshot and save it to the specified path
await page.screenshot({ path: 'iota.png' });

// Make a PDF of the page and save it to the specified path
await page.pdf({ path: 'iota.pdf' });

// Close the browser
await browser.close();
