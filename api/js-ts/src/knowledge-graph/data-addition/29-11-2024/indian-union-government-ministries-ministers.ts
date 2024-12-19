/**
 * Indian union government, ministries, ministers, departments
 */

import { createGraphQLClient } from "../../generic/generic.utils";
import { createNodeType } from "../../generic/generic.create";
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");
import { createName } from "../../name/name.create";
import { addPublicPolicyDomain } from "../../public-policy-domain/create";
import { update_Name_Change_Name_Case, upsert_Name_ } from "../../name/name.update";
import {
  create_Indian_Union_Government_Ministry,
  upsert_Indian_Union_Government_Ministry,
} from "../../indian-union-government-ministry/create";
import { get_Politician_By_Person_Wikidata_Qid } from "../../person/create";

let ministries: any = [
  {
    portfolio: [
      // {
      //   href: "https://en.wikipedia.org/wiki/Prime_Minister_of_India",
      //   text: "Prime Minister",
      //   url: "https://en.wikipedia.org/wiki/Prime_Minister_of_India",
      //   result: {
      //     wikidata_qid: "Q192711",
      //     wikipedia_page: "https://en.wikipedia.org/wiki/Prime_Minister_of_India",
      //   },
      //   ministryNameId: "0x9be95fc60d",
      // },
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Personnel,_Public_Grievances_and_Pensions",
        text: "Ministry of Personnel, Public Grievances and Pensions",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Personnel,_Public_Grievances_and_Pensions",
        result: {
          wikidata_qid: "Q4294428",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Personnel,_Public_Grievances_and_Pensions",
        },
        ministryNameId: "0x9be95fc60e",
      },
      {
        href: "https://en.wikipedia.org/wiki/Department_of_Atomic_Energy",
        text: "Department of Atomic Energy",
        url: "https://en.wikipedia.org/wiki/Department_of_Atomic_Energy",
        result: {
          wikidata_qid: "Q3523073",
          wikipedia_page: "https://en.wikipedia.org/wiki/Department_of_Atomic_Energy",
        },
        ministryNameId: "0x9be95fc60f",
      },
      {
        href: "https://en.wikipedia.org/wiki/Department_of_Space",
        text: "Department of Space",
        url: "https://en.wikipedia.org/wiki/Department_of_Space",
        result: {
          wikidata_qid: "Q4158548",
          wikipedia_page: "https://en.wikipedia.org/wiki/Department_of_Space",
        },
        ministryNameId: "0x9be95fc610",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Narendra_Modi",
      text: "Narendra Modi",
      url: "https://en.wikipedia.org/wiki/Narendra_Modi",
      result: {
        wikidata_qid: "Q1058",
        wikipedia_page: "https://en.wikipedia.org/wiki/Narendra_Modi",
      },
      ministryNameId: "0x9be95fc611",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Defence_(India)",
        text: "Ministry of Defence",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Defence_(India)",
        result: {
          wikidata_qid: "Q2641653",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Defence_(India)",
        },
        ministryNameId: "0x9be95fc612",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Rajnath_Singh",
      text: "Rajnath Singh",
      url: "https://en.wikipedia.org/wiki/Rajnath_Singh",
      result: {
        wikidata_qid: "Q3506475",
        wikipedia_page: "https://en.wikipedia.org/wiki/Rajnath_Singh",
      },
      ministryNameId: "0x9be95fc613",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Home_Affairs_(India)",
        text: "Ministry of Home Affairs",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Home_Affairs_(India)",
        result: {
          wikidata_qid: "Q2607861",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Home_Affairs_(India)",
        },
        ministryNameId: "0x9be95fc614",
      },
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Co-operation_(India)",
        text: "Ministry of Co-operation",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Co-operation_(India)",
        result: {
          wikidata_qid: "Q107599813",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Co-operation",
        },
        ministryNameId: "0x9be95fc615",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Amit_Shah",
      text: "Amit Shah",
      url: "https://en.wikipedia.org/wiki/Amit_Shah",
      result: {
        wikidata_qid: "Q4746875",
        wikipedia_page: "https://en.wikipedia.org/wiki/Amit_Shah",
      },
      ministryNameId: "0x9be95fc616",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Road_Transport_and_Highways_(India)",
        text: "Ministry of Road Transport and Highways",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Road_Transport_and_Highways_(India)",
        result: {
          wikidata_qid: "Q167156",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Road_Transport_and_Highways",
        },
        ministryNameId: "0x9be95fc617",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Nitin_Gadkari",
      text: "Nitin Gadkari",
      url: "https://en.wikipedia.org/wiki/Nitin_Gadkari",
      result: {
        wikidata_qid: "Q3504520",
        wikipedia_page: "https://en.wikipedia.org/wiki/Nitin_Gadkari",
      },
      ministryNameId: "0x9be95fc618",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Health_and_Family_Welfare_(India)",
        text: "Ministry of Health and Family Welfare",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Health_and_Family_Welfare_(India)",
        result: {
          wikidata_qid: "Q3525265",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Health_and_Family_Welfare",
        },
        ministryNameId: "0x9be95fc619",
      },
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Chemicals_and_Fertilizers_(India)",
        text: "Ministry of Chemicals and Fertilizers",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Chemicals_and_Fertilizers_(India)",
        result: {
          wikidata_qid: "Q4294812",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Chemicals_and_Fertilizers",
        },
        ministryNameId: "0x9be95fc61a",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Jagat_Prakash_Nadda",
      text: "Jagat Prakash Nadda",
      url: "https://en.wikipedia.org/wiki/Jagat_Prakash_Nadda",
      result: {
        wikidata_qid: "Q16193764",
        wikipedia_page: "https://en.wikipedia.org/wiki/J._P._Nadda",
      },
      ministryNameId: "0x9be95fc61b",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Agriculture_and_Farmers%27_Welfare_(India)",
        text: "Ministry of Agriculture and Farmers Welfare",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Agriculture_and_Farmers%27_Welfare_(India)",
        result: {
          wikidata_qid: "Q3634069",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Agriculture_and_Farmers%27_Welfare",
        },
        ministryNameId: "0x9be95fc61c",
      },
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Rural_Development_(India)",
        text: "Ministry of Rural Development",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Rural_Development_(India)",
        result: {
          wikidata_qid: "Q6867517",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Rural_Development_(India)",
        },
        ministryNameId: "0x9be95fc61d",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Shivraj_Singh_Chouhan",
      text: "Shivraj Singh Chouhan",
      url: "https://en.wikipedia.org/wiki/Shivraj_Singh_Chouhan",
      result: {
        wikidata_qid: "Q3180602",
        wikipedia_page: "https://en.wikipedia.org/wiki/Shivraj_Singh_Chouhan",
      },
      ministryNameId: "0x9be95fc61e",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Finance_(India)",
        text: "Ministry of Finance",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Finance_(India)",
        result: {
          wikidata_qid: "Q2641068",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Finance_(India)",
        },
        ministryNameId: "0x9be95fc61f",
      },
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Corporate_Affairs_(India)",
        text: "Ministry of Corporate Affairs",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Corporate_Affairs_(India)",
        result: {
          wikidata_qid: "Q4294596",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Corporate_Affairs",
        },
        ministryNameId: "0x9be95fc620",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Nirmala_Sitharaman",
      text: "Nirmala Sitharaman",
      url: "https://en.wikipedia.org/wiki/Nirmala_Sitharaman",
      result: {
        wikidata_qid: "Q7040049",
        wikipedia_page: "https://en.wikipedia.org/wiki/Nirmala_Sitharaman",
      },
      ministryNameId: "0x9be95fc621",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_External_Affairs_(India)",
        text: "Ministry of External Affairs",
        url: "https://en.wikipedia.org/wiki/Ministry_of_External_Affairs_(India)",
        result: {
          wikidata_qid: "Q3524953",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_External_Affairs_(India)",
        },
        ministryNameId: "0x9be95fc622",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/S._Jaishankar",
      text: "S. Jaishankar",
      url: "https://en.wikipedia.org/wiki/S._Jaishankar",
      result: {
        wikidata_qid: "Q16186720",
        wikipedia_page: "https://en.wikipedia.org/wiki/S._Jaishankar",
      },
      ministryNameId: "0x9be95fc623",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Power_(India)",
        text: "Ministry of Power",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Power_(India)",
        result: {
          wikidata_qid: "Q4294844",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Power_(India)",
        },
        ministryNameId: "0x9be95fc624",
      },
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Housing_and_Urban_Affairs_(India)",
        text: "Ministry of Housing and Urban Affairs",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Housing_and_Urban_Affairs_(India)",
        result: {
          wikidata_qid: "Q4294334",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Housing_and_Urban_Affairs",
        },
        ministryNameId: "0x9be95fc625",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Manohar_Lal_Khattar",
      text: "Manohar Lal Khattar",
      url: "https://en.wikipedia.org/wiki/Manohar_Lal_Khattar",
      result: {
        wikidata_qid: "Q18336221",
        wikipedia_page: "https://en.wikipedia.org/wiki/Manohar_Lal_Khattar",
      },
      ministryNameId: "0x9be95fc626",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Heavy_Industries_(India)",
        text: "Ministry of Heavy Industries",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Heavy_Industries_(India)",
        result: {
          wikidata_qid: "Q108619669",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Heavy_Industries",
        },
        ministryNameId: "0x9be95fc627",
      },
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Steel",
        text: "Ministry of Steel",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Steel",
        result: {
          wikidata_qid: "Q3525381",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Steel",
        },
        ministryNameId: "0x9be95fc628",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/H._D._Kumaraswamy",
      text: "H. D. Kumaraswamy",
      url: "https://en.wikipedia.org/wiki/H._D._Kumaraswamy",
      result: {
        wikidata_qid: "Q251790",
        wikipedia_page: "https://en.wikipedia.org/wiki/H._D._Kumaraswamy",
      },
      ministryNameId: "0x9be95fc629",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Commerce_and_Industry_(India)",
        text: "Ministry of Commerce and Industry",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Commerce_and_Industry_(India)",
        result: {
          wikidata_qid: "Q4294724",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Commerce_and_Industry_(India)",
        },
        ministryNameId: "0x9be95fc62a",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Piyush_Goyal",
      text: "Piyush Goyal",
      url: "https://en.wikipedia.org/wiki/Piyush_Goyal",
      result: {
        wikidata_qid: "Q7199798",
        wikipedia_page: "https://en.wikipedia.org/wiki/Piyush_Goyal",
      },
      ministryNameId: "0x9be95fc62b",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Education_(India)",
        text: "Ministry of Education",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Education_(India)",
        result: {
          wikidata_qid: "Q4294642",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Education_(India)",
        },
        ministryNameId: "0x9be95fc62c",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Dharmendra_Pradhan",
      text: "Dharmendra Pradhan",
      url: "https://en.wikipedia.org/wiki/Dharmendra_Pradhan",
      result: {
        wikidata_qid: "Q5269370",
        wikipedia_page: "https://en.wikipedia.org/wiki/Dharmendra_Pradhan",
      },
      ministryNameId: "0x9be95fc62d",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Micro,_Small_and_Medium_Enterprises_(India)",
        text: "Ministry of Micro, Small and Medium Enterprises",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Micro,_Small_and_Medium_Enterprises_(India)",
        result: {
          wikidata_qid: "Q4294585",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Micro,_Small_and_Medium_Enterprises",
        },
        ministryNameId: "0x9be95fc62e",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Jitan_Ram_Manjhi",
      text: "Jitan Ram Manjhi",
      url: "https://en.wikipedia.org/wiki/Jitan_Ram_Manjhi",
      result: {
        wikidata_qid: "Q16910976",
        wikipedia_page: "https://en.wikipedia.org/wiki/Jitan_Ram_Manjhi",
      },
      ministryNameId: "0x9be95fc62f",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Panchayati_Raj_(India)",
        text: "Ministry of Panchayati Raj",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Panchayati_Raj_(India)",
        result: {
          wikidata_qid: "Q4294588",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Panchayati_Raj",
        },
        ministryNameId: "0x9be95fc630",
      },
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Fisheries,_Animal_Husbandry_and_Dairying_(India)",
        text: "Ministry of Fisheries, Animal Husbandry and Dairying",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Fisheries,_Animal_Husbandry_and_Dairying_(India)",
        result: {
          wikidata_qid: "Q65042516",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Fisheries,_Animal_Husbandry_and_Dairying",
        },
        ministryNameId: "0x9be95fc631",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Lalan_Singh",
      text: "Lalan Singh",
      url: "https://en.wikipedia.org/wiki/Lalan_Singh",
      result: {
        wikidata_qid: "Q7286245",
        wikipedia_page: "https://en.wikipedia.org/wiki/Lalan_Singh",
      },
      ministryNameId: "0x9be95fc632",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Ports,_Shipping_and_Waterways_(India)",
        text: "Ministry of Ports, Shipping and Waterways",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Ports,_Shipping_and_Waterways_(India)",
        result: {
          wikidata_qid: "Q4294719",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Ports,_Shipping_and_Waterways",
        },
        ministryNameId: "0x9be95fc633",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Sarbananda_Sonowal",
      text: "Sarbananda Sonowal",
      url: "https://en.wikipedia.org/wiki/Sarbananda_Sonowal",
      result: {
        wikidata_qid: "Q7423486",
        wikipedia_page: "https://en.wikipedia.org/wiki/Sarbananda_Sonowal",
      },
      ministryNameId: "0x9be95fc634",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Social_Justice_and_Empowerment_(India)",
        text: "Ministry of Social Justice and Empowerment",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Social_Justice_and_Empowerment_(India)",
        result: {
          wikidata_qid: "Q4294701",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Social_Justice_and_Empowerment",
        },
        ministryNameId: "0x9be95fc635",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Virendra_Kumar_Khatik",
      text: "Virendra Kumar Khatik",
      url: "https://en.wikipedia.org/wiki/Virendra_Kumar_Khatik",
      result: {
        wikidata_qid: "Q7933694",
        wikipedia_page: "https://en.wikipedia.org/wiki/Virendra_Kumar_Khatik",
      },
      ministryNameId: "0x9be95fc636",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Civil_Aviation_(India)",
        text: "Ministry of Civil Aviation",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Civil_Aviation_(India)",
        result: {
          wikidata_qid: "Q15650503",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Civil_Aviation_(India)",
        },
        ministryNameId: "0x9be95fc637",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Kinjarapu_Ram_Mohan_Naidu",
      text: "Kinjarapu Ram Mohan Naidu",
      url: "https://en.wikipedia.org/wiki/Kinjarapu_Ram_Mohan_Naidu",
      result: {
        wikidata_qid: "Q16901223",
        wikipedia_page: "https://en.wikipedia.org/wiki/Kinjarapu_Ram_Mohan_Naidu",
      },
      ministryNameId: "0x9be95fc638",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Consumer_Affairs,_Food_and_Public_Distribution_(India)",
        text: "Ministry of Consumer Affairs, Food and Public Distribution",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Consumer_Affairs,_Food_and_Public_Distribution_(India)",
        result: {
          wikidata_qid: "Q3525212",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Consumer_Affairs,_Food_and_Public_Distribution",
        },
        ministryNameId: "0x9be95fc639",
      },
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_New_and_Renewable_Energy",
        text: "Ministry of New and Renewable Energy",
        url: "https://en.wikipedia.org/wiki/Ministry_of_New_and_Renewable_Energy",
        result: {
          wikidata_qid: "Q4294489",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_New_and_Renewable_Energy",
        },
        ministryNameId: "0x9be95fc63a",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Prahlad_Joshi",
      text: "Prahlad Joshi",
      url: "https://en.wikipedia.org/wiki/Prahlad_Joshi",
      result: {
        wikidata_qid: "Q7238224",
        wikipedia_page: "https://en.wikipedia.org/wiki/Pralhad_Joshi",
      },
      ministryNameId: "0x9be95fc63b",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Tribal_Affairs_(India)",
        text: "Ministry of Tribal Affairs",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Tribal_Affairs_(India)",
        result: {
          wikidata_qid: "Q6867635",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Tribal_Affairs",
        },
        ministryNameId: "0x9be95fc63c",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Jual_Oram",
      text: "Jual Oram",
      url: "https://en.wikipedia.org/wiki/Jual_Oram",
      result: {
        wikidata_qid: "Q6298726",
        wikipedia_page: "https://en.wikipedia.org/wiki/Jual_Oram",
      },
      ministryNameId: "0x9be95fc63d",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Textiles_(India)",
        text: "Ministry of Textiles",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Textiles_(India)",
        result: {
          wikidata_qid: "Q4294449",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Textiles",
        },
        ministryNameId: "0x9be95fc63e",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Giriraj_Singh",
      text: "Giriraj Singh",
      url: "https://en.wikipedia.org/wiki/Giriraj_Singh",
      result: {
        wikidata_qid: "Q16736894",
        wikipedia_page: "https://en.wikipedia.org/wiki/Giriraj_Singh",
      },
      ministryNameId: "0x9be95fc63f",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Minister_of_Railways_(India)",
        text: "Ministry of Railways",
        url: "https://en.wikipedia.org/wiki/Minister_of_Railways_(India)",
        result: {
          wikidata_qid: "Q6866301",
          wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Railways_(India)",
        },
        ministryNameId: "0x9be95fc640",
      },
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Information_and_Broadcasting_(India)",
        text: "Ministry of Information and Broadcasting",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Information_and_Broadcasting_(India)",
        result: {
          wikidata_qid: "Q4294412",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Information_and_Broadcasting_(India)",
        },
        ministryNameId: "0x9be95fc641",
      },
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Electronics_and_Information_Technology",
        text: "Ministry of Electronics and Information Technology",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Electronics_and_Information_Technology",
        result: {
          wikidata_qid: "Q16956017",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Electronics_and_Information_Technology",
        },
        ministryNameId: "0x9be95fc642",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Ashwini_Vaishnaw",
      text: "Ashwini Vaishnaw",
      url: "https://en.wikipedia.org/wiki/Ashwini_Vaishnaw",
      result: {
        wikidata_qid: "Q75184694",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ashwini_Vaishnaw",
      },
      ministryNameId: "0x9be95fc643",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Communications_(India)",
        text: "Ministry of Communications",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Communications_(India)",
        result: {
          wikidata_qid: "Q12454897",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Communications_(India)",
        },
        ministryNameId: "0x9be95fc644",
      },
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Development_of_North_Eastern_Region",
        text: "Ministry of Development of North Eastern Region",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Development_of_North_Eastern_Region",
        result: {
          wikidata_qid: "Q4294643",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Development_of_North_Eastern_Region",
        },
        ministryNameId: "0x9be95fc645",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Jyotiraditya_Scindia",
      text: "Jyotiraditya Scindia",
      url: "https://en.wikipedia.org/wiki/Jyotiraditya_Scindia",
      result: {
        wikidata_qid: "Q16213761",
        wikipedia_page: "https://en.wikipedia.org/wiki/Jyotiraditya_Scindia",
      },
      ministryNameId: "0x9be95fc646",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Environment,_Forest_and_Climate_Change_(India)",
        text: "Ministry of Environment, Forest and Climate Change",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Environment,_Forest_and_Climate_Change_(India)",
        result: {
          wikidata_qid: "Q2749442",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Environment,_Forest_and_Climate_Change",
        },
        ministryNameId: "0x9be95fc647",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Bhupender_Yadav",
      text: "Bhupender Yadav",
      url: "https://en.wikipedia.org/wiki/Bhupender_Yadav",
      result: {
        wikidata_qid: "Q16208337",
        wikipedia_page: "https://en.wikipedia.org/wiki/Bhupender_Yadav",
      },
      ministryNameId: "0x9be95fc648",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Culture_(India)",
        text: "Ministry of Culture",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Culture_(India)",
        result: {
          wikidata_qid: "Q4294433",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Culture_(India)",
        },
        ministryNameId: "0x9be95fc649",
      },
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Tourism_(India)",
        text: "Ministry of Tourism",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Tourism_(India)",
        result: {
          wikidata_qid: "Q4294772",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Tourism_(India)",
        },
        ministryNameId: "0x9be95fc64a",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Gajendra_Singh_Shekhawat",
      text: "Gajendra Singh Shekhawat",
      url: "https://en.wikipedia.org/wiki/Gajendra_Singh_Shekhawat",
      result: {
        wikidata_qid: "Q16914124",
        wikipedia_page: "https://en.wikipedia.org/wiki/Gajendra_Singh_Shekhawat",
      },
      ministryNameId: "0x9be95fc64b",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Women_and_Child_Development_(India)",
        text: "Ministry of Women and Child Development",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Women_and_Child_Development_(India)",
        result: {
          wikidata_qid: "Q12446115",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Women_and_Child_Development",
        },
        ministryNameId: "0x9be95fc64c",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Annpurna_Devi",
      text: "Annpurna Devi",
      url: "https://en.wikipedia.org/wiki/Annpurna_Devi",
      result: {
        wikidata_qid: "Q64010478",
        wikipedia_page: "https://en.wikipedia.org/wiki/Annpurna_Devi",
      },
      ministryNameId: "0x9be95fc64d",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Parliamentary_Affairs_(India)",
        text: "Ministry of Parliamentary Affairs",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Parliamentary_Affairs_(India)",
        result: {
          wikidata_qid: "Q12455047",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Parliamentary_Affairs_(India)",
        },
        ministryNameId: "0x9be95fc64e",
      },
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Minority_Affairs",
        text: "Ministry of Minority Affairs",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Minority_Affairs",
        result: {
          wikidata_qid: "Q4294587",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Minority_Affairs",
        },
        ministryNameId: "0x9be95fc64f",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Kiren_Rijiju",
      text: "Kiren Rijiju",
      url: "https://en.wikipedia.org/wiki/Kiren_Rijiju",
      result: {
        wikidata_qid: "Q6415053",
        wikipedia_page: "https://en.wikipedia.org/wiki/Kiren_Rijiju",
      },
      ministryNameId: "0x9be95fc650",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Petroleum_and_Natural_Gas",
        text: "Ministry of Petroleum and Natural Gas",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Petroleum_and_Natural_Gas",
        result: {
          wikidata_qid: "Q4294487",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Petroleum_and_Natural_Gas",
        },
        ministryNameId: "0x9be95fc651",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Hardeep_Singh_Puri",
      text: "Hardeep Singh Puri",
      url: "https://en.wikipedia.org/wiki/Hardeep_Singh_Puri",
      result: {
        wikidata_qid: "Q5655835",
        wikipedia_page: "https://en.wikipedia.org/wiki/Hardeep_Singh_Puri",
      },
      ministryNameId: "0x9be95fc652",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Labour_and_Employment_(India)",
        text: "Ministry of Labour and Employment",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Labour_and_Employment_(India)",
        result: {
          wikidata_qid: "Q4294756",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Labour_and_Employment_(India)",
        },
        ministryNameId: "0x9be95fc653",
      },
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Youth_Affairs_and_Sports",
        text: "Ministry of Youth Affairs and Sports",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Youth_Affairs_and_Sports",
        result: {
          wikidata_qid: "Q4294590",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Youth_Affairs_and_Sports",
        },
        ministryNameId: "0x9be95fc654",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Mansukh_L._Mandaviya",
      text: "Mansukh L. Mandaviya",
      url: "https://en.wikipedia.org/wiki/Mansukh_L._Mandaviya",
      result: {
        wikidata_qid: "Q21170728",
        wikipedia_page: "https://en.wikipedia.org/wiki/Mansukh_Mandaviya",
      },
      ministryNameId: "0x9be95fc655",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Coal",
        text: "Ministry of Coal",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Coal",
        result: {
          wikidata_qid: "Q3525316",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Coal",
        },
        ministryNameId: "0x9be95fc656",
      },
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Mines_(India)",
        text: "Ministry of Mines",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Mines_(India)",
        result: {
          wikidata_qid: "Q4294327",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Mines_(India)",
        },
        ministryNameId: "0x9be95fc657",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/G._Kishan_Reddy",
      text: "G. Kishan Reddy",
      url: "https://en.wikipedia.org/wiki/G._Kishan_Reddy",
      result: {
        wikidata_qid: "Q5512319",
        wikipedia_page: "https://en.wikipedia.org/wiki/G._Kishan_Reddy",
      },
      ministryNameId: "0x9be95fc658",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Food_Processing_Industries",
        text: "Ministry of Food Processing Industries",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Food_Processing_Industries",
        result: {
          wikidata_qid: "Q4294565",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Food_Processing_Industries",
        },
        ministryNameId: "0x9be95fc659",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Chirag_Paswan",
      text: "Chirag Paswan",
      url: "https://en.wikipedia.org/wiki/Chirag_Paswan",
      result: {
        wikidata_qid: "Q16728004",
        wikipedia_page: "https://en.wikipedia.org/wiki/Chirag_Paswan",
      },
      ministryNameId: "0x9be95fc65a",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Jal_Shakti",
        text: "Ministry of Jal Shakti",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Jal_Shakti",
        result: {
          wikidata_qid: "Q85785741",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Jal_Shakti",
        },
        ministryNameId: "0x9be95fc65b",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/C._R._Patil",
      text: "C. R. Patil",
      url: "https://en.wikipedia.org/wiki/C._R._Patil",
      result: {
        wikidata_qid: "Q5071367",
        wikipedia_page: "https://en.wikipedia.org/wiki/C._R._Patil",
      },
      ministryNameId: "0x9be95fc65c",
    },
  },
];

