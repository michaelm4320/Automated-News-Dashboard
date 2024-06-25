import { chromium } from "playwright";
import fs from 'fs';
import path from 'path';

async function saveHackerNewsArticles() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://news.ycombinator.com/newest');

  const title = await page.title();
  console.log(title.includes('Hacker News') ? 'Title validation passed.' : 'Title validation failed.');

  const articles = [];
  let moreButtonExists = true;

  while (articles.length < 100 && moreButtonExists) {
    const newArticles = await page.$$eval('.athing', nodes => {
      return nodes.map(node => {
        const titleElement = node.querySelector('.titleline a');
        const subtextElement = node.nextElementSibling.querySelector('.subtext');
        const pointsElement = subtextElement.querySelector('.score');
        const commentsElement = Array.from(subtextElement.querySelectorAll('a')).find(el => el.innerText.includes('comments'));

        if (titleElement && subtextElement) {
          const title = titleElement.innerText;
          const timeAgo = subtextElement.querySelector('.age').innerText;
          const points = pointsElement ? parseInt(pointsElement.innerText.split(' ')[0]) : 0;
          const comments = commentsElement ? parseInt(commentsElement.innerText.split('\u00A0')[0]) : 0;

          return { title, timeAgo, points, comments };
        } else {
          console.error('Error: Title or subtext element not found for an article.');
          return null;
        }
      }).filter(article => article !== null);
    });

    if (articles.length + newArticles.length > 100) {
      articles.push(...newArticles.slice(0, 100 - articles.length));
    } else {
      articles.push(...newArticles);
    }

    moreButtonExists = await page.$eval('.morelink', async button => {
      if (button) {
        await button.click();
        return true;
      } else {
        return false;
      }
    });

    await page.waitForTimeout(1000);
  }

  console.log(`Total articles collected: ${articles.length}`);
  const filePath = '../public/articles.json'; // Relative path to the current working directory
  fs.writeFileSync(filePath, JSON.stringify(articles, null, 2));

  await browser.close();
}

(async () => {
  await saveHackerNewsArticles();
})();
