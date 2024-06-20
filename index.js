const { chromium } = require('playwright');

async function saveHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto('https://news.ycombinator.com/newest');

  // Validate the title
  const title = await page.title();
  if (title.includes('Hacker News')) {
    console.log('Title validation passed.');
  } else {
    console.log('Title validation failed.');
  }

  // Close browser
  await browser.close();
}

(async () => {
  await saveHackerNewsArticles();
})();