let persons = [
  {
    names: [
      {
        id: "0x9be95fc611",
      },
    ],
    wikidata_qid: "Q1058",
    wikipedia_page: "https://en.wikipedia.org/wiki/Narendra_Modi",
  },
  {
    names: [
      {
        id: "0x9be95fc613",
      },
    ],
    wikidata_qid: "Q3506475",
    wikipedia_page: "https://en.wikipedia.org/wiki/Rajnath_Singh",
  },
  {
    names: [
      {
        id: "0x9be95fc616",
      },
    ],
    wikidata_qid: "Q4746875",
    wikipedia_page: "https://en.wikipedia.org/wiki/Amit_Shah",
  },
  {
    names: [
      {
        id: "0x9be95fc618",
      },
    ],
    wikidata_qid: "Q3504520",
    wikipedia_page: "https://en.wikipedia.org/wiki/Nitin_Gadkari",
  },
  {
    names: [
      {
        id: "0x9be95fc61b",
      },
    ],
    wikidata_qid: "Q16193764",
    wikipedia_page: "https://en.wikipedia.org/wiki/J._P._Nadda",
  },
  {
    names: [
      {
        id: "0x9be95fc61e",
      },
    ],
    wikidata_qid: "Q3180602",
    wikipedia_page: "https://en.wikipedia.org/wiki/Shivraj_Singh_Chouhan",
  },
  {
    names: [
      {
        id: "0x9be95fc621",
      },
    ],
    wikidata_qid: "Q7040049",
    wikipedia_page: "https://en.wikipedia.org/wiki/Nirmala_Sitharaman",
  },
  {
    names: [
      {
        id: "0x9be95fc623",
      },
    ],
    wikidata_qid: "Q16186720",
    wikipedia_page: "https://en.wikipedia.org/wiki/S._Jaishankar",
  },
  {
    names: [
      {
        id: "0x9be95fc626",
      },
    ],
    wikidata_qid: "Q18336221",
    wikipedia_page: "https://en.wikipedia.org/wiki/Manohar_Lal_Khattar",
  },
  {
    names: [
      {
        id: "0x9be95fc629",
      },
    ],
    wikidata_qid: "Q251790",
    wikipedia_page: "https://en.wikipedia.org/wiki/H._D._Kumaraswamy",
  },
  {
    names: [
      {
        id: "0x9be95fc62b",
      },
    ],
    wikidata_qid: "Q7199798",
    wikipedia_page: "https://en.wikipedia.org/wiki/Piyush_Goyal",
  },
  {
    names: [
      {
        id: "0x9be95fc62d",
      },
    ],
    wikidata_qid: "Q5269370",
    wikipedia_page: "https://en.wikipedia.org/wiki/Dharmendra_Pradhan",
  },
  {
    names: [
      {
        id: "0x9be95fc62f",
      },
    ],
    wikidata_qid: "Q16910976",
    wikipedia_page: "https://en.wikipedia.org/wiki/Jitan_Ram_Manjhi",
  },
  {
    names: [
      {
        id: "0x9be95fc632",
      },
    ],
    wikidata_qid: "Q7286245",
    wikipedia_page: "https://en.wikipedia.org/wiki/Lalan_Singh",
  },
  {
    names: [
      {
        id: "0x9be95fc634",
      },
    ],
    wikidata_qid: "Q7423486",
    wikipedia_page: "https://en.wikipedia.org/wiki/Sarbananda_Sonowal",
  },
  {
    names: [
      {
        id: "0x9be95fc636",
      },
    ],
    wikidata_qid: "Q7933694",
    wikipedia_page: "https://en.wikipedia.org/wiki/Virendra_Kumar_Khatik",
  },
  {
    names: [
      {
        id: "0x9be95fc638",
      },
    ],
    wikidata_qid: "Q16901223",
    wikipedia_page: "https://en.wikipedia.org/wiki/Kinjarapu_Ram_Mohan_Naidu",
  },
  {
    names: [
      {
        id: "0x9be95fc63b",
      },
    ],
    wikidata_qid: "Q7238224",
    wikipedia_page: "https://en.wikipedia.org/wiki/Pralhad_Joshi",
  },
  {
    names: [
      {
        id: "0x9be95fc63d",
      },
    ],
    wikidata_qid: "Q6298726",
    wikipedia_page: "https://en.wikipedia.org/wiki/Jual_Oram",
  },
  {
    names: [
      {
        id: "0x9be95fc63f",
      },
    ],
    wikidata_qid: "Q16736894",
    wikipedia_page: "https://en.wikipedia.org/wiki/Giriraj_Singh",
  },
  {
    names: [
      {
        id: "0x9be95fc643",
      },
    ],
    wikidata_qid: "Q75184694",
    wikipedia_page: "https://en.wikipedia.org/wiki/Ashwini_Vaishnaw",
  },
  {
    names: [
      {
        id: "0x9be95fc646",
      },
    ],
    wikidata_qid: "Q16213761",
    wikipedia_page: "https://en.wikipedia.org/wiki/Jyotiraditya_Scindia",
  },
  {
    names: [
      {
        id: "0x9be95fc648",
      },
    ],
    wikidata_qid: "Q16208337",
    wikipedia_page: "https://en.wikipedia.org/wiki/Bhupender_Yadav",
  },
  {
    names: [
      {
        id: "0x9be95fc64b",
      },
    ],
    wikidata_qid: "Q16914124",
    wikipedia_page: "https://en.wikipedia.org/wiki/Gajendra_Singh_Shekhawat",
  },
  {
    names: [
      {
        id: "0x9be95fc64d",
      },
    ],
    wikidata_qid: "Q64010478",
    wikipedia_page: "https://en.wikipedia.org/wiki/Annpurna_Devi",
  },
  {
    names: [
      {
        id: "0x9be95fc650",
      },
    ],
    wikidata_qid: "Q6415053",
    wikipedia_page: "https://en.wikipedia.org/wiki/Kiren_Rijiju",
  },
  {
    names: [
      {
        id: "0x9be95fc652",
      },
    ],
    wikidata_qid: "Q5655835",
    wikipedia_page: "https://en.wikipedia.org/wiki/Hardeep_Singh_Puri",
  },
  {
    names: [
      {
        id: "0x9be95fc655",
      },
    ],
    wikidata_qid: "Q21170728",
    wikipedia_page: "https://en.wikipedia.org/wiki/Mansukh_Mandaviya",
  },
  {
    names: [
      {
        id: "0x9be95fc658",
      },
    ],
    wikidata_qid: "Q5512319",
    wikipedia_page: "https://en.wikipedia.org/wiki/G._Kishan_Reddy",
  },
  {
    names: [
      {
        id: "0x9be95fc65a",
      },
    ],
    wikidata_qid: "Q16728004",
    wikipedia_page: "https://en.wikipedia.org/wiki/Chirag_Paswan",
  },
  {
    names: [
      {
        id: "0x9be95fc65c",
      },
    ],
    wikidata_qid: "Q5071367",
    wikipedia_page: "https://en.wikipedia.org/wiki/C._R._Patil",
  },
];

let policyDomains: any = [
  {
    name_id: "defence",
  },
  {
    name_id: "space",
  },
  {
    name_id: "international-relations",
  },
  {
    name_id: "healthcare",
  },
  {
    name_id: "education",
  },
  {
    name_id: "railways",
  },
  {
    name_id: "road-transportation",
  },
  {
    name_id: "ports-and-shipping",
  },
  {
    name_id: "civil-aviation",
  },
  {
    name_id: "agriculture",
  },
  {
    name_id: "fishing",
  },
  {
    name_id: "energy",
  },
  {
    name_id: "petroleum-natural-gas",
  },
  {
    name_id: "minerals",
  },
  {
    name_id: "industries-and-trade",
  },
  {
    name_id: "labour",
  },
  {
    name_id: "government-finances",
  },
  {
    name_id: "taxesandduties",
  },
  {
    name_id: "stock-and-futures-markets",
  },
  {
    name_id: "law-and-justice",
  },
  {
    name_id: "elections",
  },
  {
    name_id: "law-enforcement",
  },
  {
    name_id: "public-broadcasting",
  },
  {
    name_id: "communication",
  },
  {
    name_id: "history-and-culture",
  },
  {
    name_id: "rural-development",
  },
  {
    name_id: "urban-development",
  },
  {
    name_id: "government-officials",
  },
  {
    name_id: "cooperative-development",
  },
  {
    name_id: "chemical-industry",
  },
  {
    name_id: "fertilizer-production",
  },
  {
    name_id: "heavy-industry-development",
  },
  {
    name_id: "local-governance",
  },
  {
    name_id: "social-welfare",
  },
  {
    name_id: "consumer-rights",
  },
  {
    name_id: "food-security",
  },
  {
    name_id: "tribal-welfare",
  },
  {
    name_id: "textile-industry",
  },
  {
    name_id: "northeast-development",
  },
  {
    name_id: "environment",
  },
  {
    name_id: "tourism-industry",
  },
  {
    name_id: "women-empowerment",
  },
  {
    name_id: "child-welfare",
  },
  {
    name_id: "minority-welfare",
  },
  {
    name_id: "legislative-affairs",
  },
  {
    name_id: "youth-development",
  },
  {
    name_id: "sports",
  },
  {
    name_id: "food-processing-industry",
  },
  {
    name_id: "water-resources",
  },
  {
    name_id: "electronics-and-information-technology",
  },
];

let ministriesDomains = [
  {
    name_id: "personnel-public-grievances-and-pensions",
    names: [
      {
        name: "Ministry of Personnel, Public Grievances and Pensions",
      },
    ],
    policy_domains: [
      {
        name_id: "government-officials",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "government-officials",
      },
    ],
  },
  {
    name_id: "atomic-energy",
    names: [
      {
        name: "Department of Atomic Energy",
      },
    ],
    policy_domains: [
      {
        name_id: "energy",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "energy",
      },
    ],
  },
  {
    name_id: "space",
    names: [
      {
        name: "Department of Space",
      },
    ],
    policy_domains: [
      {
        name_id: "space",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "space",
      },
    ],
  },
  {
    name_id: "home-affairs",
    names: [
      {
        name: "Ministry of Home Affairs",
      },
    ],
    policy_domains: [
      {
        name_id: "law-enforcement",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "law-enforcement",
      },
    ],
  },
  {
    name_id: "co-operation",
    names: [
      {
        name: "Ministry of Co-operation",
      },
    ],
    policy_domains: [
      {
        name_id: "cooperative-development",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "cooperative-development",
      },
    ],
  },
  {
    name_id: "road-transport-and-highways",
    names: [
      {
        name: "Ministry of Road Transport and Highways",
      },
    ],
    policy_domains: [
      {
        name_id: "road-transportation",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "road-transportation",
      },
    ],
  },
  {
    name_id: "health-and-family-welfare",
    names: [
      {
        name: "Ministry of Health and Family Welfare",
      },
    ],
    policy_domains: [
      {
        name_id: "healthcare",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "healthcare",
      },
    ],
  },
  {
    name_id: "chemicals-and-fertilizers",
    names: [
      {
        name: "Ministry of Chemicals and Fertilizers",
      },
    ],
    policy_domains: [
      {
        name_id: "chemical-industry",
      },
      {
        name_id: "fertilizer-production",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "chemical-industry",
      },
      {
        name_id: "fertilizer-production",
      },
    ],
  },
  {
    name_id: "agriculture-and-farmers-welfare",
    names: [
      {
        name: "Ministry of Agriculture and Farmers Welfare",
      },
    ],
    policy_domains: [
      {
        name_id: "agriculture",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "agriculture",
      },
    ],
  },
  {
    name_id: "rural-development",
    names: [
      {
        name: "Ministry of Rural Development",
      },
    ],
    policy_domains: [
      {
        name_id: "rural-development",
      },
      {
        name_id: "tribal-welfare",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "rural-development",
      },
      {
        name_id: "tribal-welfare",
      },
    ],
  },
  {
    name_id: "finance",
    names: [
      {
        name: "Ministry of Finance",
      },
    ],
    policy_domains: [
      {
        name_id: "government-finances",
      },
      {
        name_id: "taxesandduties",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "government-finances",
      },
      {
        name_id: "taxesandduties",
      },
    ],
  },
  {
    name_id: "corporate-affairs",
    names: [
      {
        name: "Ministry of Corporate Affairs",
      },
    ],
    policy_domains: [
      {
        name_id: "industries-and-trade",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "industries-and-trade",
      },
    ],
  },
  {
    name_id: "external-affairs",
    names: [
      {
        name: "Ministry of External Affairs",
      },
    ],
    policy_domains: [
      {
        name_id: "international-relations",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "international-relations",
      },
    ],
  },
  {
    name_id: "power",
    names: [
      {
        name: "Ministry of Power",
      },
    ],
    policy_domains: [
      {
        name_id: "energy",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "energy",
      },
    ],
  },
  {
    name_id: "housing-and-urban-affairs",
    names: [
      {
        name: "Ministry of Housing and Urban Affairs",
      },
    ],
    policy_domains: [
      {
        name_id: "urban-development",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "urban-development",
      },
    ],
  },
  {
    name_id: "heavy-industries",
    names: [
      {
        name: "Ministry of Heavy Industries",
      },
    ],
    policy_domains: [
      {
        name_id: "heavy-industry-development",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "heavy-industry-development",
      },
    ],
  },
  {
    name_id: "steel",
    names: [
      {
        name: "Ministry of Steel",
      },
    ],
    policy_domains: [
      {
        name_id: "industries-and-trade",
      },
      {
        name_id: "minerals",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "industries-and-trade",
      },
      {
        name_id: "minerals",
      },
    ],
  },
  {
    name_id: "commerce-and-industry",
    names: [
      {
        name: "Ministry of Commerce and Industry",
      },
    ],
    policy_domains: [
      {
        name_id: "industries-and-trade",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "industries-and-trade",
      },
    ],
  },
  {
    name_id: "education",
    names: [
      {
        name: "Ministry of Education",
      },
    ],
    policy_domains: [
      {
        name_id: "education",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "education",
      },
    ],
  },
  {
    name_id: "micro-small-and-medium-enterprises",
    names: [
      {
        name: "Ministry of Micro, Small and Medium Enterprises",
      },
    ],
    policy_domains: [
      {
        name_id: "industries-and-trade",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "industries-and-trade",
      },
    ],
  },
  {
    name_id: "panchayati-raj",
    names: [
      {
        name: "Ministry of Panchayati Raj",
      },
    ],
    policy_domains: [
      {
        name_id: "local-governance",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "local-governance",
      },
    ],
  },
  {
    name_id: "fisheries-animal-husbandry-and-dairying",
    names: [
      {
        name: "Ministry of Fisheries, Animal Husbandry and Dairying",
      },
    ],
    policy_domains: [
      {
        name_id: "fishing",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "fishing",
      },
    ],
  },
  {
    name_id: "ports-shipping-and-waterways",
    names: [
      {
        name: "Ministry of Ports, Shipping and Waterways",
      },
    ],
    policy_domains: [
      {
        name_id: "ports-and-shipping",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "ports-and-shipping",
      },
    ],
  },
  {
    name_id: "social-justice-and-empowerment",
    names: [
      {
        name: "Ministry of Social Justice and Empowerment",
      },
    ],
    policy_domains: [
      {
        name_id: "social-welfare",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "social-welfare",
      },
    ],
  },
  {
    name_id: "civil-aviation",
    names: [
      {
        name: "Ministry of Civil Aviation",
      },
    ],
    policy_domains: [
      {
        name_id: "civil-aviation",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "civil-aviation",
      },
    ],
  },
  {
    name_id: "consumer-affairs-food-and-public-distribution",
    names: [
      {
        name: "Ministry of Consumer Affairs, Food and Public Distribution",
      },
    ],
    policy_domains: [
      {
        name_id: "consumer-rights",
      },
      {
        name_id: "food-security",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "consumer-rights",
      },
      {
        name_id: "food-security",
      },
    ],
  },
  {
    name_id: "new-and-renewable-energy",
    names: [
      {
        name: "Ministry of New and Renewable Energy",
      },
    ],
    policy_domains: [
      {
        name_id: "environment",
      },
      {
        name_id: "energy",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "environment",
      },
      {
        name_id: "energy",
      },
    ],
  },
  {
    name_id: "tribal-affairs",
    names: [
      {
        name: "Ministry of Tribal Affairs",
      },
    ],
    policy_domains: [
      {
        name_id: "tribal-welfare",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "tribal-welfare",
      },
    ],
  },
  {
    name_id: "textiles",
    names: [
      {
        name: "Ministry of Textiles",
      },
    ],
    policy_domains: [
      {
        name_id: "textile-industry",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "textile-industry",
      },
    ],
  },
  {
    name_id: "railways",
    names: [
      {
        name: "Ministry of Railways",
      },
    ],
    policy_domains: [
      {
        name_id: "railways",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "railways",
      },
    ],
  },
  {
    name_id: "information-and-broadcasting",
    names: [
      {
        name: "Ministry of Information and Broadcasting",
      },
    ],
    policy_domains: [
      {
        name_id: "public-broadcasting",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "public-broadcasting",
      },
    ],
  },
  {
    name_id: "electronics-and-information-technology",
    names: [
      {
        name: "Ministry of Electronics and Information Technology",
      },
    ],
    policy_domains: [
      { name_id: "electronics-and-information-technology" },
      {
        name_id: "communication",
      },
    ],
    policy_domain_ministries_list: [
      { name_id: "electronics-and-information-technology" },
      {
        name_id: "communication",
      },
    ],
  },
  {
    name_id: "communications",
    names: [
      {
        name: "Ministry of Communications",
      },
    ],
    policy_domains: [
      {
        name_id: "communication",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "communication",
      },
    ],
  },
  {
    name_id: "development-of-north-eastern-region",
    names: [
      {
        name: "Ministry of Development of North Eastern Region",
      },
    ],
    policy_domains: [
      {
        name_id: "northeast-development",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "northeast-development",
      },
    ],
  },
  {
    name_id: "environment-forest-and-climate-change",
    names: [
      {
        name: "Ministry of Environment, Forest and Climate Change",
      },
    ],
    policy_domains: [
      {
        name_id: "environment",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "environment",
      },
    ],
  },
  {
    name_id: "culture",
    names: [
      {
        name: "Ministry of Culture",
      },
    ],
    policy_domains: [
      {
        name_id: "history-and-culture",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "history-and-culture",
      },
    ],
  },
  {
    name_id: "tourism",
    names: [
      {
        name: "Ministry of Tourism",
      },
    ],
    policy_domains: [
      {
        name_id: "tourism-industry",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "tourism-industry",
      },
    ],
  },
  {
    name_id: "women-and-child-development",
    names: [
      {
        name: "Ministry of Women and Child Development",
      },
    ],
    policy_domains: [
      {
        name_id: "women-empowerment",
      },
      {
        name_id: "child-welfare",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "women-empowerment",
      },
      {
        name_id: "child-welfare",
      },
    ],
  },
  {
    name_id: "parliamentary-affairs",
    names: [
      {
        name: "Ministry of Parliamentary Affairs",
      },
    ],
    policy_domains: [
      {
        name_id: "legislative-affairs",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "legislative-affairs",
      },
    ],
  },
  {
    name_id: "minority-affairs",
    names: [
      {
        name: "Ministry of Minority Affairs",
      },
    ],
    policy_domains: [
      {
        name_id: "minority-welfare",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "minority-welfare",
      },
    ],
  },
  {
    name_id: "petroleum-and-natural-gas",
    names: [
      {
        name: "Ministry of Petroleum and Natural Gas",
      },
    ],
    policy_domains: [
      {
        name_id: "petroleum-natural-gas",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "petroleum-natural-gas",
      },
    ],
  },
  {
    name_id: "labour-and-employment",
    names: [
      {
        name: "Ministry of Labour and Employment",
      },
    ],
    policy_domains: [
      {
        name_id: "labour",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "labour",
      },
    ],
  },
  {
    name_id: "youth-affairs-and-sports",
    names: [
      {
        name: "Ministry of Youth Affairs and Sports",
      },
    ],
    policy_domains: [
      {
        name_id: "youth-development",
      },
      {
        name_id: "sports",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "youth-development",
      },
      {
        name_id: "sports",
      },
    ],
  },
  {
    name_id: "coal",
    names: [
      {
        name: "Ministry of Coal",
      },
    ],
    policy_domains: [
      {
        name_id: "minerals",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "minerals",
      },
    ],
  },
  {
    name_id: "mines",
    names: [
      {
        name: "Ministry of Mines",
      },
    ],
    policy_domains: [
      {
        name_id: "minerals",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "minerals",
      },
    ],
  },
  {
    name_id: "food-processing-industries",
    names: [
      {
        name: "Ministry of Food Processing Industries",
      },
    ],
    policy_domains: [
      {
        name_id: "food-processing-industry",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "food-processing-industry",
      },
    ],
  },
  {
    name_id: "jal-shakti",
    names: [
      {
        name: "Ministry of Jal Shakti",
      },
    ],
    policy_domains: [
      {
        name_id: "water-resources",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "water-resources",
      },
    ],
  },
];

let ministriesDomainsKeyed: any = {
  "personnel-public-grievances-and-pensions": {
    name_id: "personnel-public-grievances-and-pensions",
    names: [
      {
        name: "Ministry of Personnel, Public Grievances and Pensions",
      },
    ],
    policy_domains: [
      {
        name_id: "government-officials",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "government-officials",
      },
    ],
  },
  "atomic-energy": {
    name_id: "atomic-energy",
    names: [
      {
        name: "Department of Atomic Energy",
      },
    ],
    policy_domains: [
      {
        name_id: "energy",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "energy",
      },
    ],
  },
  space: {
    name_id: "space",
    names: [
      {
        name: "Department of Space",
      },
    ],
    policy_domains: [
      {
        name_id: "space",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "space",
      },
    ],
  },
  defence: {
    name_id: "defence",
    names: [
      {
        name: "Ministry of Defence",
      },
    ],
    policy_domains: [
      {
        name_id: "defence",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "defence",
      },
    ],
  },
  "home-affairs": {
    name_id: "home-affairs",
    names: [
      {
        name: "Ministry of Home Affairs",
      },
    ],
    policy_domains: [
      {
        name_id: "law-enforcement",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "law-enforcement",
      },
    ],
  },
  "co-operation": {
    name_id: "co-operation",
    names: [
      {
        name: "Ministry of Co-operation",
      },
    ],
    policy_domains: [
      {
        name_id: "cooperative-development",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "cooperative-development",
      },
    ],
  },
  "road-transport-and-highways": {
    name_id: "road-transport-and-highways",
    names: [
      {
        name: "Ministry of Road Transport and Highways",
      },
    ],
    policy_domains: [
      {
        name_id: "road-transportation",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "road-transportation",
      },
    ],
  },
  "health-and-family-welfare": {
    name_id: "health-and-family-welfare",
    names: [
      {
        name: "Ministry of Health and Family Welfare",
      },
    ],
    policy_domains: [
      {
        name_id: "healthcare",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "healthcare",
      },
    ],
  },
  "chemicals-and-fertilizers": {
    name_id: "chemicals-and-fertilizers",
    names: [
      {
        name: "Ministry of Chemicals and Fertilizers",
      },
    ],
    policy_domains: [
      {
        name_id: "chemical-industry",
      },
      {
        name_id: "fertilizer-production",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "chemical-industry",
      },
      {
        name_id: "fertilizer-production",
      },
    ],
  },
  "agriculture-and-farmers-welfare": {
    name_id: "agriculture-and-farmers-welfare",
    names: [
      {
        name: "Ministry of Agriculture and Farmers Welfare",
      },
    ],
    policy_domains: [
      {
        name_id: "agriculture",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "agriculture",
      },
    ],
  },
  "rural-development": {
    name_id: "rural-development",
    names: [
      {
        name: "Ministry of Rural Development",
      },
    ],
    policy_domains: [
      {
        name_id: "rural-development",
      },
      {
        name_id: "tribal-welfare",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "rural-development",
      },
      {
        name_id: "tribal-welfare",
      },
    ],
  },
  finance: {
    name_id: "finance",
    names: [
      {
        name: "Ministry of Finance",
      },
    ],
    policy_domains: [
      {
        name_id: "government-finances",
      },
      {
        name_id: "taxesandduties",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "government-finances",
      },
      {
        name_id: "taxesandduties",
      },
    ],
  },
  "corporate-affairs": {
    name_id: "corporate-affairs",
    names: [
      {
        name: "Ministry of Corporate Affairs",
      },
    ],
    policy_domains: [
      {
        name_id: "industries-and-trade",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "industries-and-trade",
      },
    ],
  },
  "external-affairs": {
    name_id: "external-affairs",
    names: [
      {
        name: "Ministry of External Affairs",
      },
    ],
    policy_domains: [
      {
        name_id: "international-relations",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "international-relations",
      },
    ],
  },
  power: {
    name_id: "power",
    names: [
      {
        name: "Ministry of Power",
      },
    ],
    policy_domains: [
      {
        name_id: "energy",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "energy",
      },
    ],
  },
  "housing-and-urban-affairs": {
    name_id: "housing-and-urban-affairs",
    names: [
      {
        name: "Ministry of Housing and Urban Affairs",
      },
    ],
    policy_domains: [
      {
        name_id: "urban-development",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "urban-development",
      },
    ],
  },
  "heavy-industries": {
    name_id: "heavy-industries",
    names: [
      {
        name: "Ministry of Heavy Industries",
      },
    ],
    policy_domains: [
      {
        name_id: "heavy-industry-development",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "heavy-industry-development",
      },
    ],
  },
  steel: {
    name_id: "steel",
    names: [
      {
        name: "Ministry of Steel",
      },
    ],
    policy_domains: [
      {
        name_id: "industries-and-trade",
      },
      {
        name_id: "minerals",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "industries-and-trade",
      },
      {
        name_id: "minerals",
      },
    ],
  },
  "commerce-and-industry": {
    name_id: "commerce-and-industry",
    names: [
      {
        name: "Ministry of Commerce and Industry",
      },
    ],
    policy_domains: [
      {
        name_id: "industries-and-trade",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "industries-and-trade",
      },
    ],
  },
  education: {
    name_id: "education",
    names: [
      {
        name: "Ministry of Education",
      },
    ],
    policy_domains: [
      {
        name_id: "education",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "education",
      },
    ],
  },
  "micro-small-and-medium-enterprises": {
    name_id: "micro-small-and-medium-enterprises",
    names: [
      {
        name: "Ministry of Micro, Small and Medium Enterprises",
      },
    ],
    policy_domains: [
      {
        name_id: "industries-and-trade",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "industries-and-trade",
      },
    ],
  },
  "panchayati-raj": {
    name_id: "panchayati-raj",
    names: [
      {
        name: "Ministry of Panchayati Raj",
      },
    ],
    policy_domains: [
      {
        name_id: "local-governance",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "local-governance",
      },
    ],
  },
  "fisheries-animal-husbandry-and-dairying": {
    name_id: "fisheries-animal-husbandry-and-dairying",
    names: [
      {
        name: "Ministry of Fisheries, Animal Husbandry and Dairying",
      },
    ],
    policy_domains: [
      {
        name_id: "fishing",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "fishing",
      },
    ],
  },
  "ports-shipping-and-waterways": {
    name_id: "ports-shipping-and-waterways",
    names: [
      {
        name: "Ministry of Ports, Shipping and Waterways",
      },
    ],
    policy_domains: [
      {
        name_id: "ports-and-shipping",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "ports-and-shipping",
      },
    ],
  },
  "social-justice-and-empowerment": {
    name_id: "social-justice-and-empowerment",
    names: [
      {
        name: "Ministry of Social Justice and Empowerment",
      },
    ],
    policy_domains: [
      {
        name_id: "social-welfare",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "social-welfare",
      },
    ],
  },
  "civil-aviation": {
    name_id: "civil-aviation",
    names: [
      {
        name: "Ministry of Civil Aviation",
      },
    ],
    policy_domains: [
      {
        name_id: "civil-aviation",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "civil-aviation",
      },
    ],
  },
  "consumer-affairs-food-and-public-distribution": {
    name_id: "consumer-affairs-food-and-public-distribution",
    names: [
      {
        name: "Ministry of Consumer Affairs, Food and Public Distribution",
      },
    ],
    policy_domains: [
      {
        name_id: "consumer-rights",
      },
      {
        name_id: "food-security",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "consumer-rights",
      },
      {
        name_id: "food-security",
      },
    ],
  },
  "new-and-renewable-energy": {
    name_id: "new-and-renewable-energy",
    names: [
      {
        name: "Ministry of New and Renewable Energy",
      },
    ],
    policy_domains: [
      {
        name_id: "environment",
      },
      {
        name_id: "energy",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "environment",
      },
      {
        name_id: "energy",
      },
    ],
  },
  "tribal-affairs": {
    name_id: "tribal-affairs",
    names: [
      {
        name: "Ministry of Tribal Affairs",
      },
    ],
    policy_domains: [
      {
        name_id: "tribal-welfare",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "tribal-welfare",
      },
    ],
  },
  textiles: {
    name_id: "textiles",
    names: [
      {
        name: "Ministry of Textiles",
      },
    ],
    policy_domains: [
      {
        name_id: "textile-industry",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "textile-industry",
      },
    ],
  },
  railways: {
    name_id: "railways",
    names: [
      {
        name: "Ministry of Railways",
      },
    ],
    policy_domains: [
      {
        name_id: "railways",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "railways",
      },
    ],
  },
  "information-and-broadcasting": {
    name_id: "information-and-broadcasting",
    names: [
      {
        name: "Ministry of Information and Broadcasting",
      },
    ],
    policy_domains: [
      {
        name_id: "public-broadcasting",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "public-broadcasting",
      },
    ],
  },
  "electronics-and-information-technology": {
    name_id: "electronics-and-information-technology",
    names: [
      {
        name: "Ministry of Electronics and Information Technology",
      },
    ],
    policy_domains: [
      {
        name_id: "electronics-and-information-technology",
      },
      {
        name_id: "communication",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "electronics-and-information-technology",
      },
      {
        name_id: "communication",
      },
    ],
  },
  communications: {
    name_id: "communications",
    names: [
      {
        name: "Ministry of Communications",
      },
    ],
    policy_domains: [
      {
        name_id: "communication",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "communication",
      },
    ],
  },
  "development-of-north-eastern-region": {
    name_id: "development-of-north-eastern-region",
    names: [
      {
        name: "Ministry of Development of North Eastern Region",
      },
    ],
    policy_domains: [
      {
        name_id: "northeast-development",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "northeast-development",
      },
    ],
  },
  "environment-forest-and-climate-change": {
    name_id: "environment-forest-and-climate-change",
    names: [
      {
        name: "Ministry of Environment, Forest and Climate Change",
      },
    ],
    policy_domains: [
      {
        name_id: "environment",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "environment",
      },
    ],
  },
  culture: {
    name_id: "culture",
    names: [
      {
        name: "Ministry of Culture",
      },
    ],
    policy_domains: [
      {
        name_id: "history-and-culture",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "history-and-culture",
      },
    ],
  },
  tourism: {
    name_id: "tourism",
    names: [
      {
        name: "Ministry of Tourism",
      },
    ],
    policy_domains: [
      {
        name_id: "tourism-industry",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "tourism-industry",
      },
    ],
  },
  "women-and-child-development": {
    name_id: "women-and-child-development",
    names: [
      {
        name: "Ministry of Women and Child Development",
      },
    ],
    policy_domains: [
      {
        name_id: "women-empowerment",
      },
      {
        name_id: "child-welfare",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "women-empowerment",
      },
      {
        name_id: "child-welfare",
      },
    ],
  },
  "parliamentary-affairs": {
    name_id: "parliamentary-affairs",
    names: [
      {
        name: "Ministry of Parliamentary Affairs",
      },
    ],
    policy_domains: [
      {
        name_id: "legislative-affairs",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "legislative-affairs",
      },
    ],
  },
  "minority-affairs": {
    name_id: "minority-affairs",
    names: [
      {
        name: "Ministry of Minority Affairs",
      },
    ],
    policy_domains: [
      {
        name_id: "minority-welfare",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "minority-welfare",
      },
    ],
  },
  "petroleum-and-natural-gas": {
    name_id: "petroleum-and-natural-gas",
    names: [
      {
        name: "Ministry of Petroleum and Natural Gas",
      },
    ],
    policy_domains: [
      {
        name_id: "petroleum-natural-gas",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "petroleum-natural-gas",
      },
    ],
  },
  "labour-and-employment": {
    name_id: "labour-and-employment",
    names: [
      {
        name: "Ministry of Labour and Employment",
      },
    ],
    policy_domains: [
      {
        name_id: "labour",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "labour",
      },
    ],
  },
  "youth-affairs-and-sports": {
    name_id: "youth-affairs-and-sports",
    names: [
      {
        name: "Ministry of Youth Affairs and Sports",
      },
    ],
    policy_domains: [
      {
        name_id: "youth-development",
      },
      {
        name_id: "sports",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "youth-development",
      },
      {
        name_id: "sports",
      },
    ],
  },
  coal: {
    name_id: "coal",
    names: [
      {
        name: "Ministry of Coal",
      },
    ],
    policy_domains: [
      {
        name_id: "minerals",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "minerals",
      },
    ],
  },
  mines: {
    name_id: "mines",
    names: [
      {
        name: "Ministry of Mines",
      },
    ],
    policy_domains: [
      {
        name_id: "minerals",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "minerals",
      },
    ],
  },
  "food-processing-industries": {
    name_id: "food-processing-industries",
    names: [
      {
        name: "Ministry of Food Processing Industries",
      },
    ],
    policy_domains: [
      {
        name_id: "food-processing-industry",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "food-processing-industry",
      },
    ],
  },
  "jal-shakti": {
    name_id: "jal-shakti",
    names: [
      {
        name: "Ministry of Jal Shakti",
      },
    ],
    policy_domains: [
      {
        name_id: "water-resources",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "water-resources",
      },
    ],
  },
};

