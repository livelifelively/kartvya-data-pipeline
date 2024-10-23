// id: ID!
//   language_script: LanguageScript!
//   name: String! @id @search(by: [hash, term, fulltext])
//   name_of: [AdministrativeEntity]

import { AdministrativeEntityCategoryType } from '../generic/types';

export const ADMINISTRATIVE_ENTITY_CATEGORIES: AdministrativeEntityCategoryType[] = [
  'Nation',
  'Zonal_Council',
  'State',
  'Union_Territory',
  'District',
  'City',
  'Loksabha_Constituency',
  'Vidhansabha_Constituency',
];

const SCRIPT__SCALAR = ['id', 'name_en', 'names', 'wikidata_qid', 'wikipedia_page'];

const LANGUAGE__SCALAR = ['id', 'name_en', 'names', 'wikidata_qid', 'wikipedia_page'];
const LANGUAGE__NODES = [{ name: 'scripts', fields: SCRIPT__SCALAR }];

const SCRIPT__NODES = [{ name: 'languages', fields: LANGUAGE__SCALAR }];

const LANGUAGE_SCRIPT__SCALAR = ['id', 'name_en'];
const LANGUAGE_SCRIPT__NODES_0 = [
  { name: 'language', fields: LANGUAGE__SCALAR },
  { name: 'script', fields: SCRIPT__SCALAR },
];
const LANGUAGE_SCRIPT__NODES_1 = [
  { name: 'language', fields: [...LANGUAGE__SCALAR, ...LANGUAGE__NODES] },
  { name: 'script', fields: [...SCRIPT__SCALAR, ...SCRIPT__NODES] },
];

const REGION_NAME__SCALAR = ['id', 'name'];
const ADMINISTRATIVE_ENTITY__SCALAR = [
  'id',
  'category',
  'wikidata_qid',
  'wikipedia_page',
  'established_on',
  'dissolved_on',
];

const REGION_NAME__NODES_0 = [{ name: 'name_of', fields: ADMINISTRATIVE_ENTITY__SCALAR }];

const ADMINISTRATIVE_ENTITY__NODES_0 = [];

const STATE_REGION__SCALAR = ['id', 'region_id', 'wikidata_qid', 'wikipedia_page', 'established_on', 'dissolved_on'];
const STATE_REGION__NODE_0 = [{ name: 'administrative_entity', fields: ADMINISTRATIVE_ENTITY__SCALAR }];

const STATE_CAPITAL_CITY__SCALAR = [
  'id',
  'wikidata_qid',
  'wikipedia_page',
  'established_on',
  'dissolved_on',
  'category',
];

// id: ID!

//   names: [RegionName!]! @hasInverse(field: "name_of")

//   category: AdministrativeEntityCategory @search(by: [exact])

//   wikidata_qid: String @search(by: [hash])
//   wikipedia_page: String @search(by: [fulltext])

//   established_on: DateTime @search(by: [year])
//   dissolved_on: DateTime @search(by: [year])

//   new_administrative_entity: [AdministrativeEntity]
//   previous_administrative_entity: [AdministrativeEntity]

//   nation_region: NationRegion @hasInverse(field: "administrative_entity")
//   nation_legal: NationLegal @hasInverse(field: "administrative_entity")

//   zone_council_region: ZonalCouncilRegion @hasInverse(field: "administrative_entity")
//   zone_council_legal: ZonalCouncilLegal @hasInverse(field: "administrative_entity")

//   union_territory_region: UnionTerritoryRegion @hasInverse(field: "administrative_entity")
//   union_territory_legal: UnionTerritoryLegal @hasInverse(field: "administrative_entity")

//   state_region: StateRegion @hasInverse(field: "administrative_entity")
//   state_legal: StateLegal @hasInverse(field: "administrative_entity")

//   district_region: DistrictRegion @hasInverse(field: "administrative_entity")
//   district_legal: DistrictLegal @hasInverse(field: "administrative_entity")

//   city_region: CityRegion @hasInverse(field: "administrative_entity")
//   city_legal: CityLegal @hasInverse(field: "administrative_entity")

//   loksabha_constituency_region: LoksabhaConstituencyRegion @hasInverse(field: "administrative_entity")
//   loksabha_constituency_legal: LoksabhaConstituencyLegal @hasInverse(field: "administrative_entity")

//   vidhansabha_constituency_region: VidhansabhaConstituencyRegion @hasInverse(field: "administrative_entity")
//   vidhansabha_constituency_legal: VidhansabhaConstituencyLegal @hasInverse(field: "administrative_entity")

// const STATE_REGION = [
//   { name: 'administrative_entity', fields: ADMINISTRATIVE_ENTITY },
//   { name: 'city' },
//   { name: 'district' },
//   { name: 'loksabha_constituency' },
//   { name: 'vidhansabha_constituency' },
// ];

// const STATE_CAPITAL_CITY = [
//   'id',
//   'wikidata_qid',
//   'wikipedia_page',
//   'established_on',
//   'dissolved_on',
//   'category',
//   { name: 'city', fields: [] },
//   { name: 'capital_of', fields: STATE__REGION },
// ];
