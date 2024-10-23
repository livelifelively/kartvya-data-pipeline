type NodeField = {
  name: string;
  fields: string; // Reference to another type by name
};

const LANGUAGE__NODES = [{ name: 'scripts', fields: 'SCRIPT' }];

const SCRIPT__NODES = [{ name: 'languages', fields: 'LANGUAGE' }];

const LANGUAGE_SCRIPT__NODES = [
  { name: 'language', fields: 'LANGUAGE' },
  { name: 'script', fields: 'SCRIPT' },
];

const REGION_NAME__NODES = [{ name: 'name_of', fields: 'ADMINISTRATIVE_ENTITY' }];

const ADMINISTRATIVE_ENTITY__NODES = [
  { name: 'names', fields: 'REGION_NAME' },
  { name: 'new_administrative_entity', fields: 'ADMINISTRATIVE_ENTITY' },
  { name: 'previous_administrative_entity', fields: 'ADMINISTRATIVE_ENTITY' },
  { name: 'nation_region', fields: 'NATION_REGION' },
  { name: 'nation_legal', fields: 'NATION_LEGAL' },
  { name: 'zone_council_region', fields: 'ZONAL_COUNCIL_REGION' },
  { name: 'zone_council_legal', fields: 'ZONAL_COUNCIL_LEGAL' },
  { name: 'union_territory_region', fields: 'UNION_TERRITORY_REGION' },
  { name: 'union_territory_legal', fields: 'UNION_TERRITORY_LEGAL' },
  { name: 'state_region', fields: 'STATE_REGION' },
  { name: 'state_legal', fields: 'STATE_LEGAL' },
  { name: 'district_region', fields: 'DISTRICT_REGION' },
  { name: 'district_legal', fields: 'DISTRICT_LEGAL' },
  { name: 'city_region', fields: 'CITY_REGION' },
  { name: 'city_legal', fields: 'CITY_LEGAL' },
  { name: 'loksabha_constituency_region', fields: 'LOKSABHA_CONSTITUENCY_REGION' },
  { name: 'loksabha_constituency_legal', fields: 'LOKSABHA_CONSTITUENCY_LEGAL' },
  { name: 'vidhansabha_constituency_region', fields: 'VIDHANSABHA_CONSTITUENCY_REGION' },
  { name: 'vidhansabha_constituency_legal', fields: 'VIDHANSABHA_CONSTITUENCY_LEGAL' },
];

const NATION_REGION__NODES = [
  { name: 'administrative_entity', fields: 'ADMINISTRATIVE_ENTITY' },
  { name: 'legal', fields: 'NATION_LEGAL' },
  { name: 'capital', fields: 'NATIONAL_CAPITAL_CITY' },
  { name: 'zonal_council', fields: 'ZONAL_COUNCIL_REGION' },
  { name: 'state', fields: 'STATE_REGION' },
  { name: 'union_territory', fields: 'UNION_TERRITORY_REGION' },
  { name: 'city', fields: 'CITY_REGION' },
  { name: 'district', fields: 'DISTRICT_REGION' },
  { name: 'loksabha_constituency', fields: 'LOKSABHA_CONSTITUENCY_REGION' },
  { name: 'vidhansabha_constituency', fields: 'VIDHANSABHA_CONSTITUENCY_REGION' },
];

const NATION_LEGAL__NODES = [
  { name: 'administrative_entity', fields: 'ADMINISTRATIVE_ENTITY' },
  { name: 'region', fields: 'NATION_REGION' },
];

const ZONAL_COUNCIL_REGION__NODES = [
  { name: 'administrative_entity', fields: 'ADMINISTRATIVE_ENTITY' },
  { name: 'legal', fields: 'ZONAL_COUNCIL_LEGAL' },
  { name: 'nation', fields: 'NATION_REGION' },
  { name: 'state', fields: 'STATE_REGION' },
  { name: 'union_territory', fields: 'UNION_TERRITORY_REGION' },
  { name: 'city', fields: 'CITY_REGION' },
  { name: 'district', fields: 'DISTRICT_REGION' },
  { name: 'loksabha_constituency', fields: 'LOKSABHA_CONSTITUENCY_REGION' },
  { name: 'vidhansabha_constituency', fields: 'VIDHANSABHA_CONSTITUENCY_REGION' },
];

const ZONAL_COUNCIL_LEGAL__NODES = [
  { name: 'administrative_entity', fields: 'ADMINISTRATIVE_ENTITY' },
  { name: 'region', fields: 'ZONAL_COUNCIL_REGION' },
];

