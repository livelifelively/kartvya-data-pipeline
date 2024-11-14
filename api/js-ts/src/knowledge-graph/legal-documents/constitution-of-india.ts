import { upsertName } from '../../types-functions/name.crud';
import { createGraphQLClient } from '../generic/generic.utils';
import { TZDate } from '@date-fns/tz';

const constitutionData = {
  name_id: 'constitution-of-india',

  names: [
    { language_script: { name_en: 'english_latin' }, name: 'The Constitution of India' },
    { language_script: { name_en: 'english_latin' }, name: 'Indian Constitution' },
    { language_script: { name_en: 'hindi_devanagari' }, name: 'भारतीय संविधान' },
    { language_script: { name_en: 'hindi_devanagari' }, name: 'भारत का संविधान' },
    { language_script: { name_en: 'marathi_devanagari' }, name: 'भारताचे संविधान' },
    { language_script: { name_en: 'bengali_bengali–assamese' }, name: 'ভারতের সংবিধান' },
  ],

  description: 'The Constitution of Republic of India',
  document_type: 'Constitution',

  is_notified: true,

  enactment_date: '1949-11-26T00:00:00+05:30',
  enforcement_date: '1950-01-26T00:00:00+05:30',

  versions: [
    {
      version: '1950-01-26T00:00:00+05:30',
      is_active: true,
      structural_elements: [
        {
          element_type: 'Preamble',
          identifier: null,
          title: 'Preamble',
          text: 'WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a SOVEREIGN DEMOCRATIC REPUBLIC and to secure to all its citizens...',
        },
      ],
    },
  ],
};

// async function createLegalDocumentName(params) {}

// async function createConstitution(client, data) {
async function createConstitution() {
  let documentNameIds = [];

  for (let cn of constitutionData.names) {
    let nameId = await upsertName(cn.name, cn.language_script.name_en);
    documentNameIds.push(nameId);
  }

  //   const docId = await createLegalDocument(client, data); // Creates the Indian_Legal_Document

  //   // Create the initial version of the Constitution
  //   const versionId = await addVersionToLegalDocument(client, docId, data.versions[0]); // Creates the first version

  //   // Add the preamble as a structural element to the version
  //   for (element of data.versions[0].structural_elements) {
  //     await addStructuralElementToLegalDocument(client, docId, versionId, element);
  //   }
}

(async () => {
  // await createConstitution();
  // const tzDate = new TZDate();
  // console.log(tzDate);
  console.log(new Date());
})();
