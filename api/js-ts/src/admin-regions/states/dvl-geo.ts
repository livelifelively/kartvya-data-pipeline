import playwright from "playwright";
import path from "path";

(async () => {
  // Get the relative path to the HTML file (you can change this)
  const relativePath: string = "../../browser-scripts/geojson-comparison/index.html"; // Default relative path

  // Use path.resolve to make absolute path from relative path
  const absolutePath: string = path.resolve(__dirname, relativePath);

  // Launch browser
  const browser = await playwright.chromium.launch({ headless: false });

  // Create page
  const page = await browser.newPage();

  // Set viewport size
  await page.setViewportSize({ width: 1200, height: 800 });

  // Navigate to your HTML file
  await page.goto("file://" + absolutePath);

  // Wait for any needed time or conditions here

  // Close browser
  // await browser.close();
})();
