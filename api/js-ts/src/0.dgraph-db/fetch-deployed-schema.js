require("dotenv").config();

const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

const { format } = require("date-fns");

// Retrieve environment variables
const DEPLOYMENT_URL = process.env.DGRAPH_DEPLOYMENT_URL; // Dgraph deployment URL
const DEPLOYMENT_JWT = process.env.DGRAPH_DEPLOYMENT_JWT; // Dgraph JWT token

if (!DEPLOYMENT_URL || !DEPLOYMENT_JWT) {
  console.error("Error: DGRAPH_DEPLOYMENT_URL and DGRAPH_DEPLOYMENT_JWT environment variables must be set.");
  process.exit(1);
}

async function fetchSchema() {
  console.log("INITIATED: Fetching Deployed D-Graph Schema...");
  const response = await fetch(DEPLOYMENT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": DEPLOYMENT_JWT, // Include the JWT token for authentication
    },
    body: JSON.stringify({
      query: `{
        getGQLSchema {
          schema
          generatedSchema
        }
      }`,
      variables: {},
    }),
  });

  if (!response.ok) {
    throw new Error(`FAILURE: Failed to fetch schema: ${response.statusText}`);
  }

  console.log("SUCCESSFUL: Fetching Deployed D-Graph Schema successful");

  const { data } = await response.json();
  return data.getGQLSchema.generatedSchema; // Extract the schema from the response
}

fetchSchema()
  .then((schema) => {
    const today = new Date();
    const formattedDate = format(today, "yyyy-MM-dd");
    const forRecord = `${formattedDate}.deployed-dgraph-schema.graphql`;
    const forScript = `deployed-dgraph-schema.graphql`;

    const outputFilePathForRecord = path.join(__dirname, "deployed-schema", forRecord);
    const outputFilePathForScript = path.join(__dirname, "deployed-schema", forScript);

    fs.writeFileSync(outputFilePathForRecord, schema, "utf8");
    fs.writeFileSync(outputFilePathForScript, schema, "utf8");

    console.log(`SUCCESSFUL: Schema fetched and written to ${outputFilePathForRecord} & ${outputFilePathForScript}`);
  })
  .catch((error) => {
    console.error("Error fetching schema:", error);
  });
