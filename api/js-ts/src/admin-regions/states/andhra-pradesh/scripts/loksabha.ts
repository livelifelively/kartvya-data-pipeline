import { districtVCs } from "../../../districts/andhra-pradesh/ap.districts-vcs";
import { allDistricts, multiPolygonToDgraphMultiPolygon, polygonToMultiPolygon } from "./districts";
import { vidhansabhaConstituencies } from "./vidhan-sabha";
import { forEach, groupBy, keyBy, map } from "lodash";
import lcData from "../lc-data.json";
import { geoData } from "./vc-data-geo.json";
import { json_All_PC } from "../ap.lc.geojson";
import { allLoksabhaSeatsGeo } from "./lc-data-geo";

import toSaveLC from "./lc-data-geo.json";

import fs from "fs";
import path from "path";
import { upsert_Name_ } from "../../../../knowledge-graph/name/name.update";
import { createNodeType } from "../../../../knowledge-graph/generic/generic.create";
import { createGraphQLClient } from "../../../../knowledge-graph/generic/generic.utils";

export let allLoksabhaSeats: any = {
  Srikakulam: {
    name: ["Srikakulam"],
    href: "https://en.wikipedia.org/wiki/Srikakulam_(Lok_Sabha_constituency)",
    vcs: {
      "in-vc-ap-ichchapuram": true,
      "in-vc-ap-palasa": true,
      "in-vc-ap-tekkali": true,
      "in-vc-ap-pathapatnam": true,
      "in-vc-ap-srikakulam": true,
      "in-vc-ap-amadalavalasa": true,
      "in-vc-ap-narasannapeta": true,
    },
    d: { "in-d-ap-srikakulam": true },
    established: "1952",
    reservation: "None",
    wikidata_qid: "Q3764487",
    wikipedia_page: "https://en.wikipedia.org/wiki/Srikakulam_Lok_Sabha_constituency",
  },
  Vizianagaram: {
    name: ["Vizianagaram"],
    href: "https://en.wikipedia.org/wiki/Vizianagaram_(Lok_Sabha_constituency)",
    vcs: {
      "in-vc-ap-etcherla": true,
      "in-vc-ap-rajam": true,
      "in-vc-ap-bobbili": true,
      "in-vc-ap-cheepurupalli": true,
      "in-vc-ap-gajapathinagaram": true,
      "in-vc-ap-nellimarla": true,
      "in-vc-ap-vizianagaram": true,
    },
    d: { "in-d-ap-srikakulam": true, "in-d-ap-vizianagaram": true },
    established: "2008",
    reservation: "None",
    wikidata_qid: "Q7938017",
    wikipedia_page: "https://en.wikipedia.org/wiki/Vizianagaram_Lok_Sabha_constituency",
  },
  Araku: {
    name: ["Araku"],
    href: "https://en.wikipedia.org/wiki/Araku_Lok_Sabha_constituency",
    vcs: {
      "in-vc-ap-araku-valley": true,
      "in-vc-ap-parvathipuram": true,
      "in-vc-ap-palakonda": true,
      "in-vc-ap-kurupam": true,
      "in-vc-ap-salur": true,
      "in-vc-ap-paderu": true,
      "in-vc-ap-rampachodavaram": true,
    },
    d: { "in-d-ap-alluri-sitharama-raju": true, "in-d-ap-parvathipuram-manyam": true },
    established: "2008",
    reservation: "ST",
    wikidata_qid: "Q3633068",
    wikipedia_page: "https://en.wikipedia.org/wiki/Araku_Lok_Sabha_constituency",
  },
  Visakhapatnam: {
    name: ["Visakhapatnam"],
    href: "https://en.wikipedia.org/wiki/Visakhapatnam_Lok_Sabha_constituency",
    vcs: {
      "in-vc-ap-srungavarapukota": true,
      "in-vc-ap-bheemili": true,
      "in-vc-ap-visakhapatnam-east": true,
      "in-vc-ap-visakhapatnam-west": true,
      "in-vc-ap-visakhapatnam-north": true,
      "in-vc-ap-visakhapatnam-south": true,
      "in-vc-ap-gajuwaka": true,
    },
    d: { "in-d-ap-vizianagaram": true, "in-d-ap-visakhapatnam": true },
    established: "1952",
    reservation: "None",
    wikidata_qid: "Q3763974",
    wikipedia_page: "https://en.wikipedia.org/wiki/Visakhapatnam_Lok_Sabha_constituency",
  },
  Kakinada: {
    name: ["Kakinada"],
    href: "https://en.wikipedia.org/wiki/Kakinada_Lok_Sabha_constituency",
    vcs: {
      "in-vc-ap-tuni": true,
      "in-vc-ap-prathipadu": true,
      "in-vc-ap-pithapuram": true,
      "in-vc-ap-kakinada-rural": true,
      "in-vc-ap-peddapuram": true,
      "in-vc-ap-kakinada-city": true,
      "in-vc-ap-jaggampeta": true,
    },
    d: { "in-d-ap-kakinada": true },
    established: "1952",
    reservation: "None",
    wikidata_qid: "Q3764050",
    wikipedia_page: "https://en.wikipedia.org/wiki/Kakinada_Lok_Sabha_constituency",
  },
  Amalapuram: {
    name: ["Amalapuram"],
    href: "https://en.wikipedia.org/wiki/Amalapuram_(Lok_Sabha_constituency)",
    vcs: {
      "in-vc-ap-ramachandrapuram": true,
      "in-vc-ap-mummidivaram": true,
      "in-vc-ap-amalapuram": true,
      "in-vc-ap-razole": true,
      "in-vc-ap-gannavaram-1": true,
      "in-vc-ap-kothapeta": true,
      "in-vc-ap-mandapeta": true,
    },
    d: { "in-d-ap-konaseema": true },
    established: "1952",
    reservation: "SC",
    wikidata_qid: "Q3630204",
    wikipedia_page: "https://en.wikipedia.org/wiki/Amalapuram_Lok_Sabha_constituency",
  },
  Eluru: {
    name: ["Eluru"],
    href: "https://en.wikipedia.org/wiki/Eluru_Lok_Sabha_constituency",
    vcs: {
      "in-vc-ap-unguturu": true,
      "in-vc-ap-denduluru": true,
      "in-vc-ap-eluru": true,
      "in-vc-ap-polavaram": true,
      "in-vc-ap-chintalapudi": true,
      "in-vc-ap-nuzvid": true,
      "in-vc-ap-kaikalur": true,
    },
    d: { "in-d-ap-eluru": true },
    established: "1952",
    reservation: "None",
    wikidata_qid: "Q3764062",
    wikipedia_page: "https://en.wikipedia.org/wiki/Eluru_Lok_Sabha_constituency",
  },
  Vijayawada: {
    name: ["Vijayawada"],
    href: "https://en.wikipedia.org/wiki/Vijayawada_(Lok_Sabha_constituency)",
    vcs: {
      "in-vc-ap-tiruvuru": true,
      "in-vc-ap-vijayawada-west": true,
      "in-vc-ap-vijayawada-central": true,
      "in-vc-ap-vijayawada-east": true,
      "in-vc-ap-mylavaram": true,
      "in-vc-ap-nandigama": true,
      "in-vc-ap-jaggayyapeta": true,
    },
    d: { "in-d-ap-ntr": true },
    established: "1952",
    reservation: "None",
    wikidata_qid: "Q3765236",
    wikipedia_page: "https://en.wikipedia.org/wiki/Vijayawada_Lok_Sabha_constituency",
  },
  Machilipatnam: {
    name: ["Machilipatnam", "Machillipatnam"],
    href: "https://en.wikipedia.org/wiki/Machilipatnam_Lok_Sabha_constituency",
    vcs: {
      "in-vc-ap-gannavaram": true,
      "in-vc-ap-gudivada": true,
      "in-vc-ap-pedana": true,
      "in-vc-ap-machilipatnam": true,
      "in-vc-ap-avanigadda": true,
      "in-vc-ap-pamarru": true,
      "in-vc-ap-penamaluru": true,
    },
    d: { "in-d-ap-krishna": true },
    established: "1952",
    reservation: "None",
    wikidata_qid: "Q3765244",
    wikipedia_page: "https://en.wikipedia.org/wiki/Machilipatnam_Lok_Sabha_constituency",
  },
  Guntur: {
    name: ["Guntur"],
    href: "https://en.wikipedia.org/wiki/Guntur_Lok_Sabha_constituency",
    vcs: {
      "in-vc-ap-tadikonda": true,
      "in-vc-ap-mangalagiri": true,
      "in-vc-ap-ponnur": true,
      "in-vc-ap-tenali": true,
      "in-vc-ap-prathipadu-1": true,
      "in-vc-ap-guntur-west": true,
      "in-vc-ap-guntur-east": true,
    },
    d: { "in-d-ap-guntur": true },
    established: "1952",
    reservation: "None",
    wikidata_qid: "Q3764410",
    wikipedia_page: "https://en.wikipedia.org/wiki/Guntur_Lok_Sabha_constituency",
  },
  Narasaraopet: {
    name: ["Narasaraopet"],
    href: "https://en.wikipedia.org/wiki/Narasaraopet_(Lok_Sabha_constituency)",
    vcs: {
      "in-vc-ap-pedakurapadu": true,
      "in-vc-ap-chilakaluripeta": true,
      "in-vc-ap-narasaraopeta": true,
      "in-vc-ap-sattenapalle": true,
      "in-vc-ap-vinukonda": true,
      "in-vc-ap-gurajala": true,
      "in-vc-ap-macherla": true,
    },
    d: { "in-d-ap-palnadu": true },
    established: "1952",
    reservation: "None",
    wikidata_qid: "Q3764443",
    wikipedia_page: "https://en.wikipedia.org/wiki/Narasaraopet_Lok_Sabha_constituency",
  },
  Bapatla: {
    name: ["Bapatla"],
    href: "https://en.wikipedia.org/wiki/Bapatla_Lok_Sabha_constituency",
    vcs: {
      "in-vc-ap-vemuru": true,
      "in-vc-ap-repalle": true,
      "in-vc-ap-bapatla": true,
      "in-vc-ap-parchur": true,
      "in-vc-ap-addanki": true,
      "in-vc-ap-chirala": true,
      "in-vc-ap-santhanuthalapadu": true,
    },
    d: { "in-d-ap-bapatla": true, "in-d-ap-prakasam": true },
    established: "1977",
    reservation: "SC",
    wikidata_qid: "Q3630032",
    wikipedia_page: "https://en.wikipedia.org/wiki/Bapatla_Lok_Sabha_constituency",
  },
  Ongole: {
    name: ["Ongole"],
    href: "https://en.wikipedia.org/wiki/Ongole_Lok_Sabha_constituency",
    vcs: {
      "in-vc-ap-yerragondapalem": true,
      "in-vc-ap-darsi": true,
      "in-vc-ap-ongole": true,
      "in-vc-ap-kondapi": true,
      "in-vc-ap-markapuram": true,
      "in-vc-ap-giddalur": true,
      "in-vc-ap-kanigiri": true,
    },
    d: { "in-d-ap-prakasam": true },
    established: "1952",
    reservation: "None",
    wikidata_qid: "Q3764026",
    wikipedia_page: "https://en.wikipedia.org/wiki/Ongole_Lok_Sabha_constituency",
  },
  Nellore: {
    name: ["Nellore"],
    href: "https://en.wikipedia.org/wiki/Nellore_Lok_Sabha_constituency",
    vcs: {
      "in-vc-ap-kandukur": true,
      "in-vc-ap-kavali": true,
      "in-vc-ap-atmakur": true,
      "in-vc-ap-kovuru": true,
      "in-vc-ap-nellore-city": true,
      "in-vc-ap-nellore-rural": true,
      "in-vc-ap-udayagiri": true,
    },
    d: { "in-d-ap-sri-potti-sriramulu-nellore": true },
    established: "1952",
    reservation: "None",
    wikidata_qid: "Q3764509",
    wikipedia_page: "https://en.wikipedia.org/wiki/Nellore_Lok_Sabha_constituency",
  },
  Tirupati: {
    name: ["Tirupati"],
    href: "https://en.wikipedia.org/wiki/Tirupati_Lok_Sabha_constituency",
    vcs: {
      "in-vc-ap-sarvepalli": true,
      "in-vc-ap-tirupati": true,
      "in-vc-ap-sullurpeta": true,
      "in-vc-ap-venkatagiri": true,
      "in-vc-ap-guduru": true,
      "in-vc-ap-srikalahasti": true,
      "in-vc-ap-satyavedu": true,
    },
    d: { "in-d-ap-sri-potti-sriramulu-nellore": true, "in-d-ap-tirupati": true },
    established: "1952",
    reservation: "SC",
    wikidata_qid: "Q3764514",
    wikipedia_page: "https://en.wikipedia.org/wiki/Tirupati_Lok_Sabha_constituency",
  },
  Kurnool: {
    name: ["Kurnool"],
    href: "https://en.wikipedia.org/wiki/Kurnool_Lok_Sabha_constituency",
    vcs: {
      "in-vc-ap-kurnool": true,
      "in-vc-ap-kodumur": true,
      "in-vc-ap-yemmiganur": true,
      "in-vc-ap-mantralayam": true,
      "in-vc-ap-adoni": true,
      "in-vc-ap-alur": true,
      "in-vc-ap-pattikonda": true,
    },
    d: { "in-d-ap-kurnool": true },
    established: "1952",
    reservation: "None",
    wikidata_qid: "Q3763840",
    wikipedia_page: "https://en.wikipedia.org/wiki/Kurnool_Lok_Sabha_constituency",
  },
  Nandyal: {
    name: ["Nandyal"],
    href: "https://en.wikipedia.org/wiki/Nandyal_(Lok_Sabha_constituency)",
    vcs: {
      "in-vc-ap-allagadda": true,
      "in-vc-ap-srisailam": true,
      "in-vc-ap-nandikotkur": true,
      "in-vc-ap-nandyal": true,
      "in-vc-ap-banaganapalle": true,
      "in-vc-ap-dhone": true,
      "in-vc-ap-panyam": true,
    },
    d: { "in-d-ap-nandyal": true, "in-d-ap-kurnool": true },
    established: "1952",
    reservation: "None",
    wikidata_qid: "Q3764367",
    wikipedia_page: "https://en.wikipedia.org/wiki/Nandyal_(Lok_Sabha_constituency)",
  },
  Kadapa: {
    name: ["Kadapa"],
    href: "https://en.wikipedia.org/wiki/Kadapa_(Lok_Sabha_constituency)",
    vcs: {
      "in-vc-ap-badvel": true,
      "in-vc-ap-jammalamadugu": true,
      "in-vc-ap-kadapa": true,
      "in-vc-ap-kamalapuram": true,
      "in-vc-ap-mydukur": true,
      "in-vc-ap-proddatur": true,
      "in-vc-ap-pulivendula": true,
    },
    d: { "in-d-ap-y.s.r.": true },
    established: "1952",
    reservation: "None",
    wikidata_qid: "Q3764405",
    wikipedia_page: "https://en.wikipedia.org/wiki/Kadapa_Lok_Sabha_constituency",
  },
  Rajampet: {
    name: ["Rajampet"],
    href: "https://en.wikipedia.org/wiki/Rajampet_Lok_Sabha_constituency",
    vcs: {
      "in-vc-ap-rajampet": true,
      "in-vc-ap-kodur": true,
      "in-vc-ap-rayachoti": true,
      "in-vc-ap-thamballapalle": true,
      "in-vc-ap-pileru": true,
      "in-vc-ap-madanapalle": true,
      "in-vc-ap-punganur": true,
    },
    d: { "in-d-ap-y.s.r.": true, "in-d-ap-annamayya": true, "in-d-ap-chittoor": true },
    established: "1957",
    reservation: "None",
    wikidata_qid: "Q3764476",
    wikipedia_page: "https://en.wikipedia.org/wiki/Rajampet_Lok_Sabha_constituency",
  },
  Chittoor: {
    name: ["Chittoor"],
    href: "https://en.wikipedia.org/wiki/Chittoor_Lok_Sabha_constituency",
    vcs: {
      "in-vc-ap-chandragiri": true,
      "in-vc-ap-nagari": true,
      "in-vc-ap-gangadhara-nellore": true,
      "in-vc-ap-chittoor": true,
      "in-vc-ap-puthalapattu": true,
      "in-vc-ap-palamaner": true,
      "in-vc-ap-kuppam": true,
    },
    d: { "in-d-ap-tirupati": true, "in-d-ap-chittoor": true },
    established: "1951",
    reservation: "SC",
    wikidata_qid: "Q3763885",
    wikipedia_page: "https://en.wikipedia.org/wiki/Chittoor_Lok_Sabha_constituency",
  },
  Anakapalle: {
    name: ["Anakapalli", "Anakapalle"],
    href: "https://en.wikipedia.org/wiki/Anakapalli_(Lok_Sabha_constituency)",
    vcs: {
      "in-vc-ap-chodavaram": true,
      "in-vc-ap-madugula": true,
      "in-vc-ap-anakapalli": true,
      "in-vc-ap-pendurthi": true,
      "in-vc-ap-elamanchili": true,
      "in-vc-ap-payakaraopet": true,
      "in-vc-ap-narsipatnam": true,
    },
    d: { "in-d-ap-anakapalli": true, "in-d-ap-visakhapatnam": true },
    established: "1962",
    reservation: "None",
    wikidata_qid: "Q3630236",
    wikipedia_page: "https://en.wikipedia.org/wiki/Anakapalle_Lok_Sabha_constituency",
  },
  Rajahmundry: {
    name: ["Rajamahendravaram", "Rajahmundry"],
    href: "https://en.wikipedia.org/wiki/Rajahmundry_Lok_Sabha_constituency",
    vcs: {
      "in-vc-ap-anaparthy": true,
      "in-vc-ap-rajanagaram": true,
      "in-vc-ap-rajamahendravaram-city": true,
      "in-vc-ap-rajamahendravaram-rural": true,
      "in-vc-ap-kovvur": true,
      "in-vc-ap-nidadavole": true,
      "in-vc-ap-gopalapuram": true,
    },
    d: { "in-d-ap-east-godavari": true },
    established: "1952",
    reservation: "None",
    wikidata_qid: "Q3764342",
    wikipedia_page: "https://en.wikipedia.org/wiki/Rajahmundry_Lok_Sabha_constituency",
  },
  Narsapuram: {
    names: ["Narasapuram", "Narsapuram"],
    href: "https://en.wikipedia.org/wiki/Narasapuram_Lok_Sabha_constituency",
    vcs: {
      "in-vc-ap-achanta": true,
      "in-vc-ap-palakollu": true,
      "in-vc-ap-narasapuram": true,
      "in-vc-ap-bhimavaram": true,
      "in-vc-ap-undi": true,
      "in-vc-ap-tanuku": true,
      "in-vc-ap-tadepalligudem": true,
    },
    d: { "in-d-ap-west-godavari": true },
    established: "1952",
    reservation: "None",
    wikidata_qid: "Q3763879",
    wikipedia_page: "https://en.wikipedia.org/wiki/Narasapuram_Lok_Sabha_constituency",
  },
  Anantapur: {
    name: ["Anantapuram", "Anantapur"],
    href: "https://en.wikipedia.org/wiki/Anantapur_Lok_Sabha_constituency",
    vcs: {
      "in-vc-ap-rayadurgam": true,
      "in-vc-ap-uravakonda": true,
      "in-vc-ap-guntakallu": true,
      "in-vc-ap-tadpatri": true,
      "in-vc-ap-singanamala": true,
      "in-vc-ap-anantapuram-urban": true,
      "in-vc-ap-kalyandurgam": true,
    },
    d: { "in-d-ap-anantpur": true },
    established: "1952",
    reservation: "None",
    wikidata_qid: "Q3630239",
    wikipedia_page: "https://en.wikipedia.org/wiki/Anantapur_Lok_Sabha_constituency",
  },
  Hindupur: {
    name: ["Hindupuram", "Hindupur"],
    href: "https://en.wikipedia.org/wiki/Hindupur_Lok_Sabha_constituency",
    vcs: {
      "in-vc-ap-raptadu": true,
      "in-vc-ap-madakasira": true,
      "in-vc-ap-hindupuram": true,
      "in-vc-ap-penukonda": true,
      "in-vc-ap-puttaparthi": true,
      "in-vc-ap-dharmavaram": true,
      "in-vc-ap-kadiri": true,
    },
    d: { "in-d-ap-anantpur": true, "in-d-ap-sri-sathya-sai": true },
    established: "1957",
    reservation: "None",
    wikidata_qid: "Q3764429",
    wikipedia_page: "https://en.wikipedia.org/wiki/Hindupur_Lok_Sabha_constituency",
  },
};

