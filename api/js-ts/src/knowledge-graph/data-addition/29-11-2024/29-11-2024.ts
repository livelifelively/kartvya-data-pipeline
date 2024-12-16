// #KG: INDIAN GOVERNMENT SYSTEM

// let governmentSystemData = {
//   name_id: "india-government",
//   active_government_system_official: {
//     name_id: "india-government-system-2024",
//     description: "",
//     active_official_system_type_of: {
//       name_id: "india-government",
//     },
//     authority_status_type: [
//       {
//         name_id: "sovereign",
//       },
//       {
//         name_id: "stable",
//       },
//     ],
//     authority_source_type: [
//       {
//         name_id: "people",
//       },
//     ],
//     authority_concentration_type: [
//       {
//         name_id: "democracy",
//       },
//     ],
//     authority_distribution_type: {
//       name_id: "strong_center_federation",
//     },
//     monarchy_type: null,
//     autocratic_type: null,
//     oligarchy_type: null,
//     democracy_type: [
//       {
//         name_id: "representative_democracy",
//       },
//       {
//         name_id: "liberal_democracy",
//       },
//     ],
//     partisan_system_type: {
//       name_id: "multi_party_system",
//     },
//     head_of_state_or_government_system_type: {
//       name_id: "parliamentary",
//     },
//     religious_ideology_type: {
//       name_id: "secular_state",
//     },
//     economic_system_type: [
//       {
//         name_id: "capitalism",
//       },
//       {
//         name_id: "socialism",
//       },
//     ],
//     node_created_on: null,
//     established: null,
//     disestablished: null,
//   },
// };

// import { createGraphQLClient } from "../generic/generic.utils";
// import { createGovernmentSystemType } from "../government-system/government-system-type.create";

// (async () => {
//   const graphQLClient = await createGraphQLClient();

//   await createGovernmentSystemType(graphQLClient, governmentSystemData.active_government_system_official);
// })();

/**
 * Indian union government, ministeries, ministers, departments
 */

import { createGraphQLClient } from "../../generic/generic.utils";
import { createNodeType } from "../../generic/generic.create";
const { chromium } = require("playwright");

let ministeries = [
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Prime_Minister_of_India",
        text: "Prime Minister",
      },
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Personnel,_Public_Grievances_and_Pensions",
        text: "Minister of Personnel, Public Grievances and Pensions",
      },
      {
        href: "https://en.wikipedia.org/wiki/Department_of_Atomic_Energy",
        text: "Department of Atomic Energy",
      },
      {
        href: "https://en.wikipedia.org/wiki/Department_of_Space",
        text: "Department of Space",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Narendra_Modi",
      text: "Narendra Modi",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Defence_(India)",
        text: "Minister of Defence",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Rajnath_Singh",
      text: "Rajnath Singh",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Home_Affairs_(India)",
        text: "Minister of Home Affairs",
      },
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Co-operation_(India)",
        text: "Minister of Co-operation",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Amit_Shah",
      text: "Amit Shah",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Road_Transport_and_Highways_(India)",
        text: "Minister of Road Transport and Highways",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Nitin_Gadkari",
      text: "Nitin Gadkari",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Health_and_Family_Welfare_(India)",
        text: "Minister of Health and Family Welfare",
      },
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Chemicals_and_Fertilizers_(India)",
        text: "Minister of Chemicals and Fertilizers",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Jagat_Prakash_Nadda",
      text: "Jagat Prakash Nadda",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Agriculture_and_Farmers%27_Welfare_(India)",
        text: "Minister of Agriculture and Farmers' Welfare",
      },
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Rural_Development_(India)",
        text: "Minister of Rural Development",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Shivraj_Singh_Chouhan",
      text: "Shivraj Singh Chouhan",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Finance_(India)",
        text: "Minister of Finance",
      },
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Corporate_Affairs_(India)",
        text: "Minister of Corporate Affairs",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Nirmala_Sitharaman",
      text: "Nirmala Sitharaman",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_External_Affairs_(India)",
        text: "Minister of External Affairs",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/S._Jaishankar",
      text: "S. Jaishankar",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Power_(India)",
        text: "Minister of Power",
      },
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Housing_and_Urban_Affairs_(India)",
        text: "Minister of Housing and Urban Affairs",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Manohar_Lal_Khattar",
      text: "Manohar Lal Khattar",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Heavy_Industries_(India)",
        text: "Minister of Heavy Industries",
      },
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Steel",
        text: "Minister of Steel",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/H._D._Kumaraswamy",
      text: "H. D. Kumaraswamy",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Commerce_and_Industry_(India)",
        text: "Minister of Commerce and Industry",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Piyush_Goyal",
      text: "Piyush Goyal",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Education_(India)",
        text: "Minister of Education",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Dharmendra_Pradhan",
      text: "Dharmendra Pradhan",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Micro,_Small_and_Medium_Enterprises_(India)",
        text: "Minister of Micro, Small and Medium Enterprises",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Jitan_Ram_Manjhi",
      text: "Jitan Ram Manjhi",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Panchayati_Raj_(India)",
        text: "Minister of Panchayati Raj",
      },
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Fisheries,_Animal_Husbandry_and_Dairying_(India)",
        text: "Minister of Fisheries, Animal Husbandry and Dairying",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Lalan_Singh",
      text: "Lalan Singh",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Ports,_Shipping_and_Waterways_(India)",
        text: "Minister of Ports, Shipping and Waterways",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Sarbananda_Sonowal",
      text: "Sarbananda Sonowal",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Social_Justice_and_Empowerment_(India)",
        text: "Minister of Social Justice and Empowerment",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Virendra_Kumar_Khatik",
      text: "Virendra Kumar Khatik",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Civil_Aviation_(India)",
        text: "Minister of Civil Aviation",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Kinjarapu_Ram_Mohan_Naidu",
      text: "Kinjarapu Ram Mohan Naidu",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Consumer_Affairs,_Food_and_Public_Distribution_(India)",
        text: "Minister of Consumer Affairs, Food and Public Distribution",
      },
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_New_and_Renewable_Energy",
        text: "Minister of New and Renewable Energy",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Prahlad_Joshi",
      text: "Prahlad Joshi",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Tribal_Affairs_(India)",
        text: "Minister of Tribal Affairs",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Jual_Oram",
      text: "Jual Oram",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Textiles_(India)",
        text: "Minister of Textiles",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Giriraj_Singh",
      text: "Giriraj Singh",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Minister_of_Railways_(India)",
        text: "Minister of Railways",
      },
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Information_and_Broadcasting_(India)",
        text: "Minister of Information and Broadcasting",
      },
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Electronics_and_Information_Technology",
        text: "Minister of Electronics and Information Technology",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Ashwini_Vaishnaw",
      text: "Ashwini Vaishnaw",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Communications_(India)",
        text: "Minister of Communications",
      },
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Development_of_North_Eastern_Region",
        text: "Minister of Development of North Eastern Region",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Jyotiraditya_Scindia",
      text: "Jyotiraditya Scindia",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Environment,_Forest_and_Climate_Change_(India)",
        text: "Minister of Environment, Forest and Climate Change",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Bhupender_Yadav",
      text: "Bhupender Yadav",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Culture_(India)",
        text: "Minister of Culture",
      },
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Tourism_(India)",
        text: "Minister of Tourism",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Gajendra_Singh_Shekhawat",
      text: "Gajendra Singh Shekhawat",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Women_and_Child_Development_(India)",
        text: "Minister of Women and Child Development",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Annpurna_Devi",
      text: "Annpurna Devi",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Parliamentary_Affairs_(India)",
        text: "Minister of Parliamentary Affairs",
      },
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Minority_Affairs",
        text: "Minister of Minority Affairs",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Kiren_Rijiju",
      text: "Kiren Rijiju",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Petroleum_and_Natural_Gas",
        text: "Minister of Petroleum and Natural Gas",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Hardeep_Singh_Puri",
      text: "Hardeep Singh Puri",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Labour_and_Employment_(India)",
        text: "Minister of Labour and Employment",
      },
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Youth_Affairs_and_Sports",
        text: "Minister of Youth Affairs and Sports",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Mansukh_L._Mandaviya",
      text: "Mansukh L. Mandaviya",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Coal",
        text: "Minister of Coal",
      },
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Mines_(India)",
        text: "Minister of Mines",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/G._Kishan_Reddy",
      text: "G. Kishan Reddy",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Food_Processing_Industries",
        text: "Minister of Food Processing Industries",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Chirag_Paswan",
      text: "Chirag Paswan",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Jal_Shakti",
        text: "Minister of Jal Shakti",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/C._R._Patil",
      text: "C. R. Patil",
    },
  },
];

