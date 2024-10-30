const fs = require('fs');
const path = require('path');

function getDirectoryFilesList() {
  // Directory path
  const dirPath = path.join(__dirname, 'state-decade-events');

  try {
    // Synchronously read the directory
    const files = fs.readdirSync(dirPath);

    console.log(files);

    // Filter and list files
    files.forEach((file) => {
      let fullPath = path.join(dirPath, file);
      if (fs.statSync(fullPath).isFile()) {
        // console.log('File:', file);
      }
    });
  } catch (err) {
    console.error('Unable to scan directory: ' + err);
  }
}

// getDirectoryFilesList();

module.exports = {
  getDirectoryFilesList,
};
