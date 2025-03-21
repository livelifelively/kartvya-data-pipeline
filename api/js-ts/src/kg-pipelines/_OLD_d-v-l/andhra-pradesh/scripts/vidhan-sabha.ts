import { keyBy, groupBy, forEach } from "lodash";

import { districtVCs } from "../../../../admin-regions/districts-old/andhra-pradesh/ap.districts-vcs";
import { allDistricts } from "./districts-old";
import vcData from "../vc-data.json";
import { json_All_AC } from "../ap.vc.geojson";

import fs from "fs";
import path from "path";

import { vcdata2 } from "../vc-data-1.json";
import { geoData } from "./vc-data-geo.json";
import { createGraphQLClient } from "../../../../knowledge-graph/generic/generic.utils";
import { upsert_Name_ } from "../../../../knowledge-graph/name/name.update";
import { createNodeType } from "../../../../knowledge-graph/generic/generic.create";

//
function getVCDLCTriads() {
  let allVCs = allDistricts.reduce((agg: any, district: any) => {
    let name_id = `in-d-ap-${district.name.toLowerCase().split(" ").join("-")}`;

    district.vidhansabha_constituencies.forEach((vc: any) => {
      agg.push({
        name: vc.name,
        href: vc.href,
        reservation: vc.reservation,
        number: vc.number,
        district: {
          name_id,
          wikidata_qid: district.wikidata_qid,
          wikipedia_page: district.wikipedia_page,
        },
        loksabha_constituency: vc.loksabha_constituency,
      });
    });

    return agg;
  }, []);
  return allVCs;
}

// console.log(JSON.stringify(getVCDLCTriads()));

