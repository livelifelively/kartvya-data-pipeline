import { captureXHRRequests } from './xhr-requests-responses';

captureXHRRequests('https://en.wikipedia.org/wiki/Bageshwar_district#/map/0')
  .then((val) => {
    console.log(JSON.stringify(val, null, 2));
  })
  .catch((error: Error) => {
    console.error('Error:', error.message);
  });
