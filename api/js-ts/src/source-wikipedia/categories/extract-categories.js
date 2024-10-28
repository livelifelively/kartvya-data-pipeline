const axios = require('axios');
const fs = require('fs');
const path = require('path');

const { size } = require('lodash');

const outputFile = path.join(__dirname, 'wikipedia_category_data.json');
const errorFile = path.join(__dirname, 'wikipedia_category_errors.json');

async function fetchCategoryMembers(category, cmtype = 'subcat|page', limit = 100) {
  const url = 'https://en.wikipedia.org/w/api.php';
  const params = {
    action: 'query',
    format: 'json',
    list: 'categorymembers',
    cmtitle: category,
    cmtype: cmtype,
    cmlimit: limit,
  };

  try {
    const response = await axios.get(url, { params });
    return response.data.query.categorymembers;
  } catch (error) {
    console.error(`Failed to fetch category members for ${category}: ${error}`);
    const errorData = {
      category,
      message: error.toString(),
      timestamp: new Date().toISOString(),
    };
    logError(errorData);
    return [];
  }
}

async function fetchPageDetails(pageids) {
  if (pageids.length === 0) return {};

  const url = 'https://en.wikipedia.org/w/api.php';
  const params = {
    action: 'query',
    format: 'json',
    pageids: pageids.join('|'),
    prop: 'info|pageprops',
    inprop: 'url',
    ppprop: 'wikibase_item',
  };

  try {
    const response = await axios.get(url, { params });
    if (
      response.data &&
      response.data.query &&
      response.data.query.pages &&
      size(response.data.query.pages) === pageids.length
    ) {
      console.log(`fetched pageIds ${pageids.join('|')}`);
      return response.data.query.pages;
    } else {
      console.error('Query pages missing in response:', response.data);
      const errorData = {
        pageids,
        message: error.toString(),
        timestamp: new Date().toISOString(),
      };
      logError(errorData);
      return {};
    }
  } catch (error) {
    console.error(`Failed to fetch page details: ${error}`);

    const errorData = {
      pageids,
      message: error.toString(),
      timestamp: new Date().toISOString(),
    };
    logError(errorData);

    return {};
  }
}

async function traverseCategories(category, path = []) {
  console.log(`Traversing: ${category}`);
  path.push(category);

  const members = await fetchCategoryMembers(category, 'subcat|page');
  const pages = [];
  const subcategories = [];

  for (let member of members) {
    if (member.ns === 14) {
      subcategories.push(member.title);
    } else {
      pages.push(member.pageid);
    }
  }
  console.log(`Found ${members.length} members and ${pages.length} pages.`);

  let pageDetails = await fetchPageDetails(pages);
  let results = Object.values(pageDetails).map((page) => ({
    title: page.title,
    pageid: page.pageid,
    url: page.fullurl,
    wikidata: page.pageprops ? page.pageprops.wikibase_item : null,
    path: [...path, page.title],
    allPageDetails: page,
  }));

  for (let subcategory of subcategories) {
    const subcategoryPages = await traverseCategories(subcategory, [...path]);
    results = results.concat(subcategoryPages);
  }

  path.pop();
  return results;
}

function logError(errorData) {
  const existingErrors = fs.existsSync(errorFile) ? JSON.parse(fs.readFileSync(errorFile)) : [];
  existingErrors.push(errorData);
  fs.writeFileSync(errorFile, JSON.stringify(existingErrors, null, 2));
}

traverseCategories('Category:20th-century disestablishments in India')
  .then((results) => {
    fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
    console.log('Traversal complete. Data written to JSON file.');
  })
  .catch((error) => console.error('Traversal failed:', error));
