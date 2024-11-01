// or you can use 'firefox' or 'webkit'
import { chromium } from 'playwright';

async function wait(waitDuration = 3000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, waitDuration);
  });
}

export async function captureXHRRequests(url) {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Attach to 'request' event to capture XHR
  page.on('request', (request) => {
    if (request.resourceType() === 'xhr') {
      console.log('XHR Request:', request.url());
    }
  });

  let xhrRequests = [];

  // Optionally, listen to responses as well
  page.on('response', async (response) => {
    const request = response.request();
    if (request.resourceType() === 'xhr') {
      const responseText = await response.text();
      xhrRequests.push({
        url: request.url(),
        response: responseText,
      });
    }
  });

  // Navigate to your target website
  await page.goto(url, { waitUntil: 'networkidle' });

  await wait(3000);

  await browser.close();

  return xhrRequests;
}
