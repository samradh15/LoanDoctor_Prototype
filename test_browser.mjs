import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER_CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', error => console.error('BROWSER_ERROR:', error));
  
  try {
    await page.goto('http://localhost:5174/', { waitUntil: 'load', timeout: 5000 });
  } catch (e) {
    console.error('Failed to load. Is Vite server running?', e);
  }
  
  await browser.close();
})();
