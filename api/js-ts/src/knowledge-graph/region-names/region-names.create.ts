import { getAdministrativeEntityRegionTypeUniqueOrIdFieldsByRegionId } from '../generic/generic.read';
import { evaluateVariablesForRegionType } from '../generic/generic.utils';
import { AdministrativeEntityCategoryType } from '../generic/types';

export async function createRegionName(graphQLClient: any, nameData: any) {
  const mutation = `
      mutation CreateRegionName($input: AddRegionNameInput!) {
        addRegionName(input: [$input]) {
          regionName {
            id
          }
        }
      }
    `;

  const variables = {
    input: nameData,
  };

  const response = await graphQLClient.request(mutation, variables);
  return response.addRegionName.regionName[0].id;
}

export async function generateAvailableRegionID(
  stateUTVehicleCode: string,
  regionName: string,
  regionType: AdministrativeEntityCategoryType,
  regionId = '',
  iteration = 1
) {
  let region_id =
    regionId.length > 0 ? regionId : generateRegionIdForRegionType(stateUTVehicleCode, regionName, regionType);

  const savedRegionData = await getAdministrativeEntityRegionTypeUniqueOrIdFieldsByRegionId(regionType, region_id);
  let savedRegionId;

  if (savedRegionData.length) {
    const { region_id } = savedRegionData[0];
    savedRegionId = region_id;
  }

  if (savedRegionId) {
    let trialRegionId = region_id + '-' + iteration;
    region_id = await generateAvailableRegionID(
      stateUTVehicleCode,
      regionName,
      regionType,
      trialRegionId,
      iteration + 1
    );
  }

  return region_id;
}

function generateRegionIdForRegionType(
  stateUTVehicleCode: string,
  regionName: string,
  regionType: AdministrativeEntityCategoryType
) {
  const { nodeType, regionNamePrefix, toFetch } = evaluateVariablesForRegionType(regionType);

  let regionId = `${regionNamePrefix}-`;

  if (!['State', 'Union_Territory'].includes(regionType)) {
    regionId += stateUTVehicleCode.toLowerCase();
  }

  regionId += `-${regionName.toLowerCase().split(' ').join('-')}`;

  return regionId;
}
