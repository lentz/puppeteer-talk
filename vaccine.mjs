import puppeteer from 'puppeteer';

// Initialize the browser
const browser = await puppeteer.launch({
  defaultViewport: { width: 1100, height: 1500 },
  headless: false,
  slowMo: 50,
});

// Open a page
const page = await browser.newPage();
await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36');

// Navigate to Rite Aid
await page.goto('https://www.riteaid.com/pharmacy/covid-qualifier', { waitUntil: 'domcontentloaded' });
await page.waitForSelector('#dateOfBirth', { timeout: 10000, visible: true });

// Fill out form
await page.type('#dateOfBirth', '01/01/1950');
await page.focus('#Occupation');
await page.type('#Occupation', 'None of the Above');
await page.type('#city', 'Berwyn');
await page.focus('#mediconditions');
await page.type('#mediconditions', 'None of the Above');
await page.focus('#eligibility_state');
await page.type('#eligibility_state', 'Pennsylvania');
await page.type('#zip', '19312');

// Click continue to next page
await page.click('#continue');
await page.waitForSelector('.error-modal', { visible: true });
const continueBtn = await page.waitForSelector('#learnmorebttn', { visible: true });
await page.waitForTimeout(2000);
await Promise.all([
  continueBtn.click(),
  page.waitForNavigation(),
]);

// Wait for the select store page to load
const findStoreBtn = await page.waitForSelector('#btn-find-store');
await findStoreBtn.click();

// Iterate through stores looking for availability
await page.waitForSelector('.covid-store__result', { visible: true });
for (let i = 0; i < 4; i++) {
  const selectStoreBtn = (await page.$$('a.covid-store__store__anchor--unselected'))[i];
  const storeName = await selectStoreBtn.evaluate((node) => {
    return node.parentElement.parentElement.querySelector('.covid-store__store__head span').innerText;
  });
  console.log(new Date().toLocaleString(), 'Checking', storeName);
  await selectStoreBtn.focus();
  await selectStoreBtn.click();
  await page.waitForTimeout(3000);
  await page.click('#continue');
  await page.waitForTimeout(3000);
  try {
    // See if the error icon is present, indicating no appointments
    await page.waitForSelector('.ra-icon-alert', { timeout: 10000 });
  } catch(err) {
    // Error icon isn't present, so there are appointments
    console.log(new Date().toLocaleString(), `Appointments found at Rite Aid ${storeName}!`);
  }
}
