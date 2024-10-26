const fs = require('fs');
const path = require('path');

function getDirectoryFilesList() {
  // Directory path
  const dirPath = path.join(__dirname);

  try {
    // Synchronously read the directory
    let files = fs.readdirSync(dirPath);

    // Use reduce to filter and map to full paths
    files = files.reduce((agg, val) => {
      let fullPath = path.join(dirPath, val); // Use 'val' instead of 'file'
      if (fs.statSync(fullPath).isFile()) {
        agg.push(fullPath);
      }
      return agg;
    }, []);

    return files;
  } catch (err) {
    console.error('Unable to scan directory: ' + err);
    return []; // Return an empty array in case of an error
  }
}

function generateEstablishmentsList() {
  const filesList = getDirectoryFilesList();

  const allContent = [];

  filesList.forEach((file) => {
    try {
      if (file.split('.json')[0] !== file) {
        let content = fs.readFileSync(file, 'utf-8');
        content = JSON.parse(content);
        allContent.push(content);
      }
    } catch (err) {
      console.error(`Error reading file ${file}: ${err}`);
    }
  });

  return allContent;
}

generateEstablishmentsList();

module.exports = {
  getDirectoryFilesList,
  generateEstablishmentsList,
};
