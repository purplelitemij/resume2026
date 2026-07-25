// Regenerates resume.pdf from index.html using local Chrome.
// Run: npm run pdf
const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATHS = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
];

function findChrome() {
  const found = CHROME_PATHS.find((p) => fs.existsSync(p));
  if (!found) {
    throw new Error('Could not find Google Chrome. Install it or edit CHROME_PATHS in generate-pdf.js.');
  }
  return found;
}

(async () => {
  const browser = await puppeteer.launch({
    executablePath: findChrome(),
    headless: 'new',
  });
  const page = await browser.newPage();
  const filePath = 'file://' + path.resolve(__dirname, 'index.html');
  await page.goto(filePath, { waitUntil: 'networkidle0' });

  // Force final counter values so the PDF snapshot doesn't catch a mid-animation frame
  await page.evaluate(() => {
    document.querySelectorAll('.count').forEach((el) => {
      el.textContent = parseInt(el.dataset.target, 10).toLocaleString();
    });
  });

  // Chrome doesn't auto-expand collapsed <details> when printing, so force the
  // archived-experience section open or it silently drops out of the PDF
  await page.evaluate(() => {
    document.querySelectorAll('details.archive').forEach((d) => d.setAttribute('open', ''));
  });

  await page.pdf({
    path: path.resolve(__dirname, 'resume.pdf'),
    format: 'Letter',
    printBackground: true,
    displayHeaderFooter: false,
    margin: { top: '0.5in', bottom: '0.5in', left: '0.5in', right: '0.5in' },
  });

  await browser.close();
  console.log('resume.pdf regenerated');
})();
