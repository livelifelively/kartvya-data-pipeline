import { createGraphQLClient } from "../generic/generic.utils";
import { upsert_Name_ } from "../name/name.update";
import { addPublicPolicyDomainGroup } from "./create";
import { kebabCase } from "lodash";

const domainsGroups = [
  {
    id: "national_security_and_foreign_affairs",
    names: ["National Security & Foreign Affairs", "National Security and Foreign Affairs"],
    description: "Domains related to defense, international relations, and national security.",
    linked_domains: ["defence", "international-relations"],
  },
  {
    id: "science_technology_and_innovation",
    names: ["Science, Technology & Innovation", "Science, Technology and Innovation"],
    description:
      "Domains related to scientific advancement, research, technology development, and digital infrastructure.",
    linked_domains: [
      "space",
      "meteorology",
      "research-and-development",
      "innovation",
      "science-technology",
      "electronics-and-information-technology",
    ],
  },
  {
    id: "healthcare",
    names: ["Healthcare"],
    description: "Domains focused on public health, medical care, social support, and community well-being.",
    linked_domains: ["healthcare", "traditional-medicine"],
  },
  {
    id: "family_and_social_welfare",
    names: ["Family & Social Welfare", "Family and Social Welfare"],
    description: "Domains focused on public health, medical care, social support, and community well-being.",
    linked_domains: [
      "social-welfare",
      "child-welfare",
      "minority-welfare",
      "tribal-welfare",
      "environment",
      "food-security",
      "labour",
      "women-empowerment",
      "consumer-rights",
    ],
  },
  {
    id: "education_and_skill_development",
    names: ["Education & Skill Development", "Education and Skill Development"],
    description: "Domains related to education at all levels, vocational training and skill development.",
    linked_domains: ["education", "vocational-training", "youth-development", "sports"],
  },
  {
    id: "infrastructure_and_transportation",
    names: ["Infrastructure & Transportation", "Infrastructure and Transportation"],
    description: "Domains related to all modes of transportation and infrastructure development.",
    linked_domains: [
      "railways",
      "road-transportation",
      "ports-and-shipping",
      "civil-aviation",
      "urban-development",
      "northeast-development",
    ],
  },
  {
    id: "agriculture_and_natural_resources",
    names: ["Agriculture & Natural Resources", "Agriculture and Natural Resources"],
    description: "Domains related to food production, farming, fishing, environmental protection and water management.",
    linked_domains: ["agriculture", "fishing", "water-resources", "fertilizer-production", "rural-development"],
  },
  {
    id: "energy_and_resources",
    names: ["Energy & Resources", "Energy and Resources"],
    description: "Domains related to energy production, distribution, mining, and petroleum.",
    linked_domains: ["energy", "petroleum-and-natural-gas", "minerals"],
  },
  {
    id: "industry_trade_and_labour",
    names: ["Industry, Trade & Labour", "Industry, Trade and Labour"],
    description: "Domains related to industrial production, commerce, trade policies and labor laws.",
    linked_domains: [
      "industries-and-trade",
      "heavy-industry-development",
      "chemical-industry",
      "textile-industry",
      "tourism-industry",
      "food-processing-industry",
      "entrepreneurship",
    ],
  },
  {
    id: "finance_and_economy",
    names: ["Finance & Economy", "Finance and Economy"],
    description: "Domains related to government finances, taxation, financial markets and economic planning.",
    linked_domains: [
      "government-finances",
      "taxes-and-duties",
      "stock-and-futures-markets",
      "data-and-statistics",
      "planning",
    ],
  },
  {
    id: "law_governance_and_justice",
    names: ["Law, Governance & Justice", "Law, Governance and Justice"],
    description: "Domains related to the legal system, elections, law enforcement, and governance.",
    linked_domains: [
      "elections",
      "law-and-justice",
      "legislative-affairs",
      "law-enforcement",
      "local-governance",
      "government-officials",
      "policy-implementation",
      "head-of-government-office",
    ],
  },
  {
    id: "media_and_communication",
    names: ["Media & Communication", "Media and Communication"],
    description: "Domains related to public broadcasting, media, telecommunications and information technologies.",
    linked_domains: ["public-broadcasting", "communication"],
  },
  {
    id: "society_culture_and_tourism",
    names: ["Society, Culture & Tourism", "Society, Culture and Tourism"],
    description: "Domains related to history, culture, tourism and urban development.",
    linked_domains: ["history-and-culture", "cooperative-development"],
  },
];

// (async () => {
//   const graphQLClient = await createGraphQLClient();
//   for (let d of domainsGroups) {
//     let nameIds: any = [];
//     for (let n of d.names) {
//       let name = { name: n, language_script: { name_en: "english_latin" }, node_created_on: new Date() };
//       let nameId = await upsert_Name_(n);
//       nameIds.push({ id: nameId });
//     }

//     const id = await addPublicPolicyDomainGroup(graphQLClient, {
//       names: nameIds,
//       name_id: kebabCase(d.id),
//       description: d.description,
//       domains_in_group: d.linked_domains.map((val) => ({ name_id: val })),
//       node_created_on: new Date(),
//     });

//     console.log(id);
//   }
// })();