async function openPage(context, url) {
  try {
    const page = await context.newPage();
    await page.goto(url);
    await page.waitForEvent("requestfinished");

    return page;
  } catch (error) {
    console.error(`Failed to open URL: ${url}`, error);
  }
}

async function processWikipediaPage(page) {
  // Use the injected functions
  const result = await page.evaluate(() => {
    function getWikidataQID() {
      let link = document.getElementById("t-wikibase")?.querySelector("a")?.href;
      let linkChunks = link?.split("/");

      let qid: any = "";
      while (qid.length === 0) {
        qid = linkChunks?.pop();
      }

      return qid;
    }

    function getWikipediaPageUrl() {
      return window.location.href;
    }

    function dataFromWikipediaPage() {
      const wikidata_qid = getWikidataQID();
      const wikipedia_page = getWikipediaPageUrl();

      return {
        wikidata_qid,
        wikipedia_page,
      };
    }

    return dataFromWikipediaPage();
  });
}

async function extractDataFromWikipediaPage(context: any, url: string) {
  try {
    const page = await openPage(context, url);
    const list = await processWikipediaPage(page);

    await page.close();
    return list;
  } catch (error) {
    const errorData = {
      url,
      message: error.toString(),
      timestamp: new Date().toISOString(),
    };
    // logError(errorData);
  }
}

async function processListOfWikipediaPage(url) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  const result = await extractDataFromWikipediaPage(context, url);
  console.log("finished processing url: ", url);

  console.log("DONE!!!");

  return {
    url,
    result,
  };
}

(async () => {
  const graphQLClient = await createGraphQLClient();

  for (let m in ministeries) {
    for (let p in ministeries[m].portfolio) {
      console.log(ministeries[m].portfolio[p].href);
      const result = await processListOfWikipediaPage(ministeries[m].portfolio[p].href);
      ministeries[m].portfolio[p] = { ...ministeries[m].portfolio[p], ...result };
    }
    console.log(ministeries[m].minister.href);
    const result = await processListOfWikipediaPage(ministeries[m].minister);
    ministeries[m].minister = { ...ministeries[m].minister, ...result };
  }

  console.log(ministeries);

  //   let indian_union_government = {

  //   };

  //   await createNodeType("_Indian_Union_Government_", graphQLClient);

  // ADD POLITICIANS
  // 1. add names
  // 2. add person
  // 3. add politician
  // 4. add positions
  // 5. add ministeries
})();
