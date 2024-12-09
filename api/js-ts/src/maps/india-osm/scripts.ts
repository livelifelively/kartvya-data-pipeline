import { statesUtsRelations } from "./states.osm-relation-ids";
import { fetchByRelationId } from "./states.fetch-geojsons";

import fs from "fs";
import path from "path";

async function getStatesUtsForIndia() {
  const statesUtsRelationIds: any = {};

  // fetch all states and uts
  for (let r of statesUtsRelations) {
    const stateUtData = await fetchByRelationId(r.id);
    const name = stateUtData.names.name;

    statesUtsRelationIds[name] = stateUtData.osm_id;

    const newDir = path.join(__dirname, "states-uts", name);
    fs.mkdirSync(newDir, { recursive: true });

    const filePath = path.join(newDir, `sut.json`);

    fs.writeFileSync(filePath, JSON.stringify(stateUtData, null, 2), "utf8");
  }

  JSON.stringify(statesUtsRelationIds);
}

async function getDirectories(dirPath: string) {
  try {
    const entries = await fs.readdirSync(dirPath, { withFileTypes: true });
    const directories = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
    return directories;
  } catch (err) {
    console.error("Error reading directory:", err);
    return [];
  }
}

(async () => {
  const targetPath = path.join(__dirname, "states-uts");
  const directories = await getDirectories(targetPath);

  for (let d of directories) {
    const filePath = path.join(__dirname, "states-uts", d, `sut.json`);

    try {
      const data: any = await fs.readFileSync(filePath, "utf8");
      let dataParsed: any = JSON.parse(data);
      console.log(dataParsed.osm_id);
      // console.log(`Contents of ${filePath}:`, data);
    } catch (err: any) {
      console.error(`Error reading file ${filePath}:`, err.message);
    }
  }
})();
