import { createRegionName } from "./region-names.create";
import { getRegionName } from "./region-names.read";

export function generateNameId(prefix: string, name: string) {
  let smallerName = name.split(",").join("").split("and").join("").split("&").join("");
  let nameIdSuffix = smallerName.split(" ").join("-").toLowerCase();

  return `${prefix}${nameIdSuffix}`;
}

export async function saveRegionNames(graphQLClient: any, names: { name: string; language: string }[]) {
  const regionNameIds: any = [];

  for (let i = 0; i < names.length; i++) {
    const name: any = names[i];
    try {
      const savedName = await getRegionName(graphQLClient, name.name);

      if (!savedName) {
        const regionToSave: any = {};
        if (name.language === "english") {
          regionToSave.language_script = { name_en: "english_latin" };
        }
        if (name.language === "hindi") {
          regionToSave.language_script = { name_en: "hindi_devanagari" };
        }
        regionToSave.name = name.name;

        const nameId = await createRegionName(graphQLClient, regionToSave);
      }
      // console.log(`Created RegionName with ID: ${nameId}`);

      regionNameIds.push({ name: name.name });
    } catch (e) {
      console.error(`Error saving region name ${name.name}:`, e);
    }
  }

  return regionNameIds;
}
