const fs = require('fs');
const path = require('path');
const { sortBy, keyBy, map, forEach } = require('lodash');

const vcListDgraph = require('./vc-list-by-state-dgraph.json');
const vscListStates = require('./vidhansabha-list-states.json');

// =============================
// console.log(vscListStates);
// console.log(vcListDgraph);

// let vscDB = vcListDgraph.reduce((agg, val) => {
//   agg[val.region_id] = {
//     region_id: val.region_id,
//     vsc_count: val.vidhansabha_constituencyAggregate.count,
//     wikipedia_qid: val.administrative_entity.wikidata_qid,
//     wikipedia_page: val.administrative_entity.wikipedia_page,
//     vidhansabha_constituency: val.vidhansabha_constituency.map((v) => {
//       return {
//         region_id: v.region_id,
//         wikipedia_qid: v.administrative_entity.wikidata_qid,
//         wikipedia_page: v.administrative_entity.wikipedia_page,
//       };
//     }),
//   };

//   return agg;
// }, {});

// console.log(vscDB);
// =============================

// =============================
// constituencies with multiple districts
// let vcsWithMultipleDistricts = vcListDgraph.map((val) => {
//   return {
//     region_id: val.region_id,
//     vidhansabha_constituency_with_multiple_districts: val.vidhansabha_constituency.filter((v) => {
//       return v.districtAggregate.count > 1;
//     }),
//   };
// });

// vcsWithMultipleDistricts = vcsWithMultipleDistricts.filter((val) => {
//   return val.vidhansabha_constituency_with_multiple_districts.length > 0;
// });

// console.log(vcsWithMultipleDistricts);
// =============================

// =============================
// constituencies to list
// let toActiveAndFormer = vcListDgraph.map((value) => {
//   return {
//     region_id: value.region_id,
//     vsc_count: value.vidhansabha_constituencyAggregate.count,
//     wikipedia_qid: value.administrative_entity.wikidata_qid,
//     wikipedia_page: value.administrative_entity.wikipedia_page,
//     vidhansabha_constituency_dgraph: value.vidhansabha_constituency.map((v) => {
//       return {
//         region_id: v.region_id,
//         wikipedia_qid: v.administrative_entity.wikidata_qid,
//         wikipedia_page: v.administrative_entity.wikipedia_page,
//       };
//     }),
//     active_vcs_navbox: [],
//     former_vcs_navbox: [],
//   };
// });

// toActiveAndFormer = sortBy(toActiveAndFormer, 'region_id');

// const outputPath = path.join(__dirname, 'state-vsc-navboxes.json');
// fs.writeFileSync(outputPath, JSON.stringify(toActiveAndFormer, null, 2));
// =============================

// =============================
// const statesVcs = require('./state-vsc-navboxes.json');

// // find vidhansabha entries in dgraph with issues.
// // differs in wikipedia page url
// const statesWithActiveVCsIssues = statesVcs.reduce((a, state) => {
//   const keyed = keyBy(state.vidhansabha_constituency_dgraph, 'wikipedia_page');
//   let notFound = state.active_vcs_navbox.reduce((agg, val) => {
//     if (!keyed[val.href]) {
//       agg.push(val);
//     }
//     return agg;
//   }, []);

//   a[state.region_id] = { count: notFound.length, notFound };

//   return a;
// }, {});

// const outputPath = path.join(__dirname, 'state-vsc-navboxes.issues.json');
// fs.writeFileSync(outputPath, JSON.stringify(statesWithActiveVCsIssues, null, 2));

// console.log(statesWithActiveVCsIssues);
// =============================

// =============================
// get all the list of all unique urls.
// for every url, get page details
// const fromWikiLatest = require('./vidhansabha-list-states.json');

// let allStatesWikipediaUrls = fromWikiLatest.map((state) => {
//   return {
//     region_id: state.region_id,
//     wikipedia_urls: state.data.data.reduce((avc, vc) => {
//       avc.push(vc.vidhansabha_constituency_wikipedia_page);
//       avc.push(vc.district_wikipedia_page);
//       avc.push(vc.loksabha_constituency_wikipedia_page);

//       return avc;
//     }, []),
//   };
// });

// console.log(allStatesWikipediaUrls);
// =============================

// =============================
const vcData = require('./vc-data.json');

let vcDataNew = vcData.map((value) => {
  return {
    results: value.results.map((val) => {
      return {
        url: val.url,
        name: val.result.infoBox.heading,
        constituencyDetails: val.result.infoBox.constituencyDetails,
        maps: val.result.maps,
        lastUpdatedOn: val.result.lastUpdatedOn,
        wikidataQID: val.result.wikidataQID,
      };
    }),
    state: value.state,
  };
});

let vscDB = vcListDgraph.reduce((agg, val) => {
  agg[val.region_id] = {
    region_id: val.region_id,
    vsc_count: val.vidhansabha_constituencyAggregate.count,
    wikipedia_qid: val.administrative_entity.wikidata_qid,
    wikipedia_page: val.administrative_entity.wikipedia_page,
    vidhansabha_constituency: val.vidhansabha_constituency.map((v) => {
      return {
        region_id: v.region_id,
        wikipedia_qid: v.administrative_entity.wikidata_qid,
        wikipedia_page: v.administrative_entity.wikipedia_page,
      };
    }),
  };

  return agg;
}, {});

let notFoundCount = 0;
let foundCount = 0;
vcDataNew.map((value) => {
  let savedStateData = vscDB[value.state];
  let keyedByWikipediaQid = keyBy(savedStateData.vidhansabha_constituency, 'wikipedia_qid');

  value.results.forEach((val) => {
    if (keyedByWikipediaQid[val.wikidataQID]) {
      console.log(val.url);
      console.log('FOUND');
      foundCount += 1;
    } else {
      notFoundCount += 1;
      // console.log(val);
    }
  });
});

// console.log(notFoundCount, foundCount);
