import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();

const page = await browser.newPage();

await page.goto('http://www.iotait.com');

// Captures the current state of the accessibility tree and print
const snapshot = await page.accessibility.snapshot();
console.log(snapshot);

await browser.close();
