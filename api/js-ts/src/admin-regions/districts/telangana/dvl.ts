import dataVDL from "./tl.d-vc.json";
import { groupBy, map, uniqWith, isEqual, reduce } from "lodash";

function districts() {
  // get all districts, can be repeated
  let d: any = [];
  dataVDL.forEach((val: any) => {
    d = d.concat(val.districts);
  });

  let dGroupedByURL = groupBy(d, "href");

  // remove duplicate values
  dGroupedByURL = reduce(
    dGroupedByURL,
    (agg: any, val: any, idx: any) => {
      agg[idx] = uniqWith(val, isEqual);
      return agg;
    },
    {}
  );

  // merge values with same url but different names
  dGroupedByURL = reduce(
    dGroupedByURL,
    (agg: any, val: any, idx: any) => {
      agg[idx] = val.reduce((agg1: any, val1: any) => {
        agg1.text = agg1.text || [];
        agg1.text.push(val1.text);
        agg1.href = val1.href;

        return agg1;
      }, {});
      return agg;
    },
    {}
  );

  // execute the entire district data pipeline

  return dGroupedByURL;
}

function vidhansabhaConstituencies() {
  let v = dataVDL.map((val: any) => {
    return {
      vidhansabha_constituency_number: val.ac_no,
      vidhansabha_constituency_name: val.name_2.text,
      vidhansabha_constituency_wikipedia_page: val.name_2.href,
      reservation: val.reservation,
    };
  });

  return v;

  // run the district and loksabha pipelines
  // keyby original_url both district and loksabha returned data. {original_url, name_id}
  // iterate on vidhasabha, replace the district and lc values by name ids
  // link the d with lc as well
  // save vidhansabha
  // save d to lc connections
}

function loksabhaConstituencies() {
  let l: any = [];
  dataVDL.forEach((val: any) => {
    l.push(val.loksabhaConstituency);
  });

  let lGroupedByURL = groupBy(l, "href");

  // remove duplicate values
  lGroupedByURL = reduce(
    lGroupedByURL,
    (agg: any, val: any, idx: any) => {
      agg[idx] = uniqWith(val, isEqual);
      return agg;
    },
    {}
  );

  // merge values with same url but different names
  lGroupedByURL = reduce(
    lGroupedByURL,
    (agg: any, val: any, idx: any) => {
      agg[idx] = val.reduce((agg1: any, val1: any) => {
        agg1.text = agg1.text || [];
        agg1.text.push(val1.text);
        agg1.href = val1.href;

        return agg1;
      }, {});
      return agg;
    },
    {}
  );

  return lGroupedByURL;
  // create and execute the lc pipeline
}

(async () => {
  const l = loksabhaConstituencies();
  const d = districts();
  const v = vidhansabhaConstituencies();

  console.log(v);
  console.log(d);
  console.log(l);
})();

// from the dvl data
// get vc data
// get d data
// get lc data
// call pipelines
// when processing is done, fetch data from the output of all three
//
