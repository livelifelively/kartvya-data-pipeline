import { createNodeType, updateNodeType } from "../../knowledge-graph/generic/generic.create";
import { createGraphQLClient } from "../../knowledge-graph/generic/generic.utils";
import { createName } from "../../knowledge-graph/name/name.create";
import { upsert_Name_ } from "../../knowledge-graph/name/name.update";
import { upsertName } from "../../types-functions/name.crud";
import { convertDatetime } from "../date-time";

async function addDistrictReorganisation() {
  const graphQLClient = await createGraphQLClient();

  let districtReorganisation = {
    names: ["andaman and nicobar islands districts formation 2006"],
    state_or_union_territory: { name_id: "in-sut-andaman-nicobar-islands-region" },
    reorganised_on: convertDatetime({
      dateTime: "August 18, 2006",
      precision: "day",
      timezone: "+05:30",
      timezone_independent: true,
    }),
    districts: [
      {
        id: "0x9be9604642",
      },
      {
        id: "0x9be9604646",
      },
      {
        id: "0x9be960464a",
      },
    ],
    district_versions: [
      {
        id: "0x9be9604641",
      },
      {
        id: "0x9be9604645",
      },
      {
        id: "0x9be9604649",
      },
    ],
  };

  let nameIds: any = [];
  for (let n of districtReorganisation.names) {
    const nameId = await upsert_Name_(n);
    nameIds.push({ id: nameId });
  }

  const dateTimeId = await createNodeType("_Date_Time_", graphQLClient, districtReorganisation.reorganised_on);

  let toSaveDistrictReorganisation = {
    names: nameIds,
    state_or_union_territory: districtReorganisation.state_or_union_territory,
    districts: districtReorganisation.districts,
    district_versions: districtReorganisation.district_versions,

    reorganised_on: { id: dateTimeId },
  };

  const districtReorganisationId = await createNodeType(
    "_Indian_District_Reorganisation_",
    graphQLClient,
    toSaveDistrictReorganisation
  );
  console.log(districtReorganisationId);
}

(async () => {
  // await addDistrictReorganisation();
})();
