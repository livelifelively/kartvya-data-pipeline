export interface RegionName {
  name: string;
  language: string;
}

export interface ILoksabhaConstituency {
  wikidata_qid: string;
  wikipedia_page: string;
  established_on: Date;
  dissolved_on: Date;
  names: [RegionName];
  stateRegionId: string;
  unionTerritoryRegionId: string;
  zonalCouncilRegionId: string;
  nationRegionId: string;
}

export interface ILoksabhaConstituencyInput {
  name_english: string;
  wikidata_qid: string;
  wikipedia_page: string;
  established_on: Date;
  dissolved_on?: Date;
  other_names: [
    {
      name: string;
      language: string;
    }
  ];
  stateOrUTCategory: 'State' | 'Union_Territory';
  stateOrUTName: string;
}