let allInOneMinisteries = [
  {
    person: {
      names: [
        {
          id: "0x9be95fc611",
        },
      ],
      wikidata_qid: "Q1058",
      wikipedia_page: "https://en.wikipedia.org/wiki/Narendra_Modi",
    },
    ministries: [
      {
        name_id: "personnel-public-grievances-and-pensions",
        wikidata_qid: "Q4294428",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Personnel,_Public_Grievances_and_Pensions",
      },
      {
        name_id: "atomic-energy",
        wikidata_qid: "Q3523073",
        wikipedia_page: "https://en.wikipedia.org/wiki/Department_of_Atomic_Energy",
      },
      {
        name_id: "space",
        wikidata_qid: "Q4158548",
        wikipedia_page: "https://en.wikipedia.org/wiki/Department_of_Space",
      },
    ],
  },
  {
    person: {
      names: [
        {
          id: "0x9be95fc613",
        },
      ],
      wikidata_qid: "Q3506475",
      wikipedia_page: "https://en.wikipedia.org/wiki/Rajnath_Singh",
    },
    ministries: [
      {
        name_id: "defence",
        wikidata_qid: "Q2641653",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Defence_(India)",
      },
    ],
  },
  {
    person: {
      names: [
        {
          id: "0x9be95fc616",
        },
      ],
      wikidata_qid: "Q4746875",
      wikipedia_page: "https://en.wikipedia.org/wiki/Amit_Shah",
    },
    ministries: [
      {
        name_id: "home-affairs",
        wikidata_qid: "Q2607861",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Home_Affairs_(India)",
      },
      {
        name_id: "co-operation",
        wikidata_qid: "Q107599813",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Co-operation",
      },
    ],
  },
  {
    person: {
      names: [
        {
          id: "0x9be95fc618",
        },
      ],
      wikidata_qid: "Q3504520",
      wikipedia_page: "https://en.wikipedia.org/wiki/Nitin_Gadkari",
    },
    ministries: [
      {
        name_id: "road-transport-and-highways",
        wikidata_qid: "Q167156",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Road_Transport_and_Highways",
      },
    ],
  },
  {
    person: {
      names: [
        {
          id: "0x9be95fc61b",
        },
      ],
      wikidata_qid: "Q16193764",
      wikipedia_page: "https://en.wikipedia.org/wiki/J._P._Nadda",
    },
    ministries: [
      {
        name_id: "health-and-family-welfare",
        wikidata_qid: "Q3525265",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Health_and_Family_Welfare",
      },
      {
        name_id: "chemicals-and-fertilizers",
        wikidata_qid: "Q4294812",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Chemicals_and_Fertilizers",
      },
    ],
  },
  {
    person: {
      names: [
        {
          id: "0x9be95fc61e",
        },
      ],
      wikidata_qid: "Q3180602",
      wikipedia_page: "https://en.wikipedia.org/wiki/Shivraj_Singh_Chouhan",
    },
    ministries: [
      {
        name_id: "agriculture-and-farmers-welfare",
        wikidata_qid: "Q3634069",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Agriculture_and_Farmers%27_Welfare",
      },
      {
        name_id: "rural-development",
        wikidata_qid: "Q6867517",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Rural_Development_(India)",
      },
    ],
  },
  {
    person: {
      names: [
        {
          id: "0x9be95fc621",
        },
      ],
      wikidata_qid: "Q7040049",
      wikipedia_page: "https://en.wikipedia.org/wiki/Nirmala_Sitharaman",
    },
    ministries: [
      {
        name_id: "finance",
        wikidata_qid: "Q2641068",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Finance_(India)",
      },
      {
        name_id: "corporate-affairs",
        wikidata_qid: "Q4294596",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Corporate_Affairs",
      },
    ],
  },
  {
    person: {
      names: [
        {
          id: "0x9be95fc623",
        },
      ],
      wikidata_qid: "Q16186720",
      wikipedia_page: "https://en.wikipedia.org/wiki/S._Jaishankar",
    },
    ministries: [
      {
        name_id: "external-affairs",
        wikidata_qid: "Q3524953",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_External_Affairs_(India)",
      },
    ],
  },
  {
    person: {
      names: [
        {
          id: "0x9be95fc626",
        },
      ],
      wikidata_qid: "Q18336221",
      wikipedia_page: "https://en.wikipedia.org/wiki/Manohar_Lal_Khattar",
    },
    ministries: [
      {
        name_id: "power",
        wikidata_qid: "Q4294844",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Power_(India)",
      },
      {
        name_id: "housing-and-urban-affairs",
        wikidata_qid: "Q4294334",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Housing_and_Urban_Affairs",
      },
    ],
  },
  {
    person: {
      names: [
        {
          id: "0x9be95fc629",
        },
      ],
      wikidata_qid: "Q251790",
      wikipedia_page: "https://en.wikipedia.org/wiki/H._D._Kumaraswamy",
    },
    ministries: [
      {
        name_id: "heavy-industries",
        wikidata_qid: "Q108619669",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Heavy_Industries",
      },
      {
        name_id: "steel",
        wikidata_qid: "Q3525381",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Steel",
      },
    ],
  },
  {
    person: {
      names: [
        {
          id: "0x9be95fc62b",
        },
      ],
      wikidata_qid: "Q7199798",
      wikipedia_page: "https://en.wikipedia.org/wiki/Piyush_Goyal",
    },
    ministries: [
      {
        name_id: "commerce-and-industry",
        wikidata_qid: "Q4294724",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Commerce_and_Industry_(India)",
      },
    ],
  },
  {
    person: {
      names: [
        {
          id: "0x9be95fc62d",
        },
      ],
      wikidata_qid: "Q5269370",
      wikipedia_page: "https://en.wikipedia.org/wiki/Dharmendra_Pradhan",
    },
    ministries: [
      {
        name_id: "education",
        wikidata_qid: "Q4294642",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Education_(India)",
      },
    ],
  },
  {
    person: {
      names: [
        {
          id: "0x9be95fc62f",
        },
      ],
      wikidata_qid: "Q16910976",
      wikipedia_page: "https://en.wikipedia.org/wiki/Jitan_Ram_Manjhi",
    },
    ministries: [
      {
        name_id: "micro-small-and-medium-enterprises",
        wikidata_qid: "Q4294585",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Micro,_Small_and_Medium_Enterprises",
      },
    ],
  },
  {
    person: {
      names: [
        {
          id: "0x9be95fc632",
        },
      ],
      wikidata_qid: "Q7286245",
      wikipedia_page: "https://en.wikipedia.org/wiki/Lalan_Singh",
    },
    ministries: [
      {
        name_id: "panchayati-raj",
        wikidata_qid: "Q4294588",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Panchayati_Raj",
      },
      {
        name_id: "fisheries-animal-husbandry-and-dairying",
        wikidata_qid: "Q65042516",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Fisheries,_Animal_Husbandry_and_Dairying",
      },
    ],
  },
  {
    person: {
      names: [
        {
          id: "0x9be95fc634",
        },
      ],
      wikidata_qid: "Q7423486",
      wikipedia_page: "https://en.wikipedia.org/wiki/Sarbananda_Sonowal",
    },
    ministries: [
      {
        name_id: "ports-shipping-and-waterways",
        wikidata_qid: "Q4294719",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Ports,_Shipping_and_Waterways",
      },
    ],
  },
  {
    person: {
      names: [
        {
          id: "0x9be95fc636",
        },
      ],
      wikidata_qid: "Q7933694",
      wikipedia_page: "https://en.wikipedia.org/wiki/Virendra_Kumar_Khatik",
    },
    ministries: [
      {
        name_id: "social-justice-and-empowerment",
        wikidata_qid: "Q4294701",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Social_Justice_and_Empowerment",
      },
    ],
  },
  {
    person: {
      names: [
        {
          id: "0x9be95fc638",
        },
      ],
      wikidata_qid: "Q16901223",
      wikipedia_page: "https://en.wikipedia.org/wiki/Kinjarapu_Ram_Mohan_Naidu",
    },
    ministries: [
      {
        name_id: "civil-aviation",
        wikidata_qid: "Q15650503",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Civil_Aviation_(India)",
      },
    ],
  },
  {
    person: {
      names: [
        {
          id: "0x9be95fc63b",
        },
      ],
      wikidata_qid: "Q7238224",
      wikipedia_page: "https://en.wikipedia.org/wiki/Pralhad_Joshi",
    },
    ministries: [
      {
        name_id: "consumer-affairs-food-and-public-distribution",
        wikidata_qid: "Q3525212",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Consumer_Affairs,_Food_and_Public_Distribution",
      },
      {
        name_id: "new-and-renewable-energy",
        wikidata_qid: "Q4294489",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_New_and_Renewable_Energy",
      },
    ],
  },
  {
    person: {
      names: [
        {
          id: "0x9be95fc63d",
        },
      ],
      wikidata_qid: "Q6298726",
      wikipedia_page: "https://en.wikipedia.org/wiki/Jual_Oram",
    },
    ministries: [
      {
        name_id: "tribal-affairs",
        wikidata_qid: "Q6867635",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Tribal_Affairs",
      },
    ],
  },
  {
    person: {
      names: [
        {
          id: "0x9be95fc63f",
        },
      ],
      wikidata_qid: "Q16736894",
      wikipedia_page: "https://en.wikipedia.org/wiki/Giriraj_Singh",
    },
    ministries: [
      {
        name_id: "textiles",
        wikidata_qid: "Q4294449",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Textiles",
      },
    ],
  },
  {
    person: {
      names: [
        {
          id: "0x9be95fc643",
        },
      ],
      wikidata_qid: "Q75184694",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ashwini_Vaishnaw",
    },
    ministries: [
      {
        name_id: "railways",
        wikidata_qid: "Q6866301",
        wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Railways_(India)",
      },
      {
        name_id: "information-and-broadcasting",
        wikidata_qid: "Q4294412",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Information_and_Broadcasting_(India)",
      },
      {
        name_id: "electronics-and-information-technology",
        wikidata_qid: "Q16956017",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Electronics_and_Information_Technology",
      },
    ],
  },
  {
    person: {
      names: [
        {
          id: "0x9be95fc646",
        },
      ],
      wikidata_qid: "Q16213761",
      wikipedia_page: "https://en.wikipedia.org/wiki/Jyotiraditya_Scindia",
    },
    ministries: [
      {
        name_id: "communications",
        wikidata_qid: "Q12454897",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Communications_(India)",
      },
      {
        name_id: "development-of-north-eastern-region",
        wikidata_qid: "Q4294643",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Development_of_North_Eastern_Region",
      },
    ],
  },
  {
    person: {
      names: [
        {
          id: "0x9be95fc648",
        },
      ],
      wikidata_qid: "Q16208337",
      wikipedia_page: "https://en.wikipedia.org/wiki/Bhupender_Yadav",
    },
    ministries: [
      {
        name_id: "environment-forest-and-climate-change",
        wikidata_qid: "Q2749442",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Environment,_Forest_and_Climate_Change",
      },
    ],
  },
  {
    person: {
      names: [
        {
          id: "0x9be95fc64b",
        },
      ],
      wikidata_qid: "Q16914124",
      wikipedia_page: "https://en.wikipedia.org/wiki/Gajendra_Singh_Shekhawat",
    },
    ministries: [
      {
        name_id: "culture",
        wikidata_qid: "Q4294433",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Culture_(India)",
      },
      {
        name_id: "tourism",
        wikidata_qid: "Q4294772",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Tourism_(India)",
      },
    ],
  },
  {
    person: {
      names: [
        {
          id: "0x9be95fc64d",
        },
      ],
      wikidata_qid: "Q64010478",
      wikipedia_page: "https://en.wikipedia.org/wiki/Annpurna_Devi",
    },
    ministries: [
      {
        name_id: "women-and-child-development",
        wikidata_qid: "Q12446115",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Women_and_Child_Development",
      },
    ],
  },
  {
    person: {
      names: [
        {
          id: "0x9be95fc650",
        },
      ],
      wikidata_qid: "Q6415053",
      wikipedia_page: "https://en.wikipedia.org/wiki/Kiren_Rijiju",
    },
    ministries: [
      {
        name_id: "parliamentary-affairs",
        wikidata_qid: "Q12455047",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Parliamentary_Affairs_(India)",
      },
      {
        name_id: "minority-affairs",
        wikidata_qid: "Q4294587",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Minority_Affairs",
      },
    ],
  },
  {
    person: {
      names: [
        {
          id: "0x9be95fc652",
        },
      ],
      wikidata_qid: "Q5655835",
      wikipedia_page: "https://en.wikipedia.org/wiki/Hardeep_Singh_Puri",
    },
    ministries: [
      {
        name_id: "petroleum-and-natural-gas",
        wikidata_qid: "Q4294487",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Petroleum_and_Natural_Gas",
      },
    ],
  },
  {
    person: {
      names: [
        {
          id: "0x9be95fc655",
        },
      ],
      wikidata_qid: "Q21170728",
      wikipedia_page: "https://en.wikipedia.org/wiki/Mansukh_Mandaviya",
    },
    ministries: [
      {
        name_id: "labour-and-employment",
        wikidata_qid: "Q4294756",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Labour_and_Employment_(India)",
      },
      {
        name_id: "youth-affairs-and-sports",
        wikidata_qid: "Q4294590",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Youth_Affairs_and_Sports",
      },
    ],
  },
  {
    person: {
      names: [
        {
          id: "0x9be95fc658",
        },
      ],
      wikidata_qid: "Q5512319",
      wikipedia_page: "https://en.wikipedia.org/wiki/G._Kishan_Reddy",
    },
    ministries: [
      {
        name_id: "coal",
        wikidata_qid: "Q3525316",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Coal",
      },
      {
        name_id: "mines",
        wikidata_qid: "Q4294327",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Mines_(India)",
      },
    ],
  },
  {
    person: {
      names: [
        {
          id: "0x9be95fc65a",
        },
      ],
      wikidata_qid: "Q16728004",
      wikipedia_page: "https://en.wikipedia.org/wiki/Chirag_Paswan",
    },
    ministries: [
      {
        name_id: "food-processing-industries",
        wikidata_qid: "Q4294565",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Food_Processing_Industries",
      },
    ],
  },
  {
    person: {
      names: [
        {
          id: "0x9be95fc65c",
        },
      ],
      wikidata_qid: "Q5071367",
      wikipedia_page: "https://en.wikipedia.org/wiki/C._R._Patil",
    },
    ministries: [
      {
        name_id: "jal-shakti",
        wikidata_qid: "Q85785741",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Jal_Shakti",
      },
    ],
  },
];

async function openPage(context: any, url: string) {
  try {
    const page = await context.newPage();
    await page.goto(url);
    await page.waitForEvent("requestfinished");

    return page;
  } catch (error) {
    console.error(`Failed to open URL: ${url}`, error);
  }
}

async function processWikipediaPage(page: any) {
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

  return result;
}

async function extractDataFromWikipediaPage(context: any, url: string) {
  try {
    const page = await openPage(context, url);
    const list = await processWikipediaPage(page);

    await page.close();
    return list;
  } catch (error: any) {
    const errorData = {
      url,
      message: error.toString(),
      timestamp: new Date().toISOString(),
    };
    // logError(errorData);
  }
}

async function processListOfWikipediaPage(url: string) {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  let result;

  try {
    result = await extractDataFromWikipediaPage(context, url);
    console.log("finished processing url: ", url);
    console.log("DONE!!!");
  } catch (error) {
    console.error("Error processing pages:", error);
  } finally {
    await browser.close(); // Ensure the browser closes
  }

  return {
    url,
    result,
  };
}

async function fetchWikiDataQids(ministries: any) {
  for (let m in ministries) {
    for (let p in ministries[m].portfolio) {
      console.log(ministries[m].portfolio[p].href);
      const result = await processListOfWikipediaPage(ministries[m].portfolio[p].href);
      ministries[m].portfolio[p] = { ...ministries[m].portfolio[p], ...result };
    }
    console.log(ministries[m].minister.href);
    const result = await processListOfWikipediaPage(ministries[m].minister.href);
    ministries[m].minister = { ...ministries[m].minister, ...result };
  }

  // console.log(JSON.stringify(ministries, null, 2));
  return ministries;
}

let independentCharge = [
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Statistics_and_Programme_Implementation",
        text: "Ministry of Statistics and Programme Implementation",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Statistics_and_Programme_Implementation",
        result: {
          wikidata_qid: "Q4294710",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Statistics_and_Programme_Implementation",
        },
      },
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Planning_(India)",
        text: "Ministry of Planning",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Planning_(India)",
        result: {
          wikidata_qid: "Q65042854",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Planning_(India)",
        },
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Rao_Inderjit_Singh",
      text: "Rao Inderjit Singh",
      url: "https://en.wikipedia.org/wiki/Rao_Inderjit_Singh",
      result: {
        wikidata_qid: "Q7293676",
        wikipedia_page: "https://en.wikipedia.org/wiki/Rao_Inderjit_Singh",
      },
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Science_and_Technology_(India)",
        text: "Ministry of Science and Technology",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Science_and_Technology_(India)",
        result: {
          wikidata_qid: "Q4294472",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Science_and_Technology_(India)",
        },
      },
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Earth_Sciences",
        text: "Ministry of Earth Sciences",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Earth_Sciences",
        result: {
          wikidata_qid: "Q4294372",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Earth_Sciences",
        },
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Jitendra_Singh_(politician,_born_1956)",
      text: "Jitendra Singh",
      url: "https://en.wikipedia.org/wiki/Jitendra_Singh_(politician,_born_1956)",
      result: {
        wikidata_qid: "Q6203277",
        wikipedia_page: "https://en.wikipedia.org/wiki/Jitendra_Singh_Rana",
      },
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Minister_of_Law_and_Justice",
        text: "Ministry of Law and Justice",
        url: "https://en.wikipedia.org/wiki/Minister_of_Law_and_Justice",
        result: {
          wikidata_qid: "Q18128071",
          wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Law_and_Justice",
        },
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Arjun_Ram_Meghwal",
      text: "Arjun Ram Meghwal",
      url: "https://en.wikipedia.org/wiki/Arjun_Ram_Meghwal",
      result: {
        wikidata_qid: "Q4791582",
        wikipedia_page: "https://en.wikipedia.org/wiki/Arjun_Ram_Meghwal",
      },
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Ayush",
        text: "Ministry of AYUSH",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Ayush",
        result: {
          wikidata_qid: "Q5260158",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Ayush",
        },
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Prataprao_Ganpatrao_Jadhav",
      text: "Prataprao Ganpatrao Jadhav",
      url: "https://en.wikipedia.org/wiki/Prataprao_Ganpatrao_Jadhav",
      result: {
        wikidata_qid: "Q7238626",
        wikipedia_page: "https://en.wikipedia.org/wiki/Prataprao_Jadhav",
      },
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Skill_Development_and_Entrepreneurship",
        text: "Ministry of Skill Development and Entrepreneurship",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Skill_Development_and_Entrepreneurship",
        result: {
          wikidata_qid: "Q22673518",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Skill_Development_and_Entrepreneurship",
        },
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Jayant_Chaudhary",
      text: "Jayant Chaudhary",
      url: "https://en.wikipedia.org/wiki/Jayant_Chaudhary",
      result: {
        wikidata_qid: "Q6167558",
        wikipedia_page: "https://en.wikipedia.org/wiki/Jayant_Chaudhary",
      },
    },
  },
];

