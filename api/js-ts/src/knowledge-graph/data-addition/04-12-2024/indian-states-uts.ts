import { _Indian_State_Union_Territory_ } from "../../../generated/graphql";
import { states, uts } from "../../../admin-regions/states-data/basic-states-data";
import { update_Name_Change_Name_Case, upsert_Name_ } from "../../name/name.update";
import { createNodeType } from "../../generic/generic.create";
import { createGraphQLClient } from "../../generic/generic.utils";

(async () => {
  const graphQLClient = await createGraphQLClient();

  let toSaveStatesUts: any = states.map((state) => {
    return {
      names: [{ name: state.State.text }],
      established_on: new Date(state.Statehood.text),
      name_id: `in-sut-${state.State.text.toLowerCase().split(" ").join("-").split(",").join("")}`,
      node_created_on: new Date(),
      state_or_union_territory: "State",
    };
  });

  toSaveStatesUts = toSaveStatesUts.concat(
    uts.map((ut) => {
      return {
        names: [{ name: ut.State.text }],
        established_on: new Date(ut.Established.text),
        name_id: `in-sut-${ut.State.text.toLowerCase().split(" ").join("-").split(",").join("")}`,
        node_created_on: new Date(),
        state_or_union_territory: "Union_Territory",
      };
    })
  );

  //   console.log(JSON.stringify(toSaveStatesUts, null, 2));
  //   console.log(toSaveStatesUts.length);
  let createdSUTNodes: any = [];
  for (let sut of toSaveStatesUts) {
    // save name
    let toSaveName = sut.names[0].name;
    const nameId = await upsert_Name_(toSaveName);

    const sutId = await createNodeType("_Indian_State_Union_Territory_", graphQLClient, {
      ...sut,
    });

    createdSUTNodes.push({ sutId, sut });
    console.log(sutId);
  }

  console.log(JSON.stringify(createdSUTNodes, null, 2));
})();
