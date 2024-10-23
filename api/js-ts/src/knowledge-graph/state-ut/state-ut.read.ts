import { getAdministrativeEntityRegionTypeUniqueOrIdFieldsByRegionId } from '../generic/generic.read';

export const getUnionTerritoryByRegionId = async (regionId: string) => {
  const data = await getAdministrativeEntityRegionTypeUniqueOrIdFieldsByRegionId('Union_Territory', regionId);
  return data;
};

export const getStateByRegionId = async (regionId: string) => {
  const data = await getAdministrativeEntityRegionTypeUniqueOrIdFieldsByRegionId('State', regionId);
  return data;
};