let ministersOfState = [
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Minister_of_Agriculture_and_Farmers%27_Welfare",
        text: "Ministry of Agriculture and Farmers Welfare",
        url: "https://en.wikipedia.org/wiki/Minister_of_Agriculture_and_Farmers%27_Welfare",
        result: {
          wikidata_qid: "Q55623231",
          wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Agriculture_and_Farmers%27_Welfare",
        },
        wikidata_qid: "Q55623231",
        wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Agriculture_and_Farmers%27_Welfare",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Ram_Nath_Thakur",
      text: "Ram Nath Thakur",
      url: "https://en.wikipedia.org/wiki/Ram_Nath_Thakur",
      result: {
        wikidata_qid: "Q21229980",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ram_Nath_Thakur",
      },
      wikidata_qid: "Q21229980",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ram_Nath_Thakur",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Minister_of_Agriculture_and_Farmers%27_Welfare",
        text: "Ministry of Agriculture and Farmers Welfare",
        url: "https://en.wikipedia.org/wiki/Minister_of_Agriculture_and_Farmers%27_Welfare",
        result: {
          wikidata_qid: "Q55623231",
          wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Agriculture_and_Farmers%27_Welfare",
        },
        wikidata_qid: "Q55623231",
        wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Agriculture_and_Farmers%27_Welfare",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Bhagirath_Choudhary",
      text: "Bhagirath Choudhary",
      url: "https://en.wikipedia.org/wiki/Bhagirath_Choudhary",
      result: {
        wikidata_qid: "Q28873568",
        wikipedia_page: "https://en.wikipedia.org/wiki/Bhagirath_Choudhary",
      },
      wikidata_qid: "Q28873568",
      wikipedia_page: "https://en.wikipedia.org/wiki/Bhagirath_Choudhary",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Chemicals_and_Fertilizers",
        text: "Ministry of Chemicals and Fertilizers",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Chemicals_and_Fertilizers",
        result: {
          wikidata_qid: "Q4294812",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Chemicals_and_Fertilizers",
        },
        wikidata_qid: "Q4294812",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Chemicals_and_Fertilizers",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Anupriya_Patel",
      text: "Anupriya Patel",
      url: "https://en.wikipedia.org/wiki/Anupriya_Patel",
      result: {
        wikidata_qid: "Q4777851",
        wikipedia_page: "https://en.wikipedia.org/wiki/Anupriya_Patel",
      },
      wikidata_qid: "Q4777851",
      wikipedia_page: "https://en.wikipedia.org/wiki/Anupriya_Patel",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Civil_Aviation_(India)",
        text: "Ministry of Civil Aviation",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Civil_Aviation_(India)",
        result: {
          wikidata_qid: "Q15650503",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Civil_Aviation_(India)",
        },
        wikidata_qid: "Q15650503",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Civil_Aviation_(India)",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Murlidhar_Mohol",
      text: "Murlidhar Mohol",
      url: "https://en.wikipedia.org/wiki/Murlidhar_Mohol",
      result: {
        wikidata_qid: "Q76328310",
        wikipedia_page: "https://en.wikipedia.org/wiki/Murlidhar_Mohol",
      },
      wikidata_qid: "Q76328310",
      wikipedia_page: "https://en.wikipedia.org/wiki/Murlidhar_Mohol",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Co-operation",
        text: "Ministry of Co-operation",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Co-operation",
        result: {
          wikidata_qid: "Q107599813",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Co-operation",
        },
        wikidata_qid: "Q107599813",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Co-operation",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Krishan_Pal_Gurjar",
      text: "Krishan Pal Gurjar",
      url: "https://en.wikipedia.org/wiki/Krishan_Pal_Gurjar",
      result: {
        wikidata_qid: "Q16901147",
        wikipedia_page: "https://en.wikipedia.org/wiki/Krishan_Pal_Gurjar",
      },
      wikidata_qid: "Q16901147",
      wikipedia_page: "https://en.wikipedia.org/wiki/Krishan_Pal_Gurjar",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Co-operation",
        text: "Ministry of Co-operation",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Co-operation",
        result: {
          wikidata_qid: "Q107599813",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Co-operation",
        },
        wikidata_qid: "Q107599813",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Co-operation",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Murlidhar_Mohol",
      text: "Murlidhar Mohol",
      url: "https://en.wikipedia.org/wiki/Murlidhar_Mohol",
      result: {
        wikidata_qid: "Q76328310",
        wikipedia_page: "https://en.wikipedia.org/wiki/Murlidhar_Mohol",
      },
      wikidata_qid: "Q76328310",
      wikipedia_page: "https://en.wikipedia.org/wiki/Murlidhar_Mohol",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Coal",
        text: "Ministry of Coal",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Coal",
        result: {
          wikidata_qid: "Q3525316",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Coal",
        },
        wikidata_qid: "Q3525316",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Coal",
      },
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Mines_(India)",
        text: "Ministry of Mines",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Mines_(India)",
        result: {
          wikidata_qid: "Q4294327",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Mines_(India)",
        },
        wikidata_qid: "Q4294327",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Mines_(India)",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Satish_Chandra_Dubey",
      text: "Satish Chandra Dubey",
      url: "https://en.wikipedia.org/wiki/Satish_Chandra_Dubey",
      result: {
        wikidata_qid: "Q16728677",
        wikipedia_page: "https://en.wikipedia.org/wiki/Satish_Chandra_Dubey",
      },
      wikidata_qid: "Q16728677",
      wikipedia_page: "https://en.wikipedia.org/wiki/Satish_Chandra_Dubey",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Commerce_and_Industry_(India)",
        text: "Ministry of Commerce and Industry",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Commerce_and_Industry_(India)",
        result: {
          wikidata_qid: "Q4294724",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Commerce_and_Industry_(India)",
        },
        wikidata_qid: "Q4294724",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Commerce_and_Industry_(India)",
      },
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Electronics_and_Information_Technology",
        text: "Ministry of Electronics and Information Technology",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Electronics_and_Information_Technology",
        result: {
          wikidata_qid: "Q16956017",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Electronics_and_Information_Technology",
        },
        wikidata_qid: "Q16956017",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Electronics_and_Information_Technology",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Jitin_Prasada",
      text: "Jitin Prasada",
      url: "https://en.wikipedia.org/wiki/Jitin_Prasada",
      result: {
        wikidata_qid: "Q290717",
        wikipedia_page: "https://en.wikipedia.org/wiki/Jitin_Prasada",
      },
      wikidata_qid: "Q290717",
      wikipedia_page: "https://en.wikipedia.org/wiki/Jitin_Prasada",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Communications_(India)",
        text: "Ministry of Communications",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Communications_(India)",
        result: {
          wikidata_qid: "Q12454897",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Communications_(India)",
        },
        wikidata_qid: "Q12454897",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Communications_(India)",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Chandra_Sekhar_Pemmasani",
      text: "Pemmasani Chandra Sekhar",
      url: "https://en.wikipedia.org/wiki/Chandra_Sekhar_Pemmasani",
      result: {
        wikidata_qid: "Q126111137",
        wikipedia_page: "https://en.wikipedia.org/wiki/Chandra_Sekhar_Pemmasani",
      },
      wikidata_qid: "Q126111137",
      wikipedia_page: "https://en.wikipedia.org/wiki/Chandra_Sekhar_Pemmasani",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Consumer_Affairs,_Food_and_Public_Distribution",
        text: "Ministry of Consumer Affairs, Food and Public Distribution",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Consumer_Affairs,_Food_and_Public_Distribution",
        result: {
          wikidata_qid: "Q3525212",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Consumer_Affairs,_Food_and_Public_Distribution",
        },
        wikidata_qid: "Q3525212",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Consumer_Affairs,_Food_and_Public_Distribution",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/B._L._Verma_(Uttar_Pradesh_politician)",
      text: "B. L. Verma",
      url: "https://en.wikipedia.org/wiki/B._L._Verma_(Uttar_Pradesh_politician)",
      result: {
        wikidata_qid: "Q104178808",
        wikipedia_page: "https://en.wikipedia.org/wiki/Banwari_Lal_Verma",
      },
      wikidata_qid: "Q104178808",
      wikipedia_page: "https://en.wikipedia.org/wiki/Banwari_Lal_Verma",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Consumer_Affairs,_Food_and_Public_Distribution",
        text: "Ministry of Consumer Affairs, Food and Public Distribution",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Consumer_Affairs,_Food_and_Public_Distribution",
        result: {
          wikidata_qid: "Q3525212",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Consumer_Affairs,_Food_and_Public_Distribution",
        },
        wikidata_qid: "Q3525212",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Consumer_Affairs,_Food_and_Public_Distribution",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Nimuben_Bambhaniya",
      text: "Nimuben Bambhaniya",
      url: "https://en.wikipedia.org/wiki/Nimuben_Bambhaniya",
      result: {
        wikidata_qid: "Q126364657",
        wikipedia_page: "https://en.wikipedia.org/wiki/Nimuben_Bambhaniya",
      },
      wikidata_qid: "Q126364657",
      wikipedia_page: "https://en.wikipedia.org/wiki/Nimuben_Bambhaniya",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Corporate_Affairs",
        text: "Ministry of Corporate Affairs",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Corporate_Affairs",
        result: {
          wikidata_qid: "Q4294596",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Corporate_Affairs",
        },
        wikidata_qid: "Q4294596",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Corporate_Affairs",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Harsh_Malhotra",
      text: "Harsh Malhotra",
      url: "https://en.wikipedia.org/wiki/Harsh_Malhotra",
      result: {
        wikidata_qid: "Q126367708",
        wikipedia_page: "https://en.wikipedia.org/wiki/Harsh_Malhotra",
      },
      wikidata_qid: "Q126367708",
      wikipedia_page: "https://en.wikipedia.org/wiki/Harsh_Malhotra",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Culture_(India)",
        text: "Ministry of Culture",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Culture_(India)",
        result: {
          wikidata_qid: "Q4294433",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Culture_(India)",
        },
        wikidata_qid: "Q4294433",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Culture_(India)",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Rao_Inderjit_Singh",
      text: "Rao Inderjit Singh",
      url: "https://en.wikipedia.org/wiki/Rao_Inderjit_Singh",
      result: {
        wikidata_qid: "Q7293676",
        wikipedia_page: "https://en.wikipedia.org/wiki/Rao_Inderjit_Singh",
      },
      wikidata_qid: "Q7293676",
      wikipedia_page: "https://en.wikipedia.org/wiki/Rao_Inderjit_Singh",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Minister_of_Defence_(India)",
        text: "Ministry of Defence",
        url: "https://en.wikipedia.org/wiki/Minister_of_Defence_(India)",
        result: {
          wikidata_qid: "Q3533315",
          wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Defence_(India)",
        },
        wikidata_qid: "Q3533315",
        wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Defence_(India)",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Sanjay_Seth_(Jharkhand_politician)",
      text: "Sanjay Seth",
      url: "https://en.wikipedia.org/wiki/Sanjay_Seth_(Jharkhand_politician)",
      result: {
        wikidata_qid: "Q96404945",
        wikipedia_page: "https://en.wikipedia.org/wiki/Sanjay_Seth_(Jharkhand_politician)",
      },
      wikidata_qid: "Q96404945",
      wikipedia_page: "https://en.wikipedia.org/wiki/Sanjay_Seth_(Jharkhand_politician)",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Development_of_North_Eastern_Region",
        text: "Ministry of Development of North Eastern Region",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Development_of_North_Eastern_Region",
        result: {
          wikidata_qid: "Q4294643",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Development_of_North_Eastern_Region",
        },
        wikidata_qid: "Q4294643",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Development_of_North_Eastern_Region",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Sukanta_Majumdar",
      text: "Sukanta Majumdar",
      url: "https://en.wikipedia.org/wiki/Sukanta_Majumdar",
      result: {
        wikidata_qid: "Q64011108",
        wikipedia_page: "https://en.wikipedia.org/wiki/Sukanta_Majumdar",
      },
      wikidata_qid: "Q64011108",
      wikipedia_page: "https://en.wikipedia.org/wiki/Sukanta_Majumdar",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Minister_of_Education_(India)",
        text: "Ministry of Education",
        url: "https://en.wikipedia.org/wiki/Minister_of_Education_(India)",
        result: {
          wikidata_qid: "Q28169228",
          wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Education_(India)",
        },
        wikidata_qid: "Q28169228",
        wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Education_(India)",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Jayant_Chaudhary",
      text: "Jayant Chaudhary",
      url: "https://en.wikipedia.org/wiki/Jayant_Chaudhary",
      result: {
        wikidata_qid: "Q6167558",
        wikipedia_page: "https://en.wikipedia.org/wiki/Jayant_Chaudhary",
      },
      wikidata_qid: "Q6167558",
      wikipedia_page: "https://en.wikipedia.org/wiki/Jayant_Chaudhary",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Minister_of_Education_(India)",
        text: "Ministry of Education",
        url: "https://en.wikipedia.org/wiki/Minister_of_Education_(India)",
        result: {
          wikidata_qid: "Q28169228",
          wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Education_(India)",
        },
        wikidata_qid: "Q28169228",
        wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Education_(India)",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Sukanta_Majumdar",
      text: "Sukanta Majumdar",
      url: "https://en.wikipedia.org/wiki/Sukanta_Majumdar",
      result: {
        wikidata_qid: "Q64011108",
        wikipedia_page: "https://en.wikipedia.org/wiki/Sukanta_Majumdar",
      },
      wikidata_qid: "Q64011108",
      wikipedia_page: "https://en.wikipedia.org/wiki/Sukanta_Majumdar",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Environment,_Forest_and_Climate_Change",
        text: "Ministry of Environment, Forest and Climate Change",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Environment,_Forest_and_Climate_Change",
        result: {
          wikidata_qid: "Q2749442",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Environment,_Forest_and_Climate_Change",
        },
        wikidata_qid: "Q2749442",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Environment,_Forest_and_Climate_Change",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Kirti_Vardhan_Singh",
      text: "Kirti Vardhan Singh",
      url: "https://en.wikipedia.org/wiki/Kirti_Vardhan_Singh",
      result: {
        wikidata_qid: "Q6416217",
        wikipedia_page: "https://en.wikipedia.org/wiki/Kirti_Vardhan_Singh",
      },
      wikidata_qid: "Q6416217",
      wikipedia_page: "https://en.wikipedia.org/wiki/Kirti_Vardhan_Singh",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Minister_of_External_Affairs_(India)",
        text: "Ministry of External Affairs",
        url: "https://en.wikipedia.org/wiki/Minister_of_External_Affairs_(India)",
        result: {
          wikidata_qid: "Q313465",
          wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_External_Affairs_(India)",
        },
        wikidata_qid: "Q313465",
        wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_External_Affairs_(India)",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Kirti_Vardhan_Singh",
      text: "Kirti Vardhan Singh",
      url: "https://en.wikipedia.org/wiki/Kirti_Vardhan_Singh",
      result: {
        wikidata_qid: "Q6416217",
        wikipedia_page: "https://en.wikipedia.org/wiki/Kirti_Vardhan_Singh",
      },
      wikidata_qid: "Q6416217",
      wikipedia_page: "https://en.wikipedia.org/wiki/Kirti_Vardhan_Singh",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Minister_of_External_Affairs_(India)",
        text: "Ministry of External Affairs",
        url: "https://en.wikipedia.org/wiki/Minister_of_External_Affairs_(India)",
        result: {
          wikidata_qid: "Q313465",
          wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_External_Affairs_(India)",
        },
        wikidata_qid: "Q313465",
        wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_External_Affairs_(India)",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Pabitra_Margherita",
      text: "Pabitra Margherita",
      url: "https://en.wikipedia.org/wiki/Pabitra_Margherita",
      result: {
        wikidata_qid: "Q111352685",
        wikipedia_page: "https://en.wikipedia.org/wiki/Pabitra_Margherita",
      },
      wikidata_qid: "Q111352685",
      wikipedia_page: "https://en.wikipedia.org/wiki/Pabitra_Margherita",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Minister_of_Finance_(India)",
        text: "Ministry of Finance",
        url: "https://en.wikipedia.org/wiki/Minister_of_Finance_(India)",
        result: {
          wikidata_qid: "Q1416501",
          wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Finance_(India)",
        },
        wikidata_qid: "Q1416501",
        wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Finance_(India)",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Pankaj_Chaudhary",
      text: "Pankaj Chaudhary",
      url: "https://en.wikipedia.org/wiki/Pankaj_Chaudhary",
      result: {
        wikidata_qid: "Q7131282",
        wikipedia_page: "https://en.wikipedia.org/wiki/Pankaj_Chaudhary",
      },
      wikidata_qid: "Q7131282",
      wikipedia_page: "https://en.wikipedia.org/wiki/Pankaj_Chaudhary",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Fisheries,_Animal_Husbandry_and_Dairying",
        text: "Ministry of Fisheries, Animal Husbandry and Dairying",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Fisheries,_Animal_Husbandry_and_Dairying",
        result: {
          wikidata_qid: "Q65042516",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Fisheries,_Animal_Husbandry_and_Dairying",
        },
        wikidata_qid: "Q65042516",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Fisheries,_Animal_Husbandry_and_Dairying",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/S._P._Singh_Baghel",
      text: "S. P. Singh Baghel",
      url: "https://en.wikipedia.org/wiki/S._P._Singh_Baghel",
      result: {
        wikidata_qid: "Q7387753",
        wikipedia_page: "https://en.wikipedia.org/wiki/S._P._Singh_Baghel",
      },
      wikidata_qid: "Q7387753",
      wikipedia_page: "https://en.wikipedia.org/wiki/S._P._Singh_Baghel",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Fisheries,_Animal_Husbandry_and_Dairying",
        text: "Ministry of Fisheries, Animal Husbandry and Dairying",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Fisheries,_Animal_Husbandry_and_Dairying",
        result: {
          wikidata_qid: "Q65042516",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Fisheries,_Animal_Husbandry_and_Dairying",
        },
        wikidata_qid: "Q65042516",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Fisheries,_Animal_Husbandry_and_Dairying",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/George_Kurian_(Indian_politician)",
      text: "George Kurian",
      url: "https://en.wikipedia.org/wiki/George_Kurian_(Indian_politician)",
      result: {
        wikidata_qid: "Q126469351",
        wikipedia_page: "https://en.wikipedia.org/wiki/George_Kurian_(politician)",
      },
      wikidata_qid: "Q126469351",
      wikipedia_page: "https://en.wikipedia.org/wiki/George_Kurian_(politician)",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Food_Processing_Industries",
        text: "Ministry of Food Processing Industries",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Food_Processing_Industries",
        result: {
          wikidata_qid: "Q4294565",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Food_Processing_Industries",
        },
        wikidata_qid: "Q4294565",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Food_Processing_Industries",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Ravneet_Singh_Bittu",
      text: "Ravneet Singh Bittu",
      url: "https://en.wikipedia.org/wiki/Ravneet_Singh_Bittu",
      result: {
        wikidata_qid: "Q7296806",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ravneet_Singh_Bittu",
      },
      wikidata_qid: "Q7296806",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ravneet_Singh_Bittu",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Health_and_Family_Welfare",
        text: "Ministry of Health and Family Welfare",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Health_and_Family_Welfare",
        result: {
          wikidata_qid: "Q3525265",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Health_and_Family_Welfare",
        },
        wikidata_qid: "Q3525265",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Health_and_Family_Welfare",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Prataprao_Ganpatrao_Jadhav",
      text: "Prataprao Ganpatrao Jadhav",
      url: "https://en.wikipedia.org/wiki/Prataprao_Ganpatrao_Jadhav",
      result: {
        wikidata_qid: "Q7238626",
        wikipedia_page: "https://en.wikipedia.org/wiki/Prataprao_Jadhav",
      },
      wikidata_qid: "Q7238626",
      wikipedia_page: "https://en.wikipedia.org/wiki/Prataprao_Jadhav",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Health_and_Family_Welfare",
        text: "Ministry of Health and Family Welfare",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Health_and_Family_Welfare",
        result: {
          wikidata_qid: "Q3525265",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Health_and_Family_Welfare",
        },
        wikidata_qid: "Q3525265",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Health_and_Family_Welfare",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Anupriya_Patel",
      text: "Anupriya Patel",
      url: "https://en.wikipedia.org/wiki/Anupriya_Patel",
      result: {
        wikidata_qid: "Q4777851",
        wikipedia_page: "https://en.wikipedia.org/wiki/Anupriya_Patel",
      },
      wikidata_qid: "Q4777851",
      wikipedia_page: "https://en.wikipedia.org/wiki/Anupriya_Patel",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Heavy_Industries",
        text: "Ministry of Heavy Industries",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Heavy_Industries",
        result: {
          wikidata_qid: "Q108619669",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Heavy_Industries",
        },
        wikidata_qid: "Q108619669",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Heavy_Industries",
      },
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Steel",
        text: "Ministry of Steel",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Steel",
        result: {
          wikidata_qid: "Q3525381",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Steel",
        },
        wikidata_qid: "Q3525381",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Steel",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Bhupathi_Raju_Srinivasa_Varma",
      text: "Bhupathi Raju Srinivasa Varma",
      url: "https://en.wikipedia.org/wiki/Bhupathi_Raju_Srinivasa_Varma",
      result: {
        wikidata_qid: "Q126364180",
        wikipedia_page: "https://en.wikipedia.org/wiki/Bhupathi_Raju_Srinivasa_Varma",
      },
      wikidata_qid: "Q126364180",
      wikipedia_page: "https://en.wikipedia.org/wiki/Bhupathi_Raju_Srinivasa_Varma",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Minister_of_Home_Affairs_(India)",
        text: "Ministry of Home Affairs",
        url: "https://en.wikipedia.org/wiki/Minister_of_Home_Affairs_(India)",
        result: {
          wikidata_qid: "Q3440901",
          wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Home_Affairs_(India)",
        },
        wikidata_qid: "Q3440901",
        wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Home_Affairs_(India)",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Nityanand_Rai",
      text: "Nityanand Rai",
      url: "https://en.wikipedia.org/wiki/Nityanand_Rai",
      result: {
        wikidata_qid: "Q16734872",
        wikipedia_page: "https://en.wikipedia.org/wiki/Nityanand_Rai",
      },
      wikidata_qid: "Q16734872",
      wikipedia_page: "https://en.wikipedia.org/wiki/Nityanand_Rai",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Minister_of_Home_Affairs_(India)",
        text: "Ministry of Home Affairs",
        url: "https://en.wikipedia.org/wiki/Minister_of_Home_Affairs_(India)",
        result: {
          wikidata_qid: "Q3440901",
          wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Home_Affairs_(India)",
        },
        wikidata_qid: "Q3440901",
        wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Home_Affairs_(India)",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Bandi_Sanjay_Kumar",
      text: "Bandi Sanjay Kumar",
      url: "https://en.wikipedia.org/wiki/Bandi_Sanjay_Kumar",
      result: {
        wikidata_qid: "Q64143189",
        wikipedia_page: "https://en.wikipedia.org/wiki/Bandi_Sanjay_Kumar",
      },
      wikidata_qid: "Q64143189",
      wikipedia_page: "https://en.wikipedia.org/wiki/Bandi_Sanjay_Kumar",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Minister_of_Housing_and_Urban_Affairs",
        text: "Ministry of Housing and Urban Affairs",
        url: "https://en.wikipedia.org/wiki/Minister_of_Housing_and_Urban_Affairs",
        result: {
          wikidata_qid: "Q122060109",
          wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Housing_and_Urban_Affairs",
        },
        wikidata_qid: "Q122060109",
        wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Housing_and_Urban_Affairs",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Tokhan_Sahu",
      text: "Tokhan Sahu",
      url: "https://en.wikipedia.org/wiki/Tokhan_Sahu",
      result: {
        wikidata_qid: "Q58290680",
        wikipedia_page: "https://en.wikipedia.org/wiki/Tokhan_Sahu",
      },
      wikidata_qid: "Q58290680",
      wikipedia_page: "https://en.wikipedia.org/wiki/Tokhan_Sahu",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Information_and_Broadcasting_(India)",
        text: "Ministry of Information and Broadcasting",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Information_and_Broadcasting_(India)",
        result: {
          wikidata_qid: "Q4294412",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Information_and_Broadcasting_(India)",
        },
        wikidata_qid: "Q4294412",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Information_and_Broadcasting_(India)",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/L._Murugan",
      text: "L. Murugan",
      url: "https://en.wikipedia.org/wiki/L._Murugan",
      result: {
        wikidata_qid: "Q87570577",
        wikipedia_page: "https://en.wikipedia.org/wiki/L._Murugan",
      },
      wikidata_qid: "Q87570577",
      wikipedia_page: "https://en.wikipedia.org/wiki/L._Murugan",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Jal_Shakti",
        text: "Ministry of Jal Shakti",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Jal_Shakti",
        result: {
          wikidata_qid: "Q85785741",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Jal_Shakti",
        },
        wikidata_qid: "Q85785741",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Jal_Shakti",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/V._Somanna",
      text: "V. Somanna",
      url: "https://en.wikipedia.org/wiki/V._Somanna",
      result: {
        wikidata_qid: "Q24851577",
        wikipedia_page: "https://en.wikipedia.org/wiki/V._Somanna",
      },
      wikidata_qid: "Q24851577",
      wikipedia_page: "https://en.wikipedia.org/wiki/V._Somanna",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Jal_Shakti",
        text: "Ministry of Jal Shakti",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Jal_Shakti",
        result: {
          wikidata_qid: "Q85785741",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Jal_Shakti",
        },
        wikidata_qid: "Q85785741",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Jal_Shakti",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Raj_Bhushan_Choudhary",
      text: "Raj Bhushan Choudhary",
      url: "https://en.wikipedia.org/wiki/Raj_Bhushan_Choudhary",
      result: {
        wikidata_qid: "Q126365290",
        wikipedia_page: "https://en.wikipedia.org/wiki/Raj_Bhushan_Choudhary",
      },
      wikidata_qid: "Q126365290",
      wikipedia_page: "https://en.wikipedia.org/wiki/Raj_Bhushan_Choudhary",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Micro,_Small_and_Medium_Enterprises",
        text: "Ministry of Micro, Small and Medium Enterprises",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Micro,_Small_and_Medium_Enterprises",
        result: {
          wikidata_qid: "Q4294585",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Micro,_Small_and_Medium_Enterprises",
        },
        wikidata_qid: "Q4294585",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Micro,_Small_and_Medium_Enterprises",
      },
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Labour_and_Employment_(India)",
        text: "Ministry of Labour and Employment",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Labour_and_Employment_(India)",
        result: {
          wikidata_qid: "Q4294756",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Labour_and_Employment_(India)",
        },
        wikidata_qid: "Q4294756",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Labour_and_Employment_(India)",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Shobha_Karandlaje",
      text: "Shobha Karandlaje",
      url: "https://en.wikipedia.org/wiki/Shobha_Karandlaje",
      result: {
        wikidata_qid: "Q7499789",
        wikipedia_page: "https://en.wikipedia.org/wiki/Shobha_Karandlaje",
      },
      wikidata_qid: "Q7499789",
      wikipedia_page: "https://en.wikipedia.org/wiki/Shobha_Karandlaje",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Minority_Affairs",
        text: "Ministry of Minority Affairs",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Minority_Affairs",
        result: {
          wikidata_qid: "Q4294587",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Minority_Affairs",
        },
        wikidata_qid: "Q4294587",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Minority_Affairs",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/George_Kurian_(Indian_politician)",
      text: "George Kurian",
      url: "https://en.wikipedia.org/wiki/George_Kurian_(Indian_politician)",
      result: {
        wikidata_qid: "Q126469351",
        wikipedia_page: "https://en.wikipedia.org/wiki/George_Kurian_(politician)",
      },
      wikidata_qid: "Q126469351",
      wikipedia_page: "https://en.wikipedia.org/wiki/George_Kurian_(politician)",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Panchayati_Raj",
        text: "Ministry of Panchayati Raj",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Panchayati_Raj",
        result: {
          wikidata_qid: "Q4294588",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Panchayati_Raj",
        },
        wikidata_qid: "Q4294588",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Panchayati_Raj",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/S._P._Singh_Baghel",
      text: "S. P. Singh Baghel",
      url: "https://en.wikipedia.org/wiki/S._P._Singh_Baghel",
      result: {
        wikidata_qid: "Q7387753",
        wikipedia_page: "https://en.wikipedia.org/wiki/S._P._Singh_Baghel",
      },
      wikidata_qid: "Q7387753",
      wikipedia_page: "https://en.wikipedia.org/wiki/S._P._Singh_Baghel",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Parliamentary_Affairs_(India)",
        text: "Ministry of Parliamentary Affairs",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Parliamentary_Affairs_(India)",
        result: {
          wikidata_qid: "Q12455047",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Parliamentary_Affairs_(India)",
        },
        wikidata_qid: "Q12455047",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Parliamentary_Affairs_(India)",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Arjun_Ram_Meghwal",
      text: "Arjun Ram Meghwal",
      url: "https://en.wikipedia.org/wiki/Arjun_Ram_Meghwal",
      result: {
        wikidata_qid: "Q4791582",
        wikipedia_page: "https://en.wikipedia.org/wiki/Arjun_Ram_Meghwal",
      },
      wikidata_qid: "Q4791582",
      wikipedia_page: "https://en.wikipedia.org/wiki/Arjun_Ram_Meghwal",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Parliamentary_Affairs_(India)",
        text: "Ministry of Parliamentary Affairs",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Parliamentary_Affairs_(India)",
        result: {
          wikidata_qid: "Q12455047",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Parliamentary_Affairs_(India)",
        },
        wikidata_qid: "Q12455047",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Parliamentary_Affairs_(India)",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/L._Murugan",
      text: "L. Murugan",
      url: "https://en.wikipedia.org/wiki/L._Murugan",
      result: {
        wikidata_qid: "Q87570577",
        wikipedia_page: "https://en.wikipedia.org/wiki/L._Murugan",
      },
      wikidata_qid: "Q87570577",
      wikipedia_page: "https://en.wikipedia.org/wiki/L._Murugan",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Petroleum_and_Natural_Gas",
        text: "Ministry of Petroleum and Natural Gas",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Petroleum_and_Natural_Gas",
        result: {
          wikidata_qid: "Q4294487",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Petroleum_and_Natural_Gas",
        },
        wikidata_qid: "Q4294487",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Petroleum_and_Natural_Gas",
      },
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Tourism_(India)",
        text: "Ministry of Tourism",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Tourism_(India)",
        result: {
          wikidata_qid: "Q4294772",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Tourism_(India)",
        },
        wikidata_qid: "Q4294772",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Tourism_(India)",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Suresh_Gopi",
      text: "Suresh Gopi",
      url: "https://en.wikipedia.org/wiki/Suresh_Gopi",
      result: {
        wikidata_qid: "Q3530125",
        wikipedia_page: "https://en.wikipedia.org/wiki/Suresh_Gopi",
      },
      wikidata_qid: "Q3530125",
      wikipedia_page: "https://en.wikipedia.org/wiki/Suresh_Gopi",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Ports,_Shipping_and_Waterways",
        text: "Ministry of Ports, Shipping and Waterways",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Ports,_Shipping_and_Waterways",
        result: {
          wikidata_qid: "Q4294719",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Ports,_Shipping_and_Waterways",
        },
        wikidata_qid: "Q4294719",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Ports,_Shipping_and_Waterways",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Shantanu_Thakur",
      text: "Shantanu Thakur",
      url: "https://en.wikipedia.org/wiki/Shantanu_Thakur",
      result: {
        wikidata_qid: "Q63992931",
        wikipedia_page: "https://en.wikipedia.org/wiki/Shantanu_Thakur",
      },
      wikidata_qid: "Q63992931",
      wikipedia_page: "https://en.wikipedia.org/wiki/Shantanu_Thakur",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Power_(India)",
        text: "Ministry of Power",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Power_(India)",
        result: {
          wikidata_qid: "Q4294844",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Power_(India)",
        },
        wikidata_qid: "Q4294844",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Power_(India)",
      },
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_New_and_Renewable_Energy",
        text: "Ministry of New and Renewable Energy",
        url: "https://en.wikipedia.org/wiki/Ministry_of_New_and_Renewable_Energy",
        result: {
          wikidata_qid: "Q4294489",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_New_and_Renewable_Energy",
        },
        wikidata_qid: "Q4294489",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_New_and_Renewable_Energy",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Shripad_Yesso_Naik",
      text: "Shripad Yesso Naik",
      url: "https://en.wikipedia.org/wiki/Shripad_Yesso_Naik",
      result: {
        wikidata_qid: "Q7504173",
        wikipedia_page: "https://en.wikipedia.org/wiki/Shripad_Naik",
      },
      wikidata_qid: "Q7504173",
      wikipedia_page: "https://en.wikipedia.org/wiki/Shripad_Naik",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Minister_of_Railways_(India)",
        text: "Ministry of Railways",
        url: "https://en.wikipedia.org/wiki/Minister_of_Railways_(India)",
        result: {
          wikidata_qid: "Q6866301",
          wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Railways_(India)",
        },
        wikidata_qid: "Q6866301",
        wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Railways_(India)",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/V._Somanna",
      text: "V. Somanna",
      url: "https://en.wikipedia.org/wiki/V._Somanna",
      result: {
        wikidata_qid: "Q24851577",
        wikipedia_page: "https://en.wikipedia.org/wiki/V._Somanna",
      },
      wikidata_qid: "Q24851577",
      wikipedia_page: "https://en.wikipedia.org/wiki/V._Somanna",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Minister_of_Railways_(India)",
        text: "Ministry of Railways",
        url: "https://en.wikipedia.org/wiki/Minister_of_Railways_(India)",
        result: {
          wikidata_qid: "Q6866301",
          wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Railways_(India)",
        },
        wikidata_qid: "Q6866301",
        wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Railways_(India)",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Ravneet_Singh_Bittu",
      text: "Ravneet Singh Bittu",
      url: "https://en.wikipedia.org/wiki/Ravneet_Singh_Bittu",
      result: {
        wikidata_qid: "Q7296806",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ravneet_Singh_Bittu",
      },
      wikidata_qid: "Q7296806",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ravneet_Singh_Bittu",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Minister_of_Road_Transport_and_Highways",
        text: "Ministry of Road Transport and Highways",
        url: "https://en.wikipedia.org/wiki/Minister_of_Road_Transport_and_Highways",
        result: {
          wikidata_qid: "Q122238538",
          wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Road_Transport_and_Highways",
        },
        wikidata_qid: "Q122238538",
        wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Road_Transport_and_Highways",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Ajay_Tamta",
      text: "Ajay Tamta",
      url: "https://en.wikipedia.org/wiki/Ajay_Tamta",
      result: {
        wikidata_qid: "Q16736901",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ajay_Tamta",
      },
      wikidata_qid: "Q16736901",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ajay_Tamta",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Minister_of_Road_Transport_and_Highways",
        text: "Ministry of Road Transport and Highways",
        url: "https://en.wikipedia.org/wiki/Minister_of_Road_Transport_and_Highways",
        result: {
          wikidata_qid: "Q122238538",
          wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Road_Transport_and_Highways",
        },
        wikidata_qid: "Q122238538",
        wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Road_Transport_and_Highways",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Harsh_Malhotra",
      text: "Harsh Malhotra",
      url: "https://en.wikipedia.org/wiki/Harsh_Malhotra",
      result: {
        wikidata_qid: "Q126367708",
        wikipedia_page: "https://en.wikipedia.org/wiki/Harsh_Malhotra",
      },
      wikidata_qid: "Q126367708",
      wikipedia_page: "https://en.wikipedia.org/wiki/Harsh_Malhotra",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Rural_Development_(India)",
        text: "Ministry of Rural Development",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Rural_Development_(India)",
        result: {
          wikidata_qid: "Q6867517",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Rural_Development_(India)",
        },
        wikidata_qid: "Q6867517",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Rural_Development_(India)",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Chandra_Sekhar_Pemmasani",
      text: "Pemmasani Chandra Sekhar",
      url: "https://en.wikipedia.org/wiki/Chandra_Sekhar_Pemmasani",
      result: {
        wikidata_qid: "Q126111137",
        wikipedia_page: "https://en.wikipedia.org/wiki/Chandra_Sekhar_Pemmasani",
      },
      wikidata_qid: "Q126111137",
      wikipedia_page: "https://en.wikipedia.org/wiki/Chandra_Sekhar_Pemmasani",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Rural_Development_(India)",
        text: "Ministry of Rural Development",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Rural_Development_(India)",
        result: {
          wikidata_qid: "Q6867517",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Rural_Development_(India)",
        },
        wikidata_qid: "Q6867517",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Rural_Development_(India)",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Kamlesh_Paswan",
      text: "Kamlesh Paswan",
      url: "https://en.wikipedia.org/wiki/Kamlesh_Paswan",
      result: {
        wikidata_qid: "Q16215999",
        wikipedia_page: "https://en.wikipedia.org/wiki/Kamlesh_Paswan",
      },
      wikidata_qid: "Q16215999",
      wikipedia_page: "https://en.wikipedia.org/wiki/Kamlesh_Paswan",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Social_Justice_and_Empowerment",
        text: "Ministry of Social Justice and Empowerment",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Social_Justice_and_Empowerment",
        result: {
          wikidata_qid: "Q4294701",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Social_Justice_and_Empowerment",
        },
        wikidata_qid: "Q4294701",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Social_Justice_and_Empowerment",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Ramdas_Athawale",
      text: "Ramdas Athawale",
      url: "https://en.wikipedia.org/wiki/Ramdas_Athawale",
      result: {
        wikidata_qid: "Q4813289",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ramdas_Athawale",
      },
      wikidata_qid: "Q4813289",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ramdas_Athawale",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Social_Justice_and_Empowerment",
        text: "Ministry of Social Justice and Empowerment",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Social_Justice_and_Empowerment",
        result: {
          wikidata_qid: "Q4294701",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Social_Justice_and_Empowerment",
        },
        wikidata_qid: "Q4294701",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Social_Justice_and_Empowerment",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/B._L._Verma_(Uttar_Pradesh_politician)",
      text: "B. L. Verma",
      url: "https://en.wikipedia.org/wiki/B._L._Verma_(Uttar_Pradesh_politician)",
      result: {
        wikidata_qid: "Q104178808",
        wikipedia_page: "https://en.wikipedia.org/wiki/Banwari_Lal_Verma",
      },
      wikidata_qid: "Q104178808",
      wikipedia_page: "https://en.wikipedia.org/wiki/Banwari_Lal_Verma",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Textiles_(India)",
        text: "Ministry of Textiles",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Textiles_(India)",
        result: {
          wikidata_qid: "Q4294449",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Textiles",
        },
        wikidata_qid: "Q4294449",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Textiles",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Pabitra_Margherita",
      text: "Pabitra Margherita",
      url: "https://en.wikipedia.org/wiki/Pabitra_Margherita",
      result: {
        wikidata_qid: "Q111352685",
        wikipedia_page: "https://en.wikipedia.org/wiki/Pabitra_Margherita",
      },
      wikidata_qid: "Q111352685",
      wikipedia_page: "https://en.wikipedia.org/wiki/Pabitra_Margherita",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Tribal_Affairs",
        text: "Ministry of Tribal Affairs",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Tribal_Affairs",
        result: {
          wikidata_qid: "Q6867635",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Tribal_Affairs",
        },
        wikidata_qid: "Q6867635",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Tribal_Affairs",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Durga_Das_Uikey",
      text: "Durga Das Uikey",
      url: "https://en.wikipedia.org/wiki/Durga_Das_Uikey",
      result: {
        wikidata_qid: "Q64006793",
        wikipedia_page: "https://en.wikipedia.org/wiki/Durga_Das_Uikey",
      },
      wikidata_qid: "Q64006793",
      wikipedia_page: "https://en.wikipedia.org/wiki/Durga_Das_Uikey",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Women_and_Child_Development",
        text: "Ministry of Women and Child Development",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Women_and_Child_Development",
        result: {
          wikidata_qid: "Q12446115",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Women_and_Child_Development",
        },
        wikidata_qid: "Q12446115",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Women_and_Child_Development",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Savitri_Thakur",
      text: "Savitri Thakur",
      url: "https://en.wikipedia.org/wiki/Savitri_Thakur",
      result: {
        wikidata_qid: "Q16736902",
        wikipedia_page: "https://en.wikipedia.org/wiki/Savitri_Thakur",
      },
      wikidata_qid: "Q16736902",
      wikipedia_page: "https://en.wikipedia.org/wiki/Savitri_Thakur",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Youth_Affairs_and_Sports",
        text: "Ministry of Youth Affairs and Sports",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Youth_Affairs_and_Sports",
        result: {
          wikidata_qid: "Q4294590",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Youth_Affairs_and_Sports",
        },
        wikidata_qid: "Q4294590",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Youth_Affairs_and_Sports",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Raksha_Khadse",
      text: "Raksha Khadse",
      url: "https://en.wikipedia.org/wiki/Raksha_Khadse",
      result: {
        wikidata_qid: "Q16908900",
        wikipedia_page: "https://en.wikipedia.org/wiki/Raksha_Khadse",
      },
      wikidata_qid: "Q16908900",
      wikipedia_page: "https://en.wikipedia.org/wiki/Raksha_Khadse",
    },
  },
  {
    portfolio: [
      {
        href: "https://en.wikipedia.org/wiki/Prime_Minister%27s_Office_(India)",
        text: "Prime Minister’s Office",
        url: "https://en.wikipedia.org/wiki/Prime_Minister%27s_Office_(India)",
        result: {
          wikidata_qid: "Q7243280",
          wikipedia_page: "https://en.wikipedia.org/wiki/Prime_Minister%27s_Office_(India)",
        },
        wikidata_qid: "Q7243280",
        wikipedia_page: "https://en.wikipedia.org/wiki/Prime_Minister%27s_Office_(India)",
      },
      {
        href: "https://en.wikipedia.org/wiki/Ministry_of_Personnel,_Public_Grievances_and_Pensions",
        text: "Ministry of Personnel, Public Grievances and Pensions",
        url: "https://en.wikipedia.org/wiki/Ministry_of_Personnel,_Public_Grievances_and_Pensions",
        result: {
          wikidata_qid: "Q4294428",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Personnel,_Public_Grievances_and_Pensions",
        },
        wikidata_qid: "Q4294428",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Personnel,_Public_Grievances_and_Pensions",
      },
      {
        href: "https://en.wikipedia.org/wiki/Department_of_Atomic_Energy",
        text: "Department of Atomic Energy",
        url: "https://en.wikipedia.org/wiki/Department_of_Atomic_Energy",
        result: {
          wikidata_qid: "Q3523073",
          wikipedia_page: "https://en.wikipedia.org/wiki/Department_of_Atomic_Energy",
        },
        wikidata_qid: "Q3523073",
        wikipedia_page: "https://en.wikipedia.org/wiki/Department_of_Atomic_Energy",
      },
      {
        href: "https://en.wikipedia.org/wiki/Department_of_Space",
        text: "Department of Space",
        url: "https://en.wikipedia.org/wiki/Department_of_Space",
        result: {
          wikidata_qid: "Q4158548",
          wikipedia_page: "https://en.wikipedia.org/wiki/Department_of_Space",
        },
        wikidata_qid: "Q4158548",
        wikipedia_page: "https://en.wikipedia.org/wiki/Department_of_Space",
      },
    ],
    minister: {
      href: "https://en.wikipedia.org/wiki/Jitendra_Singh_(politician,_born_1956)",
      text: "Jitendra Singh",
      url: "https://en.wikipedia.org/wiki/Jitendra_Singh_(politician,_born_1956)",
      result: {
        wikidata_qid: "Q6203277",
        wikipedia_page: "https://en.wikipedia.org/wiki/Jitendra_Singh_Rana",
      },
      wikidata_qid: "Q6203277",
      wikipedia_page: "https://en.wikipedia.org/wiki/Jitendra_Singh_Rana",
    },
  },
];