let rem = {
  Anakapalli: {
    name: ["Anakapalli", "Anakapalle"],
    href: "https://en.wikipedia.org/wiki/Anakapalli_(Lok_Sabha_constituency)",
    vcs: {
      "in-vc-ap-chodavaram": true,
      "in-vc-ap-madugula": true,
      "in-vc-ap-anakapalli": true,
      "in-vc-ap-pendurthi": true,
      "in-vc-ap-elamanchili": true,
      "in-vc-ap-payakaraopet": true,
      "in-vc-ap-narsipatnam": true,
    },
    d: { "in-d-ap-anakapalli": true, "in-d-ap-visakhapatnam": true },
  },
  Rajamahendravaram: {
    name: ["Rajamahendravaram", "Rajahmundry"],
    href: "https://en.wikipedia.org/wiki/Rajahmundry_Lok_Sabha_constituency",
    vcs: {
      "in-vc-ap-anaparthy": true,
      "in-vc-ap-rajanagaram": true,
      "in-vc-ap-rajamahendravaram-city": true,
      "in-vc-ap-rajamahendravaram-rural": true,
      "in-vc-ap-kovvur": true,
      "in-vc-ap-nidadavole": true,
      "in-vc-ap-gopalapuram": true,
    },
    d: { "in-d-ap-east-godavari": true },
  },
  Narasapuram: {
    names: ["Narasapuram", "Narsapuram"],
    href: "https://en.wikipedia.org/wiki/Narasapuram_Lok_Sabha_constituency",
    vcs: {
      "in-vc-ap-achanta": true,
      "in-vc-ap-palakollu": true,
      "in-vc-ap-narasapuram": true,
      "in-vc-ap-bhimavaram": true,
      "in-vc-ap-undi": true,
      "in-vc-ap-tanuku": true,
      "in-vc-ap-tadepalligudem": true,
    },
    d: { "in-d-ap-west-godavari": true },
  },
  Anantapuram: {
    name: ["Anantapuram", "Anantapur"],
    href: "https://en.wikipedia.org/wiki/Anantapur_Lok_Sabha_constituency",
    vcs: {
      "in-vc-ap-rayadurgam": true,
      "in-vc-ap-uravakonda": true,
      "in-vc-ap-guntakallu": true,
      "in-vc-ap-tadpatri": true,
      "in-vc-ap-singanamala": true,
      "in-vc-ap-anantapuram-urban": true,
      "in-vc-ap-kalyandurgam": true,
    },
    d: { "in-d-ap-anantpur": true },
  },
  Hindupuram: {
    name: ["Hindupuram", "Hindupur"],
    href: "https://en.wikipedia.org/wiki/Hindupur_Lok_Sabha_constituency",
    vcs: {
      "in-vc-ap-raptadu": true,
      "in-vc-ap-madakasira": true,
      "in-vc-ap-hindupuram": true,
      "in-vc-ap-penukonda": true,
      "in-vc-ap-puttaparthi": true,
      "in-vc-ap-dharmavaram": true,
      "in-vc-ap-kadiri": true,
    },
    d: { "in-d-ap-anantpur": true, "in-d-ap-sri-sathya-sai": true },
  },
};

