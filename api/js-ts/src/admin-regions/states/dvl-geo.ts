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
    const relativePath: string = "../../browser-scripts/geojson-comparison/index.html";
    const absolutePath: string = path.resolve(__dirname, relativePath);

    await page.goto("file://" + absolutePath);

    // inject the data to the page
    await page.evaluate(
      ({ baseGeojsonData, comparisonGeojsonData }) => {
        const baseInput = document.getElementById("base-geojson-input") as HTMLTextAreaElement;
        const comparisonInput = document.getElementById("comparison-geojson-input") as HTMLTextAreaElement;

        if (baseInput) {
          baseInput.value = JSON.stringify(baseGeojsonData);
        }

        if (comparisonInput) {
          comparisonInput.value = comparisonGeojsonData ? JSON.stringify(comparisonGeojsonData) : "";
        }

        const renderButton = document.getElementById("render-button") as HTMLButtonElement;
        if (renderButton) {
          renderButton.click();
        }
      },
      { baseGeojsonData, comparisonGeojsonData }
    );

    // Wait for a bit to render all the layers
    await page.waitForTimeout(1000);

    // Close browser
    // await browser.close();
  } catch (error) {
    console.error("Error rendering:", error);
    process.exit(1);
  }
};
