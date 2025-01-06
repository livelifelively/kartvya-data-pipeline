import { createNodeType, updateNodeType } from "../../knowledge-graph/generic/generic.create";
import { createGraphQLClient } from "../../knowledge-graph/generic/generic.utils";
import { createName } from "../../knowledge-graph/name/name.create";
import { upsert_Name_ } from "../../knowledge-graph/name/name.update";
import { upsertName } from "../../types-functions/name.crud";
import { convertDatetime } from "../date-time";

async function addDistrictReorganisation() {
  const graphQLClient = await createGraphQLClient();

  let districtReorganisation = {
    names: ["andhra pradesh districts formation 2023"],
    state_or_union_territory: { name_id: "in-sut-andhra-pradesh-region" },
    reorganised_on: convertDatetime({
      dateTime: "4 April 2022",
      precision: "day",
      timezone: "+05:30",
      timezone_independent: true,
    }),
    districts: [
      {
        id: "0x9be96045c3",
      },
      {
        id: "0x9be96045c8",
      },
      {
        id: "0x9be96045cc",
      },
      {
        id: "0x9be96045d0",
      },
      {
        id: "0x9be96045d4",
      },
      {
        id: "0x9be96045d8",
      },
      {
        id: "0x9be96045dc",
      },
      {
        id: "0x9be96045e0",
      },
      {
        id: "0x9be96045e5",
      },
      {
        id: "0x9be96045e9",
      },
      {
        id: "0x9be96045ed",
      },
      {
        id: "0x9be96045f1",
      },
      {
        id: "0x9be96045f5",
      },
      {
        id: "0x9be96045f9",
      },
      {
        id: "0x9be96045fd",
      },
      {
        id: "0x9be9604601",
      },
      {
        id: "0x9be9604605",
      },
      {
        id: "0x9be9604609",
      },
      {
        id: "0x9be960460d",
      },
      {
        id: "0x9be9604611",
      },
      {
        id: "0x9be9604616",
      },
      {
        id: "0x9be960461a",
      },
      {
        id: "0x9be960461e",
      },
      {
        id: "0x9be9604622",
      },
      {
        id: "0x9be9604626",
      },
      {
        id: "0x9be960462a",
      },
    ],
    district_versions: [
      {
        id: "0x9be96045c2",
      },
      {
        id: "0x9be96045c7",
      },
      {
        id: "0x9be96045cb",
      },
      {
        id: "0x9be96045cf",
      },
      {
        id: "0x9be96045d3",
      },
      {
        id: "0x9be96045d7",
      },
      {
        id: "0x9be96045db",
      },
      {
        id: "0x9be96045df",
      },
      {
        id: "0x9be96045e4",
      },
      {
        id: "0x9be96045e8",
      },
      {
        id: "0x9be96045ec",
      },
      {
        id: "0x9be96045f0",
      },
      {
        id: "0x9be96045f4",
      },
      {
        id: "0x9be96045f8",
      },
      {
        id: "0x9be96045fc",
      },
      {
        id: "0x9be9604600",
      },
      {
        id: "0x9be9604604",
      },
      {
        id: "0x9be9604608",
      },
      {
        id: "0x9be960460c",
      },
      {
        id: "0x9be9604610",
      },
      {
        id: "0x9be9604615",
      },
      {
        id: "0x9be9604619",
      },
      {
        id: "0x9be960461d",
      },
      {
        id: "0x9be9604621",
      },
      {
        id: "0x9be9604625",
      },
      {
        id: "0x9be9604629",
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
  //   console.log(districtReorganisationId);
}

(async () => {
  //   await addDistrictReorganisation();
  //   let districts = [
  //     {
  //       filter: {
  //         name_id: {
  //           eq: "in-d-ap-srikakulam",
  //         },
  //       },
  //       set: {
  //         versions: [
  //           {
  //             name_id: "in-d-ap-srikakulam-version-1",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       filter: {
  //         name_id: {
  //           eq: "in-d-ap-parvathipuram-manyam",
  //         },
  //       },
  //       set: {
  //         versions: [
  //           {
  //             name_id: "in-d-ap-parvathipuram-manyam-version-1",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       filter: {
  //         name_id: {
  //           eq: "in-d-ap-vizianagaram",
  //         },
  //       },
  //       set: {
  //         versions: [
  //           {
  //             name_id: "in-d-ap-vizianagaram-version-1",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       filter: {
  //         name_id: {
  //           eq: "in-d-ap-visakhapatnam",
  //         },
  //       },
  //       set: {
  //         versions: [
  //           {
  //             name_id: "in-d-ap-visakhapatnam-version-1",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       filter: {
  //         name_id: {
  //           eq: "in-d-ap-anakapalli",
  //         },
  //       },
  //       set: {
  //         versions: [
  //           {
  //             name_id: "in-d-ap-anakapalli-version-1",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       filter: {
  //         name_id: {
  //           eq: "in-d-ap-alluri-sitharama-raju",
  //         },
  //       },
  //       set: {
  //         versions: [
  //           {
  //             name_id: "in-d-ap-alluri-sitharama-raju-version-1",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       filter: {
  //         name_id: {
  //           eq: "in-d-ap-kakinada",
  //         },
  //       },
  //       set: {
  //         versions: [
  //           {
  //             name_id: "in-d-ap-kakinada-version-1",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       filter: {
  //         name_id: {
  //           eq: "in-d-ap-east-godavari",
  //         },
  //       },
  //       set: {
  //         versions: [
  //           {
  //             name_id: "in-d-ap-east-godavari-version-1",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       filter: {
  //         name_id: {
  //           eq: "in-d-ap-konaseema",
  //         },
  //       },
  //       set: {
  //         versions: [
  //           {
  //             name_id: "in-d-ap-konaseema-version-1",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       filter: {
  //         name_id: {
  //           eq: "in-d-ap-eluru",
  //         },
  //       },
  //       set: {
  //         versions: [
  //           {
  //             name_id: "in-d-ap-eluru-version-1",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       filter: {
  //         name_id: {
  //           eq: "in-d-ap-west-godavari",
  //         },
  //       },
  //       set: {
  //         versions: [
  //           {
  //             name_id: "in-d-ap-west-godavari-version-1",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       filter: {
  //         name_id: {
  //           eq: "in-d-ap-ntr",
  //         },
  //       },
  //       set: {
  //         versions: [
  //           {
  //             name_id: "in-d-ap-ntr-version-1",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       filter: {
  //         name_id: {
  //           eq: "in-d-ap-krishna",
  //         },
  //       },
  //       set: {
  //         versions: [
  //           {
  //             name_id: "in-d-ap-krishna-version-1",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       filter: {
  //         name_id: {
  //           eq: "in-d-ap-guntur",
  //         },
  //       },
  //       set: {
  //         versions: [
  //           {
  //             name_id: "in-d-ap-guntur-version-1",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       filter: {
  //         name_id: {
  //           eq: "in-d-ap-palnadu",
  //         },
  //       },
  //       set: {
  //         versions: [
  //           {
  //             name_id: "in-d-ap-palnadu-version-1",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       filter: {
  //         name_id: {
  //           eq: "in-d-ap-bapatla",
  //         },
  //       },
  //       set: {
  //         versions: [
  //           {
  //             name_id: "in-d-ap-bapatla-version-1",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       filter: {
  //         name_id: {
  //           eq: "in-d-ap-prakasam",
  //         },
  //       },
  //       set: {
  //         versions: [
  //           {
  //             name_id: "in-d-ap-prakasam-version-1",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       filter: {
  //         name_id: {
  //           eq: "in-d-ap-sri-potti-sriramulu-nellore",
  //         },
  //       },
  //       set: {
  //         versions: [
  //           {
  //             name_id: "in-d-ap-sri-potti-sriramulu-nellore-version-1",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       filter: {
  //         name_id: {
  //           eq: "in-d-ap-kurnool",
  //         },
  //       },
  //       set: {
  //         versions: [
  //           {
  //             name_id: "in-d-ap-kurnool-version-1",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       filter: {
  //         name_id: {
  //           eq: "in-d-ap-nandyal",
  //         },
  //       },
  //       set: {
  //         versions: [
  //           {
  //             name_id: "in-d-ap-nandyal-version-1",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       filter: {
  //         name_id: {
  //           eq: "in-d-ap-y.s.r.",
  //         },
  //       },
  //       set: {
  //         versions: [
  //           {
  //             name_id: "in-d-ap-y.s.r.-version-1",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       filter: {
  //         name_id: {
  //           eq: "in-d-ap-anantpur",
  //         },
  //       },
  //       set: {
  //         versions: [
  //           {
  //             name_id: "in-d-ap-anantpur-version-1",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       filter: {
  //         name_id: {
  //           eq: "in-d-ap-sri-sathya-sai",
  //         },
  //       },
  //       set: {
  //         versions: [
  //           {
  //             name_id: "in-d-ap-sri-sathya-sai-version-1",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       filter: {
  //         name_id: {
  //           eq: "in-d-ap-annamayya",
  //         },
  //       },
  //       set: {
  //         versions: [
  //           {
  //             name_id: "in-d-ap-annamayya-version-1",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       filter: {
  //         name_id: {
  //           eq: "in-d-ap-tirupati",
  //         },
  //       },
  //       set: {
  //         versions: [
  //           {
  //             name_id: "in-d-ap-tirupati-version-1",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       filter: {
  //         name_id: {
  //           eq: "in-d-ap-chittoor",
  //         },
  //       },
  //       set: {
  //         versions: [
  //           {
  //             name_id: "in-d-ap-chittoor-version-1",
  //           },
  //         ],
  //       },
  //     },
  //   ];
  //   const graphQLClient = await createGraphQLClient();
  //   for (let d of districts) {
  //     // console.log(d);
  //     const id = await updateNodeType("_Indian_District_", graphQLClient, d);
  //     console.log(id);
  //   }
})();
