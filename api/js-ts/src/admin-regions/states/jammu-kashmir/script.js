let geojson = require('./jk.vc.geojson.json');

const fs = require('fs');
const path = require('path');

let geojson2 = { ...geojson };

geojson2.features = geojson.features.map((feature) => {
  let newFeature = { ...feature };
  if (feature.geometry.type === 'Polygon') {
    newFeature.geometry.type = 'MultiPolygon';
    newFeature.geometry.coordinates = [feature.geometry.coordinates];
  }

  return newFeature;
});

console.log(geojson2.features[0].geometry);
const outputPath = path.join(__dirname, 'jk.vc.multipolygon.geo.json');

fs.writeFileSync(outputPath, JSON.stringify(geojson2, null, 2));