let policyDomainsNew = [
  {
    name_id: "data-and-statistics",
    description:
      "Collection, analysis, and interpretation of statistical data to inform policy decisions and support evidence-based governance.",
    name: "data and statistics",
  },
  {
    name_id: "policy-implementation",
    description:
      "Execution and enforcement of government policies and programs to achieve intended outcomes and address public needs.",
    name: "policy implementation",
  },
  {
    name_id: "planning",
    description:
      "Strategic formulation of governmental plans and frameworks to guide economic, social, and infrastructural development.",
    name: "planning",
  },
  {
    name_id: "research-and-development",
    description:
      "Systematic investigation and innovative activities aimed at developing new products, processes, or technologies to enhance knowledge and capabilities.",
    name: "research and development",
  },
  {
    name_id: "innovation",
    description:
      "Promotion and support of new ideas, creative solutions, and technological advancements to drive economic growth and improve quality of life.",
    name: "innovation",
  },
  {
    name_id: "science-technology",
    description:
      "Advancement and application of scientific knowledge and technological solutions to address societal challenges and enhance public welfare.",
    name: "science technology",
  },
  {
    name_id: "vocational-training",
    description:
      "Education and training programs designed to equip individuals with practical skills and knowledge for specific trades and occupations.",
    name: "vocational training",
  },
  {
    name_id: "entrepreneurship",
    description:
      "Support and promotion of entrepreneurial activities, including business creation, growth, and innovation to stimulate economic development.",
    name: "entrepreneurship",
  },
  {
    name_id: "traditional-medicine",
    description:
      "Preservation, promotion, and integration of traditional healing practices and systems of medicine into contemporary healthcare frameworks.",
    name: "traditional medicine",
  },
  {
    name_id: "meteorology",
    description:
      "Study and forecasting of weather patterns and atmospheric conditions to inform public safety, agriculture, and disaster management.",
    name: "meteorology",
  },
];

let ministryDomains2 = [
  {
    name_id: "statistics-and-programme-implementation",
    wikidata_qid: "Q4294710",
    wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Statistics_and_Programme_Implementation",
    names: [
      {
        name: "Ministry of Statistics and Programme Implementation",
      },
    ],
    policy_domains: [
      {
        name_id: "data-and-statistics",
      },
      {
        name_id: "policy-implementation",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "data-and-statistics",
      },
      {
        name_id: "policy-implementation",
      },
    ],
  },
  {
    name_id: "planning",
    wikidata_qid: "Q65042854",
    wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Planning_(India)",
    names: [
      {
        name: "Ministry of Planning",
      },
    ],
    policy_domains: [
      {
        name_id: "planning",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "planning",
      },
    ],
  },
  {
    name_id: "science-and-technology",
    wikidata_qid: "Q4294472",
    wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Science_and_Technology_(India)",
    names: [
      {
        name: "Ministry of Science and Technology",
      },
    ],
    policy_domains: [
      {
        name_id: "research-and-development",
      },
      {
        name_id: "innovation",
      },
      {
        name_id: "science-technology",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "research-and-development",
      },
      {
        name_id: "innovation",
      },
      {
        name_id: "science-technology",
      },
    ],
  },
  {
    name_id: "earth-sciences",
    wikidata_qid: "Q4294372",
    wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Earth_Sciences",
    names: [
      {
        name: "Ministry of Earth Sciences",
      },
    ],
    policy_domains: [
      {
        name_id: "meteorology",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "meteorology",
      },
    ],
  },
  {
    name_id: "law-and-justice",
    wikidata_qid: "Q18128071",
    wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Law_and_Justice",
    names: [
      {
        name: "Ministry of Law and Justice",
      },
    ],
    policy_domains: [
      {
        name_id: "law-and-justice",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "law-and-justice",
      },
    ],
  },
  {
    name_id: "ayush",
    wikidata_qid: "Q5260158",
    wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Ayush",
    names: [
      {
        name: "Ministry of AYUSH",
      },
    ],
    policy_domains: [
      {
        name_id: "traditional-medicine",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "traditional-medicine",
      },
    ],
  },
  {
    name_id: "skill-development-and-entrepreneurship",
    wikidata_qid: "Q22673518",
    wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Skill_Development_and_Entrepreneurship",
    names: [
      {
        name: "Ministry of Skill Development and Entrepreneurship",
      },
    ],
    policy_domains: [
      {
        name_id: "vocational-training",
      },
      {
        name_id: "entrepreneurship",
      },
    ],
    policy_domain_ministries_list: [
      {
        name_id: "vocational-training",
      },
      {
        name_id: "entrepreneurship",
      },
    ],
  },
];

