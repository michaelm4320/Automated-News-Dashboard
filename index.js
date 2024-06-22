import { chromium } from "playwright";

async function saveHackerNewsArticles() {
  // Launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Go to Hacker News
  await page.goto('https://news.ycombinator.com/newest');

  // Validate the title
  const title = await page.title();
  if (title.includes('Hacker News')) {
    console.log('Title validation passed.');
  } else {
    console.log('Title validation failed.');
  }

  // Collect article data with error handling
  const articles = [];
  let moreButtonExists = true;

  while (articles.length < 100 && moreButtonExists) {
    const newArticles = await page.$$eval('.athing', nodes => {
      return nodes.map(node => {
        const titleElement = node.querySelector('.titleline a');
        const subtextElement = node.nextElementSibling.querySelector('.subtext .age');

        if (titleElement && subtextElement) {
          const title = titleElement.innerText;
          const timeAgo = subtextElement.innerText;
          return { title, timeAgo };
        } else {
          console.error('Error: Title or time element not found for an article.');
          return null;
        }
      }).filter(article => article !== null);
    });

    if (articles.length + newArticles.length > 100) {
      articles.push(...newArticles.slice(0, 100 - articles.length));
    } else {
      articles.push(...newArticles);
    }

    // Click the "More" button
    moreButtonExists = await page.$eval('.morelink', async button => {
      if (button) {
        await button.click();
        return true;
      } else {
        return false;
      }
    });

    await page.waitForTimeout(1000); // Wait for new articles to load
  }

  // Validate the order of articles
  let sorted = true;
  for (let i = 1; i < articles.length; i++) {
    if (new Date(articles[i].timeAgo) > new Date(articles[i - 1].timeAgo)) {
      sorted = false;
      break;
    }
  }

  if (sorted) {
    console.log('Articles are sorted from newest to oldest.');
  } else {
    console.log('Articles are not sorted correctly.');
  }

  console.log(`Total articles collected: ${articles.length}`);

  // Close browser
  await browser.close();
}

(async () => {
  await saveHackerNewsArticles();
})();
