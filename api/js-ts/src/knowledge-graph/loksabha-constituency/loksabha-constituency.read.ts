import { getAdministrativeEntityRegionTypeUniqueOrIdFieldsByRegionId } from '../generic/generic.read';

export const getLoksabhaConstituenciesByRegionId = async (regionId: string) => {
  const data = await getAdministrativeEntityRegionTypeUniqueOrIdFieldsByRegionId('Loksabha_Constituency', regionId);
  return data;
};