let groupedMoS: any = {
  Q21229980: [
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Minister_of_Agriculture_and_Farmers%27_Welfare",
          text: "Ministry of Agriculture and Farmers Welfare",
          url: "https://en.wikipedia.org/wiki/Minister_of_Agriculture_and_Farmers%27_Welfare",
          result: {
            wikidata_qid: "Q55623231",
            wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Agriculture_and_Farmers%27_Welfare",
          },
          wikidata_qid: "Q55623231",
          wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Agriculture_and_Farmers%27_Welfare",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/Ram_Nath_Thakur",
        text: "Ram Nath Thakur",
        url: "https://en.wikipedia.org/wiki/Ram_Nath_Thakur",
        result: {
          wikidata_qid: "Q21229980",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ram_Nath_Thakur",
        },
        wikidata_qid: "Q21229980",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ram_Nath_Thakur",
      },
    },
  ],
  Q28873568: [
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Minister_of_Agriculture_and_Farmers%27_Welfare",
          text: "Ministry of Agriculture and Farmers Welfare",
          url: "https://en.wikipedia.org/wiki/Minister_of_Agriculture_and_Farmers%27_Welfare",
          result: {
            wikidata_qid: "Q55623231",
            wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Agriculture_and_Farmers%27_Welfare",
          },
          wikidata_qid: "Q55623231",
          wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Agriculture_and_Farmers%27_Welfare",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/Bhagirath_Choudhary",
        text: "Bhagirath Choudhary",
        url: "https://en.wikipedia.org/wiki/Bhagirath_Choudhary",
        result: {
          wikidata_qid: "Q28873568",
          wikipedia_page: "https://en.wikipedia.org/wiki/Bhagirath_Choudhary",
        },
        wikidata_qid: "Q28873568",
        wikipedia_page: "https://en.wikipedia.org/wiki/Bhagirath_Choudhary",
      },
    },
  ],
  Q4777851: [
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Ministry_of_Chemicals_and_Fertilizers",
          text: "Ministry of Chemicals and Fertilizers",
          url: "https://en.wikipedia.org/wiki/Ministry_of_Chemicals_and_Fertilizers",
          result: {
            wikidata_qid: "Q4294812",
            wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Chemicals_and_Fertilizers",
          },
          wikidata_qid: "Q4294812",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Chemicals_and_Fertilizers",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/Anupriya_Patel",
        text: "Anupriya Patel",
        url: "https://en.wikipedia.org/wiki/Anupriya_Patel",
        result: {
          wikidata_qid: "Q4777851",
          wikipedia_page: "https://en.wikipedia.org/wiki/Anupriya_Patel",
        },
        wikidata_qid: "Q4777851",
        wikipedia_page: "https://en.wikipedia.org/wiki/Anupriya_Patel",
      },
    },
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Ministry_of_Health_and_Family_Welfare",
          text: "Ministry of Health and Family Welfare",
          url: "https://en.wikipedia.org/wiki/Ministry_of_Health_and_Family_Welfare",
          result: {
            wikidata_qid: "Q3525265",
            wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Health_and_Family_Welfare",
          },
          wikidata_qid: "Q3525265",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Health_and_Family_Welfare",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/Anupriya_Patel",
        text: "Anupriya Patel",
        url: "https://en.wikipedia.org/wiki/Anupriya_Patel",
        result: {
          wikidata_qid: "Q4777851",
          wikipedia_page: "https://en.wikipedia.org/wiki/Anupriya_Patel",
        },
        wikidata_qid: "Q4777851",
        wikipedia_page: "https://en.wikipedia.org/wiki/Anupriya_Patel",
      },
    },
  ],
  Q76328310: [
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Ministry_of_Civil_Aviation_(India)",
          text: "Ministry of Civil Aviation",
          url: "https://en.wikipedia.org/wiki/Ministry_of_Civil_Aviation_(India)",
          result: {
            wikidata_qid: "Q15650503",
            wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Civil_Aviation_(India)",
          },
          wikidata_qid: "Q15650503",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Civil_Aviation_(India)",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/Murlidhar_Mohol",
        text: "Murlidhar Mohol",
        url: "https://en.wikipedia.org/wiki/Murlidhar_Mohol",
        result: {
          wikidata_qid: "Q76328310",
          wikipedia_page: "https://en.wikipedia.org/wiki/Murlidhar_Mohol",
        },
        wikidata_qid: "Q76328310",
        wikipedia_page: "https://en.wikipedia.org/wiki/Murlidhar_Mohol",
      },
    },
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Ministry_of_Co-operation",
          text: "Ministry of Co-operation",
          url: "https://en.wikipedia.org/wiki/Ministry_of_Co-operation",
          result: {
            wikidata_qid: "Q107599813",
            wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Co-operation",
          },
          wikidata_qid: "Q107599813",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Co-operation",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/Murlidhar_Mohol",
        text: "Murlidhar Mohol",
        url: "https://en.wikipedia.org/wiki/Murlidhar_Mohol",
        result: {
          wikidata_qid: "Q76328310",
          wikipedia_page: "https://en.wikipedia.org/wiki/Murlidhar_Mohol",
        },
        wikidata_qid: "Q76328310",
        wikipedia_page: "https://en.wikipedia.org/wiki/Murlidhar_Mohol",
      },
    },
  ],
  Q16901147: [
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Ministry_of_Co-operation",
          text: "Ministry of Co-operation",
          url: "https://en.wikipedia.org/wiki/Ministry_of_Co-operation",
          result: {
            wikidata_qid: "Q107599813",
            wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Co-operation",
          },
          wikidata_qid: "Q107599813",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Co-operation",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/Krishan_Pal_Gurjar",
        text: "Krishan Pal Gurjar",
        url: "https://en.wikipedia.org/wiki/Krishan_Pal_Gurjar",
        result: {
          wikidata_qid: "Q16901147",
          wikipedia_page: "https://en.wikipedia.org/wiki/Krishan_Pal_Gurjar",
        },
        wikidata_qid: "Q16901147",
        wikipedia_page: "https://en.wikipedia.org/wiki/Krishan_Pal_Gurjar",
      },
    },
  ],
  Q16728677: [
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Ministry_of_Coal",
          text: "Ministry of Coal",
          url: "https://en.wikipedia.org/wiki/Ministry_of_Coal",
          result: {
            wikidata_qid: "Q3525316",
            wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Coal",
          },
          wikidata_qid: "Q3525316",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Coal",
        },
        {
          href: "https://en.wikipedia.org/wiki/Ministry_of_Mines_(India)",
          text: "Ministry of Mines",
          url: "https://en.wikipedia.org/wiki/Ministry_of_Mines_(India)",
          result: {
            wikidata_qid: "Q4294327",
            wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Mines_(India)",
          },
          wikidata_qid: "Q4294327",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Mines_(India)",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/Satish_Chandra_Dubey",
        text: "Satish Chandra Dubey",
        url: "https://en.wikipedia.org/wiki/Satish_Chandra_Dubey",
        result: {
          wikidata_qid: "Q16728677",
          wikipedia_page: "https://en.wikipedia.org/wiki/Satish_Chandra_Dubey",
        },
        wikidata_qid: "Q16728677",
        wikipedia_page: "https://en.wikipedia.org/wiki/Satish_Chandra_Dubey",
      },
    },
  ],
  Q290717: [
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Ministry_of_Commerce_and_Industry_(India)",
          text: "Ministry of Commerce and Industry",
          url: "https://en.wikipedia.org/wiki/Ministry_of_Commerce_and_Industry_(India)",
          result: {
            wikidata_qid: "Q4294724",
            wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Commerce_and_Industry_(India)",
          },
          wikidata_qid: "Q4294724",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Commerce_and_Industry_(India)",
        },
        {
          href: "https://en.wikipedia.org/wiki/Ministry_of_Electronics_and_Information_Technology",
          text: "Ministry of Electronics and Information Technology",
          url: "https://en.wikipedia.org/wiki/Ministry_of_Electronics_and_Information_Technology",
          result: {
            wikidata_qid: "Q16956017",
            wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Electronics_and_Information_Technology",
          },
          wikidata_qid: "Q16956017",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Electronics_and_Information_Technology",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/Jitin_Prasada",
        text: "Jitin Prasada",
        url: "https://en.wikipedia.org/wiki/Jitin_Prasada",
        result: {
          wikidata_qid: "Q290717",
          wikipedia_page: "https://en.wikipedia.org/wiki/Jitin_Prasada",
        },
        wikidata_qid: "Q290717",
        wikipedia_page: "https://en.wikipedia.org/wiki/Jitin_Prasada",
      },
    },
  ],
  Q126111137: [
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Ministry_of_Communications_(India)",
          text: "Ministry of Communications",
          url: "https://en.wikipedia.org/wiki/Ministry_of_Communications_(India)",
          result: {
            wikidata_qid: "Q12454897",
            wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Communications_(India)",
          },
          wikidata_qid: "Q12454897",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Communications_(India)",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/Chandra_Sekhar_Pemmasani",
        text: "Pemmasani Chandra Sekhar",
        url: "https://en.wikipedia.org/wiki/Chandra_Sekhar_Pemmasani",
        result: {
          wikidata_qid: "Q126111137",
          wikipedia_page: "https://en.wikipedia.org/wiki/Chandra_Sekhar_Pemmasani",
        },
        wikidata_qid: "Q126111137",
        wikipedia_page: "https://en.wikipedia.org/wiki/Chandra_Sekhar_Pemmasani",
      },
    },
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Ministry_of_Rural_Development_(India)",
          text: "Ministry of Rural Development",
          url: "https://en.wikipedia.org/wiki/Ministry_of_Rural_Development_(India)",
          result: {
            wikidata_qid: "Q6867517",
            wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Rural_Development_(India)",
          },
          wikidata_qid: "Q6867517",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Rural_Development_(India)",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/Chandra_Sekhar_Pemmasani",
        text: "Pemmasani Chandra Sekhar",
        url: "https://en.wikipedia.org/wiki/Chandra_Sekhar_Pemmasani",
        result: {
          wikidata_qid: "Q126111137",
          wikipedia_page: "https://en.wikipedia.org/wiki/Chandra_Sekhar_Pemmasani",
        },
        wikidata_qid: "Q126111137",
        wikipedia_page: "https://en.wikipedia.org/wiki/Chandra_Sekhar_Pemmasani",
      },
    },
  ],
  Q104178808: [
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Ministry_of_Consumer_Affairs,_Food_and_Public_Distribution",
          text: "Ministry of Consumer Affairs, Food and Public Distribution",
          url: "https://en.wikipedia.org/wiki/Ministry_of_Consumer_Affairs,_Food_and_Public_Distribution",
          result: {
            wikidata_qid: "Q3525212",
            wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Consumer_Affairs,_Food_and_Public_Distribution",
          },
          wikidata_qid: "Q3525212",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Consumer_Affairs,_Food_and_Public_Distribution",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/B._L._Verma_(Uttar_Pradesh_politician)",
        text: "B. L. Verma",
        url: "https://en.wikipedia.org/wiki/B._L._Verma_(Uttar_Pradesh_politician)",
        result: {
          wikidata_qid: "Q104178808",
          wikipedia_page: "https://en.wikipedia.org/wiki/Banwari_Lal_Verma",
        },
        wikidata_qid: "Q104178808",
        wikipedia_page: "https://en.wikipedia.org/wiki/Banwari_Lal_Verma",
      },
    },
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Ministry_of_Social_Justice_and_Empowerment",
          text: "Ministry of Social Justice and Empowerment",
          url: "https://en.wikipedia.org/wiki/Ministry_of_Social_Justice_and_Empowerment",
          result: {
            wikidata_qid: "Q4294701",
            wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Social_Justice_and_Empowerment",
          },
          wikidata_qid: "Q4294701",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Social_Justice_and_Empowerment",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/B._L._Verma_(Uttar_Pradesh_politician)",
        text: "B. L. Verma",
        url: "https://en.wikipedia.org/wiki/B._L._Verma_(Uttar_Pradesh_politician)",
        result: {
          wikidata_qid: "Q104178808",
          wikipedia_page: "https://en.wikipedia.org/wiki/Banwari_Lal_Verma",
        },
        wikidata_qid: "Q104178808",
        wikipedia_page: "https://en.wikipedia.org/wiki/Banwari_Lal_Verma",
      },
    },
  ],
  Q126364657: [
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Ministry_of_Consumer_Affairs,_Food_and_Public_Distribution",
          text: "Ministry of Consumer Affairs, Food and Public Distribution",
          url: "https://en.wikipedia.org/wiki/Ministry_of_Consumer_Affairs,_Food_and_Public_Distribution",
          result: {
            wikidata_qid: "Q3525212",
            wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Consumer_Affairs,_Food_and_Public_Distribution",
          },
          wikidata_qid: "Q3525212",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Consumer_Affairs,_Food_and_Public_Distribution",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/Nimuben_Bambhaniya",
        text: "Nimuben Bambhaniya",
        url: "https://en.wikipedia.org/wiki/Nimuben_Bambhaniya",
        result: {
          wikidata_qid: "Q126364657",
          wikipedia_page: "https://en.wikipedia.org/wiki/Nimuben_Bambhaniya",
        },
        wikidata_qid: "Q126364657",
        wikipedia_page: "https://en.wikipedia.org/wiki/Nimuben_Bambhaniya",
      },
    },
  ],
  Q126367708: [
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Ministry_of_Corporate_Affairs",
          text: "Ministry of Corporate Affairs",
          url: "https://en.wikipedia.org/wiki/Ministry_of_Corporate_Affairs",
          result: {
            wikidata_qid: "Q4294596",
            wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Corporate_Affairs",
          },
          wikidata_qid: "Q4294596",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Corporate_Affairs",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/Harsh_Malhotra",
        text: "Harsh Malhotra",
        url: "https://en.wikipedia.org/wiki/Harsh_Malhotra",
        result: {
          wikidata_qid: "Q126367708",
          wikipedia_page: "https://en.wikipedia.org/wiki/Harsh_Malhotra",
        },
        wikidata_qid: "Q126367708",
        wikipedia_page: "https://en.wikipedia.org/wiki/Harsh_Malhotra",
      },
    },
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Minister_of_Road_Transport_and_Highways",
          text: "Ministry of Road Transport and Highways",
          url: "https://en.wikipedia.org/wiki/Minister_of_Road_Transport_and_Highways",
          result: {
            wikidata_qid: "Q122238538",
            wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Road_Transport_and_Highways",
          },
          wikidata_qid: "Q122238538",
          wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Road_Transport_and_Highways",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/Harsh_Malhotra",
        text: "Harsh Malhotra",
        url: "https://en.wikipedia.org/wiki/Harsh_Malhotra",
        result: {
          wikidata_qid: "Q126367708",
          wikipedia_page: "https://en.wikipedia.org/wiki/Harsh_Malhotra",
        },
        wikidata_qid: "Q126367708",
        wikipedia_page: "https://en.wikipedia.org/wiki/Harsh_Malhotra",
      },
    },
  ],
  Q7293676: [
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Ministry_of_Culture_(India)",
          text: "Ministry of Culture",
          url: "https://en.wikipedia.org/wiki/Ministry_of_Culture_(India)",
          result: {
            wikidata_qid: "Q4294433",
            wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Culture_(India)",
          },
          wikidata_qid: "Q4294433",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Culture_(India)",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/Rao_Inderjit_Singh",
        text: "Rao Inderjit Singh",
        url: "https://en.wikipedia.org/wiki/Rao_Inderjit_Singh",
        result: {
          wikidata_qid: "Q7293676",
          wikipedia_page: "https://en.wikipedia.org/wiki/Rao_Inderjit_Singh",
        },
        wikidata_qid: "Q7293676",
        wikipedia_page: "https://en.wikipedia.org/wiki/Rao_Inderjit_Singh",
      },
    },
  ],
  Q96404945: [
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Minister_of_Defence_(India)",
          text: "Ministry of Defence",
          url: "https://en.wikipedia.org/wiki/Minister_of_Defence_(India)",
          result: {
            wikidata_qid: "Q3533315",
            wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Defence_(India)",
          },
          wikidata_qid: "Q3533315",
          wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Defence_(India)",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/Sanjay_Seth_(Jharkhand_politician)",
        text: "Sanjay Seth",
        url: "https://en.wikipedia.org/wiki/Sanjay_Seth_(Jharkhand_politician)",
        result: {
          wikidata_qid: "Q96404945",
          wikipedia_page: "https://en.wikipedia.org/wiki/Sanjay_Seth_(Jharkhand_politician)",
        },
        wikidata_qid: "Q96404945",
        wikipedia_page: "https://en.wikipedia.org/wiki/Sanjay_Seth_(Jharkhand_politician)",
      },
    },
  ],
  Q64011108: [
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Ministry_of_Development_of_North_Eastern_Region",
          text: "Ministry of Development of North Eastern Region",
          url: "https://en.wikipedia.org/wiki/Ministry_of_Development_of_North_Eastern_Region",
          result: {
            wikidata_qid: "Q4294643",
            wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Development_of_North_Eastern_Region",
          },
          wikidata_qid: "Q4294643",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Development_of_North_Eastern_Region",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/Sukanta_Majumdar",
        text: "Sukanta Majumdar",
        url: "https://en.wikipedia.org/wiki/Sukanta_Majumdar",
        result: {
          wikidata_qid: "Q64011108",
          wikipedia_page: "https://en.wikipedia.org/wiki/Sukanta_Majumdar",
        },
        wikidata_qid: "Q64011108",
        wikipedia_page: "https://en.wikipedia.org/wiki/Sukanta_Majumdar",
      },
    },
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Minister_of_Education_(India)",
          text: "Ministry of Education",
          url: "https://en.wikipedia.org/wiki/Minister_of_Education_(India)",
          result: {
            wikidata_qid: "Q28169228",
            wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Education_(India)",
          },
          wikidata_qid: "Q28169228",
          wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Education_(India)",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/Sukanta_Majumdar",
        text: "Sukanta Majumdar",
        url: "https://en.wikipedia.org/wiki/Sukanta_Majumdar",
        result: {
          wikidata_qid: "Q64011108",
          wikipedia_page: "https://en.wikipedia.org/wiki/Sukanta_Majumdar",
        },
        wikidata_qid: "Q64011108",
        wikipedia_page: "https://en.wikipedia.org/wiki/Sukanta_Majumdar",
      },
    },
  ],
  Q6167558: [
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Minister_of_Education_(India)",
          text: "Ministry of Education",
          url: "https://en.wikipedia.org/wiki/Minister_of_Education_(India)",
          result: {
            wikidata_qid: "Q28169228",
            wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Education_(India)",
          },
          wikidata_qid: "Q28169228",
          wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Education_(India)",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/Jayant_Chaudhary",
        text: "Jayant Chaudhary",
        url: "https://en.wikipedia.org/wiki/Jayant_Chaudhary",
        result: {
          wikidata_qid: "Q6167558",
          wikipedia_page: "https://en.wikipedia.org/wiki/Jayant_Chaudhary",
        },
        wikidata_qid: "Q6167558",
        wikipedia_page: "https://en.wikipedia.org/wiki/Jayant_Chaudhary",
      },
    },
  ],
  Q6416217: [
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Ministry_of_Environment,_Forest_and_Climate_Change",
          text: "Ministry of Environment, Forest and Climate Change",
          url: "https://en.wikipedia.org/wiki/Ministry_of_Environment,_Forest_and_Climate_Change",
          result: {
            wikidata_qid: "Q2749442",
            wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Environment,_Forest_and_Climate_Change",
          },
          wikidata_qid: "Q2749442",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Environment,_Forest_and_Climate_Change",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/Kirti_Vardhan_Singh",
        text: "Kirti Vardhan Singh",
        url: "https://en.wikipedia.org/wiki/Kirti_Vardhan_Singh",
        result: {
          wikidata_qid: "Q6416217",
          wikipedia_page: "https://en.wikipedia.org/wiki/Kirti_Vardhan_Singh",
        },
        wikidata_qid: "Q6416217",
        wikipedia_page: "https://en.wikipedia.org/wiki/Kirti_Vardhan_Singh",
      },
    },
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Minister_of_External_Affairs_(India)",
          text: "Ministry of External Affairs",
          url: "https://en.wikipedia.org/wiki/Minister_of_External_Affairs_(India)",
          result: {
            wikidata_qid: "Q313465",
            wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_External_Affairs_(India)",
          },
          wikidata_qid: "Q313465",
          wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_External_Affairs_(India)",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/Kirti_Vardhan_Singh",
        text: "Kirti Vardhan Singh",
        url: "https://en.wikipedia.org/wiki/Kirti_Vardhan_Singh",
        result: {
          wikidata_qid: "Q6416217",
          wikipedia_page: "https://en.wikipedia.org/wiki/Kirti_Vardhan_Singh",
        },
        wikidata_qid: "Q6416217",
        wikipedia_page: "https://en.wikipedia.org/wiki/Kirti_Vardhan_Singh",
      },
    },
  ],
  Q111352685: [
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Minister_of_External_Affairs_(India)",
          text: "Ministry of External Affairs",
          url: "https://en.wikipedia.org/wiki/Minister_of_External_Affairs_(India)",
          result: {
            wikidata_qid: "Q313465",
            wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_External_Affairs_(India)",
          },
          wikidata_qid: "Q313465",
          wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_External_Affairs_(India)",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/Pabitra_Margherita",
        text: "Pabitra Margherita",
        url: "https://en.wikipedia.org/wiki/Pabitra_Margherita",
        result: {
          wikidata_qid: "Q111352685",
          wikipedia_page: "https://en.wikipedia.org/wiki/Pabitra_Margherita",
        },
        wikidata_qid: "Q111352685",
        wikipedia_page: "https://en.wikipedia.org/wiki/Pabitra_Margherita",
      },
    },
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Ministry_of_Textiles_(India)",
          text: "Ministry of Textiles",
          url: "https://en.wikipedia.org/wiki/Ministry_of_Textiles_(India)",
          result: {
            wikidata_qid: "Q4294449",
            wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Textiles",
          },
          wikidata_qid: "Q4294449",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Textiles",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/Pabitra_Margherita",
        text: "Pabitra Margherita",
        url: "https://en.wikipedia.org/wiki/Pabitra_Margherita",
        result: {
          wikidata_qid: "Q111352685",
          wikipedia_page: "https://en.wikipedia.org/wiki/Pabitra_Margherita",
        },
        wikidata_qid: "Q111352685",
        wikipedia_page: "https://en.wikipedia.org/wiki/Pabitra_Margherita",
      },
    },
  ],
  Q7131282: [
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Minister_of_Finance_(India)",
          text: "Ministry of Finance",
          url: "https://en.wikipedia.org/wiki/Minister_of_Finance_(India)",
          result: {
            wikidata_qid: "Q1416501",
            wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Finance_(India)",
          },
          wikidata_qid: "Q1416501",
          wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Finance_(India)",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/Pankaj_Chaudhary",
        text: "Pankaj Chaudhary",
        url: "https://en.wikipedia.org/wiki/Pankaj_Chaudhary",
        result: {
          wikidata_qid: "Q7131282",
          wikipedia_page: "https://en.wikipedia.org/wiki/Pankaj_Chaudhary",
        },
        wikidata_qid: "Q7131282",
        wikipedia_page: "https://en.wikipedia.org/wiki/Pankaj_Chaudhary",
      },
    },
  ],
  Q7387753: [
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Ministry_of_Fisheries,_Animal_Husbandry_and_Dairying",
          text: "Ministry of Fisheries, Animal Husbandry and Dairying",
          url: "https://en.wikipedia.org/wiki/Ministry_of_Fisheries,_Animal_Husbandry_and_Dairying",
          result: {
            wikidata_qid: "Q65042516",
            wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Fisheries,_Animal_Husbandry_and_Dairying",
          },
          wikidata_qid: "Q65042516",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Fisheries,_Animal_Husbandry_and_Dairying",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/S._P._Singh_Baghel",
        text: "S. P. Singh Baghel",
        url: "https://en.wikipedia.org/wiki/S._P._Singh_Baghel",
        result: {
          wikidata_qid: "Q7387753",
          wikipedia_page: "https://en.wikipedia.org/wiki/S._P._Singh_Baghel",
        },
        wikidata_qid: "Q7387753",
        wikipedia_page: "https://en.wikipedia.org/wiki/S._P._Singh_Baghel",
      },
    },
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Ministry_of_Panchayati_Raj",
          text: "Ministry of Panchayati Raj",
          url: "https://en.wikipedia.org/wiki/Ministry_of_Panchayati_Raj",
          result: {
            wikidata_qid: "Q4294588",
            wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Panchayati_Raj",
          },
          wikidata_qid: "Q4294588",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Panchayati_Raj",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/S._P._Singh_Baghel",
        text: "S. P. Singh Baghel",
        url: "https://en.wikipedia.org/wiki/S._P._Singh_Baghel",
        result: {
          wikidata_qid: "Q7387753",
          wikipedia_page: "https://en.wikipedia.org/wiki/S._P._Singh_Baghel",
        },
        wikidata_qid: "Q7387753",
        wikipedia_page: "https://en.wikipedia.org/wiki/S._P._Singh_Baghel",
      },
    },
  ],
  Q126469351: [
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Ministry_of_Fisheries,_Animal_Husbandry_and_Dairying",
          text: "Ministry of Fisheries, Animal Husbandry and Dairying",
          url: "https://en.wikipedia.org/wiki/Ministry_of_Fisheries,_Animal_Husbandry_and_Dairying",
          result: {
            wikidata_qid: "Q65042516",
            wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Fisheries,_Animal_Husbandry_and_Dairying",
          },
          wikidata_qid: "Q65042516",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Fisheries,_Animal_Husbandry_and_Dairying",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/George_Kurian_(Indian_politician)",
        text: "George Kurian",
        url: "https://en.wikipedia.org/wiki/George_Kurian_(Indian_politician)",
        result: {
          wikidata_qid: "Q126469351",
          wikipedia_page: "https://en.wikipedia.org/wiki/George_Kurian_(politician)",
        },
        wikidata_qid: "Q126469351",
        wikipedia_page: "https://en.wikipedia.org/wiki/George_Kurian_(politician)",
      },
    },
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Ministry_of_Minority_Affairs",
          text: "Ministry of Minority Affairs",
          url: "https://en.wikipedia.org/wiki/Ministry_of_Minority_Affairs",
          result: {
            wikidata_qid: "Q4294587",
            wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Minority_Affairs",
          },
          wikidata_qid: "Q4294587",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Minority_Affairs",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/George_Kurian_(Indian_politician)",
        text: "George Kurian",
        url: "https://en.wikipedia.org/wiki/George_Kurian_(Indian_politician)",
        result: {
          wikidata_qid: "Q126469351",
          wikipedia_page: "https://en.wikipedia.org/wiki/George_Kurian_(politician)",
        },
        wikidata_qid: "Q126469351",
        wikipedia_page: "https://en.wikipedia.org/wiki/George_Kurian_(politician)",
      },
    },
  ],
  Q7296806: [
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Ministry_of_Food_Processing_Industries",
          text: "Ministry of Food Processing Industries",
          url: "https://en.wikipedia.org/wiki/Ministry_of_Food_Processing_Industries",
          result: {
            wikidata_qid: "Q4294565",
            wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Food_Processing_Industries",
          },
          wikidata_qid: "Q4294565",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Food_Processing_Industries",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/Ravneet_Singh_Bittu",
        text: "Ravneet Singh Bittu",
        url: "https://en.wikipedia.org/wiki/Ravneet_Singh_Bittu",
        result: {
          wikidata_qid: "Q7296806",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ravneet_Singh_Bittu",
        },
        wikidata_qid: "Q7296806",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ravneet_Singh_Bittu",
      },
    },
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Minister_of_Railways_(India)",
          text: "Ministry of Railways",
          url: "https://en.wikipedia.org/wiki/Minister_of_Railways_(India)",
          result: {
            wikidata_qid: "Q6866301",
            wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Railways_(India)",
          },
          wikidata_qid: "Q6866301",
          wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Railways_(India)",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/Ravneet_Singh_Bittu",
        text: "Ravneet Singh Bittu",
        url: "https://en.wikipedia.org/wiki/Ravneet_Singh_Bittu",
        result: {
          wikidata_qid: "Q7296806",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ravneet_Singh_Bittu",
        },
        wikidata_qid: "Q7296806",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ravneet_Singh_Bittu",
      },
    },
  ],
  Q7238626: [
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Ministry_of_Health_and_Family_Welfare",
          text: "Ministry of Health and Family Welfare",
          url: "https://en.wikipedia.org/wiki/Ministry_of_Health_and_Family_Welfare",
          result: {
            wikidata_qid: "Q3525265",
            wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Health_and_Family_Welfare",
          },
          wikidata_qid: "Q3525265",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Health_and_Family_Welfare",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/Prataprao_Ganpatrao_Jadhav",
        text: "Prataprao Ganpatrao Jadhav",
        url: "https://en.wikipedia.org/wiki/Prataprao_Ganpatrao_Jadhav",
        result: {
          wikidata_qid: "Q7238626",
          wikipedia_page: "https://en.wikipedia.org/wiki/Prataprao_Jadhav",
        },
        wikidata_qid: "Q7238626",
        wikipedia_page: "https://en.wikipedia.org/wiki/Prataprao_Jadhav",
      },
    },
  ],
  Q126364180: [
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Ministry_of_Heavy_Industries",
          text: "Ministry of Heavy Industries",
          url: "https://en.wikipedia.org/wiki/Ministry_of_Heavy_Industries",
          result: {
            wikidata_qid: "Q108619669",
            wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Heavy_Industries",
          },
          wikidata_qid: "Q108619669",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Heavy_Industries",
        },
        {
          href: "https://en.wikipedia.org/wiki/Ministry_of_Steel",
          text: "Ministry of Steel",
          url: "https://en.wikipedia.org/wiki/Ministry_of_Steel",
          result: {
            wikidata_qid: "Q3525381",
            wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Steel",
          },
          wikidata_qid: "Q3525381",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Steel",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/Bhupathi_Raju_Srinivasa_Varma",
        text: "Bhupathi Raju Srinivasa Varma",
        url: "https://en.wikipedia.org/wiki/Bhupathi_Raju_Srinivasa_Varma",
        result: {
          wikidata_qid: "Q126364180",
          wikipedia_page: "https://en.wikipedia.org/wiki/Bhupathi_Raju_Srinivasa_Varma",
        },
        wikidata_qid: "Q126364180",
        wikipedia_page: "https://en.wikipedia.org/wiki/Bhupathi_Raju_Srinivasa_Varma",
      },
    },
  ],
  Q16734872: [
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Minister_of_Home_Affairs_(India)",
          text: "Ministry of Home Affairs",
          url: "https://en.wikipedia.org/wiki/Minister_of_Home_Affairs_(India)",
          result: {
            wikidata_qid: "Q3440901",
            wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Home_Affairs_(India)",
          },
          wikidata_qid: "Q3440901",
          wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Home_Affairs_(India)",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/Nityanand_Rai",
        text: "Nityanand Rai",
        url: "https://en.wikipedia.org/wiki/Nityanand_Rai",
        result: {
          wikidata_qid: "Q16734872",
          wikipedia_page: "https://en.wikipedia.org/wiki/Nityanand_Rai",
        },
        wikidata_qid: "Q16734872",
        wikipedia_page: "https://en.wikipedia.org/wiki/Nityanand_Rai",
      },
    },
  ],
  Q64143189: [
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Minister_of_Home_Affairs_(India)",
          text: "Ministry of Home Affairs",
          url: "https://en.wikipedia.org/wiki/Minister_of_Home_Affairs_(India)",
          result: {
            wikidata_qid: "Q3440901",
            wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Home_Affairs_(India)",
          },
          wikidata_qid: "Q3440901",
          wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Home_Affairs_(India)",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/Bandi_Sanjay_Kumar",
        text: "Bandi Sanjay Kumar",
        url: "https://en.wikipedia.org/wiki/Bandi_Sanjay_Kumar",
        result: {
          wikidata_qid: "Q64143189",
          wikipedia_page: "https://en.wikipedia.org/wiki/Bandi_Sanjay_Kumar",
        },
        wikidata_qid: "Q64143189",
        wikipedia_page: "https://en.wikipedia.org/wiki/Bandi_Sanjay_Kumar",
      },
    },
  ],
  Q58290680: [
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Minister_of_Housing_and_Urban_Affairs",
          text: "Ministry of Housing and Urban Affairs",
          url: "https://en.wikipedia.org/wiki/Minister_of_Housing_and_Urban_Affairs",
          result: {
            wikidata_qid: "Q122060109",
            wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Housing_and_Urban_Affairs",
          },
          wikidata_qid: "Q122060109",
          wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Housing_and_Urban_Affairs",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/Tokhan_Sahu",
        text: "Tokhan Sahu",
        url: "https://en.wikipedia.org/wiki/Tokhan_Sahu",
        result: {
          wikidata_qid: "Q58290680",
          wikipedia_page: "https://en.wikipedia.org/wiki/Tokhan_Sahu",
        },
        wikidata_qid: "Q58290680",
        wikipedia_page: "https://en.wikipedia.org/wiki/Tokhan_Sahu",
      },
    },
  ],
  Q87570577: [
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Ministry_of_Information_and_Broadcasting_(India)",
          text: "Ministry of Information and Broadcasting",
          url: "https://en.wikipedia.org/wiki/Ministry_of_Information_and_Broadcasting_(India)",
          result: {
            wikidata_qid: "Q4294412",
            wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Information_and_Broadcasting_(India)",
          },
          wikidata_qid: "Q4294412",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Information_and_Broadcasting_(India)",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/L._Murugan",
        text: "L. Murugan",
        url: "https://en.wikipedia.org/wiki/L._Murugan",
        result: {
          wikidata_qid: "Q87570577",
          wikipedia_page: "https://en.wikipedia.org/wiki/L._Murugan",
        },
        wikidata_qid: "Q87570577",
        wikipedia_page: "https://en.wikipedia.org/wiki/L._Murugan",
      },
    },
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Ministry_of_Parliamentary_Affairs_(India)",
          text: "Ministry of Parliamentary Affairs",
          url: "https://en.wikipedia.org/wiki/Ministry_of_Parliamentary_Affairs_(India)",
          result: {
            wikidata_qid: "Q12455047",
            wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Parliamentary_Affairs_(India)",
          },
          wikidata_qid: "Q12455047",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Parliamentary_Affairs_(India)",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/L._Murugan",
        text: "L. Murugan",
        url: "https://en.wikipedia.org/wiki/L._Murugan",
        result: {
          wikidata_qid: "Q87570577",
          wikipedia_page: "https://en.wikipedia.org/wiki/L._Murugan",
        },
        wikidata_qid: "Q87570577",
        wikipedia_page: "https://en.wikipedia.org/wiki/L._Murugan",
      },
    },
  ],
  Q24851577: [
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Ministry_of_Jal_Shakti",
          text: "Ministry of Jal Shakti",
          url: "https://en.wikipedia.org/wiki/Ministry_of_Jal_Shakti",
          result: {
            wikidata_qid: "Q85785741",
            wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Jal_Shakti",
          },
          wikidata_qid: "Q85785741",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Jal_Shakti",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/V._Somanna",
        text: "V. Somanna",
        url: "https://en.wikipedia.org/wiki/V._Somanna",
        result: {
          wikidata_qid: "Q24851577",
          wikipedia_page: "https://en.wikipedia.org/wiki/V._Somanna",
        },
        wikidata_qid: "Q24851577",
        wikipedia_page: "https://en.wikipedia.org/wiki/V._Somanna",
      },
    },
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Minister_of_Railways_(India)",
          text: "Ministry of Railways",
          url: "https://en.wikipedia.org/wiki/Minister_of_Railways_(India)",
          result: {
            wikidata_qid: "Q6866301",
            wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Railways_(India)",
          },
          wikidata_qid: "Q6866301",
          wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Railways_(India)",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/V._Somanna",
        text: "V. Somanna",
        url: "https://en.wikipedia.org/wiki/V._Somanna",
        result: {
          wikidata_qid: "Q24851577",
          wikipedia_page: "https://en.wikipedia.org/wiki/V._Somanna",
        },
        wikidata_qid: "Q24851577",
        wikipedia_page: "https://en.wikipedia.org/wiki/V._Somanna",
      },
    },
  ],
  Q126365290: [
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Ministry_of_Jal_Shakti",
          text: "Ministry of Jal Shakti",
          url: "https://en.wikipedia.org/wiki/Ministry_of_Jal_Shakti",
          result: {
            wikidata_qid: "Q85785741",
            wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Jal_Shakti",
          },
          wikidata_qid: "Q85785741",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Jal_Shakti",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/Raj_Bhushan_Choudhary",
        text: "Raj Bhushan Choudhary",
        url: "https://en.wikipedia.org/wiki/Raj_Bhushan_Choudhary",
        result: {
          wikidata_qid: "Q126365290",
          wikipedia_page: "https://en.wikipedia.org/wiki/Raj_Bhushan_Choudhary",
        },
        wikidata_qid: "Q126365290",
        wikipedia_page: "https://en.wikipedia.org/wiki/Raj_Bhushan_Choudhary",
      },
    },
  ],
  Q7499789: [
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Ministry_of_Micro,_Small_and_Medium_Enterprises",
          text: "Ministry of Micro, Small and Medium Enterprises",
          url: "https://en.wikipedia.org/wiki/Ministry_of_Micro,_Small_and_Medium_Enterprises",
          result: {
            wikidata_qid: "Q4294585",
            wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Micro,_Small_and_Medium_Enterprises",
          },
          wikidata_qid: "Q4294585",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Micro,_Small_and_Medium_Enterprises",
        },
        {
          href: "https://en.wikipedia.org/wiki/Ministry_of_Labour_and_Employment_(India)",
          text: "Ministry of Labour and Employment",
          url: "https://en.wikipedia.org/wiki/Ministry_of_Labour_and_Employment_(India)",
          result: {
            wikidata_qid: "Q4294756",
            wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Labour_and_Employment_(India)",
          },
          wikidata_qid: "Q4294756",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Labour_and_Employment_(India)",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/Shobha_Karandlaje",
        text: "Shobha Karandlaje",
        url: "https://en.wikipedia.org/wiki/Shobha_Karandlaje",
        result: {
          wikidata_qid: "Q7499789",
          wikipedia_page: "https://en.wikipedia.org/wiki/Shobha_Karandlaje",
        },
        wikidata_qid: "Q7499789",
        wikipedia_page: "https://en.wikipedia.org/wiki/Shobha_Karandlaje",
      },
    },
  ],
  Q4791582: [
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Ministry_of_Parliamentary_Affairs_(India)",
          text: "Ministry of Parliamentary Affairs",
          url: "https://en.wikipedia.org/wiki/Ministry_of_Parliamentary_Affairs_(India)",
          result: {
            wikidata_qid: "Q12455047",
            wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Parliamentary_Affairs_(India)",
          },
          wikidata_qid: "Q12455047",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Parliamentary_Affairs_(India)",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/Arjun_Ram_Meghwal",
        text: "Arjun Ram Meghwal",
        url: "https://en.wikipedia.org/wiki/Arjun_Ram_Meghwal",
        result: {
          wikidata_qid: "Q4791582",
          wikipedia_page: "https://en.wikipedia.org/wiki/Arjun_Ram_Meghwal",
        },
        wikidata_qid: "Q4791582",
        wikipedia_page: "https://en.wikipedia.org/wiki/Arjun_Ram_Meghwal",
      },
    },
  ],
  Q3530125: [
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Ministry_of_Petroleum_and_Natural_Gas",
          text: "Ministry of Petroleum and Natural Gas",
          url: "https://en.wikipedia.org/wiki/Ministry_of_Petroleum_and_Natural_Gas",
          result: {
            wikidata_qid: "Q4294487",
            wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Petroleum_and_Natural_Gas",
          },
          wikidata_qid: "Q4294487",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Petroleum_and_Natural_Gas",
        },
        {
          href: "https://en.wikipedia.org/wiki/Ministry_of_Tourism_(India)",
          text: "Ministry of Tourism",
          url: "https://en.wikipedia.org/wiki/Ministry_of_Tourism_(India)",
          result: {
            wikidata_qid: "Q4294772",
            wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Tourism_(India)",
          },
          wikidata_qid: "Q4294772",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Tourism_(India)",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/Suresh_Gopi",
        text: "Suresh Gopi",
        url: "https://en.wikipedia.org/wiki/Suresh_Gopi",
        result: {
          wikidata_qid: "Q3530125",
          wikipedia_page: "https://en.wikipedia.org/wiki/Suresh_Gopi",
        },
        wikidata_qid: "Q3530125",
        wikipedia_page: "https://en.wikipedia.org/wiki/Suresh_Gopi",
      },
    },
  ],
  Q63992931: [
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Ministry_of_Ports,_Shipping_and_Waterways",
          text: "Ministry of Ports, Shipping and Waterways",
          url: "https://en.wikipedia.org/wiki/Ministry_of_Ports,_Shipping_and_Waterways",
          result: {
            wikidata_qid: "Q4294719",
            wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Ports,_Shipping_and_Waterways",
          },
          wikidata_qid: "Q4294719",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Ports,_Shipping_and_Waterways",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/Shantanu_Thakur",
        text: "Shantanu Thakur",
        url: "https://en.wikipedia.org/wiki/Shantanu_Thakur",
        result: {
          wikidata_qid: "Q63992931",
          wikipedia_page: "https://en.wikipedia.org/wiki/Shantanu_Thakur",
        },
        wikidata_qid: "Q63992931",
        wikipedia_page: "https://en.wikipedia.org/wiki/Shantanu_Thakur",
      },
    },
  ],
  Q7504173: [
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Ministry_of_Power_(India)",
          text: "Ministry of Power",
          url: "https://en.wikipedia.org/wiki/Ministry_of_Power_(India)",
          result: {
            wikidata_qid: "Q4294844",
            wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Power_(India)",
          },
          wikidata_qid: "Q4294844",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Power_(India)",
        },
        {
          href: "https://en.wikipedia.org/wiki/Ministry_of_New_and_Renewable_Energy",
          text: "Ministry of New and Renewable Energy",
          url: "https://en.wikipedia.org/wiki/Ministry_of_New_and_Renewable_Energy",
          result: {
            wikidata_qid: "Q4294489",
            wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_New_and_Renewable_Energy",
          },
          wikidata_qid: "Q4294489",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_New_and_Renewable_Energy",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/Shripad_Yesso_Naik",
        text: "Shripad Yesso Naik",
        url: "https://en.wikipedia.org/wiki/Shripad_Yesso_Naik",
        result: {
          wikidata_qid: "Q7504173",
          wikipedia_page: "https://en.wikipedia.org/wiki/Shripad_Naik",
        },
        wikidata_qid: "Q7504173",
        wikipedia_page: "https://en.wikipedia.org/wiki/Shripad_Naik",
      },
    },
  ],
  Q16736901: [
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Minister_of_Road_Transport_and_Highways",
          text: "Ministry of Road Transport and Highways",
          url: "https://en.wikipedia.org/wiki/Minister_of_Road_Transport_and_Highways",
          result: {
            wikidata_qid: "Q122238538",
            wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Road_Transport_and_Highways",
          },
          wikidata_qid: "Q122238538",
          wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Road_Transport_and_Highways",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/Ajay_Tamta",
        text: "Ajay Tamta",
        url: "https://en.wikipedia.org/wiki/Ajay_Tamta",
        result: {
          wikidata_qid: "Q16736901",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ajay_Tamta",
        },
        wikidata_qid: "Q16736901",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ajay_Tamta",
      },
    },
  ],
  Q16215999: [
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Ministry_of_Rural_Development_(India)",
          text: "Ministry of Rural Development",
          url: "https://en.wikipedia.org/wiki/Ministry_of_Rural_Development_(India)",
          result: {
            wikidata_qid: "Q6867517",
            wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Rural_Development_(India)",
          },
          wikidata_qid: "Q6867517",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Rural_Development_(India)",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/Kamlesh_Paswan",
        text: "Kamlesh Paswan",
        url: "https://en.wikipedia.org/wiki/Kamlesh_Paswan",
        result: {
          wikidata_qid: "Q16215999",
          wikipedia_page: "https://en.wikipedia.org/wiki/Kamlesh_Paswan",
        },
        wikidata_qid: "Q16215999",
        wikipedia_page: "https://en.wikipedia.org/wiki/Kamlesh_Paswan",
      },
    },
  ],
  Q4813289: [
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Ministry_of_Social_Justice_and_Empowerment",
          text: "Ministry of Social Justice and Empowerment",
          url: "https://en.wikipedia.org/wiki/Ministry_of_Social_Justice_and_Empowerment",
          result: {
            wikidata_qid: "Q4294701",
            wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Social_Justice_and_Empowerment",
          },
          wikidata_qid: "Q4294701",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Social_Justice_and_Empowerment",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/Ramdas_Athawale",
        text: "Ramdas Athawale",
        url: "https://en.wikipedia.org/wiki/Ramdas_Athawale",
        result: {
          wikidata_qid: "Q4813289",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ramdas_Athawale",
        },
        wikidata_qid: "Q4813289",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ramdas_Athawale",
      },
    },
  ],
  Q64006793: [
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Ministry_of_Tribal_Affairs",
          text: "Ministry of Tribal Affairs",
          url: "https://en.wikipedia.org/wiki/Ministry_of_Tribal_Affairs",
          result: {
            wikidata_qid: "Q6867635",
            wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Tribal_Affairs",
          },
          wikidata_qid: "Q6867635",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Tribal_Affairs",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/Durga_Das_Uikey",
        text: "Durga Das Uikey",
        url: "https://en.wikipedia.org/wiki/Durga_Das_Uikey",
        result: {
          wikidata_qid: "Q64006793",
          wikipedia_page: "https://en.wikipedia.org/wiki/Durga_Das_Uikey",
        },
        wikidata_qid: "Q64006793",
        wikipedia_page: "https://en.wikipedia.org/wiki/Durga_Das_Uikey",
      },
    },
  ],
  Q16736902: [
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Ministry_of_Women_and_Child_Development",
          text: "Ministry of Women and Child Development",
          url: "https://en.wikipedia.org/wiki/Ministry_of_Women_and_Child_Development",
          result: {
            wikidata_qid: "Q12446115",
            wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Women_and_Child_Development",
          },
          wikidata_qid: "Q12446115",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Women_and_Child_Development",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/Savitri_Thakur",
        text: "Savitri Thakur",
        url: "https://en.wikipedia.org/wiki/Savitri_Thakur",
        result: {
          wikidata_qid: "Q16736902",
          wikipedia_page: "https://en.wikipedia.org/wiki/Savitri_Thakur",
        },
        wikidata_qid: "Q16736902",
        wikipedia_page: "https://en.wikipedia.org/wiki/Savitri_Thakur",
      },
    },
  ],
  Q16908900: [
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Ministry_of_Youth_Affairs_and_Sports",
          text: "Ministry of Youth Affairs and Sports",
          url: "https://en.wikipedia.org/wiki/Ministry_of_Youth_Affairs_and_Sports",
          result: {
            wikidata_qid: "Q4294590",
            wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Youth_Affairs_and_Sports",
          },
          wikidata_qid: "Q4294590",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Youth_Affairs_and_Sports",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/Raksha_Khadse",
        text: "Raksha Khadse",
        url: "https://en.wikipedia.org/wiki/Raksha_Khadse",
        result: {
          wikidata_qid: "Q16908900",
          wikipedia_page: "https://en.wikipedia.org/wiki/Raksha_Khadse",
        },
        wikidata_qid: "Q16908900",
        wikipedia_page: "https://en.wikipedia.org/wiki/Raksha_Khadse",
      },
    },
  ],
  Q6203277: [
    {
      portfolio: [
        {
          href: "https://en.wikipedia.org/wiki/Prime_Minister%27s_Office_(India)",
          text: "Prime Minister’s Office",
          url: "https://en.wikipedia.org/wiki/Prime_Minister%27s_Office_(India)",
          result: {
            wikidata_qid: "Q7243280",
            wikipedia_page: "https://en.wikipedia.org/wiki/Prime_Minister%27s_Office_(India)",
          },
          wikidata_qid: "Q7243280",
          wikipedia_page: "https://en.wikipedia.org/wiki/Prime_Minister%27s_Office_(India)",
        },
        {
          href: "https://en.wikipedia.org/wiki/Ministry_of_Personnel,_Public_Grievances_and_Pensions",
          text: "Ministry of Personnel, Public Grievances and Pensions",
          url: "https://en.wikipedia.org/wiki/Ministry_of_Personnel,_Public_Grievances_and_Pensions",
          result: {
            wikidata_qid: "Q4294428",
            wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Personnel,_Public_Grievances_and_Pensions",
          },
          wikidata_qid: "Q4294428",
          wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Personnel,_Public_Grievances_and_Pensions",
        },
        {
          href: "https://en.wikipedia.org/wiki/Department_of_Atomic_Energy",
          text: "Department of Atomic Energy",
          url: "https://en.wikipedia.org/wiki/Department_of_Atomic_Energy",
          result: {
            wikidata_qid: "Q3523073",
            wikipedia_page: "https://en.wikipedia.org/wiki/Department_of_Atomic_Energy",
          },
          wikidata_qid: "Q3523073",
          wikipedia_page: "https://en.wikipedia.org/wiki/Department_of_Atomic_Energy",
        },
        {
          href: "https://en.wikipedia.org/wiki/Department_of_Space",
          text: "Department of Space",
          url: "https://en.wikipedia.org/wiki/Department_of_Space",
          result: {
            wikidata_qid: "Q4158548",
            wikipedia_page: "https://en.wikipedia.org/wiki/Department_of_Space",
          },
          wikidata_qid: "Q4158548",
          wikipedia_page: "https://en.wikipedia.org/wiki/Department_of_Space",
        },
      ],
      minister: {
        href: "https://en.wikipedia.org/wiki/Jitendra_Singh_(politician,_born_1956)",
        text: "Jitendra Singh",
        url: "https://en.wikipedia.org/wiki/Jitendra_Singh_(politician,_born_1956)",
        result: {
          wikidata_qid: "Q6203277",
          wikipedia_page: "https://en.wikipedia.org/wiki/Jitendra_Singh_Rana",
        },
        wikidata_qid: "Q6203277",
        wikipedia_page: "https://en.wikipedia.org/wiki/Jitendra_Singh_Rana",
      },
    },
  ],
};

