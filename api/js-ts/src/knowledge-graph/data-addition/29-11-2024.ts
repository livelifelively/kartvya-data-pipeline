let governmentSystemData = {
  name_id: "india-government",
  active_government_system_official: {
    name_id: "india-government-system-2024",
    description: "",
    active_official_system_type_of: {
      name_id: "india-government",
    },
    authority_status_type: [
      {
        name_id: "sovereign",
      },
      {
        name_id: "stable",
      },
    ],
    authority_source_type: [
      {
        name_id: "people",
      },
    ],
    authority_concentration_type: [
      {
        name_id: "democracy",
      },
    ],
    authority_distribution_type: {
      name_id: "strong_center_federation",
    },
    monarchy_type: null,
    autocratic_type: null,
    oligarchy_type: null,
    democracy_type: [
      {
        name_id: "representative_democracy",
      },
      {
        name_id: "liberal_democracy",
      },
    ],
    partisan_system_type: {
      name_id: "multi_party_system",
    },
    head_of_state_or_government_system_type: {
      name_id: "parliamentary",
    },
    religious_ideology_type: {
      name_id: "secular_state",
    },
    economic_system_type: [
      {
        name_id: "capitalism",
      },
      {
        name_id: "socialism",
      },
    ],
    node_created_on: null,
    established: null,
    disestablished: null,
  },
};

import { createGraphQLClient } from "../generic/generic.utils";
import { createGovernmentSystemType } from "../government-system/government-system-type.create";

(async () => {
  const graphQLClient = await createGraphQLClient();

  await createGovernmentSystemType(graphQLClient, governmentSystemData.active_government_system_official);
})();