const STATE_REGION__NODES = [
  { name: 'administrative_entity', fields: 'ADMINISTRATIVE_ENTITY' },
  { name: 'legal', fields: 'STATE_LEGAL' },
  { name: 'capital', fields: 'STATE_CAPITAL_CITY' },
  { name: 'nation', fields: 'NATION_REGION' },
  { name: 'zonal_council', fields: 'ZONAL_COUNCIL_REGION' },
  { name: 'city', fields: 'CITY_REGION' },
  { name: 'district', fields: 'DISTRICT_REGION' },
  { name: 'loksabha_constituency', fields: 'LOKSABHA_CONSTITUENCY_REGION' },
  { name: 'vidhansabha_constituency', fields: 'VIDHANSABHA_CONSTITUENCY_REGION' },
];

const STATE_LEGAL__NODES = [
  { name: 'administrative_entity', fields: 'ADMINISTRATIVE_ENTITY' },
  { name: 'region', fields: 'STATE_REGION' },
  { name: 'official_language', fields: 'LANGUAGE' },
  { name: 'additional_official_language', fields: 'LANGUAGE' },
];

const UNION_TERRITORY_REGION__NODES = [
  { name: 'administrative_entity', fields: 'ADMINISTRATIVE_ENTITY' },
  { name: 'legal', fields: 'UNION_TERRITORY_LEGAL' },
  { name: 'capital', fields: 'UNION_TERRITORY_CAPITAL_CITY' },
  { name: 'nation', fields: 'NATION_REGION' },
  { name: 'zonal_council', fields: 'ZONAL_COUNCIL_REGION' },
  { name: 'city', fields: 'CITY_REGION' },
  { name: 'district', fields: 'DISTRICT_REGION' },
  { name: 'loksabha_constituency', fields: 'LOKSABHA_CONSTITUENCY_REGION' },
  { name: 'vidhansabha_constituency', fields: 'VIDHANSABHA_CONSTITUENCY_REGION' },
];

const UNION_TERRITORY_LEGAL__NODES = [
  { name: 'administrative_entity', fields: 'ADMINISTRATIVE_ENTITY' },
  { name: 'region', fields: 'UNION_TERRITORY_REGION' },
  { name: 'official_language', fields: 'LANGUAGE' },
  { name: 'additional_official_language', fields: 'LANGUAGE' },
];

const DISTRICT_REGION__NODES = [
  { name: 'administrative_entity', fields: 'ADMINISTRATIVE_ENTITY' },
  { name: 'legal', fields: 'DISTRICT_LEGAL' },
  { name: 'nation', fields: 'NATION_REGION' },
  { name: 'zonal_council', fields: 'ZONAL_COUNCIL_REGION' },
  { name: 'state', fields: 'STATE_REGION' },
  { name: 'union_territory', fields: 'UNION_TERRITORY_REGION' },
  { name: 'city', fields: 'CITY_REGION' },
  { name: 'loksabha_constituency', fields: 'LOKSABHA_CONSTITUENCY_REGION' },
  { name: 'vidhansabha_constituency', fields: 'VIDHANSABHA_CONSTITUENCY_REGION' },
];

const DISTRICT_LEGAL__NODES = [
  { name: 'administrative_entity', fields: 'ADMINISTRATIVE_ENTITY' },
  { name: 'region', fields: 'DISTRICT_REGION' },
];

const CITY_REGION__NODES = [
  { name: 'administrative_entity', fields: 'ADMINISTRATIVE_ENTITY' },
  { name: 'legal', fields: 'CITY_LEGAL' },
  { name: 'national_capital', fields: 'NATIONAL_CAPITAL_CITY' },
  { name: 'state_capital', fields: 'STATE_CAPITAL_CITY' },
  { name: 'union_territory_capital', fields: 'UNION_TERRITORY_CAPITAL_CITY' },
  { name: 'nation', fields: 'NATION_REGION' },
  { name: 'zonal_council', fields: 'ZONAL_COUNCIL_REGION' },
  { name: 'state', fields: 'STATE_REGION' },
  { name: 'union_territory', fields: 'UNION_TERRITORY_REGION' },
  { name: 'district', fields: 'DISTRICT_REGION' },
  { name: 'loksabha_constituency', fields: 'LOKSABHA_CONSTITUENCY_REGION' },
  { name: 'vidhansabha_constituency', fields: 'VIDHANSABHA_CONSTITUENCY_REGION' },
];

