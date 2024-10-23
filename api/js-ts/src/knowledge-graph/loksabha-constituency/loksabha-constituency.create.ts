import { createAdministrativeEntity } from '../administrative-entity/administrative-entity.create';
import { generateAvailableRegionID } from '../region-names/region-names.create';
import { getStateOrUTAdministrativeEntitiesByRegionName } from '../region-names/region-names.read';
import { saveRegionNames } from '../region-names/region-names.utils';
import { getLoksabhaConstituenciesByRegionId } from './loksabha-constituency.read';
import { ILoksabhaConstituencyInput } from './types';

export const createNewLoksabhaConstituency = async (
  graphQLClient: any,
  loksabhaConstituency: ILoksabhaConstituencyInput
) => {
  const stateInDgraph = await getStateOrUTAdministrativeEntitiesByRegionName(
    graphQLClient,
    loksabhaConstituency.stateOrUTName,
    loksabhaConstituency.stateOrUTCategory
  );

  let { name_of: stateUTAdminUnit } = stateInDgraph;
  stateUTAdminUnit = stateUTAdminUnit[0];
  const { category } = stateUTAdminUnit;
  const { region_id: stateUTRegionId, nation, zonal_council } = stateUTAdminUnit[`${category.toLowerCase()}_region`];
  const { vehicle_code: stateUTVehicleCode } = stateUTAdminUnit[`${category.toLowerCase()}_legal`];

  try {
    const names = [
      {
        language: 'english',
        name: loksabhaConstituency.name_english,
      },
      ...loksabhaConstituency.other_names,
    ];

    let region_id = await generateAvailableRegionID(
      stateUTVehicleCode,
      loksabhaConstituency.name_english,
      'Loksabha_Constituency'
    );

    // create region names
    const regionNameIds = await saveRegionNames(graphQLClient, names);
    // console.log(`Created RegionName with IDs: ${JSON.stringify(regionNameIds)}`);

    const regionData = {
      category: 'Loksabha_Constituency',
      // established_on: new Date(loksabhaConstituency.established_on),
      names: regionNameIds,

      wikidata_qid: loksabhaConstituency.wikidata_qid,
      wikipedia_page: loksabhaConstituency.wikipedia_page,

      established_on: loksabhaConstituency.established_on,
      dissolved_on: loksabhaConstituency.dissolved_on,
    };

    if (loksabhaConstituency.established_on) {
      regionData.established_on = new Date(loksabhaConstituency.established_on);
    }

    const regionId = await createAdministrativeEntity(graphQLClient, regionData);

    const loksabhaConstituencyRegionData: any = {
      administrative_entity: { id: regionId },
      region_id,

      established_on: loksabhaConstituency.established_on,
      dissolved_on: loksabhaConstituency.dissolved_on,

      nation,
      zonal_council,
    };

    loksabhaConstituencyRegionData[loksabhaConstituency.stateOrUTCategory.toLowerCase()] = [
      { region_id: stateUTRegionId },
    ];

    const loksabhaConstituencyRegionId = await createLoksabhaConstituencyRegion(
      graphQLClient,
      loksabhaConstituencyRegionData
    );

    const loksabhaConstituencyLegalData = {
      administrative_entity: { id: regionId },
      region: { id: loksabhaConstituencyRegionId },

      established_on: loksabhaConstituency.established_on,
      dissolved_on: loksabhaConstituency.dissolved_on,
    };

    const loksabhaConstituencyLegalId = await createLoksabhaConstituencyLegal(
      graphQLClient,
      loksabhaConstituencyLegalData
    );

    const savedSuccessfully = {
      type: 'LoksabhaConstituency',
      name: loksabhaConstituency.name_english,
      AdministrativeEntity: regionId,
      region: loksabhaConstituencyRegionId,
      legal: loksabhaConstituencyLegalId,
      regionNames: regionNameIds,
    };

    // console.log(`Created Loksabha Constituency ${loksabhaConstituency.name_english}`);
    console.log(JSON.stringify(savedSuccessfully));
  } catch (e) {
    console.log(e);
  }
};

async function generateAvailableLoksabhaRegionRegionID(
  stateUTVehicleCode: string,
  loksabhaConstituencyName: string,
  regionId = '',
  iteration = 1
) {
  let region_id =
    regionId.length > 0
      ? regionId
      : `in-lc-${stateUTVehicleCode.toLowerCase()}-${loksabhaConstituencyName.toLowerCase().split(' ').join('-')}`;

  const savedRegionId = await getLoksabhaConstituenciesByRegionId(region_id);

  if (savedRegionId) {
    let trialRegionId = region_id + '-' + iteration;
    region_id = await generateAvailableLoksabhaRegionRegionID(
      stateUTVehicleCode,
      loksabhaConstituencyName,
      trialRegionId,
      iteration + 1
    );
  }

  return region_id;
}

export async function createLoksabhaConstituencyRegion(graphQLClient: any, loksabhaConstituencyRegionData: any) {
  const mutation = `
    mutation CreateLoksabhaConstituencyRegion($input: AddLoksabhaConstituencyRegionInput!) {
      addLoksabhaConstituencyRegion(input: [$input]) {
        loksabhaConstituencyRegion {
          id
        }
      }
    }
  `;

  const variables = {
    input: loksabhaConstituencyRegionData,
  };

  const response = await graphQLClient.request(mutation, variables);
  return response.addLoksabhaConstituencyRegion.loksabhaConstituencyRegion[0].id;
}

async function createLoksabhaConstituencyLegal(graphQLClient: any, loksabhaConstituencyLegalData: any) {
  const mutation = `
    mutation CreateLoksabhaConstituencyLegal($input: AddLoksabhaConstituencyLegalInput!) {
      addLoksabhaConstituencyLegal(input: [$input]) {
        loksabhaConstituencyLegal {
          id
        }
      }
    }
  `;

  const variables = {
    input: loksabhaConstituencyLegalData,
  };

  const response = await graphQLClient.request(mutation, variables);
  return response.addLoksabhaConstituencyLegal.loksabhaConstituencyLegal[0].id;
}
