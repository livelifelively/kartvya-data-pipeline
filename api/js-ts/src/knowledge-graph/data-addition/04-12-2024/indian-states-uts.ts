import { _Indian_State_Union_Territory_ } from "../../../generated/graphql";
import { states, uts } from "../../../admin-regions/states-data/basic-states-data";
import { update_Name_Change_Name_Case, upsert_Name_ } from "../../name/name.update";
import { createNodeType, updateNodeType } from "../../generic/generic.create";
import { createGraphQLClient } from "../../generic/generic.utils";
import vcListByState from "../../../admin-regions/vidhansabha/vc-list-by-state-dgraph.json";
import fs from "fs";

import { keyBy } from "lodash";
import {
  multiPolygonToDgraphMultiPolygon,
  polygonToMultiPolygon,
} from "../../../admin-regions/states/andhra-pradesh/scripts/districts";

(async () => {
  const graphQLClient = await createGraphQLClient();

  let allIds: any = [
    {
      name_id: "in-sut-kerala",
      wikidata_qid: "Q1186",
      wikipedia_page: "https://en.wikipedia.org/wiki/Kerala",
      osm_id: 2018151,
      filePath:
        "/Users/dollyparmar/dev/kartvya/kartvya-data-pipeline/api/js-ts/src/maps/india-osm/states-uts/Kerala/sut.json",
    },
    {
      name_id: "in-sut-himachal-pradesh",
      wikidata_qid: "Q1177",
      wikipedia_page: "https://en.wikipedia.org/wiki/Himachal_Pradesh",
      osm_id: 364186,
      filePath:
        "/Users/dollyparmar/dev/kartvya/kartvya-data-pipeline/api/js-ts/src/maps/india-osm/states-uts/Himachal Pradesh/sut.json",
    },
    {
      name_id: "in-sut-meghalaya",
      wikidata_qid: "Q1195",
      wikipedia_page: "https://en.wikipedia.org/wiki/Meghalaya",
      osm_id: 2027521,
      filePath:
        "/Users/dollyparmar/dev/kartvya/kartvya-data-pipeline/api/js-ts/src/maps/india-osm/states-uts/Meghalaya/sut.json",
    },
    {
      name_id: "in-sut-jharkhand",
      wikidata_qid: "Q1184",
      wikipedia_page: "https://en.wikipedia.org/wiki/Jharkhand",
      osm_id: 1960191,
      filePath:
        "/Users/dollyparmar/dev/kartvya/kartvya-data-pipeline/api/js-ts/src/maps/india-osm/states-uts/Jharkhand/sut.json",
    },
    {
      name_id: "in-sut-chhattisgarh",
      wikidata_qid: "Q1168",
      wikipedia_page: "https://en.wikipedia.org/wiki/Chhattisgarh",
      osm_id: 1972004,
      filePath:
        "/Users/dollyparmar/dev/kartvya/kartvya-data-pipeline/api/js-ts/src/maps/india-osm/states-uts/Chhattisgarh/sut.json",
    },
    {
      name_id: "in-sut-bihar",
      wikidata_qid: "Q1165",
      wikipedia_page: "https://en.wikipedia.org/wiki/Bihar",
      osm_id: 1958982,
      filePath:
        "/Users/dollyparmar/dev/kartvya/kartvya-data-pipeline/api/js-ts/src/maps/india-osm/states-uts/Bihar/sut.json",
    },
    {
      name_id: "in-sut-goa",
      wikidata_qid: "Q1171",
      wikipedia_page: "https://en.wikipedia.org/wiki/Goa",
      osm_id: 11251493,
      filePath:
        "/Users/dollyparmar/dev/kartvya/kartvya-data-pipeline/api/js-ts/src/maps/india-osm/states-uts/Goa/sut.json",
    },
    {
      name_id: "in-sut-maharashtra",
      wikidata_qid: "Q1191",
      wikipedia_page: "https://en.wikipedia.org/wiki/Maharashtra",
      osm_id: 1950884,
      filePath:
        "/Users/dollyparmar/dev/kartvya/kartvya-data-pipeline/api/js-ts/src/maps/india-osm/states-uts/Maharashtra/sut.json",
    },
    {
      name_id: "in-sut-uttar-pradesh",
      wikidata_qid: "Q1498",
      wikipedia_page: "https://en.wikipedia.org/wiki/Uttar_Pradesh",
      osm_id: 1942587,
      filePath:
        "/Users/dollyparmar/dev/kartvya/kartvya-data-pipeline/api/js-ts/src/maps/india-osm/states-uts/Uttar Pradesh/sut.json",
    },
    {
      name_id: "in-sut-west-bengal",
      wikidata_qid: "Q1356",
      wikipedia_page: "https://en.wikipedia.org/wiki/West_Bengal",
      osm_id: 1960177,
      filePath:
        "/Users/dollyparmar/dev/kartvya/kartvya-data-pipeline/api/js-ts/src/maps/india-osm/states-uts/West Bengal/sut.json",
    },
    {
      name_id: "in-sut-nagaland",
      wikidata_qid: "Q1599",
      wikipedia_page: "https://en.wikipedia.org/wiki/Nagaland",
      osm_id: 2027973,
      filePath:
        "/Users/dollyparmar/dev/kartvya/kartvya-data-pipeline/api/js-ts/src/maps/india-osm/states-uts/Nagaland/sut.json",
    },
    {
      name_id: "in-sut-rajasthan",
      wikidata_qid: "Q1437",
      wikipedia_page: "https://en.wikipedia.org/wiki/Rajasthan",
      osm_id: 1942920,
      filePath:
        "/Users/dollyparmar/dev/kartvya/kartvya-data-pipeline/api/js-ts/src/maps/india-osm/states-uts/Rajasthan/sut.json",
    },
    {
      name_id: "in-sut-arunachal-pradesh",
      wikidata_qid: "Q1162",
      wikipedia_page: "https://en.wikipedia.org/wiki/Arunachal_Pradesh",
      osm_id: 2027346,
      filePath:
        "/Users/dollyparmar/dev/kartvya/kartvya-data-pipeline/api/js-ts/src/maps/india-osm/states-uts/Arunachal Pradesh/sut.json",
    },
    {
      name_id: "in-sut-manipur",
      wikidata_qid: "Q1193",
      wikipedia_page: "https://en.wikipedia.org/wiki/Manipur",
      osm_id: 2027869,
      filePath:
        "/Users/dollyparmar/dev/kartvya/kartvya-data-pipeline/api/js-ts/src/maps/india-osm/states-uts/Manipur/sut.json",
    },
    {
      name_id: "in-sut-telangana",
      wikidata_qid: "Q677037",
      wikipedia_page: "https://en.wikipedia.org/wiki/Telangana",
      osm_id: 3250963,
      filePath:
        "/Users/dollyparmar/dev/kartvya/kartvya-data-pipeline/api/js-ts/src/maps/india-osm/states-uts/Telangana/sut.json",
    },
    {
      name_id: "in-sut-sikkim",
      wikidata_qid: "Q1505",
      wikipedia_page: "https://en.wikipedia.org/wiki/Sikkim",
      osm_id: 1791324,
      filePath:
        "/Users/dollyparmar/dev/kartvya/kartvya-data-pipeline/api/js-ts/src/maps/india-osm/states-uts/Sikkim/sut.json",
    },
    {
      name_id: "in-sut-gujarat",
      wikidata_qid: "Q1061",
      wikipedia_page: "https://en.wikipedia.org/wiki/Gujarat",
      osm_id: 1949080,
      filePath:
        "/Users/dollyparmar/dev/kartvya/kartvya-data-pipeline/api/js-ts/src/maps/india-osm/states-uts/Gujarat/sut.json",
    },
    {
      name_id: "in-sut-assam",
      wikidata_qid: "Q1164",
      wikipedia_page: "https://en.wikipedia.org/wiki/Assam",
      osm_id: 2025886,
      filePath:
        "/Users/dollyparmar/dev/kartvya/kartvya-data-pipeline/api/js-ts/src/maps/india-osm/states-uts/Assam/sut.json",
    },
    {
      name_id: "in-sut-tamil-nadu",
      wikidata_qid: "Q1445",
      wikipedia_page: "https://en.wikipedia.org/wiki/Tamil_Nadu",
      osm_id: 96905,
      filePath:
        "/Users/dollyparmar/dev/kartvya/kartvya-data-pipeline/api/js-ts/src/maps/india-osm/states-uts/Tamil Nadu/sut.json",
    },
    {
      name_id: "in-sut-punjab",
      wikidata_qid: "Q22424",
      wikipedia_page: "https://en.wikipedia.org/wiki/Punjab,_India",
      osm_id: 1942686,
      filePath:
        "/Users/dollyparmar/dev/kartvya/kartvya-data-pipeline/api/js-ts/src/maps/india-osm/states-uts/Punjab/sut.json",
    },
    {
      name_id: "in-sut-haryana",
      wikidata_qid: "Q1174",
      wikipedia_page: "https://en.wikipedia.org/wiki/Haryana",
      osm_id: 1942601,
      filePath:
        "/Users/dollyparmar/dev/kartvya/kartvya-data-pipeline/api/js-ts/src/maps/india-osm/states-uts/Haryana/sut.json",
    },
    {
      name_id: "in-sut-odisha",
      wikidata_qid: "Q22048",
      wikipedia_page: "https://en.wikipedia.org/wiki/Odisha",
      osm_id: 1984022,
      filePath:
        "/Users/dollyparmar/dev/kartvya/kartvya-data-pipeline/api/js-ts/src/maps/india-osm/states-uts/Odisha/sut.json",
    },
    {
      name_id: "in-sut-madhya-pradesh",
      wikidata_qid: "Q1188",
      wikipedia_page: "https://en.wikipedia.org/wiki/Madhya_Pradesh",
      osm_id: 1950071,
      filePath:
        "/Users/dollyparmar/dev/kartvya/kartvya-data-pipeline/api/js-ts/src/maps/india-osm/states-uts/Madhya Pradesh/sut.json",
    },
    {
      name_id: "in-sut-uttarakhand",
      wikidata_qid: "Q1499",
      wikipedia_page: "https://en.wikipedia.org/wiki/Uttarakhand",
      osm_id: 9987086,
      filePath:
        "/Users/dollyparmar/dev/kartvya/kartvya-data-pipeline/api/js-ts/src/maps/india-osm/states-uts/Uttarakhand/sut.json",
    },
    {
      name_id: "in-sut-karnataka",
      wikidata_qid: "Q1185",
      wikipedia_page: "https://en.wikipedia.org/wiki/Karnataka",
      osm_id: 2019939,
      filePath:
        "/Users/dollyparmar/dev/kartvya/kartvya-data-pipeline/api/js-ts/src/maps/india-osm/states-uts/Karnataka/sut.json",
    },
    {
      name_id: "in-sut-andhra-pradesh",
      wikidata_qid: "Q1159",
      wikipedia_page: "https://en.wikipedia.org/wiki/Andhra_Pradesh",
      osm_id: 2022095,
      filePath:
        "/Users/dollyparmar/dev/kartvya/kartvya-data-pipeline/api/js-ts/src/maps/india-osm/states-uts/Andhra Pradesh/sut.json",
    },
    {
      name_id: "in-sut-mizoram",
      wikidata_qid: "Q1502",
      wikipedia_page: "https://en.wikipedia.org/wiki/Mizoram",
      osm_id: 2029046,
      filePath:
        "/Users/dollyparmar/dev/kartvya/kartvya-data-pipeline/api/js-ts/src/maps/india-osm/states-uts/Mizoram/sut.json",
    },
    {
      name_id: "in-sut-tripura",
      wikidata_qid: "Q1363",
      wikipedia_page: "https://en.wikipedia.org/wiki/Tripura",
      osm_id: 2026458,
      filePath:
        "/Users/dollyparmar/dev/kartvya/kartvya-data-pipeline/api/js-ts/src/maps/india-osm/states-uts/Tripura/sut.json",
    },
    {
      name_id: "in-sut-andaman-and-nicobar-islands",
      wikipedia_page: "https://en.wikipedia.org/wiki/Andaman_and_Nicobar_Islands",
      wikidata_qid: "Q40888",
      osm_id: 2025855,
      filePath:
        "/Users/dollyparmar/dev/kartvya/kartvya-data-pipeline/api/js-ts/src/maps/india-osm/states-uts/Andaman and Nicobar Islands/sut.json",
    },
    {
      name_id: "in-sut-chandigarh",
      wikipedia_page: "https://en.wikipedia.org/wiki/Chandigarh",
      wikidata_qid: "Q120971341",
      osm_id: 1942809,
      filePath:
        "/Users/dollyparmar/dev/kartvya/kartvya-data-pipeline/api/js-ts/src/maps/india-osm/states-uts/Chandigarh/sut.json",
    },
    {
      name_id: "in-sut-dadra-and-nagar-haveli-and-daman-and-diu",
      wikipedia_page: "https://en.wikipedia.org/wiki/Dadra_and_Nagar_Haveli_and_Daman_and_Diu",
      wikidata_qid: "Q77997266",
      osm_id: 1952530,
      filePath:
        "/Users/dollyparmar/dev/kartvya/kartvya-data-pipeline/api/js-ts/src/maps/india-osm/states-uts/Dadra and Nagar Haveli and Daman and Diu/sut.json",
    },
    {
      name_id: "in-sut-delhi",
      wikipedia_page: "https://en.wikipedia.org/wiki/Delhi",
      wikidata_qid: "Q9357528",
      osm_id: 1942586,
      filePath:
        "/Users/dollyparmar/dev/kartvya/kartvya-data-pipeline/api/js-ts/src/maps/india-osm/states-uts/Delhi/sut.json",
    },
    {
      name_id: "in-sut-jammu-and-kashmir",
      wikipedia_page: "https://en.wikipedia.org/wiki/Jammu_and_Kashmir_(union_territory)",
      wikidata_qid: "Q66278313",
      osm_id: 1943188,
      filePath:
        "/Users/dollyparmar/dev/kartvya/kartvya-data-pipeline/api/js-ts/src/maps/india-osm/states-uts/Jammu and Kashmir/sut.json",
    },
    {
      name_id: "in-sut-ladakh",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ladakh",
      wikidata_qid: "Q200667",
      osm_id: 5515045,
      filePath:
        "/Users/dollyparmar/dev/kartvya/kartvya-data-pipeline/api/js-ts/src/maps/india-osm/states-uts/Ladakh/sut.json",
    },
    {
      name_id: "in-sut-lakshadweep",
      wikipedia_page: "https://en.wikipedia.org/wiki/Lakshadweep",
      wikidata_qid: "Q26927",
      osm_id: 2027460,
      filePath:
        "/Users/dollyparmar/dev/kartvya/kartvya-data-pipeline/api/js-ts/src/maps/india-osm/states-uts/Lakshadweep/sut.json",
    },
    {
      name_id: "in-sut-puducherry",
      wikipedia_page: "https://en.wikipedia.org/wiki/Puducherry_(union_territory)",
      wikidata_qid: "Q66743",
      osm_id: 107001,
      filePath:
        "/Users/dollyparmar/dev/kartvya/kartvya-data-pipeline/api/js-ts/src/maps/india-osm/states-uts/Puducherry/sut.json",
    },
  ];

  for (let sut of allIds) {
    // const id = await updateNodeType("_Indian_State_Union_Territory_", graphQLClient, {
    //   filter: { name_id: { eq: sut.name_id } },
    //   set: {
    //     wikipedia_page: sut.wikipedia_page,
    //     wikidata_qid: sut.wikidata_qid,
    //     osm_id: sut.osm_id.toString(),
    //   },
    // });
    // console.log(id);

    let contentDataString: any = await fs.readFileSync(sut.filePath, "utf8");
    let contentData = JSON.parse(contentDataString);

    const sutMap = polygonToMultiPolygon(contentData);

    let geo = {
      // precision: 7,
      category: "Region",
      source_name: "OpenStreetMap",
      source_url: `https://nominatim.openstreetmap.org/details.php?osmtype=R&osmid=${sut.osm_id}&class=boundary&addressdetails=1&hierarchy=0&group_hierarchy=1&polygon_geojson=1&format=json`,
      source_data: `${contentDataString}`,
      area: multiPolygonToDgraphMultiPolygon(sutMap.geometry.coordinates),
      node_created_on: new Date(),
    };

    const geoId = await createNodeType("_Geo_", graphQLClient, geo);

    let toSaveSUTRegion = {
      self: { name_id: sut.name_id },
      geo_boundary: {
        id: geoId,
      },
      node_created_on: new Date(),
    };

    const sutRegionId = await createNodeType("_Indian_State_Union_Territory_Region_", graphQLClient, toSaveSUTRegion);
    console.log({ name_id: sut.name_id, geoId, sutRegionId, osm_id: sut.osm_id });
  }

  // console.log(JSON.stringify(allIds));

  // let toSaveStatesUts: any = states.map((state) => {
  //   return {
  //     names: [{ name: state.State.text }],
  //     established_on: new Date(state.Statehood.text),
  //     name_id: `in-sut-${state.State.text.toLowerCase().split(" ").join("-").split(",").join("")}`,
  //     node_created_on: new Date(),
  //     state_or_union_territory: "State",
  //   };
  // });

  // toSaveStatesUts = toSaveStatesUts.concat(
  //   uts.map((ut) => {
  //     return {
  //       names: [{ name: ut.State.text }],
  //       established_on: new Date(ut.Established.text),
  //       name_id: `in-sut-${ut.State.text.toLowerCase().split(" ").join("-").split(",").join("")}`,
  //       node_created_on: new Date(),
  //       state_or_union_territory: "Union_Territory",
  //     };
  //   })
  // );

  // //   console.log(JSON.stringify(toSaveStatesUts, null, 2));
  // //   console.log(toSaveStatesUts.length);
  // let createdSUTNodes: any = [];
  // for (let sut of toSaveStatesUts) {
  //   // save name
  //   let toSaveName = sut.names[0].name;
  //   const nameId = await upsert_Name_(toSaveName);

  //   const sutId = await createNodeType("_Indian_State_Union_Territory_", graphQLClient, {
  //     ...sut,
  //   });

  //   createdSUTNodes.push({ sutId, sut });
  //   console.log(sutId);
  // }

  // console.log(JSON.stringify(createdSUTNodes, null, 2));
})();
