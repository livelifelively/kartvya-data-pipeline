const fs = require('fs');
const path = require('path');

const { size } = require('lodash');

// const disestablishements20 = require('./20th-century-disestablishments-in-india.json');
// const disestablishements21 = require('./21st-century-disestablishments-in-india.json');

// const outputFile20 = path.join(__dirname, 'keyed-disestablishements-20th-century.json');
// const outputFile21 = path.join(__dirname, 'keyed-disestablishements-21st-century.json');

// let keyedDisestablishments20 = disestablishements20.reduce((agg, val) => {
//   if (agg[val.pageid]) {
//     agg[val.pageid].paths.push(val.path);
//   } else {
//     agg[val.pageid] = {
//       title: val.title,
//       pageid: val.pageid,
//       url: val.url,
//       wikidata: val.wikidata,
//       paths: [val.path],
//       allPageDetails: val.allPageDetails,
//     };
//   }
//   return agg;
// }, {});

// console.log('disestablishements20', disestablishements20.length);
// console.log('keyedDisestablishments20', size(keyedDisestablishments20));

// fs.writeFileSync(outputFile20, JSON.stringify(keyedDisestablishments20, null, 2));

// // disestablishements21;

// let keyedDisestablishments21 = disestablishements21.reduce((agg, val) => {
//   if (agg[val.pageid]) {
//     agg[val.pageid].paths.push(val.path);
//   } else {
//     agg[val.pageid] = {
//       title: val.title,
//       pageid: val.pageid,
//       url: val.url,
//       wikidata: val.wikidata,
//       paths: [val.path],
//       allPageDetails: val.allPageDetails,
//     };
//   }
//   return agg;
// }, {});

// console.log('disestablishements21', disestablishements21.length);
// console.log('keyedDisestablishments21', size(keyedDisestablishments21));

// fs.writeFileSync(outputFile21, JSON.stringify(keyedDisestablishments21, null, 2));

// --------------------------------------------------

const establishements20 = require('./20th-century-establishments-in-india.json');
const establishements21 = require('./21st-century-establishments-in-india.json');

const outputFile20 = path.join(__dirname, 'keyed-establishements-20th-century.json');
const outputFile21 = path.join(__dirname, 'keyed-establishements-21st-century.json');

let keyedEstablishments20 = establishements20.reduce((agg, val) => {
  if (agg[val.pageid]) {
    agg[val.pageid].paths.push(val.path);
  } else {
    agg[val.pageid] = {
      title: val.title,
      pageid: val.pageid,
      url: val.url,
      wikidata: val.wikidata,
      paths: [val.path],
      allPageDetails: val.allPageDetails,
    };
  }
  return agg;
}, {});

console.log('establishements20', establishements20.length);
console.log('keyedEstablishments20', size(keyedEstablishments20));

fs.writeFileSync(outputFile20, JSON.stringify(keyedEstablishments20, null, 2));

let keyedEstablishments21 = establishements21.reduce((agg, val) => {
  if (agg[val.pageid]) {
    agg[val.pageid].paths.push(val.path);
  } else {
    agg[val.pageid] = {
      title: val.title,
      pageid: val.pageid,
      url: val.url,
      wikidata: val.wikidata,
      paths: [val.path],
      allPageDetails: val.allPageDetails,
    };
  }
  return agg;
}, {});

console.log('establishements21', establishements21.length);
console.log('keyedEstablishments21', size(keyedEstablishments21));

fs.writeFileSync(outputFile21, JSON.stringify(keyedEstablishments21, null, 2));