async function getLoksabhaConstituencies() {
  let ls: any = {};

  // vidhansabhaConstituencies.forEach((vc: any) => {
  //   if (!ls[vc.loksabha_constituency.name]) {
  //     ls[vc.loksabha_constituency.name] = vc.loksabha_constituency;
  //   }
  // });

  // ls = groupBy(vidhansabhaConstituencies, "loksabha_constituency.name");

  // console.log(JSON.stringify(ls));

  // console.log(Object.keys(allLoksabhaSeats).length);

  // let allLoksabhaSeatsHref: any = keyBy(Object.values(allLoksabhaSeats), "href");

  // console.log(allLoksabhaSeatsHref);

  // const remaining: any = {};
  // geoData.forEach((vc: any) => {
  //   const { name_id, d, lsc } = vc;
  //   if (allLoksabhaSeats[lsc[0].name]) {
  //     allLoksabhaSeats[lsc[0].name] = {
  //       ...allLoksabhaSeats[lsc[0].name],
  //       vcs: allLoksabhaSeats[lsc[0].name].vcs || {},
  //       d: allLoksabhaSeats[lsc[0].name].d || {},
  //     };

  //     allLoksabhaSeats[lsc[0].name].vcs[name_id] = true;
  //     d.map((val: any) => {
  //       allLoksabhaSeats[lsc[0].name].d[val.name_id] = true;
  //     });
  //   } else {
  //     remaining[lsc[0].name] = remaining[lsc[0].name] || {
  //       vcs: {},
  //       d: {},
  //     };
  //     remaining[lsc[0].name].vcs[name_id] = true;
  //     d.map((val: any) => {
  //       remaining[lsc[0].name].d[val.name_id] = true;
  //     });
  //   }
  // });

  // console.log(JSON.stringify(allLoksabhaSeats));
  // console.log("==================================");
  // console.log("==================================");
  // console.log("==================================");
  // console.log("==================================");
  // console.log(JSON.stringify(remaining));

  // let lcDataMod: any = lcData.map((lc) => {
  //   const {
  //     url,
  //     result: {
  //       infoBox: { constituencyDetails },
  //       wikidataQID,
  //       wikipediaPage,
  //     },
  //   } = lc;
  //   return {
  //     url,
  //     constituencyDetails,
  //     wikidata_qid: wikidataQID,
  //     wikipedia_page: wikipediaPage,
  //   };
  // });

  // lcDataMod = keyBy(lcDataMod, "url");

  // forEach(allLoksabhaSeats, (val: any, index: string) => {
  //   if (lcDataMod[val.href]) {
  //     allLoksabhaSeats[index] = {
  //       ...allLoksabhaSeats[index],
  //       established: lcDataMod[val.href].constituencyDetails.established.text,
  //       reservation: lcDataMod[val.href].constituencyDetails.reservation.text,
  //       wikidata_qid: lcDataMod[val.href].wikidata_qid,
  //       wikipedia_page: lcDataMod[val.href].wikipedia_page,
  //     };
  //   } else {
  //     console.log({
  //       url: lcDataMod.url,
  //       established: lcDataMod[val.href].established.text,
  //       reservation: lcDataMod[val.href].reservation.text,
  //       wikidata_qid: lcDataMod[val.href].wikidata_qid,
  //       wikipedia_page: lcDataMod[val.href].wikipedia_page,
  //     });
  //   }
  // });

  // console.log(JSON.stringify(allLoksabhaSeats));

  // json_All_PC.forEach((val: any) => {
  //   // return ;
  //   // if (allLoksabhaSeats[val.properties.PC_NAME]) console.log(val.properties.PC_NAME);
  //   allLoksabhaSeats[val.properties.PC_NAME].geo = val;
  // });

  // let x = map(allLoksabhaSeatsGeo, (val: any, key: string) => {
  //   return {
  //     names: val.name.map((v: any) => {
  //       return { name: v };
  //     }),
  //     name_id: `in-lc-ap-${key.toLowerCase().split(" ").join("-")}`,
  //     vidhansabha_constituencies: Object.keys(val.vcs).map((v) => {
  //       return {
  //         name_id: v,
  //       };
  //     }),
  //     districts: Object.keys(val.d).map((v) => {
  //       return {
  //         name_id: v,
  //       };
  //     }),
  //     states_union_territories: [
  //       {
  //         name_id: "in-sut-andhra-pradesh",
  //       },
  //     ],
  //     established_on_string: val.established,
  //     reservation: val.reservation,
  //     wikidata_qid: val.wikidata_qid,
  //     wikipedia_page: val.wikipedia_page,
  //     constituency_number: val.geo.properties.PC_No,
  //     geo: val.geo,
  //   };
  // });

  const graphQLClient = await createGraphQLClient();

  for (let lc of toSaveLC) {
    for (let n of lc.names) {
      const nameId = await upsert_Name_(n.name);
    }
    const lcMap = polygonToMultiPolygon(lc.geo);
    let geoData = {
      category: "Region",
      source_name: "Election Commission Of India",
      source_url: `https://results.eci.gov.in/PcResultGenJune2024/pc/${lc.geo.properties.ST_CODE}.js`,
      source_data: `${JSON.stringify(lc.geo)}`,
      area: multiPolygonToDgraphMultiPolygon(lcMap.geometry.coordinates),
    };

    const { geo, ...rest } = lc;

    // "names"
    // "name_id": "in-lc-ap-srikakulam",
    // "vidhansabha_constituencies":
    // "districts":
    // "established_on_string": "1952",
    // "reservation": "NONE",
    // "wikidata_qid": "Q3764487",
    // "wikipedia_page": "https://en.wikipedia.org/wiki/Srikakulam_Lok_Sabha_constituency",
    // "constituency_number": 2,

    const lcId = await createNodeType("_Indian_Loksabha_Constituency_", graphQLClient, {
      ...rest,
      constituency_number: rest.constituency_number.toString(),
    });
    const geoId = await createNodeType("_Geo_", graphQLClient, geoData);

    let toSaveLCRegion = {
      self: { name_id: lc.name_id },
      geo_boundary: {
        id: geoId,
      },
      node_created_on: new Date(),
    };
    const lcRegionId = await createNodeType("_Indian_Loksabha_Constituency_Region_", graphQLClient, toSaveLCRegion);

    console.log({ name_id: lc.name_id, lcId, lcRegionId, geoId });
  }

  // const outputFilePath = path.join(__dirname, "lc-data-geo.json");
  // fs.writeFileSync(outputFilePath, JSON.stringify(x, null, 2));
}

(async () => {
  await getLoksabhaConstituencies();
})();

// # region connections - district, vsc, state

// sub_districts: [_Indian_Sub_District_] @hasInverse(field: "loksabha_constituencies")

// # region
// regions: [_Indian_Loksabha_Constituency_Region_] @hasInverse(field: "self")

// node_created_on: DateTime
// node_updates: [_Node_Update_]