const CITY_LEGAL__NODES = [
  { name: 'administrative_entity', fields: 'ADMINISTRATIVE_ENTITY' },
  { name: 'region', fields: 'CITY_REGION' },
];

const LOKSABHA_CONSTITUENCY_REGION__NODES = [
  { name: 'administrative_entity', fields: 'ADMINISTRATIVE_ENTITY' },
  { name: 'legal', fields: 'LOKSABHA_CONSTITUENCY_LEGAL' },
  { name: 'new_region', fields: 'LOKSABHA_CONSTITUENCY_REGION' },
  { name: 'nation', fields: 'NATION_REGION' },
  { name: 'zonal_council', fields: 'ZONAL_COUNCIL_REGION' },
  { name: 'state', fields: 'STATE_REGION' },
  { name: 'union_territory', fields: 'UNION_TERRITORY_REGION' },
  { name: 'city', fields: 'CITY_REGION' },
  { name: 'district', fields: 'DISTRICT_REGION' },
  { name: 'vidhansabha_constituency', fields: 'VIDHANSABHA_CONSTITUENCY_REGION' },
];

const LOKSABHA_CONSTITUENCY_LEGAL__NODES = [
  { name: 'administrative_entity', fields: 'ADMINISTRATIVE_ENTITY' },
  { name: 'region', fields: 'LOKSABHA_CONSTITUENCY_REGION' },
  { name: 'new_legal', fields: 'LOKSABHA_CONSTITUENCY_LEGAL' },
];

const VIDHANSABHA_CONSTITUENCY_REGION__NODES = [
  { name: 'administrative_entity', fields: 'ADMINISTRATIVE_ENTITY' },
  { name: 'legal', fields: 'VIDHANSABHA_CONSTITUENCY_LEGAL' },
  { name: 'nation', fields: 'NATION_REGION' },
  { name: 'zonal_council', fields: 'ZONAL_COUNCIL_REGION' },
  { name: 'state', fields: 'STATE_REGION' },
  { name: 'union_territory', fields: 'UNION_TERRITORY_REGION' },
  { name: 'city', fields: 'CITY_REGION' },
  { name: 'district', fields: 'DISTRICT_REGION' },
  { name: 'loksabha_constituency', fields: 'LOKSABHA_CONSTITUENCY_REGION' },
];

const VIDHANSABHA_CONSTITUENCY_LEGAL__NODES = [
  { name: 'administrative_entity', fields: 'ADMINISTRATIVE_ENTITY' },
  { name: 'region', fields: 'VIDHANSABHA_CONSTITUENCY_REGION' },
];

const NATIONAL_CAPITAL_CITY__NODES = [
  { name: 'city', fields: 'CITY_REGION' },
  { name: 'capital_of', fields: 'NATION_REGION' },
];

const UNION_TERRITORY_CAPITAL_CITY__NODES = [
  { name: 'city', fields: 'CITY_REGION' },
  { name: 'capital_of', fields: 'UNION_TERRITORY_REGION' },
];

const STATE_CAPITAL_CITY__NODES = [
  { name: 'city', fields: 'CITY_REGION' },
  { name: 'capital_of', fields: 'STATE_REGION' },
];

// Continue similarly for other types...
export const ALL_NODES: { [key: string]: NodeField[] } = {
  LANGUAGE__NODES,
  SCRIPT__NODES,
  LANGUAGE_SCRIPT__NODES,
  REGION_NAME__NODES,
  ADMINISTRATIVE_ENTITY__NODES,
  NATION_REGION__NODES,
  NATION_LEGAL__NODES,
  ZONAL_COUNCIL_REGION__NODES,
  ZONAL_COUNCIL_LEGAL__NODES,
  STATE_REGION__NODES,
  STATE_LEGAL__NODES,
  UNION_TERRITORY_REGION__NODES,
  UNION_TERRITORY_LEGAL__NODES,
  DISTRICT_REGION__NODES,
  DISTRICT_LEGAL__NODES,
  CITY_REGION__NODES,
  CITY_LEGAL__NODES,
  LOKSABHA_CONSTITUENCY_REGION__NODES,
  LOKSABHA_CONSTITUENCY_LEGAL__NODES,
  VIDHANSABHA_CONSTITUENCY_REGION__NODES,
  VIDHANSABHA_CONSTITUENCY_LEGAL__NODES,
  NATIONAL_CAPITAL_CITY__NODES,
  UNION_TERRITORY_CAPITAL_CITY__NODES,
  STATE_CAPITAL_CITY__NODES,
};
