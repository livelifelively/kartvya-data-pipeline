import path from "path";
import { promises as fs } from "fs";

export async function cleanDirectories(state_name_id: string) {
  const stateDir = path.join(__dirname, state_name_id.split("in-sut-")[1]);

  const scriptsPath = path.join(stateDir, "scripts");
  const lsPipelineLogsPath = path.join(stateDir, "loksabha-constituency-pipeline-logs");
  const vsPipelineLogsPath = path.join(stateDir, "vidhansabha-constituency-pipeline-logs");
  const districtsPipelineLogsPath = path.join(stateDir, "district-pipeline-logs");

  // needs to uncomment import { promises as fs } from "fs";
  await fs.rm(scriptsPath, { recursive: true, force: true });
  await fs.rm(lsPipelineLogsPath, { recursive: true, force: true });
  await fs.rm(vsPipelineLogsPath, { recursive: true, force: true });
  await fs.rm(districtsPipelineLogsPath, { recursive: true, force: true });
}
