import fs from "fs";
import path from "path";

import { keyBy } from "lodash";

// import { statesAndUnionTerritories } from "../../admin-regions/states-basic/update-states";
import { states, statesData, uts } from "./basic-states-data";
import { convertDatetime, upsertDateTime } from "../../admin-regions/date-time";
import { multiPolygonToDgraphMultiPolygon, polygonToMultiPolygon } from "../../pipeline/pipeline-utils";
import { createGraphQLClient } from "../../knowledge-graph/generic/generic.utils";
import { createNodeType } from "../../knowledge-graph/generic/generic.create";
import { upsert_Name_ } from "../../knowledge-graph/name/name.update";

(async () => {
  // const extraStateDetailsByNameId = keyBy(statesAndUnionTerritories, "name_id");
  const keyedByStatesData = keyBy(statesData, "name_id");
  const graphQLClient = await createGraphQLClient();

  await upsert_Name_("OpenStreetMap");
  await upsert_Name_("Open Street Map");

  //   const sourceId = await createNodeType("_Source_", graphQLClient, {
  //     name_id: "OpenStreetMap",
  //     names: [{ name: "OpenStreetMap" }, { name: "Open Street Map" }],
  //     source_description: "Open Street Maps",
  //     source_urls: ["https://www.openstreetmap.org/"],
  //   });

  // for (let state of states) {
  for (let state of uts) {
    const name_id = `in-sut-${state.State.text
      .toLowerCase()
      .split(" and")
      .join("")
      .split(" &")
      .join("")
      .split(" ")
      .join("-")
      .split(",")
      .join("")}`;

    let contentDataString: any = await fs.readFileSync(
      path.join(__dirname, "../../../", keyedByStatesData[name_id].filePath),
      "utf8"
    );
    let contentData = JSON.parse(contentDataString);

    const sutMap = polygonToMultiPolygon(contentData);

    let geoSourceId = await createNodeType("_Source_Data_", graphQLClient, {
      source: { name_id: "OpenStreetMap" },
      source_url: `https://nominatim.openstreetmap.org/details.php?osmtype=R&osmid=${keyedByStatesData[name_id].osm_id}&class=boundary&addressdetails=1&hierarchy=0&group_hierarchy=1&polygon_geojson=1&format=json`,
      source_data: `${contentDataString}`,
    });

    let geoId = await createNodeType("_Geo_", graphQLClient, {
      category: "Region",
      area: multiPolygonToDgraphMultiPolygon(sutMap.geometry.coordinates),
      node_created_on: new Date(),
      source: { id: geoSourceId },
    });

    const dateTimeId = await upsertDateTime(graphQLClient, {
      dateTime: state?.established_on.text,
      precision: "day",
      timezone: "+05:30",
      timezone_independent: true,
    });

    const toSaveStateVersionRegion = {
      name_id: `${name_id}-version-25-region`,
      osm_id: `${keyedByStatesData[name_id].osm_id}`,
      geo_boundary: [{ id: geoId }],

      node_created_on: new Date(),
    };

    const toSaveStateVersionRegionId = await createNodeType(
      "_Indian_State_Union_Territory_Version_Region_",
      graphQLClient,
      toSaveStateVersionRegion
    );

    const toSaveStateVersion = {
      name_id: `${name_id}-version-25`,
      region: { id: toSaveStateVersionRegionId },
      // self: { id: toSaveStateId },

      node_created_on: new Date(),
    };

    const toSaveStateVersionId = await createNodeType(
      "_Indian_State_Union_Territory_Version_",
      graphQLClient,
      toSaveStateVersion
    );

    const toSaveState = {
      name_id,
      names: [{ name: state.State.text }],
      // state_or_union_territory: "State",
      state_or_union_territory: "Union_Territory",

      established_on: { id: dateTimeId },

      wikidata_qid: keyedByStatesData[name_id].wikidata_qid,
      wikipedia_page: keyedByStatesData[name_id].wikipedia_page,

      vehicle_code: state.vehicle_code.text,
      iso_code: state.iso_code.text,

      versions: [{ id: toSaveStateVersionId }],
      regions: [{ id: toSaveStateVersionRegionId }],
      active_version: { id: toSaveStateVersionId },

      node_created_on: new Date(),
    };

    const toSaveStateId = await createNodeType("_Indian_State_Union_Territory_", graphQLClient, toSaveState);

    console.log({ geoSourceId, geoId, dateTimeId, toSaveStateId, toSaveStateVersionRegionId, toSaveStateVersionId });
  }

  // version
  //   name_id: String! @id @search(by: [exact, term, fulltext])
  //   official_name: _Name_
  //   change: _Indian_Division_Version_Change_ @search
  //   established_on: _Date_Time_
  //   disestablished_on: _Date_Time_
  //   node_created_on: DateTime
  //
  //   self: _Indian_State_Union_Territory_ @hasInverse(field: "versions")
  //   region: _Indian_State_Union_Territory_Version_Region_ @hasInverse(field: "version")
  //   reorganisation: _Indian_State_Union_Territory_Reorganisation_ @hasInverse(field: "state_or_union_territory_versions")

  // region
  //   name_id: String! @id @search(by: [exact, term, fulltext])
  //   osm_id: String @search(by: [hash])
  //   geo_boundary: [_Geo_] @hasInverse(field: "indian_states_union_territory_boundary")
  //   established_on: _Date_Time_
  //   disestablished_on: _Date_Time_
  //   node_created_on: DateTime
  //   node_updates: [_Node_Update_]
  //
  //   self: _Indian_State_Union_Territory_ @hasInverse(field: "regions")
  //   version: _Indian_State_Union_Territory_Version_ @hasInverse(field: "region")
  //   states_union_territories: [_Indian_State_Union_Territory_Version_Region_]
  //     @hasInverse(field: "states_union_territories")
  //   districts: [_Indian_District_Version_Region_] @hasInverse(field: "states_union_territories")
  //   sub_districts: [_Indian_Sub_District_Version_Region_] @hasInverse(field: "states_union_territories")
  //   loksabha_constituencies: [_Indian_Loksabha_Constituency_Version_Region_]
  //     @hasInverse(field: "states_union_territories")
  //   vidhansabha_constituencies: [_Indian_Vidhansabha_Constituency_Version_Region_]
  //     @hasInverse(field: "states_union_territories")

  //   console.log(JSON.stringify(toSaveStatesUts, null, 2));

  // const saveToKG = true;

  // const districtsLastStep = await districtsPipeline(stateUT, Object.values(d), saveToKG);

  return;
})();
