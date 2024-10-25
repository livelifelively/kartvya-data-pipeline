import { resolve } from 'path';
import puppeteer, { Browser, Page } from 'puppeteer';

async function wait(waitDuration: number = 3000, func: any) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, waitDuration);
  });
}

export async function captureXHRRequests(url: string): Promise<void> {
  const browser: Browser = await puppeteer.launch({ headless: false });
  const page: Page = await browser.newPage();

  // Attach to 'request' event to capture XHR
  page.on('request', (request: any) => {
    if (request.resourceType() === 'xhr') {
      console.log('XHR Request:', request.url());
    }
  });

  let xhrRequests: any = [];

  // Optionally, listen to responses as well
  page.on('response', async (response: any) => {
    const request: any = response.request();
    if (request.resourceType() === 'xhr') {
      //   console.log('XHR Response:', request.url());
      const responseText: string = await response.text();
      //   console.log('Response Body:', responseText);
      xhrRequests.push({
        url: request.url(),
        response: responseText,
      });
    }
  });

  // Navigate to your target website
  await page.goto(url, { waitUntil: 'networkidle0' });

  await wait(3000, () => {
    console.log('xhrRequests');
  });

  await browser.close();

  return xhrRequests;
}
