import { chromium, Browser, Page } from "playwright";
import playwright from "playwright";
import path from "path";
import * as fs from "fs";

interface GeoJSON {
  type: string;
  features: any[];
}

export const geoCompare = async (baseGeojsonData: GeoJSON, comparisonGeojsonData: GeoJSON) => {
  try {
    const browser = await playwright.chromium.launch({ headless: false });

    const page = await browser.newPage();
    await page.setViewportSize({ width: 1800, height: 1200 });

    // Get the relative path to the HTML file
    // const relativePath: string = "../../browser-scripts/geojson-comparison/index.html";
    // const relativePath: string = "../../browser-scripts/react-hello-world/index.html";
    // const absolutePath: string = path.resolve(__dirname, relativePath);

    await page.goto("http://localhost:3001/geo-comparison");

    const baseJsonString = JSON.stringify(baseGeojsonData);
    const comparisonJsonString = comparisonGeojsonData ? JSON.stringify(comparisonGeojsonData) : "";

    await fillReactInput(page, "#base-geojson-input", baseJsonString);
    if (comparisonJsonString) {
      await fillReactInput(page, "#comparison-geojson-input", comparisonJsonString);
    }

    // Wait for a bit to render all the layers
    await page.waitForTimeout(1000);

    // Close browser
    // await browser.close();
  } catch (error) {
    console.error("Error rendering:", error);
    process.exit(1);
  }
};

async function fillReactInput(page: Page, selector: string, value: string) {
  await page.focus(selector);
  await page.fill(selector, value);
  await page.dispatchEvent(selector, "change");
}

async function interactWithReactApp(baseGeojsonData: any, comparisonGeojsonData: any) {
  const browser: Browser = await chromium.launch();
  const page: Page = await browser.newPage();

  try {
    await page.goto("YOUR_URL_HERE"); // Replace with your app's URL

    const baseJsonString = JSON.stringify(baseGeojsonData);
    const comparisonJsonString = comparisonGeojsonData ? JSON.stringify(comparisonGeojsonData) : "";

    await fillReactInput(page, "#base-geojson-input", baseJsonString);
    if (comparisonJsonString) {
      await fillReactInput(page, "#comparison-geojson-input", comparisonJsonString);
    }
    await page.click("#render-button");
    // you can await for something to happen after clicking render
    await page.waitForTimeout(1000);

    console.log("Input values set and render button clicked!");
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await browser.close();
  }
}
