import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  page.on('console', msg => console.log('CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(3000);
  const content = await page.content();
  console.log('Has lucide-monitor:', content.includes('lucide-monitor'));
  console.log('Has lucide-sun:', content.includes('lucide-sun'));
  console.log('Has Systemowy:', content.includes('Systemowy'));
  await browser.close();
})();