let groupedMoSKeyed: any = {
  Q21229980: [
    {
      href: "https://en.wikipedia.org/wiki/Minister_of_Agriculture_and_Farmers%27_Welfare",
      text: "Ministry of Agriculture and Farmers Welfare",
      url: "https://en.wikipedia.org/wiki/Minister_of_Agriculture_and_Farmers%27_Welfare",
      result: {
        wikidata_qid: "Q55623231",
        wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Agriculture_and_Farmers%27_Welfare",
      },
      wikidata_qid: "Q55623231",
      wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Agriculture_and_Farmers%27_Welfare",
    },
  ],
  Q28873568: [
    {
      href: "https://en.wikipedia.org/wiki/Minister_of_Agriculture_and_Farmers%27_Welfare",
      text: "Ministry of Agriculture and Farmers Welfare",
      url: "https://en.wikipedia.org/wiki/Minister_of_Agriculture_and_Farmers%27_Welfare",
      result: {
        wikidata_qid: "Q55623231",
        wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Agriculture_and_Farmers%27_Welfare",
      },
      wikidata_qid: "Q55623231",
      wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Agriculture_and_Farmers%27_Welfare",
    },
  ],
  Q4777851: [
    {
      href: "https://en.wikipedia.org/wiki/Ministry_of_Chemicals_and_Fertilizers",
      text: "Ministry of Chemicals and Fertilizers",
      url: "https://en.wikipedia.org/wiki/Ministry_of_Chemicals_and_Fertilizers",
      result: {
        wikidata_qid: "Q4294812",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Chemicals_and_Fertilizers",
      },
      wikidata_qid: "Q4294812",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Chemicals_and_Fertilizers",
    },
    {
      href: "https://en.wikipedia.org/wiki/Ministry_of_Health_and_Family_Welfare",
      text: "Ministry of Health and Family Welfare",
      url: "https://en.wikipedia.org/wiki/Ministry_of_Health_and_Family_Welfare",
      result: {
        wikidata_qid: "Q3525265",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Health_and_Family_Welfare",
      },
      wikidata_qid: "Q3525265",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Health_and_Family_Welfare",
    },
  ],
  Q76328310: [
    {
      href: "https://en.wikipedia.org/wiki/Ministry_of_Civil_Aviation_(India)",
      text: "Ministry of Civil Aviation",
      url: "https://en.wikipedia.org/wiki/Ministry_of_Civil_Aviation_(India)",
      result: {
        wikidata_qid: "Q15650503",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Civil_Aviation_(India)",
      },
      wikidata_qid: "Q15650503",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Civil_Aviation_(India)",
    },
    {
      href: "https://en.wikipedia.org/wiki/Ministry_of_Co-operation",
      text: "Ministry of Co-operation",
      url: "https://en.wikipedia.org/wiki/Ministry_of_Co-operation",
      result: { wikidata_qid: "Q107599813", wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Co-operation" },
      wikidata_qid: "Q107599813",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Co-operation",
    },
  ],
  Q16901147: [
    {
      href: "https://en.wikipedia.org/wiki/Ministry_of_Co-operation",
      text: "Ministry of Co-operation",
      url: "https://en.wikipedia.org/wiki/Ministry_of_Co-operation",
      result: { wikidata_qid: "Q107599813", wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Co-operation" },
      wikidata_qid: "Q107599813",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Co-operation",
    },
  ],
  Q16728677: [
    {
      href: "https://en.wikipedia.org/wiki/Ministry_of_Coal",
      text: "Ministry of Coal",
      url: "https://en.wikipedia.org/wiki/Ministry_of_Coal",
      result: { wikidata_qid: "Q3525316", wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Coal" },
      wikidata_qid: "Q3525316",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Coal",
    },
    {
      href: "https://en.wikipedia.org/wiki/Ministry_of_Mines_(India)",
      text: "Ministry of Mines",
      url: "https://en.wikipedia.org/wiki/Ministry_of_Mines_(India)",
      result: { wikidata_qid: "Q4294327", wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Mines_(India)" },
      wikidata_qid: "Q4294327",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Mines_(India)",
    },
  ],
  Q290717: [
    {
      href: "https://en.wikipedia.org/wiki/Ministry_of_Commerce_and_Industry_(India)",
      text: "Ministry of Commerce and Industry",
      url: "https://en.wikipedia.org/wiki/Ministry_of_Commerce_and_Industry_(India)",
      result: {
        wikidata_qid: "Q4294724",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Commerce_and_Industry_(India)",
      },
      wikidata_qid: "Q4294724",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Commerce_and_Industry_(India)",
    },
    {
      href: "https://en.wikipedia.org/wiki/Ministry_of_Electronics_and_Information_Technology",
      text: "Ministry of Electronics and Information Technology",
      url: "https://en.wikipedia.org/wiki/Ministry_of_Electronics_and_Information_Technology",
      result: {
        wikidata_qid: "Q16956017",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Electronics_and_Information_Technology",
      },
      wikidata_qid: "Q16956017",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Electronics_and_Information_Technology",
    },
  ],
  Q126111137: [
    {
      href: "https://en.wikipedia.org/wiki/Ministry_of_Communications_(India)",
      text: "Ministry of Communications",
      url: "https://en.wikipedia.org/wiki/Ministry_of_Communications_(India)",
      result: {
        wikidata_qid: "Q12454897",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Communications_(India)",
      },
      wikidata_qid: "Q12454897",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Communications_(India)",
    },
    {
      href: "https://en.wikipedia.org/wiki/Ministry_of_Rural_Development_(India)",
      text: "Ministry of Rural Development",
      url: "https://en.wikipedia.org/wiki/Ministry_of_Rural_Development_(India)",
      result: {
        wikidata_qid: "Q6867517",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Rural_Development_(India)",
      },
      wikidata_qid: "Q6867517",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Rural_Development_(India)",
    },
  ],
  Q104178808: [
    {
      href: "https://en.wikipedia.org/wiki/Ministry_of_Consumer_Affairs,_Food_and_Public_Distribution",
      text: "Ministry of Consumer Affairs, Food and Public Distribution",
      url: "https://en.wikipedia.org/wiki/Ministry_of_Consumer_Affairs,_Food_and_Public_Distribution",
      result: {
        wikidata_qid: "Q3525212",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Consumer_Affairs,_Food_and_Public_Distribution",
      },
      wikidata_qid: "Q3525212",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Consumer_Affairs,_Food_and_Public_Distribution",
    },
    {
      href: "https://en.wikipedia.org/wiki/Ministry_of_Social_Justice_and_Empowerment",
      text: "Ministry of Social Justice and Empowerment",
      url: "https://en.wikipedia.org/wiki/Ministry_of_Social_Justice_and_Empowerment",
      result: {
        wikidata_qid: "Q4294701",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Social_Justice_and_Empowerment",
      },
      wikidata_qid: "Q4294701",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Social_Justice_and_Empowerment",
    },
  ],
  Q126364657: [
    {
      href: "https://en.wikipedia.org/wiki/Ministry_of_Consumer_Affairs,_Food_and_Public_Distribution",
      text: "Ministry of Consumer Affairs, Food and Public Distribution",
      url: "https://en.wikipedia.org/wiki/Ministry_of_Consumer_Affairs,_Food_and_Public_Distribution",
      result: {
        wikidata_qid: "Q3525212",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Consumer_Affairs,_Food_and_Public_Distribution",
      },
      wikidata_qid: "Q3525212",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Consumer_Affairs,_Food_and_Public_Distribution",
    },
  ],
  Q126367708: [
    {
      href: "https://en.wikipedia.org/wiki/Ministry_of_Corporate_Affairs",
      text: "Ministry of Corporate Affairs",
      url: "https://en.wikipedia.org/wiki/Ministry_of_Corporate_Affairs",
      result: {
        wikidata_qid: "Q4294596",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Corporate_Affairs",
      },
      wikidata_qid: "Q4294596",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Corporate_Affairs",
    },
    {
      href: "https://en.wikipedia.org/wiki/Minister_of_Road_Transport_and_Highways",
      text: "Ministry of Road Transport and Highways",
      url: "https://en.wikipedia.org/wiki/Minister_of_Road_Transport_and_Highways",
      result: {
        wikidata_qid: "Q122238538",
        wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Road_Transport_and_Highways",
      },
      wikidata_qid: "Q122238538",
      wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Road_Transport_and_Highways",
    },
  ],
  Q7293676: [
    {
      href: "https://en.wikipedia.org/wiki/Ministry_of_Culture_(India)",
      text: "Ministry of Culture",
      url: "https://en.wikipedia.org/wiki/Ministry_of_Culture_(India)",
      result: { wikidata_qid: "Q4294433", wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Culture_(India)" },
      wikidata_qid: "Q4294433",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Culture_(India)",
    },
  ],
  Q96404945: [
    {
      href: "https://en.wikipedia.org/wiki/Minister_of_Defence_(India)",
      text: "Ministry of Defence",
      url: "https://en.wikipedia.org/wiki/Minister_of_Defence_(India)",
      result: { wikidata_qid: "Q3533315", wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Defence_(India)" },
      wikidata_qid: "Q3533315",
      wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Defence_(India)",
    },
  ],
  Q64011108: [
    {
      href: "https://en.wikipedia.org/wiki/Ministry_of_Development_of_North_Eastern_Region",
      text: "Ministry of Development of North Eastern Region",
      url: "https://en.wikipedia.org/wiki/Ministry_of_Development_of_North_Eastern_Region",
      result: {
        wikidata_qid: "Q4294643",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Development_of_North_Eastern_Region",
      },
      wikidata_qid: "Q4294643",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Development_of_North_Eastern_Region",
    },
    {
      href: "https://en.wikipedia.org/wiki/Minister_of_Education_(India)",
      text: "Ministry of Education",
      url: "https://en.wikipedia.org/wiki/Minister_of_Education_(India)",
      result: {
        wikidata_qid: "Q28169228",
        wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Education_(India)",
      },
      wikidata_qid: "Q28169228",
      wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Education_(India)",
    },
  ],
  Q6167558: [
    {
      href: "https://en.wikipedia.org/wiki/Minister_of_Education_(India)",
      text: "Ministry of Education",
      url: "https://en.wikipedia.org/wiki/Minister_of_Education_(India)",
      result: {
        wikidata_qid: "Q28169228",
        wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Education_(India)",
      },
      wikidata_qid: "Q28169228",
      wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Education_(India)",
    },
  ],
  Q6416217: [
    {
      href: "https://en.wikipedia.org/wiki/Ministry_of_Environment,_Forest_and_Climate_Change",
      text: "Ministry of Environment, Forest and Climate Change",
      url: "https://en.wikipedia.org/wiki/Ministry_of_Environment,_Forest_and_Climate_Change",
      result: {
        wikidata_qid: "Q2749442",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Environment,_Forest_and_Climate_Change",
      },
      wikidata_qid: "Q2749442",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Environment,_Forest_and_Climate_Change",
    },
    {
      href: "https://en.wikipedia.org/wiki/Minister_of_External_Affairs_(India)",
      text: "Ministry of External Affairs",
      url: "https://en.wikipedia.org/wiki/Minister_of_External_Affairs_(India)",
      result: {
        wikidata_qid: "Q313465",
        wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_External_Affairs_(India)",
      },
      wikidata_qid: "Q313465",
      wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_External_Affairs_(India)",
    },
  ],
  Q111352685: [
    {
      href: "https://en.wikipedia.org/wiki/Minister_of_External_Affairs_(India)",
      text: "Ministry of External Affairs",
      url: "https://en.wikipedia.org/wiki/Minister_of_External_Affairs_(India)",
      result: {
        wikidata_qid: "Q313465",
        wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_External_Affairs_(India)",
      },
      wikidata_qid: "Q313465",
      wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_External_Affairs_(India)",
    },
    {
      href: "https://en.wikipedia.org/wiki/Ministry_of_Textiles_(India)",
      text: "Ministry of Textiles",
      url: "https://en.wikipedia.org/wiki/Ministry_of_Textiles_(India)",
      result: { wikidata_qid: "Q4294449", wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Textiles" },
      wikidata_qid: "Q4294449",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Textiles",
    },
  ],
  Q7131282: [
    {
      href: "https://en.wikipedia.org/wiki/Minister_of_Finance_(India)",
      text: "Ministry of Finance",
      url: "https://en.wikipedia.org/wiki/Minister_of_Finance_(India)",
      result: { wikidata_qid: "Q1416501", wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Finance_(India)" },
      wikidata_qid: "Q1416501",
      wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Finance_(India)",
    },
  ],
  Q7387753: [
    {
      href: "https://en.wikipedia.org/wiki/Ministry_of_Fisheries,_Animal_Husbandry_and_Dairying",
      text: "Ministry of Fisheries, Animal Husbandry and Dairying",
      url: "https://en.wikipedia.org/wiki/Ministry_of_Fisheries,_Animal_Husbandry_and_Dairying",
      result: {
        wikidata_qid: "Q65042516",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Fisheries,_Animal_Husbandry_and_Dairying",
      },
      wikidata_qid: "Q65042516",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Fisheries,_Animal_Husbandry_and_Dairying",
    },
    {
      href: "https://en.wikipedia.org/wiki/Ministry_of_Panchayati_Raj",
      text: "Ministry of Panchayati Raj",
      url: "https://en.wikipedia.org/wiki/Ministry_of_Panchayati_Raj",
      result: { wikidata_qid: "Q4294588", wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Panchayati_Raj" },
      wikidata_qid: "Q4294588",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Panchayati_Raj",
    },
  ],
  Q126469351: [
    {
      href: "https://en.wikipedia.org/wiki/Ministry_of_Fisheries,_Animal_Husbandry_and_Dairying",
      text: "Ministry of Fisheries, Animal Husbandry and Dairying",
      url: "https://en.wikipedia.org/wiki/Ministry_of_Fisheries,_Animal_Husbandry_and_Dairying",
      result: {
        wikidata_qid: "Q65042516",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Fisheries,_Animal_Husbandry_and_Dairying",
      },
      wikidata_qid: "Q65042516",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Fisheries,_Animal_Husbandry_and_Dairying",
    },
    {
      href: "https://en.wikipedia.org/wiki/Ministry_of_Minority_Affairs",
      text: "Ministry of Minority Affairs",
      url: "https://en.wikipedia.org/wiki/Ministry_of_Minority_Affairs",
      result: {
        wikidata_qid: "Q4294587",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Minority_Affairs",
      },
      wikidata_qid: "Q4294587",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Minority_Affairs",
    },
  ],
  Q7296806: [
    {
      href: "https://en.wikipedia.org/wiki/Ministry_of_Food_Processing_Industries",
      text: "Ministry of Food Processing Industries",
      url: "https://en.wikipedia.org/wiki/Ministry_of_Food_Processing_Industries",
      result: {
        wikidata_qid: "Q4294565",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Food_Processing_Industries",
      },
      wikidata_qid: "Q4294565",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Food_Processing_Industries",
    },
    {
      href: "https://en.wikipedia.org/wiki/Minister_of_Railways_(India)",
      text: "Ministry of Railways",
      url: "https://en.wikipedia.org/wiki/Minister_of_Railways_(India)",
      result: {
        wikidata_qid: "Q6866301",
        wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Railways_(India)",
      },
      wikidata_qid: "Q6866301",
      wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Railways_(India)",
    },
  ],
  Q7238626: [
    {
      href: "https://en.wikipedia.org/wiki/Ministry_of_Health_and_Family_Welfare",
      text: "Ministry of Health and Family Welfare",
      url: "https://en.wikipedia.org/wiki/Ministry_of_Health_and_Family_Welfare",
      result: {
        wikidata_qid: "Q3525265",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Health_and_Family_Welfare",
      },
      wikidata_qid: "Q3525265",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Health_and_Family_Welfare",
    },
  ],
  Q126364180: [
    {
      href: "https://en.wikipedia.org/wiki/Ministry_of_Heavy_Industries",
      text: "Ministry of Heavy Industries",
      url: "https://en.wikipedia.org/wiki/Ministry_of_Heavy_Industries",
      result: {
        wikidata_qid: "Q108619669",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Heavy_Industries",
      },
      wikidata_qid: "Q108619669",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Heavy_Industries",
    },
    {
      href: "https://en.wikipedia.org/wiki/Ministry_of_Steel",
      text: "Ministry of Steel",
      url: "https://en.wikipedia.org/wiki/Ministry_of_Steel",
      result: { wikidata_qid: "Q3525381", wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Steel" },
      wikidata_qid: "Q3525381",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Steel",
    },
  ],
  Q16734872: [
    {
      href: "https://en.wikipedia.org/wiki/Minister_of_Home_Affairs_(India)",
      text: "Ministry of Home Affairs",
      url: "https://en.wikipedia.org/wiki/Minister_of_Home_Affairs_(India)",
      result: {
        wikidata_qid: "Q3440901",
        wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Home_Affairs_(India)",
      },
      wikidata_qid: "Q3440901",
      wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Home_Affairs_(India)",
    },
  ],
  Q64143189: [
    {
      href: "https://en.wikipedia.org/wiki/Minister_of_Home_Affairs_(India)",
      text: "Ministry of Home Affairs",
      url: "https://en.wikipedia.org/wiki/Minister_of_Home_Affairs_(India)",
      result: {
        wikidata_qid: "Q3440901",
        wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Home_Affairs_(India)",
      },
      wikidata_qid: "Q3440901",
      wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Home_Affairs_(India)",
    },
  ],
  Q58290680: [
    {
      href: "https://en.wikipedia.org/wiki/Minister_of_Housing_and_Urban_Affairs",
      text: "Ministry of Housing and Urban Affairs",
      url: "https://en.wikipedia.org/wiki/Minister_of_Housing_and_Urban_Affairs",
      result: {
        wikidata_qid: "Q122060109",
        wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Housing_and_Urban_Affairs",
      },
      wikidata_qid: "Q122060109",
      wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Housing_and_Urban_Affairs",
    },
  ],
  Q87570577: [
    {
      href: "https://en.wikipedia.org/wiki/Ministry_of_Information_and_Broadcasting_(India)",
      text: "Ministry of Information and Broadcasting",
      url: "https://en.wikipedia.org/wiki/Ministry_of_Information_and_Broadcasting_(India)",
      result: {
        wikidata_qid: "Q4294412",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Information_and_Broadcasting_(India)",
      },
      wikidata_qid: "Q4294412",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Information_and_Broadcasting_(India)",
    },
    {
      href: "https://en.wikipedia.org/wiki/Ministry_of_Parliamentary_Affairs_(India)",
      text: "Ministry of Parliamentary Affairs",
      url: "https://en.wikipedia.org/wiki/Ministry_of_Parliamentary_Affairs_(India)",
      result: {
        wikidata_qid: "Q12455047",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Parliamentary_Affairs_(India)",
      },
      wikidata_qid: "Q12455047",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Parliamentary_Affairs_(India)",
    },
  ],
  Q24851577: [
    {
      href: "https://en.wikipedia.org/wiki/Ministry_of_Jal_Shakti",
      text: "Ministry of Jal Shakti",
      url: "https://en.wikipedia.org/wiki/Ministry_of_Jal_Shakti",
      result: { wikidata_qid: "Q85785741", wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Jal_Shakti" },
      wikidata_qid: "Q85785741",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Jal_Shakti",
    },
    {
      href: "https://en.wikipedia.org/wiki/Minister_of_Railways_(India)",
      text: "Ministry of Railways",
      url: "https://en.wikipedia.org/wiki/Minister_of_Railways_(India)",
      result: {
        wikidata_qid: "Q6866301",
        wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Railways_(India)",
      },
      wikidata_qid: "Q6866301",
      wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Railways_(India)",
    },
  ],
  Q126365290: [
    {
      href: "https://en.wikipedia.org/wiki/Ministry_of_Jal_Shakti",
      text: "Ministry of Jal Shakti",
      url: "https://en.wikipedia.org/wiki/Ministry_of_Jal_Shakti",
      result: { wikidata_qid: "Q85785741", wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Jal_Shakti" },
      wikidata_qid: "Q85785741",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Jal_Shakti",
    },
  ],
  Q7499789: [
    {
      href: "https://en.wikipedia.org/wiki/Ministry_of_Micro,_Small_and_Medium_Enterprises",
      text: "Ministry of Micro, Small and Medium Enterprises",
      url: "https://en.wikipedia.org/wiki/Ministry_of_Micro,_Small_and_Medium_Enterprises",
      result: {
        wikidata_qid: "Q4294585",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Micro,_Small_and_Medium_Enterprises",
      },
      wikidata_qid: "Q4294585",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Micro,_Small_and_Medium_Enterprises",
    },
    {
      href: "https://en.wikipedia.org/wiki/Ministry_of_Labour_and_Employment_(India)",
      text: "Ministry of Labour and Employment",
      url: "https://en.wikipedia.org/wiki/Ministry_of_Labour_and_Employment_(India)",
      result: {
        wikidata_qid: "Q4294756",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Labour_and_Employment_(India)",
      },
      wikidata_qid: "Q4294756",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Labour_and_Employment_(India)",
    },
  ],
  Q4791582: [
    {
      href: "https://en.wikipedia.org/wiki/Ministry_of_Parliamentary_Affairs_(India)",
      text: "Ministry of Parliamentary Affairs",
      url: "https://en.wikipedia.org/wiki/Ministry_of_Parliamentary_Affairs_(India)",
      result: {
        wikidata_qid: "Q12455047",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Parliamentary_Affairs_(India)",
      },
      wikidata_qid: "Q12455047",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Parliamentary_Affairs_(India)",
    },
  ],
  Q3530125: [
    {
      href: "https://en.wikipedia.org/wiki/Ministry_of_Petroleum_and_Natural_Gas",
      text: "Ministry of Petroleum and Natural Gas",
      url: "https://en.wikipedia.org/wiki/Ministry_of_Petroleum_and_Natural_Gas",
      result: {
        wikidata_qid: "Q4294487",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Petroleum_and_Natural_Gas",
      },
      wikidata_qid: "Q4294487",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Petroleum_and_Natural_Gas",
    },
    {
      href: "https://en.wikipedia.org/wiki/Ministry_of_Tourism_(India)",
      text: "Ministry of Tourism",
      url: "https://en.wikipedia.org/wiki/Ministry_of_Tourism_(India)",
      result: { wikidata_qid: "Q4294772", wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Tourism_(India)" },
      wikidata_qid: "Q4294772",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Tourism_(India)",
    },
  ],
  Q63992931: [
    {
      href: "https://en.wikipedia.org/wiki/Ministry_of_Ports,_Shipping_and_Waterways",
      text: "Ministry of Ports, Shipping and Waterways",
      url: "https://en.wikipedia.org/wiki/Ministry_of_Ports,_Shipping_and_Waterways",
      result: {
        wikidata_qid: "Q4294719",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Ports,_Shipping_and_Waterways",
      },
      wikidata_qid: "Q4294719",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Ports,_Shipping_and_Waterways",
    },
  ],
  Q7504173: [
    {
      href: "https://en.wikipedia.org/wiki/Ministry_of_Power_(India)",
      text: "Ministry of Power",
      url: "https://en.wikipedia.org/wiki/Ministry_of_Power_(India)",
      result: { wikidata_qid: "Q4294844", wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Power_(India)" },
      wikidata_qid: "Q4294844",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Power_(India)",
    },
    {
      href: "https://en.wikipedia.org/wiki/Ministry_of_New_and_Renewable_Energy",
      text: "Ministry of New and Renewable Energy",
      url: "https://en.wikipedia.org/wiki/Ministry_of_New_and_Renewable_Energy",
      result: {
        wikidata_qid: "Q4294489",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_New_and_Renewable_Energy",
      },
      wikidata_qid: "Q4294489",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_New_and_Renewable_Energy",
    },
  ],
  Q16736901: [
    {
      href: "https://en.wikipedia.org/wiki/Minister_of_Road_Transport_and_Highways",
      text: "Ministry of Road Transport and Highways",
      url: "https://en.wikipedia.org/wiki/Minister_of_Road_Transport_and_Highways",
      result: {
        wikidata_qid: "Q122238538",
        wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Road_Transport_and_Highways",
      },
      wikidata_qid: "Q122238538",
      wikipedia_page: "https://en.wikipedia.org/wiki/Minister_of_Road_Transport_and_Highways",
    },
  ],
  Q16215999: [
    {
      href: "https://en.wikipedia.org/wiki/Ministry_of_Rural_Development_(India)",
      text: "Ministry of Rural Development",
      url: "https://en.wikipedia.org/wiki/Ministry_of_Rural_Development_(India)",
      result: {
        wikidata_qid: "Q6867517",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Rural_Development_(India)",
      },
      wikidata_qid: "Q6867517",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Rural_Development_(India)",
    },
  ],
  Q4813289: [
    {
      href: "https://en.wikipedia.org/wiki/Ministry_of_Social_Justice_and_Empowerment",
      text: "Ministry of Social Justice and Empowerment",
      url: "https://en.wikipedia.org/wiki/Ministry_of_Social_Justice_and_Empowerment",
      result: {
        wikidata_qid: "Q4294701",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Social_Justice_and_Empowerment",
      },
      wikidata_qid: "Q4294701",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Social_Justice_and_Empowerment",
    },
  ],
  Q64006793: [
    {
      href: "https://en.wikipedia.org/wiki/Ministry_of_Tribal_Affairs",
      text: "Ministry of Tribal Affairs",
      url: "https://en.wikipedia.org/wiki/Ministry_of_Tribal_Affairs",
      result: { wikidata_qid: "Q6867635", wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Tribal_Affairs" },
      wikidata_qid: "Q6867635",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Tribal_Affairs",
    },
  ],
  Q16736902: [
    {
      href: "https://en.wikipedia.org/wiki/Ministry_of_Women_and_Child_Development",
      text: "Ministry of Women and Child Development",
      url: "https://en.wikipedia.org/wiki/Ministry_of_Women_and_Child_Development",
      result: {
        wikidata_qid: "Q12446115",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Women_and_Child_Development",
      },
      wikidata_qid: "Q12446115",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Women_and_Child_Development",
    },
  ],
  Q16908900: [
    {
      href: "https://en.wikipedia.org/wiki/Ministry_of_Youth_Affairs_and_Sports",
      text: "Ministry of Youth Affairs and Sports",
      url: "https://en.wikipedia.org/wiki/Ministry_of_Youth_Affairs_and_Sports",
      result: {
        wikidata_qid: "Q4294590",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Youth_Affairs_and_Sports",
      },
      wikidata_qid: "Q4294590",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Youth_Affairs_and_Sports",
    },
  ],
  Q6203277: [
    {
      href: "https://en.wikipedia.org/wiki/Prime_Minister%27s_Office_(India)",
      text: "Prime Minister’s Office",
      url: "https://en.wikipedia.org/wiki/Prime_Minister%27s_Office_(India)",
      result: {
        wikidata_qid: "Q7243280",
        wikipedia_page: "https://en.wikipedia.org/wiki/Prime_Minister%27s_Office_(India)",
      },
      wikidata_qid: "Q7243280",
      wikipedia_page: "https://en.wikipedia.org/wiki/Prime_Minister%27s_Office_(India)",
    },
    {
      href: "https://en.wikipedia.org/wiki/Ministry_of_Personnel,_Public_Grievances_and_Pensions",
      text: "Ministry of Personnel, Public Grievances and Pensions",
      url: "https://en.wikipedia.org/wiki/Ministry_of_Personnel,_Public_Grievances_and_Pensions",
      result: {
        wikidata_qid: "Q4294428",
        wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Personnel,_Public_Grievances_and_Pensions",
      },
      wikidata_qid: "Q4294428",
      wikipedia_page: "https://en.wikipedia.org/wiki/Ministry_of_Personnel,_Public_Grievances_and_Pensions",
    },
    {
      href: "https://en.wikipedia.org/wiki/Department_of_Atomic_Energy",
      text: "Department of Atomic Energy",
      url: "https://en.wikipedia.org/wiki/Department_of_Atomic_Energy",
      result: { wikidata_qid: "Q3523073", wikipedia_page: "https://en.wikipedia.org/wiki/Department_of_Atomic_Energy" },
      wikidata_qid: "Q3523073",
      wikipedia_page: "https://en.wikipedia.org/wiki/Department_of_Atomic_Energy",
    },
    {
      href: "https://en.wikipedia.org/wiki/Department_of_Space",
      text: "Department of Space",
      url: "https://en.wikipedia.org/wiki/Department_of_Space",
      result: { wikidata_qid: "Q4158548", wikipedia_page: "https://en.wikipedia.org/wiki/Department_of_Space" },
      wikidata_qid: "Q4158548",
      wikipedia_page: "https://en.wikipedia.org/wiki/Department_of_Space",
    },
  ],
};

// (async () => {
//   const graphQLClient = await createGraphQLClient();

//   // for (let p of policyDomains) {
//   //   // will need domains to ministries mapping before we can do this
//   //   // await createNodeType("_Public_Policy_Domain_Government_Ministries_Departments_", graphQLClient, {
//   //   //   public_policy_domain: { name_id: p.name },
//   //   //   node_created_on: new Date(),
//   //   // });
//   // }
//   // for (let d of ministriesDomains) {
//   //   let nameId = await createName(graphQLClient, {
//   //     name: d.name,
//   //     language_script: { name_en: "english_latin" },
//   //     node_created_on: new Date(),
//   //   });

//   //   await addPublicPolicyDomain(graphQLClient, {
//   //     names: [{ name: "nuclear" }],
//   //     name_id: "nuclear",
//   //     description: "",
//   //     node_created_on: new Date(),
//   //   });
//   // }

//   // for (let d of policyDomains) {
//   // await createNodeType("_Public_Policy_Domain_Government_Ministries_Departments_", graphQLClient, {
//   //   name_id: "electronics-and-information-technology",
//   //   public_policy_domain: { name_id: "electronics-and-information-technology" },
//   //   node_created_on: new Date(),
//   // });
//   // }

//   // {
//   //   "name_id": "electronics-and-information-technology",
//   //   "description": "Development, regulation, and promotion of electronics manufacturing, information technology services, and digital infrastructure, including software development, telecommunications, and the integration of technology in various sectors."
//   // }

//   // let nameId = await createName(graphQLClient, {
//   //   // name: "electronics-and-information technology",
//   //   name: "electronics and information technology",
//   //   language_script: { name_en: "english_latin" },
//   //   node_created_on: new Date(),
//   // });

//   // await addPublicPolicyDomain(graphQLClient, {
//   //   names: [
//   //     { name: "electronics" },
//   //     { name: "electronics and information technology" },
//   //     { name: "information technology" },
//   //   ],
//   //   name_id: "electronics-and-information-technology",
//   //   description:
//   //     "Development, regulation, and promotion of electronics manufacturing, information technology services, and digital infrastructure, including software development, telecommunications, and the integration of technology in various sectors.",
//   //   node_created_on: new Date(),
//   // });

//   // name_id: String! @search(by: [exact, term, fulltext])
//   // names: [_Name_!]! @hasInverse(field: "indian_union_government_ministry")

//   // # broad categories for public policy.  *:* relation with ministries
//   // # e.g. health, fisheries, agriculture, road infrastructure
//   // policy_domains: [_Public_Policy_Domain_]

//   // # objective is self updated listing that connects to all ministries in the domain
//   // policy_domain_ministries_list: [_Public_Policy_Domain_Government_Ministries_Departments_]
//   //   @hasInverse(field: "indian_union_government_ministries")

//   // name_id: String! @search(by: [exact, term, fulltext])
//   // names: [_Name_!]! @hasInverse(field: "indian_union_government_ministry")
//   // # broad categories for public policy.  *:* relation with ministries
//   // # e.g. health, fisheries, agriculture, road infrastructure
//   // policy_domains: [_Public_Policy_Domain_]
//   // # objective is self updated listing that connects to all ministries in the domain
//   // policy_domain_ministries_list: [_Public_Policy_Domain_Government_Ministries_Departments_]
//   //   @hasInverse(field: "indian_union_government_ministries")

//   // {
//   //   name_id: ministry.split(",").join('').split(" ").join("-"),
//   //   names: [{name: ministry}],
//   //   policy_domains: domains.map(val => {
//   //     return {
//   //       name_id: val
//   //     }
//   //   })
//   //   policy_domain_ministries_list: domains.map(val => {
//   //     return {
//   //       name_id: val
//   //     }
//   //   })
//   // }

//   // for (let md of ministryDomains2) {
//   //   // console.log(md);
//   //   // create ministry
//   //   await createNodeType("_Indian_Union_Government_Ministry_", graphQLClient, {
//   //     ...md,
//   //     node_created_on: new Date(),
//   //   });
//   //   console.log("done!");
//   // }

//   // create person
//   // create politicians
//   // create ministers
//   //

//   // {
//   //   name_id: "personnel-public-grievances-and-pensions",
//   //   names: [
//   //     {
//   //       name: "Ministry of Personnel, Public Grievances and Pensions",
//   //     },
//   //   ],
//   //   policy_domains: [
//   //     {
//   //       name_id: "government-officials",
//   //     },
//   //   ],
//   //   policy_domain_ministries_list: [
//   //     {
//   //       name_id: "government-officials",
//   //     },
//   //   ],
//   // },

//   // let cabinetMinistersIds = [];
//   // let ministriesIds: any = [];
//   // let pm = {
//   //   href: "https://en.wikipedia.org/wiki/Prime_Minister_of_India",
//   //   text: "Prime Minister",
//   //   url: "https://en.wikipedia.org/wiki/Prime_Minister_of_India",
//   //   result: {
//   //     wikidata_qid: "Q192711",
//   //     wikipedia_page: "https://en.wikipedia.org/wiki/Prime_Minister_of_India",
//   //   },
//   //   ministryNameId: "0x9be95fc60d",
//   // };
//   // let pmId = "";
//   // let toSavePM: any = {};
//   // let loksabha: any = {
//   //   names: [
//   //     {
//   //       name: "18th Lok Sabha",
//   //     },
//   //     {
//   //       name: "18th Loksabha",
//   //     },
//   //     {
//   //       name: "loksabha",
//   //     },
//   //     {
//   //       name: "lok sabha",
//   //     },
//   //   ],

//   //   loksabha_number: 18,
//   // };

//   // for (let lsn of loksabha.names) {
//   //   await createName(graphQLClient, {
//   //     name: lsn.name,
//   //     language_script: { name_en: "english_latin" },
//   //     node_created_on: new Date(),
//   //   });
//   // }

//   // for (let mpc of allInOneMinisteries) {
//   //   const { person, ministries } = mpc;

//   //   const personId = await createNodeType("_Person_", graphQLClient, {
//   //     ...person,
//   //     node_created_on: new Date(),
//   //   });

//   //   const politicianId = await createNodeType("_Indian_Politician_", graphQLClient, {
//   //     person: { id: personId },
//   //     node_created_on: new Date(),
//   //   });

//   //   if (person.wikidata_qid === "Q1058") {
//   //     // add pm
//   //     toSavePM = {
//   //       position_held_by: politicianId,
//   //       // wikidata_qid: "Q192711",
//   //       // wikipedia_page: "https://en.wikipedia.org/wiki/Prime_Minister_of_India",
//   //     };
//   //   }

//   //   for (let m of ministries) {
//   //     const ministryId = await createNodeType("_Indian_Union_Government_Ministry_", graphQLClient, {
//   //       ...ministriesDomainsKeyed[m.name_id],
//   //       wikidata_qid: m.wikidata_qid,
//   //       wikipedia_page: m.wikipedia_page,
//   //       node_created_on: new Date(),
//   //     });

//   //     const cabinetMinisterId = await createNodeType("_Indian_Union_Government_Cabinet_Minister_", graphQLClient, {
//   //       position_held_by: { id: politicianId },
//   //       ministry: { id: ministryId },
//   //       // tenure_start:
//   //       node_created_on: new Date(),
//   //     });

//   //     cabinetMinistersIds.push({ id: cabinetMinisterId });
//   //     ministriesIds.push({ id: ministryId });

//   //     // position_held_by
//   //     // ministry
//   //   }
//   // }
//   // let cabinet: any = {};

//   // cabinet.ministries = ministriesIds;
//   // cabinet.cabinet_ministers = cabinetMinistersIds;

//   // const cabinetId = await createNodeType("_Indian_Union_Government_Cabinet_", graphQLClient, {
//   //   ...cabinet,
//   //   // tenure_start:
//   //   node_created_on: new Date(),
//   // });
//   // // ministries
//   // toSavePM.ministries = ministriesIds;
//   // toSavePM.cabinet = { id: cabinetId };

//   // pmId = await createNodeType("_Indian_Prime_Minister_", graphQLClient, {
//   //   ...toSavePM2,
//   //   node_created_on: new Date(),
//   // });

//   // let unionGovernmentId = await createNodeType("_Indian_Union_Government_", graphQLClient, {
//   //   prime_minister: { id: pmId },
//   //   cabinet: { id: cabinetId },
//   //   ministries: ministriesIds,
//   //   node_created_on: new Date(),
//   // });

//   // loksabha.prime_minister = { id: pmId };
//   // loksabha.cabinet = { id: cabinetId };
//   // loksabha.union_government = { id: unionGovernmentId };

//   // await createNodeType("_Indian_Loksabha_", graphQLClient, {
//   //   ...loksabha,
//   //   node_created_on: new Date(),
//   // });

//   // ministersOfState = await fetchWikiDataQids(ministersOfState);

//   // // console.log(JSON.stringify(ministersOfState, null, 2));
//   // const outputFilePath = path.join(__dirname, "ministers-of-state.json");
//   // fs.writeFileSync(outputFilePath, JSON.stringify(ministersOfState, null, 2));

//   // upsert names of ministries
//   // for (let i of independentCharge) {
//   //   const { portfolio, minister } = i;

//   //   // let ministerNameId = await upsert_Name_(minister.text);

//   //   // let person = {
//   //   //   names: [
//   //   //     {
//   //   //       id: ministerNameId,
//   //   //     },
//   //   //   ],
//   //   //   wikidata_qid: minister.result.wikidata_qid,
//   //   //   wikipedia_page: minister.result.wikipedia_page,
//   //   // };

//   //   // const personId = await createNodeType("_Person_", graphQLClient, {
//   //   //   ...person,
//   //   //   node_created_on: new Date(),
//   //   // });

//   //   // const politicianId = await createNodeType("_Indian_Politician_", graphQLClient, {
//   //   //   person: { id: personId },
//   //   //   node_created_on: new Date(),
//   //   // });

//   //   for (let p of portfolio) {
//   //     // let portfolioNameId = await upsert_Name_(p.text);

//   //     console.log(p.text);

//   //     //     const ministryId = await createNodeType("_Indian_Union_Government_Ministry_", graphQLClient, {
//   //     //       ...ministriesDomainsKeyed[m.name_id],
//   //     //       wikidata_qid: m.wikidata_qid,
//   //     //       wikipedia_page: m.wikipedia_page,
//   //     //       node_created_on: new Date(),
//   //     //     });
//   //   }

//   //   // for (let mpc of allInOneMinisteries) {

//   //   //   for (let m of ministries) {

//   //   //     const cabinetMinisterId = await createNodeType("_Indian_Union_Government_Cabinet_Minister_", graphQLClient, {
//   //   //       position_held_by: { id: politicianId },
//   //   //       ministry: { id: ministryId },
//   //   //       // tenure_start:
//   //   //       node_created_on: new Date(),
//   //   //     });

//   //   //     cabinetMinistersIds.push({ id: cabinetMinisterId });
//   //   //     ministriesIds.push({ id: ministryId });

//   //   //     // position_held_by
//   //   //     // ministry
//   //   //   }
//   //   // }
//   // }

//   // for (let pn of policyDomainsNew) {
//   //   // console.log(pn);
//   //   // let nameId = await createName(graphQLClient, {
//   //   //   name: pn.name,
//   //   //   language_script: { name_en: "english_latin" },
//   //   //   node_created_on: new Date(),
//   //   // });
//   //   // await addPublicPolicyDomain(graphQLClient, {
//   //   //   name_id: pn.name_id,
//   //   //   description: pn.description,
//   //   //   names: [{ name: pn.name }],
//   //   //   node_created_on: new Date(),
//   //   // });
//   //   // await createNodeType("_Public_Policy_Domain_Government_Ministries_Departments_", graphQLClient, {
//   //   //   name_id: pn.name_id,
//   //   //   public_policy_domain: { name_id: pn.name_id },
//   //   //   node_created_on: new Date(),
//   //   // });
//   //   // {
//   //   //   name_id: "personnel-public-grievances-and-pensions",
//   //   //   names: [
//   //   //     {
//   //   //       name: "Ministry of Personnel, Public Grievances and Pensions",
//   //   //     },
//   //   //   ],
//   //   //   policy_domains: [
//   //   //     {
//   //   //       name_id: "government-officials",
//   //   //     },
//   //   //   ],
//   //   //   policy_domain_ministries_list: [
//   //   //     {
//   //   //       name_id: "government-officials",
//   //   //     },
//   //   //   ],
//   // }

//   // for (let md of ministryDomains2) {
//   //   // console.log(md);
//   //   // create ministry
//   //   await createNodeType("_Indian_Union_Government_Ministry_", graphQLClient, {
//   //     ...md,
//   //     node_created_on: new Date(),
//   //   });
//   //   console.log("done!");
//   // }

//   // for (let ic of ministersOfState) {
//   //   const { portfolio, minister } = ic;

//   //   console.log(portfolio);
//   //   console.log(minister);

//   //   // const nameId = await upsert_Name_(minister.text);

//   //   // let person = {
//   //   //   names: [{ id: nameId }],
//   //   //   wikipedia_page: minister.result.wikipedia_page,
//   //   //   wikidata_qid: minister.result.wikidata_qid,
//   //   // };

//   //   let politicianId = await get_Politician_By_Person_Wikidata_Qid(graphQLClient, minister.wikidata_qid);

//   //   // console.log(politicianId);

//   //   // get person by wikipedia_qid
//   //   // const personId = await createNodeType("_Person_", graphQLClient, {
//   //   //   ...person,
//   //   //   node_created_on: new Date(),
//   //   // });

//   //   // get politician
//   //   // const politicianId = await createNodeType("_Indian_Politician_", graphQLClient, {
//   //   //   person: { id: personId },
//   //   //   node_created_on: new Date(),
//   //   // });

//   //   // let isICMOf = [];

//   //   // for (let p of portfolio) {
//   //   //   // get ministry id
//   //   //   // let ministryId = await upsert_Indian_Union_Government_Ministry(p.text);
//   //   //   // // isICMOf.push();
//   //   //   // const mosId = await createNodeType("_Indian_Union_Government_Minister_Of_State_", graphQLClient, {
//   //   //   //   position_held_by: { id: politicianId },
//   //   //   //   ministry: { name_id: ministryId },
//   //   //   //   node_created_on: new Date(),
//   //   //   //   cabinet: { id: "0x9be95fc96e" },
//   //   //   // });
//   //   // }

//   //   // for (let mic of ministryDomains2) {
//   //   //   // let ministryId = await upsert_Indian_Union_Government_Ministry(mic);
//   //   //   let ministryId = await create_Indian_Union_Government_Ministry(mic);
//   //   //   console.log(ministryId, mic.name_id);
//   //   // }
//   // }

//   // Q87570577

//   // let ics = Object.keys(groupedMoS);
//   // let groupedMoSAgg: any = {};

//   // for (let ic of ics) {
//   //   // console.log(groupedMoS[ic]);

//   //   groupedMoSAgg[ic] = groupedMoSAgg[ic] || [];
//   //   groupedMoSAgg[ic] = groupedMoSAgg[ic].concat(groupedMoS[ic].map((v: any) => v.portfolio).flat());
//   //   // console.log()
//   // }

//   // console.log(JSON.stringify(groupedMoSAgg));

//   // let ics = Object.keys(groupedMoSKeyed);
//   // for (let ic of ics) {
//   //   let politicianId = await get_Politician_By_Person_Wikidata_Qid(graphQLClient, ic);

//   //   // console.log(groupedMoSKeyed[ic]);
//   //   // let toSave: any = { politicianId, ministries: [] };

//   //   for (let p of groupedMoSKeyed[ic]) {
//   //     // get ministry id
//   //     let ministryId = await upsert_Indian_Union_Government_Ministry(p.text);

//   //     // console.log({
//   //     //   politicianId,
//   //     //   ministryId,
//   //     //   node_created_on: new Date(),
//   //     // });

//   //     // isICMOf.push();
//   //     const mosId = await createNodeType("_Indian_Union_Government_Minister_Of_State_", graphQLClient, {
//   //       position_held_by: { id: politicianId },
//   //       ministry: { name_id: ministryId },
//   //       node_created_on: new Date(),
//   //       cabinet: { id: "0x9be95fc96e" },
//   //     });

//   //     // console.log(politicianId, p.text);
//   //   }
//   // }
// })();
