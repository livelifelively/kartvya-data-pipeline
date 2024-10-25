const fs = require('fs');
const path = require('path');
const { size, groupBy } = require('lodash');

// const dVcLc = require('./d-vc-lc.json');

// // let withError = dVcLc.filter((val) => val.result.error);
// let withError = [
//   'https://en.wikipedia.org/wiki/List_of_constituencies_of_the_Bihar_Legislative_Assembly',
//   'https://en.wikipedia.org/wiki/List_of_constituencies_of_the_Madhya_Pradesh_Legislative_Assembly',
//   'https://en.wikipedia.org/wiki/List_of_constituencies_of_the_Mizoram_Legislative_Assembly',
//   'https://en.wikipedia.org/wiki/List_of_constituencies_of_the_Sikkim_Legislative_Assembly',
//   'https://en.wikipedia.org/wiki/List_of_constituencies_of_the_Tripura_Legislative_Assembly',
// ];

// let withoutError = dVcLc.filter((val) => !withError.includes(val.url));

// // console.log(withoutError.length);

// function getDataFromSectionsOrSubsections(val) {
//   let dataElements = val.elements.filter((v) => v.nodeName === 'TABLE');
//   if (dataElements.length) {
//     return {
//       title: val.title,
//       data: dataElements.reduce((a, v) => {
//         const d = v.data.filter((v1) => size(v1) > 0);
//         if (d.length) a.push(d);

//         return a;
//       }, []),
//     };
//   }
//   return false;
// }

// const data = withoutError.map((value) => {
//   let stateUtData = value.result.reduce((agg, val) => {
//     let section = getDataFromSectionsOrSubsections(val);
//     if (section) {
//       val.subSections.map((v) => {
//         let subSection = getDataFromSectionsOrSubsections(v);
//         return subSection.length ? subSection : [];
//       });

//       agg.push(section);
//     }

//     return agg;
//   }, []);

//   return {
//     url: value.url,
//     data: stateUtData,
//   };
// });

// const outputFilePath = path.join(__dirname, 'd-vc-lc.without-errors-tables-only.json');

// fs.writeFileSync(outputFilePath, JSON.stringify(data, null, 2));

/**
 * to v2
 */
// const withoutError = require('./d-vc-lc.without-errors-tables-only.json');

// const data = withoutError.map((value) => {
//   return {
//     url: value.url,
//     data: value.data.map((val) => {
//       return {
//         title: val.title,
//         data: val.data[0],
//       };
//     }),
//   };
// });

// const outputFilePath = path.join(__dirname, 'd-vc-lc.v1.json');

// fs.writeFileSync(outputFilePath, JSON.stringify(data, null, 2));

/**
 * To V3
 */
const v2Data = require('./d-vc-lc.v2.json');

// const data = v1Data.map((value) => {
//   return {
//     url: value.url,
//     data: value.data.filter((val) => val.title === 'Active VidhansabhaConstituencies')[0],
//   };
// });

let data1 = v2Data.map((value) => {
  let flattenedData = { title: value.data.title };
  let state_name = value.url.split('List_of_constituencies_of_the_')[1];
  state_name = state_name.split('_Legislative_Assembly')[0];
  state_name = state_name.split('_').join(' ').toLowerCase();

  flattenedData.data = value.data.data.map((val) => {
    try {
      let newData = {
        vidhansabha_constituency_number: val['No.'].text,
        vidhansabha_constituency_name: val['Name'].text,
        vidhansabha_constituency_wikipedia_page: val['Name'].href,

        district_name: val['District'].text,
        district_wikipedia_page: val['District'].href,

        loksabha_constituency_name: val['LoksabhaConstituency'].text,
        loksabha_constituency_wikipedia_page: val['LoksabhaConstituency'].href,
      };

      if (val['Electors']) newData.electors = val['Electors'];

      if (val['Reservation']) newData.reservation = val['Reservation'].text;
      else newData.reservation = 'None';

      let vcNameLength = val['Name'].text.length;
      let vcNameWithoutReservationTag = val['Name'].text.split(' (SC)')[0];
      if (vcNameWithoutReservationTag.length !== vcNameLength) {
        newData.reservation = 'SC';
      }

      vcNameWithoutReservationTag = vcNameWithoutReservationTag.split(' (ST)')[0];
      if (vcNameWithoutReservationTag.length !== vcNameLength) {
        newData.reservation = 'ST';
      }
      newData.vidhansabha_constituency_name = vcNameWithoutReservationTag;

      let lcNameWithoutReservationTag = val['LoksabhaConstituency'].text.split(' (SC)')[0];
      lcNameWithoutReservationTag = lcNameWithoutReservationTag.split(' (ST)')[0];
      newData.loksabha_constituency_name = lcNameWithoutReservationTag;

      return newData;
    } catch (e) {
      console.log(val);
      console.error(e);
    }
  });

  return { state_name, region_id: `in-s-${state_name.split(' ').join('-')}`, url: value.url, data: flattenedData };
});

const statesWithPartialVCInDistricts = ['in-s-nagaland', 'in-s-andhra-pradesh', 'in-s-telangana'];

data1 = data1.filter((val) => !statesWithPartialVCInDistricts.includes(val.region_id));

// let data2 = data.map((value) => {
//   let keyedData = { title: value.data.title };

//   keyedData.original = value.data.data;

//   keyedData.byVidhansabhaConstituencies = groupBy(value.data.data, 'Name.text');

//   keyedData.byLoksabhaConstituencies = groupBy(value.data.data, 'LoksabhaConstituency.text');

//   keyedData.byDistricts = groupBy(value.data.data, 'District.text');

//   return {
//     url: value.url,
//     data: keyedData,
//   };
// });

// const outputFilePath = path.join(__dirname, 'd-vc-lc.v2.json');
const outputFilePath = path.join(__dirname, 'd-vc-lc.v3.json');

fs.writeFileSync(outputFilePath, JSON.stringify(data1, null, 2));
