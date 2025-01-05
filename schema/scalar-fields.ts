export const LANGUAGE__SCALARS = ["id", "name_en", "names", "wikidata_qid", "wikipedia_page"];
export const SCRIPT__SCALARS = ["id", "name_en", "names", "wikidata_qid", "wikipedia_page"];
export const LANGUAGE_SCRIPT__SCALARS = ["id", "name_en"];

export const REGION_NAME__SCALARS = ["id", "name"];
export const ADMINISTRATIVE_ENTITY__SCALARS = [
  "id",
  "category",
  "wikidata_qid",
  "wikipedia_page",
  "established_on",
  "dissolved_on",
];

export const NATION_REGION__SCALARS = [
  "id",
  "region_id",
  "wikidata_qid",
  "wikipedia_page",
  "established_on",
  "dissolved_on",
];
export const NATION_LEGAL__SCALARS = ["id", "wikidata_qid", "wikipedia_page", "established_on", "dissolved_on"];

export const ZONAL_COUNCIL_REGION__SCALARS = [
  "id",
  "region_id",
  "wikidata_qid",
  "wikipedia_page",
  "established_on",
  "dissolved_on",
];
export const ZONAL_COUNCIL_LEGAL__SCALARS = ["id", "established_on", "dissolved_on", "wikidata_qid", "wikipedia_page"];

export const STATE_REGION__SCALARS = [
  "id",
  "region_id",
  "wikidata_qid",
  "wikipedia_page",
  "established_on",
  "dissolved_on",
];
export const STATE_LEGAL__SCALARS = [
  "id",
  "wikidata_qid",
  "wikipedia_page",
  "established_on",
  "dissolved_on",
  "iso_code",
  "vehicle_code",
  "official_website",
];

export const UNION_TERRITORY_REGION__SCALARS = [
  "id",
  "region_id",
  "wikidata_qid",
  "wikipedia_page",
  "established_on",
  "dissolved_on",
];
export const UNION_TERRITORY_LEGAL__SCALARS = [
  "id",
  "wikidata_qid",
  "wikipedia_page",
  "established_on",
  "dissolved_on",
  "iso_code",
  "vehicle_code",
  "official_website",
];

export const DISTRICT_REGION__SCALARS = [
  "id",
  "region_id",
  "wikidata_qid",
  "wikipedia_page",
  "established_on",
  "dissolved_on",
];
export const DISTRICT_LEGAL__SCALARS = [
  "id",
  "wikidata_qid",
  "wikipedia_page",
  "established_on",
  "dissolved_on",
  "official_website",
];

export const CITY_REGION__SCALARS = [
  "id",
  "region_id",
  "wikidata_qid",
  "wikipedia_page",
  "established_on",
  "dissolved_on",
];
export const CITY_LEGAL__SCALARS = ["id", "wikidata_qid", "wikipedia_page", "established_on", "dissolved_on"];

export const LOKSABHA_CONSTITUENCY_REGION__SCALARS = [
  "id",
  "region_id",
  "wikidata_qid",
  "wikipedia_page",
  "established_on",
  "dissolved_on",
];
export const LOKSABHA_CONSTITUENCY_LEGAL__SCALARS = [
  "id",
  "wikidata_qid",
  "wikipedia_page",
  "established_on",
  "dissolved_on",
];

export const VIDHANSABHA_CONSTITUENCY_REGION__SCALARS = [
  "id",
  "region_id",
  "wikidata_qid",
  "wikipedia_page",
  "established_on",
  "dissolved_on",
];
export const VIDHANSABHA_CONSTITUENCY_LEGAL__SCALARS = [
  "id",
  "wikidata_qid",
  "wikipedia_page",
  "established_on",
  "dissolved_on",
];

export const NATIONAL_CAPITAL_CITY__SCALARS = [
  "id",
  "wikidata_qid",
  "wikipedia_page",
  "established_on",
  "dissolved_on",
  "category",
];
export const UNION_TERRITORY_CAPITAL_CITY__SCALARS = [
  "id",
  "wikidata_qid",
  "wikipedia_page",
  "established_on",
  "dissolved_on",
  "category",
];
export const STATE_CAPITAL_CITY__SCALARS = [
  "id",
  "wikidata_qid",
  "wikipedia_page",
  "established_on",
  "dissolved_on",
  "category",
];

export const ALL_SCALARS: { [key: string]: string[] } = {
  STATE_CAPITAL_CITY__SCALARS,
  UNION_TERRITORY_CAPITAL_CITY__SCALARS,
  NATIONAL_CAPITAL_CITY__SCALARS,
  VIDHANSABHA_CONSTITUENCY_LEGAL__SCALARS,
  VIDHANSABHA_CONSTITUENCY_REGION__SCALARS,
  LOKSABHA_CONSTITUENCY_LEGAL__SCALARS,
  LOKSABHA_CONSTITUENCY_REGION__SCALARS,
  CITY_LEGAL__SCALARS,
  CITY_REGION__SCALARS,
  DISTRICT_LEGAL__SCALARS,
  DISTRICT_REGION__SCALARS,
  UNION_TERRITORY_LEGAL__SCALARS,
  UNION_TERRITORY_REGION__SCALARS,
  STATE_LEGAL__SCALARS,
  STATE_REGION__SCALARS,
  ZONAL_COUNCIL_LEGAL__SCALARS,
  ZONAL_COUNCIL_REGION__SCALARS,
  NATION_LEGAL__SCALARS,
  NATION_REGION__SCALARS,
  ADMINISTRATIVE_ENTITY__SCALARS,
  REGION_NAME__SCALARS,
  LANGUAGE_SCRIPT__SCALARS,
  SCRIPT__SCALARS,
  LANGUAGE__SCALARS,
};