export const vidhansabhaConstituencies = [
  {
    name: "Ichchapuram",
    href: "https://en.wikipedia.org/wiki/Ichchapuram_(Assembly_constituency)",
    reservation: "NONE",
    number: "1",
    district: {
      name_id: "in-d-ap-srikakulam",
      wikidata_qid: "Q15395",
      wikipedia_page: "https://en.wikipedia.org/wiki/Srikakulam_district",
    },
    loksabha_constituency: {
      name: "Srikakulam",
      href: "https://en.wikipedia.org/wiki/Srikakulam_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Palasa",
    href: "https://en.wikipedia.org/wiki/Palasa_(Assembly_constituency)",
    reservation: "NONE",
    number: "2",
    district: {
      name_id: "in-d-ap-srikakulam",
      wikidata_qid: "Q15395",
      wikipedia_page: "https://en.wikipedia.org/wiki/Srikakulam_district",
    },
    loksabha_constituency: {
      name: "Srikakulam",
      href: "https://en.wikipedia.org/wiki/Srikakulam_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Tekkali",
    href: "https://en.wikipedia.org/wiki/Tekkali_(Assembly_constituency)",
    reservation: "NONE",
    number: "3",
    district: {
      name_id: "in-d-ap-srikakulam",
      wikidata_qid: "Q15395",
      wikipedia_page: "https://en.wikipedia.org/wiki/Srikakulam_district",
    },
    loksabha_constituency: {
      name: "Srikakulam",
      href: "https://en.wikipedia.org/wiki/Srikakulam_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Pathapatnam",
    href: "https://en.wikipedia.org/wiki/Pathapatnam_(Assembly_constituency)",
    reservation: "NONE",
    number: "4",
    district: {
      name_id: "in-d-ap-srikakulam",
      wikidata_qid: "Q15395",
      wikipedia_page: "https://en.wikipedia.org/wiki/Srikakulam_district",
    },
    loksabha_constituency: {
      name: "Srikakulam",
      href: "https://en.wikipedia.org/wiki/Srikakulam_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Srikakulam",
    href: "https://en.wikipedia.org/wiki/Srikakulam_(Assembly_constituency)",
    reservation: "NONE",
    number: "5",
    district: {
      name_id: "in-d-ap-srikakulam",
      wikidata_qid: "Q15395",
      wikipedia_page: "https://en.wikipedia.org/wiki/Srikakulam_district",
    },
    loksabha_constituency: {
      name: "Srikakulam",
      href: "https://en.wikipedia.org/wiki/Srikakulam_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Amadalavalasa",
    href: "https://en.wikipedia.org/wiki/Amadalavalasa_(Assembly_constituency)",
    reservation: "NONE",
    number: "6",
    district: {
      name_id: "in-d-ap-srikakulam",
      wikidata_qid: "Q15395",
      wikipedia_page: "https://en.wikipedia.org/wiki/Srikakulam_district",
    },
    loksabha_constituency: {
      name: "Srikakulam",
      href: "https://en.wikipedia.org/wiki/Srikakulam_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Narasannapeta",
    href: "https://en.wikipedia.org/wiki/Narasannapeta_(Assembly_constituency)",
    reservation: "NONE",
    number: "8",
    district: {
      name_id: "in-d-ap-srikakulam",
      wikidata_qid: "Q15395",
      wikipedia_page: "https://en.wikipedia.org/wiki/Srikakulam_district",
    },
    loksabha_constituency: {
      name: "Srikakulam",
      href: "https://en.wikipedia.org/wiki/Srikakulam_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Etcherla",
    href: "https://en.wikipedia.org/wiki/Etcherla_Assembly_constituency",
    reservation: "NONE",
    number: "7",
    district: {
      name_id: "in-d-ap-srikakulam",
      wikidata_qid: "Q15395",
      wikipedia_page: "https://en.wikipedia.org/wiki/Srikakulam_district",
    },
    loksabha_constituency: {
      name: "Vizianagaram",
      href: "https://en.wikipedia.org/wiki/Vizianagaram_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Parvathipuram",
    href: "https://en.wikipedia.org/wiki/Parvathipuram_Assembly_constituency",
    reservation: "SC",
    number: "12",
    district: {
      name_id: "in-d-ap-parvathipuram-manyam",
      wikidata_qid: "Q110714856",
      wikipedia_page: "https://en.wikipedia.org/wiki/Parvathipuram_Manyam_district",
    },
    loksabha_constituency: { name: "Araku", href: "https://en.wikipedia.org/wiki/Araku_Lok_Sabha_constituency" },
  },
  {
    name: "Palakonda",
    href: "https://en.wikipedia.org/wiki/Palakonda_Assembly_constituency",
    reservation: "ST",
    number: "10",
    district: {
      name_id: "in-d-ap-parvathipuram-manyam",
      wikidata_qid: "Q110714856",
      wikipedia_page: "https://en.wikipedia.org/wiki/Parvathipuram_Manyam_district",
    },
    loksabha_constituency: { name: "Araku", href: "https://en.wikipedia.org/wiki/Araku_Lok_Sabha_constituency" },
  },
  {
    name: "Kurupam",
    href: "https://en.wikipedia.org/wiki/Kurupam_Assembly_constituency",
    reservation: "ST",
    number: "11",
    district: {
      name_id: "in-d-ap-parvathipuram-manyam",
      wikidata_qid: "Q110714856",
      wikipedia_page: "https://en.wikipedia.org/wiki/Parvathipuram_Manyam_district",
    },
    loksabha_constituency: { name: "Araku", href: "https://en.wikipedia.org/wiki/Araku_Lok_Sabha_constituency" },
  },
  {
    name: "Salur",
    href: "https://en.wikipedia.org/wiki/Salur_Assembly_constituency",
    reservation: "ST",
    number: "13",
    district: {
      name_id: "in-d-ap-parvathipuram-manyam",
      wikidata_qid: "Q110714856",
      wikipedia_page: "https://en.wikipedia.org/wiki/Parvathipuram_Manyam_district",
    },
    loksabha_constituency: { name: "Araku", href: "https://en.wikipedia.org/wiki/Araku_Lok_Sabha_constituency" },
  },
  {
    name: "Rajam",
    href: "https://en.wikipedia.org/wiki/Rajam_(Assembly_Constituency)",
    reservation: "SC",
    number: "9",
    district: {
      name_id: "in-d-ap-vizianagaram",
      wikidata_qid: "Q15392",
      wikipedia_page: "https://en.wikipedia.org/wiki/Vizianagaram_district",
    },
    loksabha_constituency: {
      name: "Vizianagaram",
      href: "https://en.wikipedia.org/wiki/Vizianagaram_Lok_Sabha_constituency",
    },
  },
  {
    name: "Bobbili",
    href: "https://en.wikipedia.org/wiki/Bobbili_(Assembly_constituency)",
    reservation: "NONE",
    number: "14",
    district: {
      name_id: "in-d-ap-vizianagaram",
      wikidata_qid: "Q15392",
      wikipedia_page: "https://en.wikipedia.org/wiki/Vizianagaram_district",
    },
    loksabha_constituency: {
      name: "Vizianagaram",
      href: "https://en.wikipedia.org/wiki/Vizianagaram_Lok_Sabha_constituency",
    },
  },
  {
    name: "Cheepurupalli",
    href: "https://en.wikipedia.org/wiki/Cheepurupalli_Assembly_constituency",
    reservation: "NONE",
    number: "15",
    district: {
      name_id: "in-d-ap-vizianagaram",
      wikidata_qid: "Q15392",
      wikipedia_page: "https://en.wikipedia.org/wiki/Vizianagaram_district",
    },
    loksabha_constituency: {
      name: "Vizianagaram",
      href: "https://en.wikipedia.org/wiki/Vizianagaram_Lok_Sabha_constituency",
    },
  },
  {
    name: "Gajapathinagaram",
    href: "https://en.wikipedia.org/wiki/Gajapathinagaram_(Assembly_constituency)",
    reservation: "NONE",
    number: "16",
    district: {
      name_id: "in-d-ap-vizianagaram",
      wikidata_qid: "Q15392",
      wikipedia_page: "https://en.wikipedia.org/wiki/Vizianagaram_district",
    },
    loksabha_constituency: {
      name: "Vizianagaram",
      href: "https://en.wikipedia.org/wiki/Vizianagaram_Lok_Sabha_constituency",
    },
  },
  {
    name: "Nellimarla",
    href: "https://en.wikipedia.org/wiki/Nellimarla_(Assembly_constituency)",
    reservation: "NONE",
    number: "17",
    district: {
      name_id: "in-d-ap-vizianagaram",
      wikidata_qid: "Q15392",
      wikipedia_page: "https://en.wikipedia.org/wiki/Vizianagaram_district",
    },
    loksabha_constituency: {
      name: "Vizianagaram",
      href: "https://en.wikipedia.org/wiki/Vizianagaram_Lok_Sabha_constituency",
    },
  },
  {
    name: "Vizianagaram",
    href: "https://en.wikipedia.org/wiki/Vizianagaram_(Assembly_constituency)",
    reservation: "NONE",
    number: "18",
    district: {
      name_id: "in-d-ap-vizianagaram",
      wikidata_qid: "Q15392",
      wikipedia_page: "https://en.wikipedia.org/wiki/Vizianagaram_district",
    },
    loksabha_constituency: {
      name: "Vizianagaram",
      href: "https://en.wikipedia.org/wiki/Vizianagaram_Lok_Sabha_constituency",
    },
  },
  {
    name: "Srungavarapukota",
    href: "https://en.wikipedia.org/wiki/Srungavarapukota_(Assembly_constituency)",
    reservation: "NONE",
    number: "19",
    district: {
      name_id: "in-d-ap-vizianagaram",
      wikidata_qid: "Q15392",
      wikipedia_page: "https://en.wikipedia.org/wiki/Vizianagaram_district",
    },
    loksabha_constituency: {
      name: "Visakhapatnam",
      href: "https://en.wikipedia.org/wiki/Visakhapatnam_Lok_Sabha_constituency",
    },
  },
  {
    name: "Bheemili",
    href: "https://en.wikipedia.org/wiki/Bhimli_(Assembly_constituency)",
    number: "20",
    reservation: "NONE",
    district: {
      name_id: "in-d-ap-visakhapatnam",
      wikidata_qid: "Q15394",
      wikipedia_page: "https://en.wikipedia.org/wiki/Visakhapatnam_district",
    },
    loksabha_constituency: {
      name: "Visakhapatnam",
      href: "https://en.wikipedia.org/wiki/Visakhapatnam_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Visakhapatnam East",
    href: "https://en.wikipedia.org/wiki/Visakhapatnam_East_(Assembly_constituency)",
    number: "21",
    reservation: "NONE",
    district: {
      name_id: "in-d-ap-visakhapatnam",
      wikidata_qid: "Q15394",
      wikipedia_page: "https://en.wikipedia.org/wiki/Visakhapatnam_district",
    },
    loksabha_constituency: {
      name: "Visakhapatnam",
      href: "https://en.wikipedia.org/wiki/Visakhapatnam_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Visakhapatnam West",
    href: "https://en.wikipedia.org/wiki/Visakhapatnam_West_(Assembly_constituency)",
    number: "24",
    reservation: "NONE",
    district: {
      name_id: "in-d-ap-visakhapatnam",
      wikidata_qid: "Q15394",
      wikipedia_page: "https://en.wikipedia.org/wiki/Visakhapatnam_district",
    },
    loksabha_constituency: {
      name: "Visakhapatnam",
      href: "https://en.wikipedia.org/wiki/Visakhapatnam_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Visakhapatnam North",
    href: "https://en.wikipedia.org/wiki/Visakhapatnam_North_(Assembly_constituency)",
    number: "23",
    reservation: "NONE",
    district: {
      name_id: "in-d-ap-visakhapatnam",
      wikidata_qid: "Q15394",
      wikipedia_page: "https://en.wikipedia.org/wiki/Visakhapatnam_district",
    },
    loksabha_constituency: {
      name: "Visakhapatnam",
      href: "https://en.wikipedia.org/wiki/Visakhapatnam_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Visakhapatnam South",
    href: "https://en.wikipedia.org/wiki/Visakhapatnam_South_(Assembly_constituency)",
    number: "22",
    reservation: "NONE",
    district: {
      name_id: "in-d-ap-visakhapatnam",
      wikidata_qid: "Q15394",
      wikipedia_page: "https://en.wikipedia.org/wiki/Visakhapatnam_district",
    },
    loksabha_constituency: {
      name: "Visakhapatnam",
      href: "https://en.wikipedia.org/wiki/Visakhapatnam_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Gajuwaka",
    href: "https://en.wikipedia.org/wiki/Gajuwaka_(Assembly_constituency)",
    number: "25",
    reservation: "NONE",
    district: {
      name_id: "in-d-ap-visakhapatnam",
      wikidata_qid: "Q15394",
      wikipedia_page: "https://en.wikipedia.org/wiki/Visakhapatnam_district",
    },
    loksabha_constituency: {
      name: "Visakhapatnam",
      href: "https://en.wikipedia.org/wiki/Visakhapatnam_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Pendurthi",
    href: "https://en.wikipedia.org/wiki/Pendurthi_(Assembly_constituency)",
    number: "31",
    reservation: "NONE",
    district: {
      name_id: "in-d-ap-visakhapatnam",
      wikidata_qid: "Q15394",
      wikipedia_page: "https://en.wikipedia.org/wiki/Visakhapatnam_district",
    },
    loksabha_constituency: {
      name: "Anakapalli",
      href: "https://en.wikipedia.org/wiki/Anakapalli_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Chodavaram",
    href: "https://en.wikipedia.org/wiki/Chodavaram_(Assembly_constituency)",
    reservation: "NONE",
    number: "26",
    district: {
      name_id: "in-d-ap-anakapalli",
      wikidata_qid: "Q110714857",
      wikipedia_page: "https://en.wikipedia.org/wiki/Anakapalli_district",
    },
    loksabha_constituency: {
      name: "Anakapalli",
      href: "https://en.wikipedia.org/wiki/Anakapalli_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Madugula",
    href: "https://en.wikipedia.org/wiki/Madugula_(Assembly_constituency)",
    reservation: "NONE",
    number: "27",
    district: {
      name_id: "in-d-ap-anakapalli",
      wikidata_qid: "Q110714857",
      wikipedia_page: "https://en.wikipedia.org/wiki/Anakapalli_district",
    },
    loksabha_constituency: {
      name: "Anakapalli",
      href: "https://en.wikipedia.org/wiki/Anakapalli_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Anakapalli",
    href: "https://en.wikipedia.org/wiki/Anakapalli_(Assembly_constituency)",
    reservation: "NONE",
    number: "30",
    district: {
      name_id: "in-d-ap-anakapalli",
      wikidata_qid: "Q110714857",
      wikipedia_page: "https://en.wikipedia.org/wiki/Anakapalli_district",
    },
    loksabha_constituency: {
      name: "Anakapalli",
      href: "https://en.wikipedia.org/wiki/Anakapalli_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Pendurthi",
    href: "https://en.wikipedia.org/wiki/Pendurthi_(Assembly_constituency)",
    reservation: "NONE",
    number: "31",
    district: {
      name_id: "in-d-ap-anakapalli",
      wikidata_qid: "Q110714857",
      wikipedia_page: "https://en.wikipedia.org/wiki/Anakapalli_district",
    },
    loksabha_constituency: {
      name: "Anakapalli",
      href: "https://en.wikipedia.org/wiki/Anakapalli_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Elamanchili",
    href: "https://en.wikipedia.org/wiki/Elamanchili_(Assembly_constituency)",
    reservation: "NONE",
    number: "32",
    district: {
      name_id: "in-d-ap-anakapalli",
      wikidata_qid: "Q110714857",
      wikipedia_page: "https://en.wikipedia.org/wiki/Anakapalli_district",
    },
    loksabha_constituency: {
      name: "Anakapalli",
      href: "https://en.wikipedia.org/wiki/Anakapalli_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Payakaraopet",
    href: "https://en.wikipedia.org/wiki/Payakaraopet_(SC)_(Assembly_constituency)",
    reservation: "SC",
    number: "33",
    district: {
      name_id: "in-d-ap-anakapalli",
      wikidata_qid: "Q110714857",
      wikipedia_page: "https://en.wikipedia.org/wiki/Anakapalli_district",
    },
    loksabha_constituency: {
      name: "Anakapalli",
      href: "https://en.wikipedia.org/wiki/Anakapalli_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Narsipatnam",
    href: "https://en.wikipedia.org/wiki/Narsipatnam_(Assembly_constituency)",
    reservation: "NONE",
    number: "34",
    district: {
      name_id: "in-d-ap-anakapalli",
      wikidata_qid: "Q110714857",
      wikipedia_page: "https://en.wikipedia.org/wiki/Anakapalli_district",
    },
    loksabha_constituency: {
      name: "Anakapalli",
      href: "https://en.wikipedia.org/wiki/Anakapalli_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Araku Valley",
    href: "https://en.wikipedia.org/wiki/Araku_Valley_Assembly_constituency",
    reservation: "ST",
    number: "28",
    district: {
      name_id: "in-d-ap-alluri-sitharama-raju",
      wikidata_qid: "Q110714850",
      wikipedia_page: "https://en.wikipedia.org/wiki/Alluri_Sitharama_Raju_district",
    },
    loksabha_constituency: { name: "Araku", href: "https://en.wikipedia.org/wiki/Araku_Lok_Sabha_constituency" },
  },
  {
    name: "Paderu",
    href: "https://en.wikipedia.org/wiki/Paderu_(ST)(Assembly_constituency)",
    reservation: "ST",
    number: "29",
    district: {
      name_id: "in-d-ap-alluri-sitharama-raju",
      wikidata_qid: "Q110714850",
      wikipedia_page: "https://en.wikipedia.org/wiki/Alluri_Sitharama_Raju_district",
    },
    loksabha_constituency: { name: "Araku", href: "https://en.wikipedia.org/wiki/Araku_Lok_Sabha_constituency" },
  },
  {
    name: "Rampachodavaram",
    href: "https://en.wikipedia.org/wiki/Rampachodavaram_(ST)(Assembly_constituency)",
    reservation: "ST",
    number: "53",
    district: {
      name_id: "in-d-ap-alluri-sitharama-raju",
      wikidata_qid: "Q110714850",
      wikipedia_page: "https://en.wikipedia.org/wiki/Alluri_Sitharama_Raju_district",
    },
    loksabha_constituency: { name: "Araku", href: "https://en.wikipedia.org/wiki/Araku_Lok_Sabha_constituency" },
  },
  {
    name: "Tuni",
    href: "https://en.wikipedia.org/wiki/Tuni_Assembly_constituency",
    reservation: "NONE",
    number: "35",
    district: {
      name_id: "in-d-ap-kakinada",
      wikidata_qid: "Q110714860",
      wikipedia_page: "https://en.wikipedia.org/wiki/Kakinada_district",
    },
    loksabha_constituency: { name: "Kakinada", href: "https://en.wikipedia.org/wiki/Kakinada_Lok_Sabha_constituency" },
  },
  {
    name: "Prathipadu",
    href: "https://en.wikipedia.org/wiki/Prathipadu,_Kakinada_Assembly_constituency",
    reservation: "NONE",
    number: "36",
    district: {
      name_id: "in-d-ap-kakinada",
      wikidata_qid: "Q110714860",
      wikipedia_page: "https://en.wikipedia.org/wiki/Kakinada_district",
    },
    loksabha_constituency: { name: "Kakinada", href: "https://en.wikipedia.org/wiki/Kakinada_Lok_Sabha_constituency" },
  },
  {
    name: "Pithapuram",
    href: "https://en.wikipedia.org/wiki/Pithapuram_Assembly_constituency",
    reservation: "NONE",
    number: "37",
    district: {
      name_id: "in-d-ap-kakinada",
      wikidata_qid: "Q110714860",
      wikipedia_page: "https://en.wikipedia.org/wiki/Kakinada_district",
    },
    loksabha_constituency: { name: "Kakinada", href: "https://en.wikipedia.org/wiki/Kakinada_Lok_Sabha_constituency" },
  },
  {
    name: "Kakinada Rural",
    href: "https://en.wikipedia.org/wiki/Kakinada_Rural_Assembly_constituency",
    reservation: "NONE",
    number: "38",
    district: {
      name_id: "in-d-ap-kakinada",
      wikidata_qid: "Q110714860",
      wikipedia_page: "https://en.wikipedia.org/wiki/Kakinada_district",
    },
    loksabha_constituency: { name: "Kakinada", href: "https://en.wikipedia.org/wiki/Kakinada_Lok_Sabha_constituency" },
  },
  {
    name: "Peddapuram",
    href: "https://en.wikipedia.org/wiki/Peddapuram_Assembly_constituency",
    reservation: "NONE",
    number: "39",
    district: {
      name_id: "in-d-ap-kakinada",
      wikidata_qid: "Q110714860",
      wikipedia_page: "https://en.wikipedia.org/wiki/Kakinada_district",
    },
    loksabha_constituency: { name: "Kakinada", href: "https://en.wikipedia.org/wiki/Kakinada_Lok_Sabha_constituency" },
  },
  {
    name: "Kakinada City",
    href: "https://en.wikipedia.org/wiki/Kakinada_City_Assembly_constituency",
    reservation: "NONE",
    number: "41",
    district: {
      name_id: "in-d-ap-kakinada",
      wikidata_qid: "Q110714860",
      wikipedia_page: "https://en.wikipedia.org/wiki/Kakinada_district",
    },
    loksabha_constituency: { name: "Kakinada", href: "https://en.wikipedia.org/wiki/Kakinada_Lok_Sabha_constituency" },
  },
  {
    name: "Jaggampeta",
    href: "https://en.wikipedia.org/wiki/Jaggampeta_Assembly_constituency",
    reservation: "NONE",
    number: "52",
    district: {
      name_id: "in-d-ap-kakinada",
      wikidata_qid: "Q110714860",
      wikipedia_page: "https://en.wikipedia.org/wiki/Kakinada_district",
    },
    loksabha_constituency: { name: "Kakinada", href: "https://en.wikipedia.org/wiki/Kakinada_Lok_Sabha_constituency" },
  },
  {
    name: "Anaparthy",
    href: "https://en.wikipedia.org/wiki/Anaparthy_(Assembly_constituency)",
    reservation: "NONE",
    number: "40",
    district: {
      name_id: "in-d-ap-east-godavari",
      wikidata_qid: "Q15338",
      wikipedia_page: "https://en.wikipedia.org/wiki/East_Godavari_district",
    },
    loksabha_constituency: {
      name: "Rajamahendravaram",
      href: "https://en.wikipedia.org/wiki/Rajahmundry_Lok_Sabha_constituency",
    },
  },
  {
    name: "Rajanagaram",
    href: "https://en.wikipedia.org/wiki/Rajanagram_(Assembly_constituency)",
    reservation: "NONE",
    number: "49",
    district: {
      name_id: "in-d-ap-east-godavari",
      wikidata_qid: "Q15338",
      wikipedia_page: "https://en.wikipedia.org/wiki/East_Godavari_district",
    },
    loksabha_constituency: {
      name: "Rajamahendravaram",
      href: "https://en.wikipedia.org/wiki/Rajahmundry_Lok_Sabha_constituency",
    },
  },
  {
    name: "Rajamahendravaram City",
    href: "https://en.wikipedia.org/wiki/Rajahmundry_City_(Assembly_constituency)",
    reservation: "NONE",
    number: "50",
    district: {
      name_id: "in-d-ap-east-godavari",
      wikidata_qid: "Q15338",
      wikipedia_page: "https://en.wikipedia.org/wiki/East_Godavari_district",
    },
    loksabha_constituency: {
      name: "Rajamahendravaram",
      href: "https://en.wikipedia.org/wiki/Rajahmundry_Lok_Sabha_constituency",
    },
  },
  {
    name: "Rajamahendravaram Rural",
    href: "https://en.wikipedia.org/wiki/Rajahmundry_Rural_(Assembly_constituency)",
    reservation: "NONE",
    number: "51",
    district: {
      name_id: "in-d-ap-east-godavari",
      wikidata_qid: "Q15338",
      wikipedia_page: "https://en.wikipedia.org/wiki/East_Godavari_district",
    },
    loksabha_constituency: {
      name: "Rajamahendravaram",
      href: "https://en.wikipedia.org/wiki/Rajahmundry_Lok_Sabha_constituency",
    },
  },
  {
    name: "Kovvur",
    href: "https://en.wikipedia.org/wiki/Kovvur_(Assembly_constituency)",
    reservation: "SC",
    number: "54",
    district: {
      name_id: "in-d-ap-east-godavari",
      wikidata_qid: "Q15338",
      wikipedia_page: "https://en.wikipedia.org/wiki/East_Godavari_district",
    },
    loksabha_constituency: {
      name: "Rajamahendravaram",
      href: "https://en.wikipedia.org/wiki/Rajahmundry_Lok_Sabha_constituency",
    },
  },
  {
    name: "Nidadavole",
    href: "https://en.wikipedia.org/wiki/Nidadavole_(Assembly_constituency)",
    reservation: "NONE",
    number: "55",
    district: {
      name_id: "in-d-ap-east-godavari",
      wikidata_qid: "Q15338",
      wikipedia_page: "https://en.wikipedia.org/wiki/East_Godavari_district",
    },
    loksabha_constituency: {
      name: "Rajamahendravaram",
      href: "https://en.wikipedia.org/wiki/Rajahmundry_Lok_Sabha_constituency",
    },
  },
  {
    name: "Gopalapuram",
    href: "https://en.wikipedia.org/wiki/Gopalapuram_(Assembly_constituency)",
    reservation: "SC",
    number: "66",
    district: {
      name_id: "in-d-ap-east-godavari",
      wikidata_qid: "Q15338",
      wikipedia_page: "https://en.wikipedia.org/wiki/East_Godavari_district",
    },
    loksabha_constituency: {
      name: "Rajamahendravaram",
      href: "https://en.wikipedia.org/wiki/Rajahmundry_Lok_Sabha_constituency",
    },
  },
  {
    name: "Ramachandrapuram",
    href: "https://en.wikipedia.org/wiki/Ramachandrapuram_(Assembly_constituency)",
    reservation: "NONE",
    number: "42",
    district: {
      name_id: "in-d-ap-konaseema",
      wikidata_qid: "Q110714859",
      wikipedia_page: "https://en.wikipedia.org/wiki/Konaseema_district",
    },
    loksabha_constituency: {
      name: "Amalapuram",
      href: "https://en.wikipedia.org/wiki/Amalapuram_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Mummidivaram",
    href: "https://en.wikipedia.org/wiki/Mummidivaram_(Assembly_constituency)",
    reservation: "NONE",
    number: "43",
    district: {
      name_id: "in-d-ap-konaseema",
      wikidata_qid: "Q110714859",
      wikipedia_page: "https://en.wikipedia.org/wiki/Konaseema_district",
    },
    loksabha_constituency: {
      name: "Amalapuram",
      href: "https://en.wikipedia.org/wiki/Amalapuram_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Amalapuram",
    href: "https://en.wikipedia.org/wiki/Amalapuram_(Assembly_constituency)",
    reservation: "SC",
    number: "44",
    district: {
      name_id: "in-d-ap-konaseema",
      wikidata_qid: "Q110714859",
      wikipedia_page: "https://en.wikipedia.org/wiki/Konaseema_district",
    },
    loksabha_constituency: {
      name: "Amalapuram",
      href: "https://en.wikipedia.org/wiki/Amalapuram_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Razole",
    href: "https://en.wikipedia.org/wiki/Razole_(Assembly_constituency)",
    reservation: "SC",
    number: "45",
    district: {
      name_id: "in-d-ap-konaseema",
      wikidata_qid: "Q110714859",
      wikipedia_page: "https://en.wikipedia.org/wiki/Konaseema_district",
    },
    loksabha_constituency: {
      name: "Amalapuram",
      href: "https://en.wikipedia.org/wiki/Amalapuram_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Gannavaram",
    href: "https://en.wikipedia.org/wiki/Gannavaram_(SC)_(Assembly_constituency)",
    reservation: "SC",
    number: "46",
    district: {
      name_id: "in-d-ap-konaseema",
      wikidata_qid: "Q110714859",
      wikipedia_page: "https://en.wikipedia.org/wiki/Konaseema_district",
    },
    loksabha_constituency: {
      name: "Amalapuram",
      href: "https://en.wikipedia.org/wiki/Amalapuram_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Kothapeta",
    href: "https://en.wikipedia.org/wiki/Kothapeta_(Assembly_constituency)",
    reservation: "NONE",
    number: "47",
    district: {
      name_id: "in-d-ap-konaseema",
      wikidata_qid: "Q110714859",
      wikipedia_page: "https://en.wikipedia.org/wiki/Konaseema_district",
    },
    loksabha_constituency: {
      name: "Amalapuram",
      href: "https://en.wikipedia.org/wiki/Amalapuram_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Mandapeta",
    href: "https://en.wikipedia.org/wiki/Mandapeta_(Assembly_constituency)",
    reservation: "NONE",
    number: "48",
    district: {
      name_id: "in-d-ap-konaseema",
      wikidata_qid: "Q110714859",
      wikipedia_page: "https://en.wikipedia.org/wiki/Konaseema_district",
    },
    loksabha_constituency: {
      name: "Amalapuram",
      href: "https://en.wikipedia.org/wiki/Amalapuram_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Unguturu",
    href: "https://en.wikipedia.org/wiki/Unguturu_Assembly_constituency",
    reservation: "NONE",
    number: "63",
    district: {
      name_id: "in-d-ap-eluru",
      wikidata_qid: "Q110714851",
      wikipedia_page: "https://en.wikipedia.org/wiki/Eluru_district",
    },
    loksabha_constituency: { name: "Eluru", href: "https://en.wikipedia.org/wiki/Eluru_Lok_Sabha_constituency" },
  },
  {
    name: "Denduluru",
    href: "https://en.wikipedia.org/wiki/Denduluru_Assembly_constituency",
    reservation: "NONE",
    number: "64",
    district: {
      name_id: "in-d-ap-eluru",
      wikidata_qid: "Q110714851",
      wikipedia_page: "https://en.wikipedia.org/wiki/Eluru_district",
    },
    loksabha_constituency: { name: "Eluru", href: "https://en.wikipedia.org/wiki/Eluru_Lok_Sabha_constituency" },
  },
  {
    name: "Eluru",
    href: "https://en.wikipedia.org/wiki/Eluru_(Assembly_constituency)",
    reservation: "NONE",
    number: "65",
    district: {
      name_id: "in-d-ap-eluru",
      wikidata_qid: "Q110714851",
      wikipedia_page: "https://en.wikipedia.org/wiki/Eluru_district",
    },
    loksabha_constituency: { name: "Eluru", href: "https://en.wikipedia.org/wiki/Eluru_Lok_Sabha_constituency" },
  },
  {
    name: "Polavaram",
    href: "https://en.wikipedia.org/wiki/Polavaram_(Assembly_constituency)",
    reservation: "ST",
    number: "67",
    district: {
      name_id: "in-d-ap-eluru",
      wikidata_qid: "Q110714851",
      wikipedia_page: "https://en.wikipedia.org/wiki/Eluru_district",
    },
    loksabha_constituency: { name: "Eluru", href: "https://en.wikipedia.org/wiki/Eluru_Lok_Sabha_constituency" },
  },
  {
    name: "Chintalapudi",
    href: "https://en.wikipedia.org/wiki/Chintalapudi_(Assembly_constituency)",
    reservation: "SC",
    number: "68",
    district: {
      name_id: "in-d-ap-eluru",
      wikidata_qid: "Q110714851",
      wikipedia_page: "https://en.wikipedia.org/wiki/Eluru_district",
    },
    loksabha_constituency: { name: "Eluru", href: "https://en.wikipedia.org/wiki/Eluru_Lok_Sabha_constituency" },
  },
  {
    name: "Nuzvid",
    href: "https://en.wikipedia.org/wiki/Nuzvid_(Assembly_constituency)",
    reservation: "NONE",
    number: "70",
    district: {
      name_id: "in-d-ap-eluru",
      wikidata_qid: "Q110714851",
      wikipedia_page: "https://en.wikipedia.org/wiki/Eluru_district",
    },
    loksabha_constituency: { name: "Eluru", href: "https://en.wikipedia.org/wiki/Eluru_Lok_Sabha_constituency" },
  },
  {
    name: "Kaikalur",
    href: "https://en.wikipedia.org/wiki/Kaikalur_(Assembly_constituency)",
    reservation: "NONE",
    number: "73",
    district: {
      name_id: "in-d-ap-eluru",
      wikidata_qid: "Q110714851",
      wikipedia_page: "https://en.wikipedia.org/wiki/Eluru_district",
    },
    loksabha_constituency: { name: "Eluru", href: "https://en.wikipedia.org/wiki/Eluru_Lok_Sabha_constituency" },
  },
  {
    name: "Achanta",
    href: "https://en.wikipedia.org/wiki/Achanta_(Assembly_constituency)",
    reservation: "NONE",
    number: "56",
    district: {
      name_id: "in-d-ap-west-godavari",
      wikidata_qid: "Q15404",
      wikipedia_page: "https://en.wikipedia.org/wiki/West_Godavari_district",
    },
    loksabha_constituency: {
      name: "Narasapuram",
      href: "https://en.wikipedia.org/wiki/Narasapuram_Lok_Sabha_constituency",
    },
  },
  {
    name: "Palakollu",
    href: "https://en.wikipedia.org/wiki/Palakollu_(Assembly_constituency)",
    reservation: "NONE",
    number: "57",
    district: {
      name_id: "in-d-ap-west-godavari",
      wikidata_qid: "Q15404",
      wikipedia_page: "https://en.wikipedia.org/wiki/West_Godavari_district",
    },
    loksabha_constituency: {
      name: "Narasapuram",
      href: "https://en.wikipedia.org/wiki/Narasapuram_Lok_Sabha_constituency",
    },
  },
  {
    name: "Narasapuram",
    href: "https://en.wikipedia.org/wiki/Narasapuram_(Assembly_constituency)",
    reservation: "NONE",
    number: "58",
    district: {
      name_id: "in-d-ap-west-godavari",
      wikidata_qid: "Q15404",
      wikipedia_page: "https://en.wikipedia.org/wiki/West_Godavari_district",
    },
    loksabha_constituency: {
      name: "Narasapuram",
      href: "https://en.wikipedia.org/wiki/Narasapuram_Lok_Sabha_constituency",
    },
  },
  {
    name: "Bhimavaram",
    href: "https://en.wikipedia.org/wiki/Bhimavaram_(Assembly_constituency)",
    reservation: "NONE",
    number: "59",
    district: {
      name_id: "in-d-ap-west-godavari",
      wikidata_qid: "Q15404",
      wikipedia_page: "https://en.wikipedia.org/wiki/West_Godavari_district",
    },
    loksabha_constituency: {
      name: "Narasapuram",
      href: "https://en.wikipedia.org/wiki/Narasapuram_Lok_Sabha_constituency",
    },
  },
  {
    name: "Undi",
    href: "https://en.wikipedia.org/wiki/Undi_(Assembly_constituency)",
    reservation: "NONE",
    number: "60",
    district: {
      name_id: "in-d-ap-west-godavari",
      wikidata_qid: "Q15404",
      wikipedia_page: "https://en.wikipedia.org/wiki/West_Godavari_district",
    },
    loksabha_constituency: {
      name: "Narasapuram",
      href: "https://en.wikipedia.org/wiki/Narasapuram_Lok_Sabha_constituency",
    },
  },
  {
    name: "Tanuku",
    href: "https://en.wikipedia.org/wiki/Tanuku_(Assembly_constituency)",
    reservation: "NONE",
    number: "61",
    district: {
      name_id: "in-d-ap-west-godavari",
      wikidata_qid: "Q15404",
      wikipedia_page: "https://en.wikipedia.org/wiki/West_Godavari_district",
    },
    loksabha_constituency: {
      name: "Narasapuram",
      href: "https://en.wikipedia.org/wiki/Narasapuram_Lok_Sabha_constituency",
    },
  },
  {
    name: "Tadepalligudem",
    href: "https://en.wikipedia.org/wiki/Tadepalligudem_(Assembly_constituency)",
    reservation: "NONE",
    number: "62",
    district: {
      name_id: "in-d-ap-west-godavari",
      wikidata_qid: "Q15404",
      wikipedia_page: "https://en.wikipedia.org/wiki/West_Godavari_district",
    },
    loksabha_constituency: {
      name: "Narasapuram",
      href: "https://en.wikipedia.org/wiki/Narasapuram_Lok_Sabha_constituency",
    },
  },
  {
    name: "Gannavaram (Part)",
    href: "https://en.wikipedia.org/wiki/Gannavaram,_Krishna_Assembly_constituency",
    reservation: "NONE",
    number: "71",
    district: {
      name_id: "in-d-ap-ntr",
      wikidata_qid: "Q110876763",
      wikipedia_page: "https://en.wikipedia.org/wiki/NTR_district",
    },
    loksabha_constituency: {
      name: "Machillipatnam",
      href: "https://en.wikipedia.org/wiki/Machilipatnam_Lok_Sabha_constituency",
    },
  },
  {
    name: "Tiruvuru",
    href: "https://en.wikipedia.org/wiki/Tiruvuru_(Assembly_constituency)",
    reservation: "SC",
    number: "69",
    district: {
      name_id: "in-d-ap-ntr",
      wikidata_qid: "Q110876763",
      wikipedia_page: "https://en.wikipedia.org/wiki/NTR_district",
    },
    loksabha_constituency: {
      name: "Vijayawada",
      href: "https://en.wikipedia.org/wiki/Vijayawada_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Vijayawada West",
    href: "https://en.wikipedia.org/wiki/Vijayawada_West_(Assembly_constituency)",
    reservation: "NONE",
    number: "79",
    district: {
      name_id: "in-d-ap-ntr",
      wikidata_qid: "Q110876763",
      wikipedia_page: "https://en.wikipedia.org/wiki/NTR_district",
    },
    loksabha_constituency: {
      name: "Vijayawada",
      href: "https://en.wikipedia.org/wiki/Vijayawada_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Vijayawada Central",
    href: "https://en.wikipedia.org/wiki/Vijayawada_Central_(Assembly_constituency)",
    reservation: "NONE",
    number: "80",
    district: {
      name_id: "in-d-ap-ntr",
      wikidata_qid: "Q110876763",
      wikipedia_page: "https://en.wikipedia.org/wiki/NTR_district",
    },
    loksabha_constituency: {
      name: "Vijayawada",
      href: "https://en.wikipedia.org/wiki/Vijayawada_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Vijayawada East",
    href: "https://en.wikipedia.org/wiki/Vijayawada_East_(Assembly_constituency)",
    reservation: "NONE",
    number: "81",
    district: {
      name_id: "in-d-ap-ntr",
      wikidata_qid: "Q110876763",
      wikipedia_page: "https://en.wikipedia.org/wiki/NTR_district",
    },
    loksabha_constituency: {
      name: "Vijayawada",
      href: "https://en.wikipedia.org/wiki/Vijayawada_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Mylavaram",
    href: "https://en.wikipedia.org/wiki/Mylavaram_(Assembly_constituency)",
    reservation: "NONE",
    number: "82",
    district: {
      name_id: "in-d-ap-ntr",
      wikidata_qid: "Q110876763",
      wikipedia_page: "https://en.wikipedia.org/wiki/NTR_district",
    },
    loksabha_constituency: {
      name: "Vijayawada",
      href: "https://en.wikipedia.org/wiki/Vijayawada_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Nandigama",
    href: "https://en.wikipedia.org/wiki/Nandigama_(Assembly_constituency)",
    reservation: "SC",
    number: "83",
    district: {
      name_id: "in-d-ap-ntr",
      wikidata_qid: "Q110876763",
      wikipedia_page: "https://en.wikipedia.org/wiki/NTR_district",
    },
    loksabha_constituency: {
      name: "Vijayawada",
      href: "https://en.wikipedia.org/wiki/Vijayawada_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Jaggayyapeta",
    href: "https://en.wikipedia.org/wiki/Jaggayyapeta_(Assembly_constituency)",
    reservation: "NONE",
    number: "84",
    district: {
      name_id: "in-d-ap-ntr",
      wikidata_qid: "Q110876763",
      wikipedia_page: "https://en.wikipedia.org/wiki/NTR_district",
    },
    loksabha_constituency: {
      name: "Vijayawada",
      href: "https://en.wikipedia.org/wiki/Vijayawada_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Gannavaram",
    href: "https://en.wikipedia.org/wiki/Gannavaram,_Krishna_Assembly_constituency",
    reservation: "NONE",
    number: "71",
    district: {
      name_id: "in-d-ap-krishna",
      wikidata_qid: "Q15382",
      wikipedia_page: "https://en.wikipedia.org/wiki/Krishna_district",
    },
    loksabha_constituency: {
      name: "Machilipatnam",
      href: "https://en.wikipedia.org/wiki/Machilipatnam_Lok_Sabha_constituency",
    },
  },
  {
    name: "Gudivada",
    href: "https://en.wikipedia.org/wiki/Gudivada_(Assembly_constituency)",
    reservation: "NONE",
    number: "72",
    district: {
      name_id: "in-d-ap-krishna",
      wikidata_qid: "Q15382",
      wikipedia_page: "https://en.wikipedia.org/wiki/Krishna_district",
    },
    loksabha_constituency: {
      name: "Machilipatnam",
      href: "https://en.wikipedia.org/wiki/Machilipatnam_Lok_Sabha_constituency",
    },
  },
  {
    name: "Pedana",
    href: "https://en.wikipedia.org/wiki/Pedana_(Assembly_constituency)",
    reservation: "NONE",
    number: "74",
    district: {
      name_id: "in-d-ap-krishna",
      wikidata_qid: "Q15382",
      wikipedia_page: "https://en.wikipedia.org/wiki/Krishna_district",
    },
    loksabha_constituency: {
      name: "Machilipatnam",
      href: "https://en.wikipedia.org/wiki/Machilipatnam_Lok_Sabha_constituency",
    },
  },
  {
    name: "Machilipatnam",
    href: "https://en.wikipedia.org/wiki/Machilipatnam_(Assembly_constituency)",
    reservation: "Nona",
    number: "75",
    district: {
      name_id: "in-d-ap-krishna",
      wikidata_qid: "Q15382",
      wikipedia_page: "https://en.wikipedia.org/wiki/Krishna_district",
    },
    loksabha_constituency: {
      name: "Machilipatnam",
      href: "https://en.wikipedia.org/wiki/Machilipatnam_Lok_Sabha_constituency",
    },
  },
  {
    name: "Avanigadda",
    href: "https://en.wikipedia.org/wiki/Avanigadda_(Assembly_constituency)",
    reservation: "NONE",
    number: "76",
    district: {
      name_id: "in-d-ap-krishna",
      wikidata_qid: "Q15382",
      wikipedia_page: "https://en.wikipedia.org/wiki/Krishna_district",
    },
    loksabha_constituency: {
      name: "Machilipatnam",
      href: "https://en.wikipedia.org/wiki/Machilipatnam_Lok_Sabha_constituency",
    },
  },
  {
    name: "Pamarru",
    href: "https://en.wikipedia.org/wiki/Pamarru_(Assembly_constituency)",
    reservation: "SC",
    number: "77",
    district: {
      name_id: "in-d-ap-krishna",
      wikidata_qid: "Q15382",
      wikipedia_page: "https://en.wikipedia.org/wiki/Krishna_district",
    },
    loksabha_constituency: {
      name: "Machilipatnam",
      href: "https://en.wikipedia.org/wiki/Machilipatnam_Lok_Sabha_constituency",
    },
  },
  {
    name: "Penamaluru",
    href: "https://en.wikipedia.org/wiki/Penamaluru_(Assembly_constituency)",
    reservation: "NONE",
    number: "78",
    district: {
      name_id: "in-d-ap-krishna",
      wikidata_qid: "Q15382",
      wikipedia_page: "https://en.wikipedia.org/wiki/Krishna_district",
    },
    loksabha_constituency: {
      name: "Machilipatnam",
      href: "https://en.wikipedia.org/wiki/Machilipatnam_Lok_Sabha_constituency",
    },
  },
  {
    name: "Tadikonda",
    href: "https://en.wikipedia.org/wiki/Tadikonda_(Assembly_constituency)",
    reservation: "SC",
    number: "86",
    district: {
      name_id: "in-d-ap-guntur",
      wikidata_qid: "Q15341",
      wikipedia_page: "https://en.wikipedia.org/wiki/Guntur_district",
    },
    loksabha_constituency: { name: "Guntur", href: "https://en.wikipedia.org/wiki/Guntur_Lok_Sabha_constituency" },
  },
  {
    name: "Mangalagiri",
    href: "https://en.wikipedia.org/wiki/Mangalagiri_(Assembly_constituency)",
    reservation: "NONE",
    number: "87",
    district: {
      name_id: "in-d-ap-guntur",
      wikidata_qid: "Q15341",
      wikipedia_page: "https://en.wikipedia.org/wiki/Guntur_district",
    },
    loksabha_constituency: { name: "Guntur", href: "https://en.wikipedia.org/wiki/Guntur_Lok_Sabha_constituency" },
  },
  {
    name: "Ponnur",
    href: "https://en.wikipedia.org/wiki/Ponnuru_(Assembly_constituency)",
    reservation: "NONE",
    number: "88",
    district: {
      name_id: "in-d-ap-guntur",
      wikidata_qid: "Q15341",
      wikipedia_page: "https://en.wikipedia.org/wiki/Guntur_district",
    },
    loksabha_constituency: { name: "Guntur", href: "https://en.wikipedia.org/wiki/Guntur_Lok_Sabha_constituency" },
  },
  {
    name: "Tenali",
    href: "https://en.wikipedia.org/wiki/Tenali_(Assembly_constituency)",
    reservation: "NONE",
    number: "91",
    district: {
      name_id: "in-d-ap-guntur",
      wikidata_qid: "Q15341",
      wikipedia_page: "https://en.wikipedia.org/wiki/Guntur_district",
    },
    loksabha_constituency: { name: "Guntur", href: "https://en.wikipedia.org/wiki/Guntur_Lok_Sabha_constituency" },
  },
  {
    name: "Prathipadu",
    href: "https://en.wikipedia.org/wiki/Prathipadu_(SC)_(Assembly_constituency)",
    reservation: "SC",
    number: "93",
    district: {
      name_id: "in-d-ap-guntur",
      wikidata_qid: "Q15341",
      wikipedia_page: "https://en.wikipedia.org/wiki/Guntur_district",
    },
    loksabha_constituency: { name: "Guntur", href: "https://en.wikipedia.org/wiki/Guntur_Lok_Sabha_constituency" },
  },
  {
    name: "Guntur West",
    href: "https://en.wikipedia.org/wiki/Guntur_West_(Assembly_constituency)",
    reservation: "NONE",
    number: "94",
    district: {
      name_id: "in-d-ap-guntur",
      wikidata_qid: "Q15341",
      wikipedia_page: "https://en.wikipedia.org/wiki/Guntur_district",
    },
    loksabha_constituency: { name: "Guntur", href: "https://en.wikipedia.org/wiki/Guntur_Lok_Sabha_constituency" },
  },
  {
    name: "Guntur East",
    href: "https://en.wikipedia.org/wiki/Guntur_East_(Assembly_constituency)",
    reservation: "NONE",
    number: "95",
    district: {
      name_id: "in-d-ap-guntur",
      wikidata_qid: "Q15341",
      wikipedia_page: "https://en.wikipedia.org/wiki/Guntur_district",
    },
    loksabha_constituency: { name: "Guntur", href: "https://en.wikipedia.org/wiki/Guntur_Lok_Sabha_constituency" },
  },
  {
    name: "Pedakurapadu",
    href: "https://en.wikipedia.org/wiki/Pedakurapadu_(Assembly_constituency)",
    number: "85",
    reservation: "NONE",
    district: {
      name_id: "in-d-ap-palnadu",
      wikidata_qid: "Q110714862",
      wikipedia_page: "https://en.wikipedia.org/wiki/Palnadu_district",
    },
    loksabha_constituency: {
      name: "Narasaraopet",
      href: "https://en.wikipedia.org/wiki/Narasaraopet_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Chilakaluripeta",
    href: "https://en.wikipedia.org/wiki/Chilakaluripet_(Assembly_constituency)",
    number: "96",
    reservation: "NONE",
    district: {
      name_id: "in-d-ap-palnadu",
      wikidata_qid: "Q110714862",
      wikipedia_page: "https://en.wikipedia.org/wiki/Palnadu_district",
    },
    loksabha_constituency: {
      name: "Narasaraopet",
      href: "https://en.wikipedia.org/wiki/Narasaraopet_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Narasaraopeta",
    href: "https://en.wikipedia.org/wiki/Narasaraopet_(Assembly_constituency)",
    number: "97",
    reservation: "NONE",
    district: {
      name_id: "in-d-ap-palnadu",
      wikidata_qid: "Q110714862",
      wikipedia_page: "https://en.wikipedia.org/wiki/Palnadu_district",
    },
    loksabha_constituency: {
      name: "Narasaraopet",
      href: "https://en.wikipedia.org/wiki/Narasaraopet_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Sattenapalle",
    href: "https://en.wikipedia.org/wiki/Sattenapalle_(Assembly_constituency)",
    number: "98",
    reservation: "NONE",
    district: {
      name_id: "in-d-ap-palnadu",
      wikidata_qid: "Q110714862",
      wikipedia_page: "https://en.wikipedia.org/wiki/Palnadu_district",
    },
    loksabha_constituency: {
      name: "Narasaraopet",
      href: "https://en.wikipedia.org/wiki/Narasaraopet_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Vinukonda",
    href: "https://en.wikipedia.org/wiki/Vinukonda_(Assembly_constituency)",
    number: "99",
    reservation: "NONE",
    district: {
      name_id: "in-d-ap-palnadu",
      wikidata_qid: "Q110714862",
      wikipedia_page: "https://en.wikipedia.org/wiki/Palnadu_district",
    },
    loksabha_constituency: {
      name: "Narasaraopet",
      href: "https://en.wikipedia.org/wiki/Narasaraopet_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Gurajala",
    href: "https://en.wikipedia.org/wiki/Gurajala_(Assembly_constituency)",
    number: "100",
    reservation: "NONE",
    district: {
      name_id: "in-d-ap-palnadu",
      wikidata_qid: "Q110714862",
      wikipedia_page: "https://en.wikipedia.org/wiki/Palnadu_district",
    },
    loksabha_constituency: {
      name: "Narasaraopet",
      href: "https://en.wikipedia.org/wiki/Narasaraopet_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Macherla",
    href: "https://en.wikipedia.org/wiki/Macherla_(Assembly_constituency)",
    number: "101",
    reservation: "NONE",
    district: {
      name_id: "in-d-ap-palnadu",
      wikidata_qid: "Q110714862",
      wikipedia_page: "https://en.wikipedia.org/wiki/Palnadu_district",
    },
    loksabha_constituency: {
      name: "Narasaraopet",
      href: "https://en.wikipedia.org/wiki/Narasaraopet_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Vemuru",
    href: "https://en.wikipedia.org/wiki/Vemuru_(Assembly_constituency)",
    reservation: "SC",
    number: "89",
    district: {
      name_id: "in-d-ap-bapatla",
      wikidata_qid: "Q110876712",
      wikipedia_page: "https://en.wikipedia.org/wiki/Bapatla_district",
    },
    loksabha_constituency: { name: "Bapatla", href: "https://en.wikipedia.org/wiki/Bapatla_Lok_Sabha_constituency" },
  },
  {
    name: "Repalle",
    href: "https://en.wikipedia.org/wiki/Repalle_(Assembly_constituency)",
    reservation: "NONE",
    number: "90",
    district: {
      name_id: "in-d-ap-bapatla",
      wikidata_qid: "Q110876712",
      wikipedia_page: "https://en.wikipedia.org/wiki/Bapatla_district",
    },
    loksabha_constituency: { name: "Bapatla", href: "https://en.wikipedia.org/wiki/Bapatla_Lok_Sabha_constituency" },
  },
  {
    name: "Bapatla",
    href: "https://en.wikipedia.org/wiki/Bapatla_(Assembly_constituency)",
    reservation: "NONE",
    number: "92",
    district: {
      name_id: "in-d-ap-bapatla",
      wikidata_qid: "Q110876712",
      wikipedia_page: "https://en.wikipedia.org/wiki/Bapatla_district",
    },
    loksabha_constituency: { name: "Bapatla", href: "https://en.wikipedia.org/wiki/Bapatla_Lok_Sabha_constituency" },
  },
  {
    name: "Parchur",
    href: "https://en.wikipedia.org/wiki/Parchur_(Assembly_constituency)",
    reservation: "NONE",
    number: "104",
    district: {
      name_id: "in-d-ap-bapatla",
      wikidata_qid: "Q110876712",
      wikipedia_page: "https://en.wikipedia.org/wiki/Bapatla_district",
    },
    loksabha_constituency: { name: "Bapatla", href: "https://en.wikipedia.org/wiki/Bapatla_Lok_Sabha_constituency" },
  },
  {
    name: "Addanki",
    href: "https://en.wikipedia.org/wiki/Addanki_(Assembly_constituency)",
    reservation: "NONE",
    number: "105",
    district: {
      name_id: "in-d-ap-bapatla",
      wikidata_qid: "Q110876712",
      wikipedia_page: "https://en.wikipedia.org/wiki/Bapatla_district",
    },
    loksabha_constituency: { name: "Bapatla", href: "https://en.wikipedia.org/wiki/Bapatla_Lok_Sabha_constituency" },
  },
  {
    name: "Chirala",
    href: "https://en.wikipedia.org/wiki/Chirala_(Assembly_constituency)",
    reservation: "NONE",
    number: "106",
    district: {
      name_id: "in-d-ap-bapatla",
      wikidata_qid: "Q110876712",
      wikipedia_page: "https://en.wikipedia.org/wiki/Bapatla_district",
    },
    loksabha_constituency: { name: "Bapatla", href: "https://en.wikipedia.org/wiki/Bapatla_Lok_Sabha_constituency" },
  },
  {
    name: "Santhanuthalapadu",
    href: "https://en.wikipedia.org/wiki/Santhanuthalapadu_(Assembly_constituency)",
    reservation: "SC",
    number: "107",
    district: {
      name_id: "in-d-ap-prakasam",
      wikidata_qid: "Q15390",
      wikipedia_page: "https://en.wikipedia.org/wiki/Prakasam_district",
    },
    loksabha_constituency: { name: "Bapatla", href: "https://en.wikipedia.org/wiki/Bapatla_Lok_Sabha_constituency" },
  },
  {
    name: "Yerragondapalem",
    href: "https://en.wikipedia.org/wiki/Yerragondapalem_(Assembly_constituency)",
    reservation: "SC",
    number: "102",
    district: {
      name_id: "in-d-ap-prakasam",
      wikidata_qid: "Q15390",
      wikipedia_page: "https://en.wikipedia.org/wiki/Prakasam_district",
    },
    loksabha_constituency: { name: "Ongole", href: "https://en.wikipedia.org/wiki/Ongole_Lok_Sabha_constituency" },
  },
  {
    name: "Darsi",
    href: "https://en.wikipedia.org/wiki/Darsi_(Assembly_constituency)",
    reservation: "NONE",
    number: "103",
    district: {
      name_id: "in-d-ap-prakasam",
      wikidata_qid: "Q15390",
      wikipedia_page: "https://en.wikipedia.org/wiki/Prakasam_district",
    },
    loksabha_constituency: { name: "Ongole", href: "https://en.wikipedia.org/wiki/Ongole_Lok_Sabha_constituency" },
  },
  {
    name: "Ongole",
    href: "https://en.wikipedia.org/wiki/Ongole_(Assembly_constituency)",
    reservation: "NONE",
    number: "108",
    district: {
      name_id: "in-d-ap-prakasam",
      wikidata_qid: "Q15390",
      wikipedia_page: "https://en.wikipedia.org/wiki/Prakasam_district",
    },
    loksabha_constituency: { name: "Ongole", href: "https://en.wikipedia.org/wiki/Ongole_Lok_Sabha_constituency" },
  },
  {
    name: "Kondapi",
    href: "https://en.wikipedia.org/wiki/Kondapi_(Assembly_constituency)",
    reservation: "SC",
    number: "110",
    district: {
      name_id: "in-d-ap-prakasam",
      wikidata_qid: "Q15390",
      wikipedia_page: "https://en.wikipedia.org/wiki/Prakasam_district",
    },
    loksabha_constituency: { name: "Ongole", href: "https://en.wikipedia.org/wiki/Ongole_Lok_Sabha_constituency" },
  },
  {
    name: "Markapuram",
    href: "https://en.wikipedia.org/wiki/Markapuram_(Assembly_constituency)",
    reservation: "NONE",
    number: "111",
    district: {
      name_id: "in-d-ap-prakasam",
      wikidata_qid: "Q15390",
      wikipedia_page: "https://en.wikipedia.org/wiki/Prakasam_district",
    },
    loksabha_constituency: { name: "Ongole", href: "https://en.wikipedia.org/wiki/Ongole_Lok_Sabha_constituency" },
  },
  {
    name: "Giddalur",
    href: "https://en.wikipedia.org/wiki/Giddalur_(Assembly_constituency)",
    reservation: "NONE",
    number: "112",
    district: {
      name_id: "in-d-ap-prakasam",
      wikidata_qid: "Q15390",
      wikipedia_page: "https://en.wikipedia.org/wiki/Prakasam_district",
    },
    loksabha_constituency: { name: "Ongole", href: "https://en.wikipedia.org/wiki/Ongole_Lok_Sabha_constituency" },
  },
  {
    name: "Kanigiri",
    href: "https://en.wikipedia.org/wiki/Kanigiri_(Assembly_constituency)",
    reservation: "NONE",
    number: "113",
    district: {
      name_id: "in-d-ap-prakasam",
      wikidata_qid: "Q15390",
      wikipedia_page: "https://en.wikipedia.org/wiki/Prakasam_district",
    },
    loksabha_constituency: { name: "Ongole", href: "https://en.wikipedia.org/wiki/Ongole_Lok_Sabha_constituency" },
  },
  {
    name: "Kandukur",
    href: "https://en.wikipedia.org/wiki/Kandukur_(Assembly_constituency)",
    reservation: "NONE",
    number: "109",
    district: {
      name_id: "in-d-ap-sri-potti-sriramulu-nellore",
      wikidata_qid: "Q15383",
      wikipedia_page: "https://en.wikipedia.org/wiki/Nellore_district",
    },
    loksabha_constituency: { name: "Nellore", href: "https://en.wikipedia.org/wiki/Nellore_Lok_Sabha_constituency" },
  },
  {
    name: "Kavali",
    href: "https://en.wikipedia.org/wiki/Kavali_(Assembly_constituency)",
    reservation: "NONE",
    number: "114",
    district: {
      name_id: "in-d-ap-sri-potti-sriramulu-nellore",
      wikidata_qid: "Q15383",
      wikipedia_page: "https://en.wikipedia.org/wiki/Nellore_district",
    },
    loksabha_constituency: { name: "Nellore", href: "https://en.wikipedia.org/wiki/Nellore_Lok_Sabha_constituency" },
  },
  {
    name: "Atmakur",
    href: "https://en.wikipedia.org/wiki/Atmakur_(Assembly_constituency)",
    reservation: "NONE",
    number: "115",
    district: {
      name_id: "in-d-ap-sri-potti-sriramulu-nellore",
      wikidata_qid: "Q15383",
      wikipedia_page: "https://en.wikipedia.org/wiki/Nellore_district",
    },
    loksabha_constituency: { name: "Nellore", href: "https://en.wikipedia.org/wiki/Nellore_Lok_Sabha_constituency" },
  },
  {
    name: "Kovuru",
    href: "https://en.wikipedia.org/wiki/Kovur_(Assembly_constituency)",
    reservation: "NONE",
    number: "116",
    district: {
      name_id: "in-d-ap-sri-potti-sriramulu-nellore",
      wikidata_qid: "Q15383",
      wikipedia_page: "https://en.wikipedia.org/wiki/Nellore_district",
    },
    loksabha_constituency: { name: "Nellore", href: "https://en.wikipedia.org/wiki/Nellore_Lok_Sabha_constituency" },
  },
  {
    name: "Nellore City",
    href: "https://en.wikipedia.org/wiki/Nellore_City_(Assembly_constituency)",
    reservation: "NONE",
    number: "117",
    district: {
      name_id: "in-d-ap-sri-potti-sriramulu-nellore",
      wikidata_qid: "Q15383",
      wikipedia_page: "https://en.wikipedia.org/wiki/Nellore_district",
    },
    loksabha_constituency: { name: "Nellore", href: "https://en.wikipedia.org/wiki/Nellore_Lok_Sabha_constituency" },
  },
  {
    name: "Nellore Rural",
    href: "https://en.wikipedia.org/wiki/Nellore_Rural_(Assembly_constituency)",
    reservation: "NONE",
    number: "118",
    district: {
      name_id: "in-d-ap-sri-potti-sriramulu-nellore",
      wikidata_qid: "Q15383",
      wikipedia_page: "https://en.wikipedia.org/wiki/Nellore_district",
    },
    loksabha_constituency: { name: "Nellore", href: "https://en.wikipedia.org/wiki/Nellore_Lok_Sabha_constituency" },
  },
  {
    name: "Udayagiri",
    href: "https://en.wikipedia.org/wiki/Udayagiri_(Assembly_constituency)",
    reservation: "NONE",
    number: "123",
    district: {
      name_id: "in-d-ap-sri-potti-sriramulu-nellore",
      wikidata_qid: "Q15383",
      wikipedia_page: "https://en.wikipedia.org/wiki/Nellore_district",
    },
    loksabha_constituency: { name: "Nellore", href: "https://en.wikipedia.org/wiki/Nellore_Lok_Sabha_constituency" },
  },
  {
    name: "Sarvepalli",
    href: "https://en.wikipedia.org/wiki/Sarvepalli_(Assembly_constituency)",
    reservation: "NONE",
    number: "119",
    district: {
      name_id: "in-d-ap-sri-potti-sriramulu-nellore",
      wikidata_qid: "Q15383",
      wikipedia_page: "https://en.wikipedia.org/wiki/Nellore_district",
    },
    loksabha_constituency: { name: "Tirupati", href: "https://en.wikipedia.org/wiki/Tirupati_Lok_Sabha_constituency" },
  },
  {
    name: "Kurnool",
    href: "https://en.wikipedia.org/wiki/Kurnool_(Assembly_constituency)",
    reservation: "NONE",
    number: "137",
    district: {
      name_id: "in-d-ap-kurnool",
      wikidata_qid: "Q15381",
      wikipedia_page: "https://en.wikipedia.org/wiki/Kurnool_district",
    },
    loksabha_constituency: { name: "Kurnool", href: "https://en.wikipedia.org/wiki/Kurnool_Lok_Sabha_constituency" },
  },
  {
    name: "Kodumur",
    href: "https://en.wikipedia.org/wiki/Kodumur_(Assembly_constituency)",
    reservation: "SC",
    number: "143",
    district: {
      name_id: "in-d-ap-kurnool",
      wikidata_qid: "Q15381",
      wikipedia_page: "https://en.wikipedia.org/wiki/Kurnool_district",
    },
    loksabha_constituency: { name: "Kurnool", href: "https://en.wikipedia.org/wiki/Kurnool_Lok_Sabha_constituency" },
  },
  {
    name: "Yemmiganur",
    href: "https://en.wikipedia.org/wiki/Yemmiganur_(Assembly_constituency)",
    reservation: "NONE",
    number: "144",
    district: {
      name_id: "in-d-ap-kurnool",
      wikidata_qid: "Q15381",
      wikipedia_page: "https://en.wikipedia.org/wiki/Kurnool_district",
    },
    loksabha_constituency: { name: "Kurnool", href: "https://en.wikipedia.org/wiki/Kurnool_Lok_Sabha_constituency" },
  },
  {
    name: "Mantralayam",
    href: "https://en.wikipedia.org/wiki/Mantralayam_(Assembly_constituency)",
    reservation: "NONE",
    number: "145",
    district: {
      name_id: "in-d-ap-kurnool",
      wikidata_qid: "Q15381",
      wikipedia_page: "https://en.wikipedia.org/wiki/Kurnool_district",
    },
    loksabha_constituency: { name: "Kurnool", href: "https://en.wikipedia.org/wiki/Kurnool_Lok_Sabha_constituency" },
  },
  {
    name: "Adoni",
    href: "https://en.wikipedia.org/wiki/Adoni_(Assembly_constituency)",
    reservation: "NONE",
    number: "146",
    district: {
      name_id: "in-d-ap-kurnool",
      wikidata_qid: "Q15381",
      wikipedia_page: "https://en.wikipedia.org/wiki/Kurnool_district",
    },
    loksabha_constituency: { name: "Kurnool", href: "https://en.wikipedia.org/wiki/Kurnool_Lok_Sabha_constituency" },
  },
  {
    name: "Alur",
    href: "https://en.wikipedia.org/wiki/Alur_(Assembly_constituency)",
    reservation: "NONE",
    number: "147",
    district: {
      name_id: "in-d-ap-kurnool",
      wikidata_qid: "Q15381",
      wikipedia_page: "https://en.wikipedia.org/wiki/Kurnool_district",
    },
    loksabha_constituency: { name: "Kurnool", href: "https://en.wikipedia.org/wiki/Kurnool_Lok_Sabha_constituency" },
  },
  {
    name: "Pattikonda",
    href: "https://en.wikipedia.org/wiki/Pattikonda_(Assembly_constituency)",
    reservation: "NONE",
    number: "142",
    district: {
      name_id: "in-d-ap-kurnool",
      wikidata_qid: "Q15381",
      wikipedia_page: "https://en.wikipedia.org/wiki/Kurnool_district",
    },
    loksabha_constituency: { name: "Kurnool", href: "https://en.wikipedia.org/wiki/Kurnool_Lok_Sabha_constituency" },
  },
  {
    name: "Allagadda",
    href: "https://en.wikipedia.org/wiki/Allagadda_(Assembly_constituency)",
    reservation: "NONE",
    number: "134",
    district: {
      name_id: "in-d-ap-nandyal",
      wikidata_qid: "Q110714861",
      wikipedia_page: "https://en.wikipedia.org/wiki/Nandyal_district",
    },
    loksabha_constituency: { name: "Nandyal", href: "https://en.wikipedia.org/wiki/Nandyal_(Lok_Sabha_constituency)" },
  },
  {
    name: "Srisailam",
    href: "https://en.wikipedia.org/wiki/Srisailam_(Assembly_constituency)",
    reservation: "NONE",
    number: "135",
    district: {
      name_id: "in-d-ap-nandyal",
      wikidata_qid: "Q110714861",
      wikipedia_page: "https://en.wikipedia.org/wiki/Nandyal_district",
    },
    loksabha_constituency: { name: "Nandyal", href: "https://en.wikipedia.org/wiki/Nandyal_(Lok_Sabha_constituency)" },
  },
  {
    name: "Nandikotkur",
    href: "https://en.wikipedia.org/wiki/Nandikotkur_(Assembly_constituency)",
    reservation: "SC",
    number: "136",
    district: {
      name_id: "in-d-ap-nandyal",
      wikidata_qid: "Q110714861",
      wikipedia_page: "https://en.wikipedia.org/wiki/Nandyal_district",
    },
    loksabha_constituency: { name: "Nandyal", href: "https://en.wikipedia.org/wiki/Nandyal_(Lok_Sabha_constituency)" },
  },
  {
    name: "Nandyal",
    href: "https://en.wikipedia.org/wiki/Nandyal_(Assembly_constituency)",
    reservation: "NONE",
    number: "139",
    district: {
      name_id: "in-d-ap-nandyal",
      wikidata_qid: "Q110714861",
      wikipedia_page: "https://en.wikipedia.org/wiki/Nandyal_district",
    },
    loksabha_constituency: { name: "Nandyal", href: "https://en.wikipedia.org/wiki/Nandyal_(Lok_Sabha_constituency)" },
  },
  {
    name: "Banaganapalle",
    href: "https://en.wikipedia.org/wiki/Banaganapalle_(Assembly_constituency)",
    reservation: "NONE",
    number: "140",
    district: {
      name_id: "in-d-ap-nandyal",
      wikidata_qid: "Q110714861",
      wikipedia_page: "https://en.wikipedia.org/wiki/Nandyal_district",
    },
    loksabha_constituency: { name: "Nandyal", href: "https://en.wikipedia.org/wiki/Nandyal_(Lok_Sabha_constituency)" },
  },
  {
    name: "Dhone",
    href: "https://en.wikipedia.org/wiki/Dhone_(Assembly_constituency)",
    reservation: "NONE",
    number: "141",
    district: {
      name_id: "in-d-ap-nandyal",
      wikidata_qid: "Q110714861",
      wikipedia_page: "https://en.wikipedia.org/wiki/Nandyal_district",
    },
    loksabha_constituency: { name: "Nandyal", href: "https://en.wikipedia.org/wiki/Nandyal_(Lok_Sabha_constituency)" },
  },
  {
    name: "Panyam",
    href: "https://en.wikipedia.org/wiki/Panyam_(Assembly_constituency)",
    reservation: "NONE",
    number: "138",
    district: {
      name_id: "in-d-ap-nandyal",
      wikidata_qid: "Q110714861",
      wikipedia_page: "https://en.wikipedia.org/wiki/Nandyal_district",
    },
    loksabha_constituency: { name: "Nandyal", href: "https://en.wikipedia.org/wiki/Nandyal_(Lok_Sabha_constituency)" },
  },
  {
    name: "Badvel",
    href: "https://en.wikipedia.org/wiki/Badvel_Assembly_constituency",
    reservation: "SC",
    number: "124",
    district: {
      name_id: "in-d-ap-y.s.r.",
      wikidata_qid: "Q15342",
      wikipedia_page: "https://en.wikipedia.org/wiki/Kadapa_district",
    },
    loksabha_constituency: { name: "Kadapa", href: "https://en.wikipedia.org/wiki/Kadapa_(Lok_Sabha_constituency)" },
  },
  {
    name: "Jammalamadugu",
    href: "https://en.wikipedia.org/wiki/Jammalamadugu_Assembly_constituency",
    reservation: "NONE",
    number: "131",
    district: {
      name_id: "in-d-ap-y.s.r.",
      wikidata_qid: "Q15342",
      wikipedia_page: "https://en.wikipedia.org/wiki/Kadapa_district",
    },
    loksabha_constituency: { name: "Kadapa", href: "https://en.wikipedia.org/wiki/Kadapa_(Lok_Sabha_constituency)" },
  },
  {
    name: "Kadapa",
    href: "https://en.wikipedia.org/wiki/Kadapa_Assembly_constituency",
    reservation: "NONE",
    number: "126",
    district: {
      name_id: "in-d-ap-y.s.r.",
      wikidata_qid: "Q15342",
      wikipedia_page: "https://en.wikipedia.org/wiki/Kadapa_district",
    },
    loksabha_constituency: { name: "Kadapa", href: "https://en.wikipedia.org/wiki/Kadapa_(Lok_Sabha_constituency)" },
  },
  {
    name: "Kamalapuram",
    href: "https://en.wikipedia.org/wiki/Kamalapuram_Assembly_constituency",
    reservation: "NONE",
    number: "130",
    district: {
      name_id: "in-d-ap-y.s.r.",
      wikidata_qid: "Q15342",
      wikipedia_page: "https://en.wikipedia.org/wiki/Kadapa_district",
    },
    loksabha_constituency: { name: "Kadapa", href: "https://en.wikipedia.org/wiki/Kadapa_(Lok_Sabha_constituency)" },
  },
  {
    name: "Mydukur",
    href: "https://en.wikipedia.org/wiki/Mydukur_Assembly_constituency",
    reservation: "NONE",
    number: "133",
    district: {
      name_id: "in-d-ap-y.s.r.",
      wikidata_qid: "Q15342",
      wikipedia_page: "https://en.wikipedia.org/wiki/Kadapa_district",
    },
    loksabha_constituency: { name: "Kadapa", href: "https://en.wikipedia.org/wiki/Kadapa_(Lok_Sabha_constituency)" },
  },
  {
    name: "Proddatur",
    href: "https://en.wikipedia.org/wiki/Proddatur_Assembly_constituency",
    reservation: "NONE",
    number: "132",
    district: {
      name_id: "in-d-ap-y.s.r.",
      wikidata_qid: "Q15342",
      wikipedia_page: "https://en.wikipedia.org/wiki/Kadapa_district",
    },
    loksabha_constituency: { name: "Kadapa", href: "https://en.wikipedia.org/wiki/Kadapa_(Lok_Sabha_constituency)" },
  },
  {
    name: "Pulivendula",
    href: "https://en.wikipedia.org/wiki/Pulivendla_Assembly_constituency",
    reservation: "NONE",
    number: "129",
    district: {
      name_id: "in-d-ap-y.s.r.",
      wikidata_qid: "Q15342",
      wikipedia_page: "https://en.wikipedia.org/wiki/Kadapa_district",
    },
    loksabha_constituency: { name: "Kadapa", href: "https://en.wikipedia.org/wiki/Kadapa_(Lok_Sabha_constituency)" },
  },
  {
    name: "Rajampet",
    href: "https://en.wikipedia.org/wiki/Rajampet_Assembly_constituency",
    reservation: "NONE",
    number: "125",
    district: {
      name_id: "in-d-ap-y.s.r.",
      wikidata_qid: "Q15342",
      wikipedia_page: "https://en.wikipedia.org/wiki/Kadapa_district",
    },
    loksabha_constituency: { name: "Rajampet", href: "https://en.wikipedia.org/wiki/Rajampet_Lok_Sabha_constituency" },
  },
  {
    name: "Rayadurgam",
    href: "https://en.wikipedia.org/wiki/Rayadurg_Assembly_constituency",
    reservation: "NONE",
    number: "148",
    district: {
      name_id: "in-d-ap-anantpur",
      wikidata_qid: "Q15212",
      wikipedia_page: "https://en.wikipedia.org/wiki/Anantapur_district",
    },
    loksabha_constituency: {
      name: "Anantapuram",
      href: "https://en.wikipedia.org/wiki/Anantapur_Lok_Sabha_constituency",
    },
  },
  {
    name: "Uravakonda",
    href: "https://en.wikipedia.org/wiki/Uravakonda_Assembly_constituency",
    reservation: "NONE",
    number: "149",
    district: {
      name_id: "in-d-ap-anantpur",
      wikidata_qid: "Q15212",
      wikipedia_page: "https://en.wikipedia.org/wiki/Anantapur_district",
    },
    loksabha_constituency: {
      name: "Anantapuram",
      href: "https://en.wikipedia.org/wiki/Anantapur_Lok_Sabha_constituency",
    },
  },
  {
    name: "Guntakallu",
    href: "https://en.wikipedia.org/wiki/Guntakal_Assembly_constituency",
    reservation: "NONE",
    number: "150",
    district: {
      name_id: "in-d-ap-anantpur",
      wikidata_qid: "Q15212",
      wikipedia_page: "https://en.wikipedia.org/wiki/Anantapur_district",
    },
    loksabha_constituency: {
      name: "Anantapuram",
      href: "https://en.wikipedia.org/wiki/Anantapur_Lok_Sabha_constituency",
    },
  },
  {
    name: "Tadpatri",
    href: "https://en.wikipedia.org/wiki/Tadpatri_Assembly_constituency",
    reservation: "NONE",
    number: "151",
    district: {
      name_id: "in-d-ap-anantpur",
      wikidata_qid: "Q15212",
      wikipedia_page: "https://en.wikipedia.org/wiki/Anantapur_district",
    },
    loksabha_constituency: {
      name: "Anantapuram",
      href: "https://en.wikipedia.org/wiki/Anantapur_Lok_Sabha_constituency",
    },
  },
  {
    name: "Singanamala",
    href: "https://en.wikipedia.org/wiki/Singanamala_Assembly_constituency",
    reservation: "SC",
    number: "152",
    district: {
      name_id: "in-d-ap-anantpur",
      wikidata_qid: "Q15212",
      wikipedia_page: "https://en.wikipedia.org/wiki/Anantapur_district",
    },
    loksabha_constituency: {
      name: "Anantapuram",
      href: "https://en.wikipedia.org/wiki/Anantapur_Lok_Sabha_constituency",
    },
  },
  {
    name: "Anantapuram Urban",
    href: "https://en.wikipedia.org/wiki/Anantapur_Urban_Assembly_constituency",
    reservation: "NONE",
    number: "153",
    district: {
      name_id: "in-d-ap-anantpur",
      wikidata_qid: "Q15212",
      wikipedia_page: "https://en.wikipedia.org/wiki/Anantapur_district",
    },
    loksabha_constituency: {
      name: "Anantapuram",
      href: "https://en.wikipedia.org/wiki/Anantapur_Lok_Sabha_constituency",
    },
  },
  {
    name: "Kalyandurgam",
    href: "https://en.wikipedia.org/wiki/Kalyandurg_Assembly_constituency",
    reservation: "NONE",
    number: "154",
    district: {
      name_id: "in-d-ap-anantpur",
      wikidata_qid: "Q15212",
      wikipedia_page: "https://en.wikipedia.org/wiki/Anantapur_district",
    },
    loksabha_constituency: {
      name: "Anantapuram",
      href: "https://en.wikipedia.org/wiki/Anantapur_Lok_Sabha_constituency",
    },
  },
  {
    name: "Raptadu",
    href: "https://en.wikipedia.org/wiki/Raptadu_Assembly_constituency",
    reservation: "NONE",
    number: "155",
    district: {
      name_id: "in-d-ap-anantpur",
      wikidata_qid: "Q15212",
      wikipedia_page: "https://en.wikipedia.org/wiki/Anantapur_district",
    },
    loksabha_constituency: {
      name: "Hindupuram",
      href: "https://en.wikipedia.org/wiki/Hindupur_Lok_Sabha_constituency",
    },
  },
  {
    name: "Madakasira",
    href: "https://en.wikipedia.org/wiki/Madakasira_(Assembly_constituency)",
    reservation: "SC",
    number: "156",
    district: {
      name_id: "in-d-ap-sri-sathya-sai",
      wikidata_qid: "Q110714863",
      wikipedia_page: "https://en.wikipedia.org/wiki/Sri_Sathya_Sai_district",
    },
    loksabha_constituency: {
      name: "Hindupuram",
      href: "https://en.wikipedia.org/wiki/Hindupur_Lok_Sabha_constituency",
    },
  },
  {
    name: "Hindupuram",
    href: "https://en.wikipedia.org/wiki/Hindupur_(Assembly_constituency)",
    reservation: "NONE",
    number: "157",
    district: {
      name_id: "in-d-ap-sri-sathya-sai",
      wikidata_qid: "Q110714863",
      wikipedia_page: "https://en.wikipedia.org/wiki/Sri_Sathya_Sai_district",
    },
    loksabha_constituency: {
      name: "Hindupuram",
      href: "https://en.wikipedia.org/wiki/Hindupur_Lok_Sabha_constituency",
    },
  },
  {
    name: "Penukonda",
    href: "https://en.wikipedia.org/wiki/Penukonda_(Assembly_constituency)",
    reservation: "NONE",
    number: "158",
    district: {
      name_id: "in-d-ap-sri-sathya-sai",
      wikidata_qid: "Q110714863",
      wikipedia_page: "https://en.wikipedia.org/wiki/Sri_Sathya_Sai_district",
    },
    loksabha_constituency: {
      name: "Hindupuram",
      href: "https://en.wikipedia.org/wiki/Hindupur_Lok_Sabha_constituency",
    },
  },
  {
    name: "Puttaparthi",
    href: "https://en.wikipedia.org/wiki/Puttaparthi_(Assembly_constituency)",
    reservation: "NONE",
    number: "159",
    district: {
      name_id: "in-d-ap-sri-sathya-sai",
      wikidata_qid: "Q110714863",
      wikipedia_page: "https://en.wikipedia.org/wiki/Sri_Sathya_Sai_district",
    },
    loksabha_constituency: {
      name: "Hindupuram",
      href: "https://en.wikipedia.org/wiki/Hindupur_Lok_Sabha_constituency",
    },
  },
  {
    name: "Dharmavaram",
    href: "https://en.wikipedia.org/wiki/Dharmavaram_(Assembly_constituency)",
    reservation: "NONE",
    number: "160",
    district: {
      name_id: "in-d-ap-sri-sathya-sai",
      wikidata_qid: "Q110714863",
      wikipedia_page: "https://en.wikipedia.org/wiki/Sri_Sathya_Sai_district",
    },
    loksabha_constituency: {
      name: "Hindupuram",
      href: "https://en.wikipedia.org/wiki/Hindupur_Lok_Sabha_constituency",
    },
  },
  {
    name: "Kadiri",
    href: "https://en.wikipedia.org/wiki/Kadiri_Assembly_constituency",
    reservation: "NONE",
    number: "161",
    district: {
      name_id: "in-d-ap-sri-sathya-sai",
      wikidata_qid: "Q110714863",
      wikipedia_page: "https://en.wikipedia.org/wiki/Sri_Sathya_Sai_district",
    },
    loksabha_constituency: {
      name: "Hindupuram",
      href: "https://en.wikipedia.org/wiki/Hindupur_Lok_Sabha_constituency",
    },
  },
  {
    name: "Rajampet",
    href: "https://en.wikipedia.org/wiki/Rajampet_(Assembly_constituency)",
    reservation: "NONE",
    number: "125",
    district: {
      name_id: "in-d-ap-annamayya",
      wikidata_qid: "Q110714854",
      wikipedia_page: "https://en.wikipedia.org/wiki/Annamayya_district",
    },
    loksabha_constituency: {
      name: "Rajampet",
      href: "https://en.wikipedia.org/wiki/Rajampet_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Kodur",
    href: "https://en.wikipedia.org/wiki/Kodur_(Assembly_constituency)",
    reservation: "SC",
    number: "127",
    district: {
      name_id: "in-d-ap-annamayya",
      wikidata_qid: "Q110714854",
      wikipedia_page: "https://en.wikipedia.org/wiki/Annamayya_district",
    },
    loksabha_constituency: {
      name: "Rajampet",
      href: "https://en.wikipedia.org/wiki/Rajampet_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Rayachoti",
    href: "https://en.wikipedia.org/wiki/Rayachoti_(Assembly_constituency)",
    reservation: "NONE",
    number: "128",
    district: {
      name_id: "in-d-ap-annamayya",
      wikidata_qid: "Q110714854",
      wikipedia_page: "https://en.wikipedia.org/wiki/Annamayya_district",
    },
    loksabha_constituency: {
      name: "Rajampet",
      href: "https://en.wikipedia.org/wiki/Rajampet_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Thamballapalle",
    href: "https://en.wikipedia.org/wiki/Thamballapalle_(Assembly_constituency)",
    reservation: "NONE",
    number: "162",
    district: {
      name_id: "in-d-ap-annamayya",
      wikidata_qid: "Q110714854",
      wikipedia_page: "https://en.wikipedia.org/wiki/Annamayya_district",
    },
    loksabha_constituency: {
      name: "Rajampet",
      href: "https://en.wikipedia.org/wiki/Rajampet_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Pileru",
    href: "https://en.wikipedia.org/wiki/Pileru_(Assembly_constituency)",
    reservation: "NONE",
    number: "163",
    district: {
      name_id: "in-d-ap-annamayya",
      wikidata_qid: "Q110714854",
      wikipedia_page: "https://en.wikipedia.org/wiki/Annamayya_district",
    },
    loksabha_constituency: {
      name: "Rajampet",
      href: "https://en.wikipedia.org/wiki/Rajampet_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Madanapalle",
    href: "https://en.wikipedia.org/wiki/Madanapalle_(Assembly_constituency)",
    reservation: "NONE",
    number: "164",
    district: {
      name_id: "in-d-ap-annamayya",
      wikidata_qid: "Q110714854",
      wikipedia_page: "https://en.wikipedia.org/wiki/Annamayya_district",
    },
    loksabha_constituency: {
      name: "Rajampet",
      href: "https://en.wikipedia.org/wiki/Rajampet_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Chandragiri",
    href: "https://en.wikipedia.org/wiki/Chandragiri_(Assembly_constituency)",
    reservation: "NONE",
    number: "166",
    district: {
      name_id: "in-d-ap-tirupati",
      wikidata_qid: "Q110714853",
      wikipedia_page: "https://en.wikipedia.org/wiki/Tirupati_district",
    },
    loksabha_constituency: { name: "Chittoor", href: "https://en.wikipedia.org/wiki/Chittoor_Lok_Sabha_constituency" },
  },
  {
    name: "Tirupati",
    href: "https://en.wikipedia.org/wiki/Tirupati_(Assembly_constituency)",
    reservation: "NONE",
    number: "167",
    district: {
      name_id: "in-d-ap-tirupati",
      wikidata_qid: "Q110714853",
      wikipedia_page: "https://en.wikipedia.org/wiki/Tirupati_district",
    },
    loksabha_constituency: {
      name: "Tirupati",
      href: "https://en.wikipedia.org/wiki/Tirupati_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Sullurpeta",
    href: "https://en.wikipedia.org/wiki/Sullurpeta_(SC)(Assembly_constituency)",
    reservation: "SC",
    number: "121",
    district: {
      name_id: "in-d-ap-tirupati",
      wikidata_qid: "Q110714853",
      wikipedia_page: "https://en.wikipedia.org/wiki/Tirupati_district",
    },
    loksabha_constituency: {
      name: "Tirupati",
      href: "https://en.wikipedia.org/wiki/Tirupati_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Venkatagiri",
    href: "https://en.wikipedia.org/wiki/Venkatagiri_(Assembly_constituency)",
    reservation: "NONE",
    number: "122",
    district: {
      name_id: "in-d-ap-tirupati",
      wikidata_qid: "Q110714853",
      wikipedia_page: "https://en.wikipedia.org/wiki/Tirupati_district",
    },
    loksabha_constituency: {
      name: "Tirupati",
      href: "https://en.wikipedia.org/wiki/Tirupati_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Guduru",
    href: "https://en.wikipedia.org/wiki/Gudur_(SC)_(Assembly_constituency)",
    reservation: "SC",
    number: "120",
    district: {
      name_id: "in-d-ap-tirupati",
      wikidata_qid: "Q110714853",
      wikipedia_page: "https://en.wikipedia.org/wiki/Tirupati_district",
    },
    loksabha_constituency: {
      name: "Tirupati",
      href: "https://en.wikipedia.org/wiki/Tirupati_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Srikalahasti",
    href: "https://en.wikipedia.org/wiki/Srikalahasti_(Assembly_constituency)",
    reservation: "NONE",
    number: "168",
    district: {
      name_id: "in-d-ap-tirupati",
      wikidata_qid: "Q110714853",
      wikipedia_page: "https://en.wikipedia.org/wiki/Tirupati_district",
    },
    loksabha_constituency: {
      name: "Tirupati",
      href: "https://en.wikipedia.org/wiki/Tirupati_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Satyavedu",
    href: "https://en.wikipedia.org/wiki/Satyavedu_(SC)(Assembly_constituency)",
    reservation: "SC",
    number: "169",
    district: {
      name_id: "in-d-ap-tirupati",
      wikidata_qid: "Q110714853",
      wikipedia_page: "https://en.wikipedia.org/wiki/Tirupati_district",
    },
    loksabha_constituency: {
      name: "Tirupati",
      href: "https://en.wikipedia.org/wiki/Tirupati_(Lok_Sabha_constituency)",
    },
  },
  {
    name: "Nagari",
    href: "https://en.wikipedia.org/wiki/Nagari_(Assembly_constituency)",
    reservation: "NONE",
    number: "170",
    district: {
      name_id: "in-d-ap-chittoor",
      wikidata_qid: "Q15213",
      wikipedia_page: "https://en.wikipedia.org/wiki/Chittoor_district",
    },
    loksabha_constituency: { name: "Chittoor", href: "https://en.wikipedia.org/wiki/Chittoor_Lok_Sabha_constituency" },
  },
  {
    name: "Gangadhara Nellore",
    href: "https://en.wikipedia.org/wiki/Gangadhara_Nellore_(Assembly_constituency)",
    reservation: "SC",
    number: "171",
    district: {
      name_id: "in-d-ap-chittoor",
      wikidata_qid: "Q15213",
      wikipedia_page: "https://en.wikipedia.org/wiki/Chittoor_district",
    },
    loksabha_constituency: { name: "Chittoor", href: "https://en.wikipedia.org/wiki/Chittoor_Lok_Sabha_constituency" },
  },
  {
    name: "Chittoor",
    href: "https://en.wikipedia.org/wiki/Chittoor_(Assembly_constituency)",
    reservation: "NONE",
    number: "172",
    district: {
      name_id: "in-d-ap-chittoor",
      wikidata_qid: "Q15213",
      wikipedia_page: "https://en.wikipedia.org/wiki/Chittoor_district",
    },
    loksabha_constituency: { name: "Chittoor", href: "https://en.wikipedia.org/wiki/Chittoor_Lok_Sabha_constituency" },
  },
  {
    name: "Puthalapattu",
    href: "https://en.wikipedia.org/wiki/Puthalapattu_(Assembly_constituency)",
    reservation: "SC",
    number: "173",
    district: {
      name_id: "in-d-ap-chittoor",
      wikidata_qid: "Q15213",
      wikipedia_page: "https://en.wikipedia.org/wiki/Chittoor_district",
    },
    loksabha_constituency: { name: "Chittoor", href: "https://en.wikipedia.org/wiki/Chittoor_Lok_Sabha_constituency" },
  },
  {
    name: "Palamaner",
    href: "https://en.wikipedia.org/wiki/Palamaner_(Assembly_constituency)",
    reservation: "NONE",
    number: "174",
    district: {
      name_id: "in-d-ap-chittoor",
      wikidata_qid: "Q15213",
      wikipedia_page: "https://en.wikipedia.org/wiki/Chittoor_district",
    },
    loksabha_constituency: { name: "Chittoor", href: "https://en.wikipedia.org/wiki/Chittoor_Lok_Sabha_constituency" },
  },
  {
    name: "Kuppam",
    href: "https://en.wikipedia.org/wiki/Kuppam_(Assembly_constituency)",
    reservation: "NONE",
    number: "175",
    district: {
      name_id: "in-d-ap-chittoor",
      wikidata_qid: "Q15213",
      wikipedia_page: "https://en.wikipedia.org/wiki/Chittoor_district",
    },
    loksabha_constituency: { name: "Chittoor", href: "https://en.wikipedia.org/wiki/Chittoor_Lok_Sabha_constituency" },
  },
  {
    name: "Punganur",
    href: "https://en.wikipedia.org/wiki/Punganur_(Assembly_constituency)",
    reservation: "NONE",
    number: "165",
    district: {
      name_id: "in-d-ap-chittoor",
      wikidata_qid: "Q15213",
      wikipedia_page: "https://en.wikipedia.org/wiki/Chittoor_district",
    },
    loksabha_constituency: { name: "Rajampet", href: "https://en.wikipedia.org/wiki/Rajampet_Lok_Sabha_constituency" },
  },
];

// get list of all vcs
// fetch data for all vcs
// match names and/or add names
// save all vcs

// let vcData2GroupBy = groupBy(vcDataV2, "constituency_number");

// // console.log(Object.keys(vcData2GroupBy).length);
// forEach(vcData2GroupBy, (val: any, key: any) => {
//   if (val.length > 1) {
//     console.log(JSON.stringify(val, null, 2));
//   }
// });

// (async () => {
//   // let mapPropsArray = json_All_AC.features.map((val: any) => val.properties);
//   // let mapProps: any = keyBy(json_All_AC.features, "properties.AC_NO");
//   // console.log(
//   //   Object.keys(mapProps).length,
//   //   mapPropsArray.length,
//   //   vidhansabhaConstituencies.length,
//   //   Object.keys(keyedVCs).length
//   // );
//   // let multiNames: any = {};
//   // for (let i = 1; i <= 175; i++) {
//   //   // if (!keyedVCs[`${i}`]) console.log(i);
//   //   if (keyedVCs[`${i}`].name !== mapProps[i].AC_NAME) {
//   //     multiNames[i] = { availableName: keyedVCs[`${i}`].name, newName: mapProps[i].AC_NAME };
//   //   }
//   //   // if (!keyedVCs[`${i}`].reservation) console.log(keyedVCs[`${i}`]);
//   // }
//   // console.log(JSON.stringify(multiNames));
//   // console.log(mapPropsArray.filter((val: any) => !mapProps[val.AC_NO]));
//   // console.log(vcDataV2.length);
//   // for (let vc in vcdata2) {
//   //   // if (!mapProps[vcDataV2[vc].constituency_number]) console.log(mapProps[vcDataV2[vc].constituency_number]);
//   //   vcdata2[vc].geo = mapProps[vcdata2[vc].constituency_number];
//   //   // console.log(mapProps[vcDataV2[vc].constituency_number].properties.AC_NAME);
//   // }
//   // // console.log(JSON.stringify(vcdata2));
//   // const outputFilePath = path.join(__dirname, "lc-data-geo.json");
//   // fs.writeFileSync(outputFilePath, JSON.stringify(vcdata2, null, 2));
//   // const graphQLClient = await createGraphQLClient();
//   // for (let g of geoData) {
//   //   let toSaveVC = {
//   //     names: g.names,
//   //     name_id: g.name_id,
//   //     wikidata_qid: g.wikidata_qid,
//   //     wikipedia_page: g.wikipedia_page,
//   //     established_on_string: g.established_on_string,
//   //     districts: g.districts,
//   //     states_union_territories: g.states_union_territories,
//   //     node_created_on: new Date(),
//   //     reservation: g.reservation,
//   //     constituency_number: g.constituency_number,
//   //   };
//   //   for (let n of toSaveVC.names) {
//   //     const nameId = await upsert_Name_(n.name);
//   //   }
//   //   const vcMap = polygonToMultiPolygon(g.geo);
//   //   let geo = {
//   //     category: "Region",
//   //     source_name: "Election Commission Of India",
//   //     source_url: `https://results.eci.gov.in/ResultAcGenNov2024/ac/${g.geo.properties.ST_CODE}.js`,
//   //     source_data: `${g.geo}`,
//   //     area: multiPolygonToDgraphMultiPolygon(vcMap.geometry.coordinates),
//   //   };
//   //   const vcId = await createNodeType("_Indian_Vidhansabha_Constituency_", graphQLClient, toSaveVC);
//   //   const geoId = await createNodeType("_Geo_", graphQLClient, geo);
//   //   let toSaveVCRegion = {
//   //     self: { name_id: toSaveVC.name_id },
//   //     geo_boundary: {
//   //       id: geoId,
//   //     },
//   //     node_created_on: new Date(),
//   //   };
//   //   const vcRegionId = await createNodeType("_Indian_Vidhansabha_Constituency_Region_", graphQLClient, toSaveVCRegion);
//   //   console.log({ name_id: toSaveVC.name_id, vcId, vcRegionId, geoId });
//   // }
// })();
