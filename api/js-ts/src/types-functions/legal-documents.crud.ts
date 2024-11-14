import { createGraphQLClient } from '../knowledge-graph/generic/generic.utils';
import { TZDate } from '@date-fns/tz';

async function addLegalDocument(data: any) {
  const graphQLClient = await createGraphQLClient();

  const mutation = `
    mutation ($input: Add_Indian_Legal_Document_Input!) {
      add_Indian_Legal_Document_(input: $input) {
        indian_legal_document {
          id
          name_id
        }
      }
    }
  `;

  const variables = {
    input: {
      name_id: data.name_id,
      names: data.names,

      description: data.description,

      document_type: data.document_type,

      is_notified: data.is_notified,

      enactment_date: data.enactment_date,
      enforcement_date: data.enforcement_date,
    },
  };

  try {
    let response: any = await graphQLClient.request(mutation, variables);

    return response.data.add_Indian_Legal_Document_.indian_legal_document[0];
  } catch (error) {
    console.error('Error creating legal document:', error);
  }
}

async function addLegalDocumentVersion(docId: string, versionData: any) {
  const graphQLClient = await createGraphQLClient();
  const mutation = `
    mutation ($input: Add_Indian_Legal_Document_Version_Input!) {
      add_Indian_Legal_Document_Version_(input: $input) {
        indian_legal_document_version {
          id
          version
        }
      }
    }
  `;

  const variables = {
    input: {
      version: versionData.version,

      legal_document: { id: docId },
      is_active: versionData.is_active,
    },
  };

  try {
    let response: any = await graphQLClient.request(mutation, variables);
    return response.data.add_Indian_Legal_Document_Version_.indian_legal_document_version[0];
  } catch (error) {
    console.error('Error creating legal document:', error);
  }
}

async function addLegalDocumentStructuralElement(docId: string, versionId: string, elementData: any) {
  const graphQLClient = await createGraphQLClient();

  const mutation = `
        mutation ($input: [Add_Indian_Legal_Document_Structural_Element_Input!]!) {
          add_Indian_Legal_Document_Structural_Element_(input: $input) {
            indian_legal_document_structural_element {
              id
            }
          }
        }
    `;

  const variables = {
    input: [
      {
        legal_document: { id: docId },
        element_type: elementData.element_type,

        identifier: elementData.identifier,
        part: elementData.part,
        chapter: elementData.part,
        schedule: elementData.schedule,

        title: elementData.title,
        is_active: elementData.is_active,
        text_unformatted: elementData.text_unformatted,
        text_formatted: elementData.text_formatted,

        part_of_versions: [{ id: versionId }],
        amendment: elementData.amendment,

        // ommited: elementData.ommited,
        created_on: new Date(),
      },
    ],
  };

  try {
    let response: any = await graphQLClient.request(mutation, variables);
    return response.data.add_Indian_Legal_Document_Structural_Element_.indian_legal_document_structural_element[0].id;
  } catch (error) {
    console.error('Error creating legal document:', error);
  }
}

async function addLegalDocumentAmendment(docId: string, versionId: string, amendmentData: any) {
  const graphQLClient = await createGraphQLClient();
  const mutation = `
        mutation ($input: [Add_Indian_Legal_Document_Amendment_Input!]!) {
          add_Indian_Legal_Document_Amendment_(input: $input) {
            indian_legal_document_amendment {
              id
            }
          }
        }
    `;

  const variables = {
    input: [
      {
        legal_document: { id: docId },
        resulting_version: { id: versionId },

        // add amendment structural elements and then add their ids
        structural_elements: amendmentData.structural_elements,
        amendment_date: amendmentData.date,
        description: amendmentData.description,
      },
    ],
  };

  try {
    let response: any = await graphQLClient.request(mutation, variables);
    return response.data.add_Indian_Legal_Document_Amendment_.indian_legal_document_amendment[0].id;
  } catch (error) {
    console.error('Error creating legal document:', error);
  }
}

async function main() {
  // const legalDocumentData = {};

  // const legalDocumentSaved = await addLegalDocument(legalDocumentData);
  const tzDate = new TZDate(2022, 2, 13, 'Asia/Singapore');
  console.log(tzDate);

  // Add structural elements to the document
  // for (element of structuralElementData) {
  //   await addStructuralElementToLegalDocument(client, docId, element);
  // }
}
main();
