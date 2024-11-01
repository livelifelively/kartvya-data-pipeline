// if the file is too large to handle, divide it in two
const fs = require('fs');
const path = require('path');
const bigFile = require('../source-wikipedia/categories/20th-century-establishments-in-india.json');

const MAX_LENGTH = 15000;

let numberOfFiles = Math.ceil(bigFile.length / MAX_LENGTH);
console.log(bigFile.length);

const newDir = path.join(__dirname, '20th-century-establishments-in-india');
fs.mkdirSync(newDir, { recursive: true });

for (let i = MAX_LENGTH; i <= MAX_LENGTH * numberOfFiles; i += MAX_LENGTH) {
  const filePath = path.join(newDir, `${i}.json`);
  const toSave = bigFile.slice(i - MAX_LENGTH, i);
  fs.writeFileSync(filePath, JSON.stringify(toSave, null, 2), 'utf8');
}
