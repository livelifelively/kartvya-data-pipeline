import { domains } from "../public-policy-domain/domains-list";
import { addPublicPolicyDomain } from "../public-policy-domain/create";
import { createName } from "../name/name.create";
import { createGraphQLClient } from "../generic/generic.utils";

(async () => {
  const graphQLClient = await createGraphQLClient();
  for (let d of domains) {
    let name = { name: d.name, language_script: { name_en: "english_latin" }, node_created_on: new Date() };
    let nameId = await createName(graphQLClient, name);

    await addPublicPolicyDomain(graphQLClient, {
      names: [{ id: nameId }],
      name_id: d.name_id,
      description: d.description,
      node_created_on: new Date(),
    });
  }
})();
