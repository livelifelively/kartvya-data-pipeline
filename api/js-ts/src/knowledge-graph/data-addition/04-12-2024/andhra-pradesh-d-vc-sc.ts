import { districtVCs } from "../../../admin-regions/districts/andhra-pradesh/ap.districts-vcs";
import { map } from "lodash";

let allDistricts: any = {
  "https://en.wikipedia.org/wiki/Srikakulam_district": {
    wikipedia_page: "https://en.wikipedia.org/wiki/Srikakulam_district",
    wikidata_qid: "Q15395",
    vidhansabha_constituencies: [
      {
        name: "Ichchapuram",
        href: "https://en.wikipedia.org/wiki/Ichchapuram_(Assembly_constituency)",
        reservation: "None",
        number: "1",
        loksabha_constituency: {
          name: "Srikakulam",
          href: "https://en.wikipedia.org/wiki/Srikakulam_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Palasa",
        href: "https://en.wikipedia.org/wiki/Palasa_(Assembly_constituency)",
        reservation: "None",
        number: "2",
        loksabha_constituency: {
          name: "Srikakulam",
          href: "https://en.wikipedia.org/wiki/Srikakulam_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Tekkali",
        href: "https://en.wikipedia.org/wiki/Tekkali_(Assembly_constituency)",
        reservation: "None",
        number: "3",
        loksabha_constituency: {
          name: "Srikakulam",
          href: "https://en.wikipedia.org/wiki/Srikakulam_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Pathapatnam",
        href: "https://en.wikipedia.org/wiki/Pathapatnam_(Assembly_constituency)",
        reservation: "None",
        number: "4",
        loksabha_constituency: {
          name: "Srikakulam",
          href: "https://en.wikipedia.org/wiki/Srikakulam_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Srikakulam",
        href: "https://en.wikipedia.org/wiki/Srikakulam_(Assembly_constituency)",
        reservation: "None",
        number: "5",
        loksabha_constituency: {
          name: "Srikakulam",
          href: "https://en.wikipedia.org/wiki/Srikakulam_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Amadalavalasa",
        href: "https://en.wikipedia.org/wiki/Amadalavalasa_(Assembly_constituency)",
        reservation: "None",
        number: "6",
        loksabha_constituency: {
          name: "Srikakulam",
          href: "https://en.wikipedia.org/wiki/Srikakulam_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Narasannapeta",
        href: "https://en.wikipedia.org/wiki/Narasannapeta_(Assembly_constituency)",
        reservation: "None",
        number: "7",
        loksabha_constituency: {
          name: "Srikakulam",
          href: "https://en.wikipedia.org/wiki/Srikakulam_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Etcherla",
        href: "https://en.wikipedia.org/wiki/Etcherla_Assembly_constituency",
        reservation: "None",
        number: "8",
        loksabha_constituency: {
          name: "Vizianagaram",
          href: "https://en.wikipedia.org/wiki/Vizianagaram_(Lok_Sabha_constituency)",
        },
      },
    ],
  },

  "https://en.wikipedia.org/wiki/Parvathipuram_Manyam_district": {
    wikipedia_page: "https://en.wikipedia.org/wiki/Parvathipuram_Manyam_district",
    wikidata_qid: "Q110714856",
    vidhansabha_constituencies: [
      {
        name: "Parvathipuram",
        href: "https://en.wikipedia.org/wiki/Parvathipuram_Assembly_constituency",
        reservation: "SC",
        number: "10",
        loksabha_constituency: {
          name: "Araku",
          href: "https://en.wikipedia.org/wiki/Araku_Lok_Sabha_constituency",
        },
      },
      {
        name: "Palakonda",
        href: "https://en.wikipedia.org/wiki/Palakonda_Assembly_constituency",
        reservation: "ST",
        number: "11",
        loksabha_constituency: {
          name: "Araku",
          href: "https://en.wikipedia.org/wiki/Araku_Lok_Sabha_constituency",
        },
      },
      {
        name: "Kurupam",
        href: "https://en.wikipedia.org/wiki/Kurupam_Assembly_constituency",
        reservation: "ST",
        number: "12",
        loksabha_constituency: {
          name: "Araku",
          href: "https://en.wikipedia.org/wiki/Araku_Lok_Sabha_constituency",
        },
      },
      {
        name: "Salur",
        href: "https://en.wikipedia.org/wiki/Salur_Assembly_constituency",
        reservation: "ST",
        number: "13",
        loksabha_constituency: {
          name: "Araku",
          href: "https://en.wikipedia.org/wiki/Araku_Lok_Sabha_constituency",
        },
      },
    ],
  },

  "https://en.wikipedia.org/wiki/Vizianagaram_district": {
    wikipedia_page: "https://en.wikipedia.org/wiki/Vizianagaram_district",
    wikidata_qid: "Q15392",
    vidhansabha_constituencies: [
      {
        name: "Rajam",
        href: "https://en.wikipedia.org/wiki/Rajam_(Assembly_Constituency)",
        reservation: "SC",
        number: "9",
        loksabha_constituency: {
          name: "Vizianagaram",
          href: "https://en.wikipedia.org/wiki/Vizianagaram_Lok_Sabha_constituency",
        },
      },
      {
        name: "Bobbili",
        href: "https://en.wikipedia.org/wiki/Bobbili_(Assembly_constituency)",
        reservation: "None",
        number: "14",
        loksabha_constituency: {
          name: "Vizianagaram",
          href: "https://en.wikipedia.org/wiki/Vizianagaram_Lok_Sabha_constituency",
        },
      },
      {
        name: "Cheepurupalli",
        href: "https://en.wikipedia.org/wiki/Cheepurupalli_Assembly_constituency",
        reservation: "None",
        number: "15",
        loksabha_constituency: {
          name: "Vizianagaram",
          href: "https://en.wikipedia.org/wiki/Vizianagaram_Lok_Sabha_constituency",
        },
      },
      {
        name: "Gajapathinagaram",
        href: "https://en.wikipedia.org/wiki/Gajapathinagaram_(Assembly_constituency)",
        reservation: "None",
        number: "16",
        loksabha_constituency: {
          name: "Vizianagaram",
          href: "https://en.wikipedia.org/wiki/Vizianagaram_Lok_Sabha_constituency",
        },
      },
      {
        name: "Nellimarla",
        href: "https://en.wikipedia.org/wiki/Nellimarla_(Assembly_constituency)",
        reservation: "None",
        number: "17",
        loksabha_constituency: {
          name: "Vizianagaram",
          href: "https://en.wikipedia.org/wiki/Vizianagaram_Lok_Sabha_constituency",
        },
      },
      {
        name: "Vizianagaram",
        href: "https://en.wikipedia.org/wiki/Vizianagaram_(Assembly_constituency)",
        reservation: "None",
        number: "18",
        loksabha_constituency: {
          name: "Vizianagaram",
          href: "https://en.wikipedia.org/wiki/Vizianagaram_Lok_Sabha_constituency",
        },
      },
      {
        name: "Srungavarapukota",
        href: "https://en.wikipedia.org/wiki/Srungavarapukota_(Assembly_constituency)",
        reservation: "None",
        number: "19",
        loksabha_constituency: {
          name: "Visakhapatnam",
          href: "https://en.wikipedia.org/wiki/Visakhapatnam_Lok_Sabha_constituency",
        },
      },
    ],
  },

  "https://en.wikipedia.org/wiki/Visakhapatnam_district": {
    wikipedia_page: "https://en.wikipedia.org/wiki/Visakhapatnam_district",
    wikidata_qid: "Q15394",
    vidhansabha_constituencies: [
      {
        name: "Bheemili",
        href: "https://en.wikipedia.org/wiki/Bhimli_(Assembly_constituency)",
        number: "20",
        loksabha_constituency: {
          name: "Visakhapatnam",
          href: "https://en.wikipedia.org/wiki/Visakhapatnam_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Visakhapatnam East",
        href: "https://en.wikipedia.org/wiki/Visakhapatnam_East_(Assembly_constituency)",
        number: "21",
        loksabha_constituency: {
          name: "Visakhapatnam",
          href: "https://en.wikipedia.org/wiki/Visakhapatnam_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Visakhapatnam West",
        href: "https://en.wikipedia.org/wiki/Visakhapatnam_West_(Assembly_constituency)",
        number: "22",
        loksabha_constituency: {
          name: "Visakhapatnam",
          href: "https://en.wikipedia.org/wiki/Visakhapatnam_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Visakhapatnam North",
        href: "https://en.wikipedia.org/wiki/Visakhapatnam_North_(Assembly_constituency)",
        number: "23",
        loksabha_constituency: {
          name: "Visakhapatnam",
          href: "https://en.wikipedia.org/wiki/Visakhapatnam_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Visakhapatnam South",
        href: "https://en.wikipedia.org/wiki/Visakhapatnam_South_(Assembly_constituency)",
        number: "24",
        loksabha_constituency: {
          name: "Visakhapatnam",
          href: "https://en.wikipedia.org/wiki/Visakhapatnam_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Gajuwaka",
        href: "https://en.wikipedia.org/wiki/Gajuwaka_(Assembly_constituency)",
        number: "25",
        loksabha_constituency: {
          name: "Visakhapatnam",
          href: "https://en.wikipedia.org/wiki/Visakhapatnam_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Pendurthi (partially)",
        href: "https://en.wikipedia.org/wiki/Pendurthi_(Assembly_constituency)",
        number: "31",
        loksabha_constituency: {
          name: "Anakapalli",
          href: "https://en.wikipedia.org/wiki/Anakapalli_(Lok_Sabha_constituency)",
        },
      },
    ],
  },

  "https://en.wikipedia.org/wiki/Anakapalli_district": {
    wikipedia_page: "https://en.wikipedia.org/wiki/Anakapalli_district",
    wikidata_qid: "Q110714857",
    vidhansabha_constituencies: [
      {
        name: "Chodavaram",
        href: "https://en.wikipedia.org/wiki/Chodavaram_(Assembly_constituency)",
        reservation: "None",
        number: "26",
        loksabha_constituency: {
          name: "Anakapalli",
          href: "https://en.wikipedia.org/wiki/Anakapalli_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Madugula",
        href: "https://en.wikipedia.org/wiki/Madugula_(Assembly_constituency)",
        reservation: "None",
        number: "27",
        loksabha_constituency: {
          name: "Anakapalli",
          href: "https://en.wikipedia.org/wiki/Anakapalli_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Anakapalli",
        href: "https://en.wikipedia.org/wiki/Anakapalli_(Assembly_constituency)",
        reservation: "None",
        number: "30",
        loksabha_constituency: {
          name: "Anakapalli",
          href: "https://en.wikipedia.org/wiki/Anakapalli_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Pendurthi (partially)",
        href: "https://en.wikipedia.org/wiki/Pendurthi_(Assembly_constituency)",
        reservation: "None",
        number: "31",
        loksabha_constituency: {
          name: "Anakapalli",
          href: "https://en.wikipedia.org/wiki/Anakapalli_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Elamanchili",
        href: "https://en.wikipedia.org/wiki/Elamanchili_(Assembly_constituency)",
        reservation: "None",
        number: "32",
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
        loksabha_constituency: {
          name: "Anakapalli",
          href: "https://en.wikipedia.org/wiki/Anakapalli_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Narsipatnam",
        href: "https://en.wikipedia.org/wiki/Narsipatnam_(Assembly_constituency)",
        reservation: "None",
        number: "34",
        loksabha_constituency: {
          name: "Anakapalli",
          href: "https://en.wikipedia.org/wiki/Anakapalli_(Lok_Sabha_constituency)",
        },
      },
    ],
  },

  "https://en.wikipedia.org/wiki/Alluri_Sitharama_Raju_district": {
    wikipedia_page: "https://en.wikipedia.org/wiki/Alluri_Sitharama_Raju_district",
    wikidata_qid: "Q110714850",
    vidhansabha_constituencies: [
      {
        name: "Araku Valley",
        href: "https://en.wikipedia.org/w/index.php?title=Araku_Valley_(ST)(Assembly_constituency)&action=edit&redlink=1",
        reservation: "ST",
        number: "28",
        loksabha_constituency: {
          name: "Araku",
          href: "https://en.wikipedia.org/wiki/Araku_Lok_Sabha_constituency",
        },
      },
      {
        name: "Paderu",
        href: "https://en.wikipedia.org/wiki/Paderu_(ST)(Assembly_constituency)",
        reservation: "ST",
        number: "29",
        loksabha_constituency: {
          name: "Araku",
          href: "https://en.wikipedia.org/wiki/Araku_Lok_Sabha_constituency",
        },
      },
      {
        name: "Rampachodavaram",
        href: "https://en.wikipedia.org/wiki/Rampachodavaram_(ST)(Assembly_constituency)",
        reservation: "ST",
        number: "53",
        loksabha_constituency: {
          name: "Araku",
          href: "https://en.wikipedia.org/wiki/Araku_Lok_Sabha_constituency",
        },
      },
    ],
  },

  "https://en.wikipedia.org/wiki/Kakinada_district": {
    wikipedia_page: "https://en.wikipedia.org/wiki/Kakinada_district",
    wikidata_qid: "Q110714860",
    vidhansabha_constituencies: [
      {
        name: "Tuni",
        href: "https://en.wikipedia.org/wiki/Tuni_Assembly_constituency",
        reservation: "None",
        number: "35",
        loksabha_constituency: {
          name: "Kakinada",
          href: "https://en.wikipedia.org/wiki/Kakinada_Lok_Sabha_constituency",
        },
      },
      {
        name: "Prathipadu",
        href: "https://en.wikipedia.org/wiki/Prathipadu,_Kakinada_Assembly_constituency",
        reservation: "None",
        number: "36",
        loksabha_constituency: {
          name: "Kakinada",
          href: "https://en.wikipedia.org/wiki/Kakinada_Lok_Sabha_constituency",
        },
      },
      {
        name: "Pithapuram",
        href: "https://en.wikipedia.org/wiki/Pithapuram_Assembly_constituency",
        reservation: "None",
        number: "37",
        loksabha_constituency: {
          name: "Kakinada",
          href: "https://en.wikipedia.org/wiki/Kakinada_Lok_Sabha_constituency",
        },
      },
      {
        name: "Kakinada Rural",
        href: "https://en.wikipedia.org/wiki/Kakinada_Rural_Assembly_constituency",
        reservation: "None",
        number: "38",
        loksabha_constituency: {
          name: "Kakinada",
          href: "https://en.wikipedia.org/wiki/Kakinada_Lok_Sabha_constituency",
        },
      },
      {
        name: "Peddapuram",
        href: "https://en.wikipedia.org/wiki/Peddapuram_Assembly_constituency",
        reservation: "None",
        number: "39",
        loksabha_constituency: {
          name: "Kakinada",
          href: "https://en.wikipedia.org/wiki/Kakinada_Lok_Sabha_constituency",
        },
      },
      {
        name: "Kakinada City",
        href: "https://en.wikipedia.org/wiki/Kakinada_City_Assembly_constituency",
        reservation: "None",
        number: "41",
        loksabha_constituency: {
          name: "Kakinada",
          href: "https://en.wikipedia.org/wiki/Kakinada_Lok_Sabha_constituency",
        },
      },
      {
        name: "Jaggampeta",
        href: "https://en.wikipedia.org/wiki/Jaggampeta_Assembly_constituency",
        reservation: "None",
        number: "42",
        loksabha_constituency: {
          name: "Kakinada",
          href: "https://en.wikipedia.org/wiki/Kakinada_Lok_Sabha_constituency",
        },
      },
    ],
  },

  "https://en.wikipedia.org/wiki/East_Godavari_district": {
    wikipedia_page: "https://en.wikipedia.org/wiki/East_Godavari_district",
    wikidata_qid: "Q15338",
    vidhansabha_constituencies: [
      {
        name: "Anaparthy",
        href: "https://en.wikipedia.org/wiki/Anaparthy_(Assembly_constituency)",
        reservation: "None",
        number: "40",
        loksabha_constituency: {
          name: "Rajamahendravaram",
          href: "https://en.wikipedia.org/wiki/Rajahmundry_Lok_Sabha_constituency",
        },
      },
      {
        name: "Rajanagaram",
        href: "https://en.wikipedia.org/wiki/Rajanagram_(Assembly_constituency)",
        reservation: "None",
        number: "49",
        loksabha_constituency: {
          name: "Rajamahendravaram",
          href: "https://en.wikipedia.org/wiki/Rajahmundry_Lok_Sabha_constituency",
        },
      },
      {
        name: "Rajamahendravaram City",
        href: "https://en.wikipedia.org/wiki/Rajahmundry_City_(Assembly_constituency)",
        reservation: "None",
        number: "50",
        loksabha_constituency: {
          name: "Rajamahendravaram",
          href: "https://en.wikipedia.org/wiki/Rajahmundry_Lok_Sabha_constituency",
        },
      },
      {
        name: "Rajamahendravaram Rural",
        href: "https://en.wikipedia.org/wiki/Rajahmundry_Rural_(Assembly_constituency)",
        reservation: "None",
        number: "51",
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
        loksabha_constituency: {
          name: "Rajamahendravaram",
          href: "https://en.wikipedia.org/wiki/Rajahmundry_Lok_Sabha_constituency",
        },
      },
      {
        name: "Nidadavole",
        href: "https://en.wikipedia.org/wiki/Nidadavole_(Assembly_constituency)",
        reservation: "None",
        number: "55",
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
        loksabha_constituency: {
          name: "Rajamahendravaram",
          href: "https://en.wikipedia.org/wiki/Rajahmundry_Lok_Sabha_constituency",
        },
      },
    ],
  },

  "https://en.wikipedia.org/wiki/Konaseema_district": {
    wikipedia_page: "https://en.wikipedia.org/wiki/Konaseema_district",
    wikidata_qid: "Q110714859",
    vidhansabha_constituencies: [
      {
        name: "Ramachandrapuram",
        href: "https://en.wikipedia.org/wiki/Ramachandrapuram_(Assembly_constituency)",
        reservation: "None",
        number: "42",
        loksabha_constituency: {
          name: "Amalapuram",
          href: "https://en.wikipedia.org/wiki/Amalapuram_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Mummidivaram",
        href: "https://en.wikipedia.org/wiki/Mummidivaram_(Assembly_constituency)",
        reservation: "None",
        number: "43",
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
        loksabha_constituency: {
          name: "Amalapuram",
          href: "https://en.wikipedia.org/wiki/Amalapuram_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Kothapeta",
        href: "https://en.wikipedia.org/wiki/Kothapeta_(Assembly_constituency)",
        reservation: "None",
        number: "47",
        loksabha_constituency: {
          name: "Amalapuram",
          href: "https://en.wikipedia.org/wiki/Amalapuram_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Mandapeta",
        href: "https://en.wikipedia.org/wiki/Mandapeta_(Assembly_constituency)",
        reservation: "None",
        number: "48",
        loksabha_constituency: {
          name: "Amalapuram",
          href: "https://en.wikipedia.org/wiki/Amalapuram_(Lok_Sabha_constituency)",
        },
      },
    ],
  },

  "https://en.wikipedia.org/wiki/Eluru_district": {
    wikipedia_page: "https://en.wikipedia.org/wiki/Eluru_district",
    wikidata_qid: "Q110714851",
    vidhansabha_constituencies: [
      {
        name: "Unguturu",
        href: "https://en.wikipedia.org/wiki/Unguturu_Assembly_constituency",
        reservation: "None",
        number: "63",
        loksabha_constituency: {
          name: "Eluru",
          href: "https://en.wikipedia.org/wiki/Eluru_Lok_Sabha_constituency",
        },
      },
      {
        name: "Denduluru",
        href: "https://en.wikipedia.org/wiki/Denduluru_Assembly_constituency",
        reservation: "None",
        number: "64",
        loksabha_constituency: {
          name: "Eluru",
          href: "https://en.wikipedia.org/wiki/Eluru_Lok_Sabha_constituency",
        },
      },
      {
        name: "Eluru",
        href: "https://en.wikipedia.org/wiki/Eluru_(Assembly_constituency)",
        reservation: "None",
        number: "65",
        loksabha_constituency: {
          name: "Eluru",
          href: "https://en.wikipedia.org/wiki/Eluru_Lok_Sabha_constituency",
        },
      },
      {
        name: "Polavaram",
        href: "https://en.wikipedia.org/wiki/Polavaram_(Assembly_constituency)",
        reservation: "ST",
        number: "67",
        loksabha_constituency: {
          name: "Eluru",
          href: "https://en.wikipedia.org/wiki/Eluru_Lok_Sabha_constituency",
        },
      },
      {
        name: "Chintalapudi",
        href: "https://en.wikipedia.org/wiki/Chintalapudi_(Assembly_constituency)",
        reservation: "SC",
        number: "68",
        loksabha_constituency: {
          name: "Eluru",
          href: "https://en.wikipedia.org/wiki/Eluru_Lok_Sabha_constituency",
        },
      },
      {
        name: "Nuzvid",
        href: "https://en.wikipedia.org/wiki/Nuzvid_(Assembly_constituency)",
        reservation: "None",
        number: "70",
        loksabha_constituency: {
          name: "Eluru",
          href: "https://en.wikipedia.org/wiki/Eluru_Lok_Sabha_constituency",
        },
      },
      {
        name: "Kaikalur",
        href: "https://en.wikipedia.org/wiki/Kaikalur_(Assembly_constituency)",
        reservation: "None",
        number: "73",
        loksabha_constituency: {
          name: "Eluru",
          href: "https://en.wikipedia.org/wiki/Eluru_Lok_Sabha_constituency",
        },
      },
    ],
  },

  "https://en.wikipedia.org/wiki/West_Godavari_district": {
    wikipedia_page: "https://en.wikipedia.org/wiki/West_Godavari_district",
    wikidata_qid: "Q15404",
    vidhansabha_constituencies: [
      {
        name: "Achanta",
        href: "https://en.wikipedia.org/wiki/Achanta_(Assembly_constituency)",
        reservation: "None",
        number: "56",
        loksabha_constituency: {
          name: "Narasapuram",
          href: "https://en.wikipedia.org/wiki/Narasapuram_Lok_Sabha_constituency",
        },
      },
      {
        name: "Palakollu",
        href: "https://en.wikipedia.org/wiki/Palakollu_(Assembly_constituency)",
        reservation: "None",
        number: "57",
        loksabha_constituency: {
          name: "Narasapuram",
          href: "https://en.wikipedia.org/wiki/Narasapuram_Lok_Sabha_constituency",
        },
      },
      {
        name: "Narasapuram",
        href: "https://en.wikipedia.org/wiki/Narasapuram_(Assembly_constituency)",
        reservation: "None",
        number: "58",
        loksabha_constituency: {
          name: "Narasapuram",
          href: "https://en.wikipedia.org/wiki/Narasapuram_Lok_Sabha_constituency",
        },
      },
      {
        name: "Bhimavaram",
        href: "https://en.wikipedia.org/wiki/Bhimavaram_(Assembly_constituency)",
        reservation: "None",
        number: "59",
        loksabha_constituency: {
          name: "Narasapuram",
          href: "https://en.wikipedia.org/wiki/Narasapuram_Lok_Sabha_constituency",
        },
      },
      {
        name: "Undi",
        href: "https://en.wikipedia.org/wiki/Undi_(Assembly_constituency)",
        reservation: "None",
        number: "60",
        loksabha_constituency: {
          name: "Narasapuram",
          href: "https://en.wikipedia.org/wiki/Narasapuram_Lok_Sabha_constituency",
        },
      },
      {
        name: "Tanuku",
        href: "https://en.wikipedia.org/wiki/Tanuku_(Assembly_constituency)",
        reservation: "None",
        number: "61",
        loksabha_constituency: {
          name: "Narasapuram",
          href: "https://en.wikipedia.org/wiki/Narasapuram_Lok_Sabha_constituency",
        },
      },
      {
        name: "Tadepalligudem",
        href: "https://en.wikipedia.org/wiki/Tadepalligudem_(Assembly_constituency)",
        reservation: "None",
        number: "62",
        loksabha_constituency: {
          name: "Narasapuram",
          href: "https://en.wikipedia.org/wiki/Narasapuram_Lok_Sabha_constituency",
        },
      },
    ],
  },

  "https://en.wikipedia.org/wiki/NTR_district": {
    wikipedia_page: "https://en.wikipedia.org/wiki/NTR_district",
    wikidata_qid: "Q110876763",
    vidhansabha_constituencies: [
      {
        name: "Gannavaram (Part)",
        href: "https://en.wikipedia.org/wiki/Gannavaram,_Krishna_Assembly_constituency",
        reservation: "None",
        number: "71",
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
        loksabha_constituency: {
          name: "Vijayawada",
          href: "https://en.wikipedia.org/wiki/Vijayawada_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Vijayawada West",
        href: "https://en.wikipedia.org/wiki/Vijayawada_West_(Assembly_constituency)",
        reservation: "None",
        number: "79",
        loksabha_constituency: {
          name: "Vijayawada",
          href: "https://en.wikipedia.org/wiki/Vijayawada_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Vijayawada Central",
        href: "https://en.wikipedia.org/wiki/Vijayawada_Central_(Assembly_constituency)",
        reservation: "None",
        number: "80",
        loksabha_constituency: {
          name: "Vijayawada",
          href: "https://en.wikipedia.org/wiki/Vijayawada_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Vijayawada East",
        href: "https://en.wikipedia.org/wiki/Vijayawada_East_(Assembly_constituency)",
        reservation: "None",
        number: "81",
        loksabha_constituency: {
          name: "Vijayawada",
          href: "https://en.wikipedia.org/wiki/Vijayawada_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Mylavaram",
        href: "https://en.wikipedia.org/wiki/Mylavaram_(Assembly_constituency)",
        reservation: "None",
        number: "82",
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
        loksabha_constituency: {
          name: "Vijayawada",
          href: "https://en.wikipedia.org/wiki/Vijayawada_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Jaggayyapeta",
        href: "https://en.wikipedia.org/wiki/Jaggayyapeta_(Assembly_constituency)",
        reservation: "None",
        number: "84",
        loksabha_constituency: {
          name: "Vijayawada",
          href: "https://en.wikipedia.org/wiki/Vijayawada_(Lok_Sabha_constituency)",
        },
      },
    ],
  },

  "https://en.wikipedia.org/wiki/Krishna_district": {
    wikipedia_page: "https://en.wikipedia.org/wiki/Krishna_district",
    wikidata_qid: "Q15382",
    vidhansabha_constituencies: [
      {
        name: "Gannavaram",
        href: "https://en.wikipedia.org/wiki/Gannavaram,_Krishna_Assembly_constituency",
        reservation: "None",
        number: "71",
        loksabha_constituency: {
          name: "Machilipatnam",
          href: "https://en.wikipedia.org/wiki/Machilipatnam_Lok_Sabha_constituency",
        },
      },
      {
        name: "Gudivada",
        href: "https://en.wikipedia.org/wiki/Gudivada_(Assembly_constituency)",
        reservation: "None",
        number: "72",
        loksabha_constituency: {
          name: "Machilipatnam",
          href: "https://en.wikipedia.org/wiki/Machilipatnam_Lok_Sabha_constituency",
        },
      },
      {
        name: "Pedana",
        href: "https://en.wikipedia.org/wiki/Pedana_(Assembly_constituency)",
        reservation: "None",
        number: "74",
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
        loksabha_constituency: {
          name: "Machilipatnam",
          href: "https://en.wikipedia.org/wiki/Machilipatnam_Lok_Sabha_constituency",
        },
      },
      {
        name: "Avanigadda",
        href: "https://en.wikipedia.org/wiki/Avanigadda_(Assembly_constituency)",
        reservation: "None",
        number: "76",
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
        loksabha_constituency: {
          name: "Machilipatnam",
          href: "https://en.wikipedia.org/wiki/Machilipatnam_Lok_Sabha_constituency",
        },
      },
      {
        name: "Penamaluru",
        href: "https://en.wikipedia.org/wiki/Penamaluru_(Assembly_constituency)",
        reservation: "None",
        number: "78",
        loksabha_constituency: {
          name: "Machilipatnam",
          href: "https://en.wikipedia.org/wiki/Machilipatnam_Lok_Sabha_constituency",
        },
      },
    ],
  },

  "https://en.wikipedia.org/wiki/Guntur_district": {
    wikipedia_page: "https://en.wikipedia.org/wiki/Guntur_district",
    wikidata_qid: "Q15341",
    vidhansabha_constituencies: [
      {
        name: "Tadikonda",
        href: "https://en.wikipedia.org/wiki/Tadikonda_(Assembly_constituency)",
        reservation: "SC",
        number: "86",
        loksabha_constituency: {
          name: "Guntur",
          href: "https://en.wikipedia.org/wiki/Guntur_Lok_Sabha_constituency",
        },
      },
      {
        name: "Mangalagiri",
        href: "https://en.wikipedia.org/wiki/Mangalagiri_(Assembly_constituency)",
        reservation: "None",
        number: "87",
        loksabha_constituency: {
          name: "Guntur",
          href: "https://en.wikipedia.org/wiki/Guntur_Lok_Sabha_constituency",
        },
      },
      {
        name: "Ponnur",
        href: "https://en.wikipedia.org/wiki/Ponnuru_(Assembly_constituency)",
        reservation: "None",
        number: "88",
        loksabha_constituency: {
          name: "Guntur",
          href: "https://en.wikipedia.org/wiki/Guntur_Lok_Sabha_constituency",
        },
      },
      {
        name: "Tenali",
        href: "https://en.wikipedia.org/wiki/Tenali_(Assembly_constituency)",
        reservation: "None",
        number: "91",
        loksabha_constituency: {
          name: "Guntur",
          href: "https://en.wikipedia.org/wiki/Guntur_Lok_Sabha_constituency",
        },
      },
      {
        name: "Prathipadu",
        href: "https://en.wikipedia.org/wiki/Prathipadu_(SC)_(Assembly_constituency)",
        reservation: "SC",
        number: "93",
        loksabha_constituency: {
          name: "Guntur",
          href: "https://en.wikipedia.org/wiki/Guntur_Lok_Sabha_constituency",
        },
      },
      {
        name: "Guntur West",
        href: "https://en.wikipedia.org/wiki/Guntur_West_(Assembly_constituency)",
        reservation: "None",
        number: "94",
        loksabha_constituency: {
          name: "Guntur",
          href: "https://en.wikipedia.org/wiki/Guntur_Lok_Sabha_constituency",
        },
      },
      {
        name: "Guntur East",
        href: "https://en.wikipedia.org/wiki/Guntur_East_(Assembly_constituency)",
        reservation: "None",
        number: "95",
        loksabha_constituency: {
          name: "Guntur",
          href: "https://en.wikipedia.org/wiki/Guntur_Lok_Sabha_constituency",
        },
      },
    ],
  },

  "https://en.wikipedia.org/wiki/Palnadu_district": {
    wikipedia_page: "https://en.wikipedia.org/wiki/Palnadu_district",
    wikidata_qid: "Q110714862",
    vidhansabha_constituencies: [
      {
        name: "Pedakurapadu",
        href: "https://en.wikipedia.org/wiki/Pedakurapadu_(Assembly_constituency)",
        number: "85",
        loksabha_constituency: {
          name: "Narasaraopet",
          href: "https://en.wikipedia.org/wiki/Narasaraopet_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Chilakaluripeta",
        href: "https://en.wikipedia.org/wiki/Chilakaluripet_(Assembly_constituency)",
        number: "96",
        loksabha_constituency: {
          name: "Narasaraopet",
          href: "https://en.wikipedia.org/wiki/Narasaraopet_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Narasaraopeta",
        href: "https://en.wikipedia.org/wiki/Narasaraopet_(Assembly_constituency)",
        number: "97",
        loksabha_constituency: {
          name: "Narasaraopet",
          href: "https://en.wikipedia.org/wiki/Narasaraopet_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Sattenapalle",
        href: "https://en.wikipedia.org/wiki/Sattenapalle_(Assembly_constituency)",
        number: "98",
        loksabha_constituency: {
          name: "Narasaraopet",
          href: "https://en.wikipedia.org/wiki/Narasaraopet_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Vinukonda",
        href: "https://en.wikipedia.org/wiki/Vinukonda_(Assembly_constituency)",
        number: "99",
        loksabha_constituency: {
          name: "Narasaraopet",
          href: "https://en.wikipedia.org/wiki/Narasaraopet_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Gurajala",
        href: "https://en.wikipedia.org/wiki/Gurajala_(Assembly_constituency)",
        number: "100",
        loksabha_constituency: {
          name: "Narasaraopet",
          href: "https://en.wikipedia.org/wiki/Narasaraopet_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Macherla",
        href: "https://en.wikipedia.org/wiki/Macherla_(Assembly_constituency)",
        number: "101",
        loksabha_constituency: {
          name: "Narasaraopet",
          href: "https://en.wikipedia.org/wiki/Narasaraopet_(Lok_Sabha_constituency)",
        },
      },
    ],
  },

  "https://en.wikipedia.org/wiki/Bapatla_district": {
    wikipedia_page: "https://en.wikipedia.org/wiki/Bapatla_district",
    wikidata_qid: "Q110876712",
    vidhansabha_constituencies: [
      {
        name: "Vemuru",
        href: "https://en.wikipedia.org/wiki/Vemuru_(Assembly_constituency)",
        reservation: "SC",
        number: "89",
        loksabha_constituency: {
          name: "Bapatla",
          href: "https://en.wikipedia.org/wiki/Bapatla_Lok_Sabha_constituency",
        },
      },
      {
        name: "Repalle",
        href: "https://en.wikipedia.org/wiki/Repalle_(Assembly_constituency)",
        reservation: "None",
        number: "90",
        loksabha_constituency: {
          name: "Bapatla",
          href: "https://en.wikipedia.org/wiki/Bapatla_Lok_Sabha_constituency",
        },
      },
      {
        name: "Bapatla",
        href: "https://en.wikipedia.org/wiki/Bapatla_(Assembly_constituency)",
        reservation: "None",
        number: "92",
        loksabha_constituency: {
          name: "Bapatla",
          href: "https://en.wikipedia.org/wiki/Bapatla_Lok_Sabha_constituency",
        },
      },
      {
        name: "Parchur",
        href: "https://en.wikipedia.org/wiki/Parchur_(Assembly_constituency)",
        reservation: "None",
        number: "104",
        loksabha_constituency: {
          name: "Bapatla",
          href: "https://en.wikipedia.org/wiki/Bapatla_Lok_Sabha_constituency",
        },
      },
      {
        name: "Addanki",
        href: "https://en.wikipedia.org/wiki/Addanki_(Assembly_constituency)",
        reservation: "None",
        number: "105",
        loksabha_constituency: {
          name: "Bapatla",
          href: "https://en.wikipedia.org/wiki/Bapatla_Lok_Sabha_constituency",
        },
      },
      {
        name: "Chirala",
        href: "https://en.wikipedia.org/wiki/Chirala_(Assembly_constituency)",
        reservation: "None",
        number: "106",
        loksabha_constituency: {
          name: "Bapatla",
          href: "https://en.wikipedia.org/wiki/Bapatla_Lok_Sabha_constituency",
        },
      },
    ],
  },

  "https://en.wikipedia.org/wiki/Prakasam_district": {
    wikipedia_page: "https://en.wikipedia.org/wiki/Prakasam_district",
    wikidata_qid: "Q15390",
    vidhansabha_constituencies: [
      {
        name: "Santhanuthalapadu",
        href: "https://en.wikipedia.org/wiki/Santhanuthalapadu_(Assembly_constituency)",
        reservation: "SC",
        number: "107",
        loksabha_constituency: {
          name: "Bapatla",
          href: "https://en.wikipedia.org/wiki/Bapatla_Lok_Sabha_constituency",
        },
      },
      {
        name: "Yerragondapalem",
        href: "https://en.wikipedia.org/wiki/Yerragondapalem_(Assembly_constituency)",
        reservation: "SC",
        number: "102",
        loksabha_constituency: {
          name: "Ongole",
          href: "https://en.wikipedia.org/wiki/Ongole_Lok_Sabha_constituency",
        },
      },
      {
        name: "Darsi",
        href: "https://en.wikipedia.org/wiki/Darsi_(Assembly_constituency)",
        reservation: "None",
        number: "103",
        loksabha_constituency: {
          name: "Ongole",
          href: "https://en.wikipedia.org/wiki/Ongole_Lok_Sabha_constituency",
        },
      },
      {
        name: "Ongole",
        href: "https://en.wikipedia.org/wiki/Ongole_(Assembly_constituency)",
        reservation: "None",
        number: "108",
        loksabha_constituency: {
          name: "Ongole",
          href: "https://en.wikipedia.org/wiki/Ongole_Lok_Sabha_constituency",
        },
      },
      {
        name: "Kondapi",
        href: "https://en.wikipedia.org/wiki/Kondapi_(Assembly_constituency)",
        reservation: "SC",
        number: "110",
        loksabha_constituency: {
          name: "Ongole",
          href: "https://en.wikipedia.org/wiki/Ongole_Lok_Sabha_constituency",
        },
      },
      {
        name: "Markapuram",
        href: "https://en.wikipedia.org/wiki/Markapuram_(Assembly_constituency)",
        reservation: "None",
        number: "111",
        loksabha_constituency: {
          name: "Ongole",
          href: "https://en.wikipedia.org/wiki/Ongole_Lok_Sabha_constituency",
        },
      },
      {
        name: "Giddalur",
        href: "https://en.wikipedia.org/wiki/Giddalur_(Assembly_constituency)",
        reservation: "None",
        number: "112",
        loksabha_constituency: {
          name: "Ongole",
          href: "https://en.wikipedia.org/wiki/Ongole_Lok_Sabha_constituency",
        },
      },
      {
        name: "Kanigiri",
        href: "https://en.wikipedia.org/wiki/Kanigiri_(Assembly_constituency)",
        reservation: "None",
        number: "113",
        loksabha_constituency: {
          name: "Ongole",
          href: "https://en.wikipedia.org/wiki/Ongole_Lok_Sabha_constituency",
        },
      },
    ],
  },

  "https://en.wikipedia.org/wiki/Nellore_district": {
    wikipedia_page: "https://en.wikipedia.org/wiki/Nellore_district",
    wikidata_qid: "Q15383",
    vidhansabha_constituencies: [
      {
        name: "Kandukur",
        href: "https://en.wikipedia.org/wiki/Kandukur_(Assembly_constituency)",
        reservation: "None",
        number: "109",
        loksabha_constituency: {
          name: "Nellore",
          href: "https://en.wikipedia.org/wiki/Nellore_Lok_Sabha_constituency",
        },
      },
      {
        name: "Kavali",
        href: "https://en.wikipedia.org/wiki/Kavali_(Assembly_constituency)",
        reservation: "None",
        number: "114",
        loksabha_constituency: {
          name: "Nellore",
          href: "https://en.wikipedia.org/wiki/Nellore_Lok_Sabha_constituency",
        },
      },
      {
        name: "Atmakur",
        href: "https://en.wikipedia.org/wiki/Atmakur_(Assembly_constituency)",
        reservation: "None",
        number: "115",
        loksabha_constituency: {
          name: "Nellore",
          href: "https://en.wikipedia.org/wiki/Nellore_Lok_Sabha_constituency",
        },
      },
      {
        name: "Kovuru",
        href: "https://en.wikipedia.org/wiki/Kovur_(Assembly_constituency)",
        reservation: "None",
        number: "116",
        loksabha_constituency: {
          name: "Nellore",
          href: "https://en.wikipedia.org/wiki/Nellore_Lok_Sabha_constituency",
        },
      },
      {
        name: "Nellore City",
        href: "https://en.wikipedia.org/wiki/Nellore_City_(Assembly_constituency)",
        reservation: "None",
        number: "117",
        loksabha_constituency: {
          name: "Nellore",
          href: "https://en.wikipedia.org/wiki/Nellore_Lok_Sabha_constituency",
        },
      },
      {
        name: "Nellore Rural",
        href: "https://en.wikipedia.org/wiki/Nellore_Rural_(Assembly_constituency)",
        reservation: "None",
        number: "118",
        loksabha_constituency: {
          name: "Nellore",
          href: "https://en.wikipedia.org/wiki/Nellore_Lok_Sabha_constituency",
        },
      },
      {
        name: "Udayagiri",
        href: "https://en.wikipedia.org/wiki/Udayagiri_(Assembly_constituency)",
        reservation: "None",
        number: "123",
        loksabha_constituency: {
          name: "Nellore",
          href: "https://en.wikipedia.org/wiki/Nellore_Lok_Sabha_constituency",
        },
      },
      {
        name: "Sarvepalli",
        href: "https://en.wikipedia.org/wiki/Sarvepalli_(Assembly_constituency)",
        reservation: "None",
        number: "119",
        loksabha_constituency: {
          name: "Tirupati",
          href: "https://en.wikipedia.org/wiki/Tirupati_Lok_Sabha_constituency",
        },
      },
    ],
  },

  "https://en.wikipedia.org/wiki/Kurnool_district": {
    wikipedia_page: "https://en.wikipedia.org/wiki/Kurnool_district",
    wikidata_qid: "Q15381",
    vidhansabha_constituencies: [
      {
        name: "Kurnool",
        href: "https://en.wikipedia.org/wiki/Kurnool_(Assembly_constituency)",
        reservation: "None",
        number: "137",
        loksabha_constituency: {
          name: "Kurnool",
          href: "https://en.wikipedia.org/wiki/Kurnool_Lok_Sabha_constituency",
        },
      },
      {
        name: "Kodumur",
        href: "https://en.wikipedia.org/wiki/Kodumur_(Assembly_constituency)",
        reservation: "SC",
        number: "143",
        loksabha_constituency: {
          name: "Kurnool",
          href: "https://en.wikipedia.org/wiki/Kurnool_Lok_Sabha_constituency",
        },
      },
      {
        name: "Yemmiganur",
        href: "https://en.wikipedia.org/wiki/Yemmiganur_(Assembly_constituency)",
        reservation: "None",
        number: "144",
        loksabha_constituency: {
          name: "Kurnool",
          href: "https://en.wikipedia.org/wiki/Kurnool_Lok_Sabha_constituency",
        },
      },
      {
        name: "Mantralayam",
        href: "https://en.wikipedia.org/wiki/Mantralayam_(Assembly_constituency)",
        reservation: "None",
        number: "145",
        loksabha_constituency: {
          name: "Kurnool",
          href: "https://en.wikipedia.org/wiki/Kurnool_Lok_Sabha_constituency",
        },
      },
      {
        name: "Adoni",
        href: "https://en.wikipedia.org/wiki/Adoni_(Assembly_constituency)",
        reservation: "None",
        number: "146",
        loksabha_constituency: {
          name: "Kurnool",
          href: "https://en.wikipedia.org/wiki/Kurnool_Lok_Sabha_constituency",
        },
      },
      {
        name: "Alur",
        href: "https://en.wikipedia.org/wiki/Alur_(Assembly_constituency)",
        reservation: "None",
        number: "147",
        loksabha_constituency: {
          name: "Kurnool",
          href: "https://en.wikipedia.org/wiki/Kurnool_Lok_Sabha_constituency",
        },
      },
      {
        name: "Pattikonda",
        href: "https://en.wikipedia.org/wiki/Pattikonda_(Assembly_constituency)",
        reservation: "None",
        number: "142",
        loksabha_constituency: {
          name: "Kurnool",
          href: "https://en.wikipedia.org/wiki/Kurnool_Lok_Sabha_constituency",
        },
      },
    ],
  },

  "https://en.wikipedia.org/wiki/Nandyal_district": {
    wikipedia_page: "https://en.wikipedia.org/wiki/Nandyal_district",
    wikidata_qid: "Q110714861",
    vidhansabha_constituencies: [
      {
        name: "Allagadda",
        href: "https://en.wikipedia.org/wiki/Allagadda_(Assembly_constituency)",
        reservation: "None",
        number: "134",
        loksabha_constituency: {
          name: "Nandyal",
          href: "https://en.wikipedia.org/wiki/Nandyal_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Srisailam",
        href: "https://en.wikipedia.org/wiki/Srisailam_(Assembly_constituency)",
        reservation: "None",
        number: "135",
        loksabha_constituency: {
          name: "Nandyal",
          href: "https://en.wikipedia.org/wiki/Nandyal_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Nandikotkur",
        href: "https://en.wikipedia.org/wiki/Nandikotkur_(Assembly_constituency)",
        reservation: "SC",
        number: "136",
        loksabha_constituency: {
          name: "Nandyal",
          href: "https://en.wikipedia.org/wiki/Nandyal_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Nandyal",
        href: "https://en.wikipedia.org/wiki/Nandyal_(Assembly_constituency)",
        reservation: "None",
        number: "139",
        loksabha_constituency: {
          name: "Nandyal",
          href: "https://en.wikipedia.org/wiki/Nandyal_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Banaganapalle",
        href: "https://en.wikipedia.org/wiki/Banaganapalle_(Assembly_constituency)",
        reservation: "None",
        number: "140",
        loksabha_constituency: {
          name: "Nandyal",
          href: "https://en.wikipedia.org/wiki/Nandyal_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Dhone",
        href: "https://en.wikipedia.org/wiki/Dhone_(Assembly_constituency)",
        reservation: "None",
        number: "141",
        loksabha_constituency: {
          name: "Nandyal",
          href: "https://en.wikipedia.org/wiki/Nandyal_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Panyam (partially)",
        href: "https://en.wikipedia.org/wiki/Panyam_(Assembly_constituency)",
        reservation: "None",
        number: "138",
        loksabha_constituency: {
          name: "Nandyal",
          href: "https://en.wikipedia.org/wiki/Nandyal_(Lok_Sabha_constituency)",
        },
      },
    ],
  },

  "https://en.wikipedia.org/wiki/Kadapa_district": {
    wikipedia_page: "https://en.wikipedia.org/wiki/Kadapa_district",
    wikidata_qid: "Q15342",
    vidhansabha_constituencies: [
      {
        name: "Badvel",
        href: "https://en.wikipedia.org/wiki/Badvel_Assembly_constituency",
        reservation: "SC",
        number: "124",
        loksabha_constituency: {
          name: "Kadapa",
          href: "https://en.wikipedia.org/wiki/Kadapa_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Jammalamadugu",
        href: "https://en.wikipedia.org/wiki/Jammalamadugu_Assembly_constituency",
        reservation: "None",
        number: "131",
        loksabha_constituency: {
          name: "Kadapa",
          href: "https://en.wikipedia.org/wiki/Kadapa_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Kadapa",
        href: "https://en.wikipedia.org/wiki/Kadapa_Assembly_constituency",
        reservation: "None",
        number: "126",
        loksabha_constituency: {
          name: "Kadapa",
          href: "https://en.wikipedia.org/wiki/Kadapa_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Kamalapuram",
        href: "https://en.wikipedia.org/wiki/Kamalapuram_Assembly_constituency",
        reservation: "None",
        number: "130",
        loksabha_constituency: {
          name: "Kadapa",
          href: "https://en.wikipedia.org/wiki/Kadapa_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Mydukur",
        href: "https://en.wikipedia.org/wiki/Mydukur_Assembly_constituency",
        reservation: "None",
        number: "133",
        loksabha_constituency: {
          name: "Kadapa",
          href: "https://en.wikipedia.org/wiki/Kadapa_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Proddatur",
        href: "https://en.wikipedia.org/wiki/Proddatur_Assembly_constituency",
        reservation: "None",
        number: "132",
        loksabha_constituency: {
          name: "Kadapa",
          href: "https://en.wikipedia.org/wiki/Kadapa_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Pulivendula",
        href: "https://en.wikipedia.org/wiki/Pulivendla_Assembly_constituency",
        reservation: "None",
        number: "129",
        loksabha_constituency: {
          name: "Kadapa",
          href: "https://en.wikipedia.org/wiki/Kadapa_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Rajampet (partial)",
        href: "https://en.wikipedia.org/wiki/Rajampet_Assembly_constituency",
        reservation: "None",
        number: "125",
        loksabha_constituency: {
          name: "Rajampet",
          href: "https://en.wikipedia.org/wiki/Rajampet_Lok_Sabha_constituency",
        },
      },
    ],
  },

  "https://en.wikipedia.org/wiki/Anantapur_district": {
    wikipedia_page: "https://en.wikipedia.org/wiki/Anantapur_district",
    wikidata_qid: "Q15212",
    vidhansabha_constituencies: [
      {
        name: "Rayadurgam",
        href: "https://en.wikipedia.org/wiki/Rayadurg_Assembly_constituency",
        reservation: "None",
        number: "148",
        loksabha_constituency: {
          name: "Anantapuram",
          href: "https://en.wikipedia.org/wiki/Anantapur_Lok_Sabha_constituency",
        },
      },
      {
        name: "Uravakonda",
        href: "https://en.wikipedia.org/wiki/Uravakonda_Assembly_constituency",
        reservation: "None",
        number: "149",
        loksabha_constituency: {
          name: "Anantapuram",
          href: "https://en.wikipedia.org/wiki/Anantapur_Lok_Sabha_constituency",
        },
      },
      {
        name: "Guntakallu",
        href: "https://en.wikipedia.org/wiki/Guntakal_Assembly_constituency",
        reservation: "None",
        number: "150",
        loksabha_constituency: {
          name: "Anantapuram",
          href: "https://en.wikipedia.org/wiki/Anantapur_Lok_Sabha_constituency",
        },
      },
      {
        name: "Tadpatri",
        href: "https://en.wikipedia.org/wiki/Tadpatri_Assembly_constituency",
        reservation: "None",
        number: "151",
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
        loksabha_constituency: {
          name: "Anantapuram",
          href: "https://en.wikipedia.org/wiki/Anantapur_Lok_Sabha_constituency",
        },
      },
      {
        name: "Anantapuram Urban",
        href: "https://en.wikipedia.org/wiki/Anantapur_Urban_Assembly_constituency",
        reservation: "None",
        number: "153",
        loksabha_constituency: {
          name: "Anantapuram",
          href: "https://en.wikipedia.org/wiki/Anantapur_Lok_Sabha_constituency",
        },
      },
      {
        name: "Kalyandurgam",
        href: "https://en.wikipedia.org/wiki/Kalyandurg_Assembly_constituency",
        reservation: "None",
        number: "154",
        loksabha_constituency: {
          name: "Anantapuram",
          href: "https://en.wikipedia.org/wiki/Anantapur_Lok_Sabha_constituency",
        },
      },
      {
        name: "Raptadu",
        href: "https://en.wikipedia.org/wiki/Raptadu_Assembly_constituency",
        reservation: "None",
        number: "155",
        loksabha_constituency: {
          name: "Hindupuram",
          href: "https://en.wikipedia.org/wiki/Hindupur_Lok_Sabha_constituency",
        },
      },
    ],
  },

  "https://en.wikipedia.org/wiki/Sri_Sathya_Sai_district": {
    wikipedia_page: "https://en.wikipedia.org/wiki/Sri_Sathya_Sai_district",
    wikidata_qid: "Q110714863",
    vidhansabha_constituencies: [
      {
        name: "Madakasira",
        href: "https://en.wikipedia.org/wiki/Madakasira_(Assembly_constituency)",
        reservation: "SC",
        number: "156",
        loksabha_constituency: {
          name: "Hindupuram",
          href: "https://en.wikipedia.org/wiki/Hindupur_Lok_Sabha_constituency",
        },
      },
      {
        name: "Hindupuram",
        href: "https://en.wikipedia.org/wiki/Hindupur_(Assembly_constituency)",
        reservation: "None",
        number: "157",
        loksabha_constituency: {
          name: "Hindupuram",
          href: "https://en.wikipedia.org/wiki/Hindupur_Lok_Sabha_constituency",
        },
      },
      {
        name: "Penukonda",
        href: "https://en.wikipedia.org/wiki/Penukonda_(Assembly_constituency)",
        reservation: "None",
        number: "158",
        loksabha_constituency: {
          name: "Hindupuram",
          href: "https://en.wikipedia.org/wiki/Hindupur_Lok_Sabha_constituency",
        },
      },
      {
        name: "Puttaparthi",
        href: "https://en.wikipedia.org/wiki/Puttaparthi_(Assembly_constituency)",
        reservation: "None",
        number: "159",
        loksabha_constituency: {
          name: "Hindupuram",
          href: "https://en.wikipedia.org/wiki/Hindupur_Lok_Sabha_constituency",
        },
      },
      {
        name: "Dharmavaram",
        href: "https://en.wikipedia.org/wiki/Dharmavaram_(Assembly_constituency)",
        reservation: "None",
        number: "160",
        loksabha_constituency: {
          name: "Hindupuram",
          href: "https://en.wikipedia.org/wiki/Hindupur_Lok_Sabha_constituency",
        },
      },
      {
        name: "Kadiri",
        href: "https://en.wikipedia.org/wiki/Kadiri_Assembly_constituency",
        reservation: "None",
        number: "161",
        loksabha_constituency: {
          name: "Hindupuram",
          href: "https://en.wikipedia.org/wiki/Hindupur_Lok_Sabha_constituency",
        },
      },
    ],
  },

  "https://en.wikipedia.org/wiki/Annamayya_district": {
    wikipedia_page: "https://en.wikipedia.org/wiki/Annamayya_district",
    wikidata_qid: "Q110714854",
    vidhansabha_constituencies: [
      {
        name: "Rajampet",
        href: "https://en.wikipedia.org/wiki/Rajampet_(Assembly_constituency)",
        reservation: "None",
        number: "125",
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
        loksabha_constituency: {
          name: "Rajampet",
          href: "https://en.wikipedia.org/wiki/Rajampet_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Rayachoti",
        href: "https://en.wikipedia.org/wiki/Rayachoti_(Assembly_constituency)",
        reservation: "None",
        number: "128",
        loksabha_constituency: {
          name: "Rajampet",
          href: "https://en.wikipedia.org/wiki/Rajampet_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Thamballapalle",
        href: "https://en.wikipedia.org/wiki/Thamballapalle_(Assembly_constituency)",
        reservation: "None",
        number: "162",
        loksabha_constituency: {
          name: "Rajampet",
          href: "https://en.wikipedia.org/wiki/Rajampet_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Pileru",
        href: "https://en.wikipedia.org/wiki/Pileru_(Assembly_constituency)",
        reservation: "None",
        number: "163",
        loksabha_constituency: {
          name: "Rajampet",
          href: "https://en.wikipedia.org/wiki/Rajampet_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Madanapalle",
        href: "https://en.wikipedia.org/wiki/Madanapalle_(Assembly_constituency)",
        reservation: "None",
        number: "164",
        loksabha_constituency: {
          name: "Rajampet",
          href: "https://en.wikipedia.org/wiki/Rajampet_(Lok_Sabha_constituency)",
        },
      },
    ],
  },

  "https://en.wikipedia.org/wiki/Tirupati_district": {
    wikipedia_page: "https://en.wikipedia.org/wiki/Tirupati_district",
    wikidata_qid: "Q110714853",
    vidhansabha_constituencies: [
      {
        name: "Chandragiri",
        href: "https://en.wikipedia.org/wiki/Chandragiri_(Assembly_constituency)",
        reservation: "None",
        number: "166",
        loksabha_constituency: {
          name: "Chittoor",
          href: "https://en.wikipedia.org/wiki/Chittoor_Lok_Sabha_constituency",
        },
      },
      {
        name: "Tirupati",
        href: "https://en.wikipedia.org/wiki/Tirupati_(Assembly_constituency)",
        reservation: "None",
        number: "167",
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
        loksabha_constituency: {
          name: "Tirupati",
          href: "https://en.wikipedia.org/wiki/Tirupati_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Venkatagiri",
        href: "https://en.wikipedia.org/wiki/Venkatagiri_(Assembly_constituency)",
        reservation: "None",
        number: "122",
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
        loksabha_constituency: {
          name: "Tirupati",
          href: "https://en.wikipedia.org/wiki/Tirupati_(Lok_Sabha_constituency)",
        },
      },
      {
        name: "Srikalahasti",
        href: "https://en.wikipedia.org/wiki/Srikalahasti_(Assembly_constituency)",
        reservation: "None",
        number: "168",
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
        loksabha_constituency: {
          name: "Tirupati",
          href: "https://en.wikipedia.org/wiki/Tirupati_(Lok_Sabha_constituency)",
        },
      },
    ],
  },

  "https://en.wikipedia.org/wiki/Chittoor_district": {
    wikipedia_page: "https://en.wikipedia.org/wiki/Chittoor_district",
    wikidata_qid: "Q15213",
    vidhansabha_constituencies: [
      {
        name: "Nagari",
        href: "https://en.wikipedia.org/wiki/Nagari_(Assembly_constituency)",
        reservation: "None",
        number: "170",
        loksabha_constituency: {
          name: "Chittoor",
          href: "https://en.wikipedia.org/wiki/Chittoor_Lok_Sabha_constituency",
        },
      },
      {
        name: "Gangadhara Nellore",
        href: "https://en.wikipedia.org/wiki/Gangadhara_Nellore_(Assembly_constituency)",
        reservation: "SC",
        number: "171",
        loksabha_constituency: {
          name: "Chittoor",
          href: "https://en.wikipedia.org/wiki/Chittoor_Lok_Sabha_constituency",
        },
      },
      {
        name: "Chittoor",
        href: "https://en.wikipedia.org/wiki/Chittoor_(Assembly_constituency)",
        reservation: "None",
        number: "172",
        loksabha_constituency: {
          name: "Chittoor",
          href: "https://en.wikipedia.org/wiki/Chittoor_Lok_Sabha_constituency",
        },
      },
      {
        name: "Puthalapattu",
        href: "https://en.wikipedia.org/wiki/Puthalapattu_(Assembly_constituency)",
        reservation: "SC",
        number: "173",
        loksabha_constituency: {
          name: "Chittoor",
          href: "https://en.wikipedia.org/wiki/Chittoor_Lok_Sabha_constituency",
        },
      },
      {
        name: "Palamaner",
        href: "https://en.wikipedia.org/wiki/Palamaner_(Assembly_constituency)",
        reservation: "None",
        number: "174",
        loksabha_constituency: {
          name: "Chittoor",
          href: "https://en.wikipedia.org/wiki/Chittoor_Lok_Sabha_constituency",
        },
      },
      {
        name: "Kuppam",
        href: "https://en.wikipedia.org/wiki/Kuppam_(Assembly_constituency)",
        reservation: "None",
        number: "175",
        loksabha_constituency: {
          name: "Chittoor",
          href: "https://en.wikipedia.org/wiki/Chittoor_Lok_Sabha_constituency",
        },
      },
      {
        name: "Punganur",
        href: "https://en.wikipedia.org/wiki/Punganur_(Assembly_constituency)",
        reservation: "None",
        number: "165",
        loksabha_constituency: {
          name: "Rajampet",
          href: "https://en.wikipedia.org/wiki/Rajampet_Lok_Sabha_constituency",
        },
      },
    ],
  },
};

(async () => {
  // let districts = districtVCs.map((dvs) => {
  //   return dvs.district.wikipedia_page;
  //   // return {
  //   //   // name: dvs.district.name,
  //   //   // wikipedia_page: dvs.district.wikipedia_page,
  //   //   // complete_vidhansabha_constituencies: dvs.vidhansabhaConstituenciesChildren.map((val) => {
  //   //   //   return {
  //   //   //     ...val,
  //   //   //     name: val.name,
  //   //   //   };
  //   //   // }),
  //   //   // partial_vidhansabha_constituencies: dvs.partialVidhanSabha.map((val) => {
  //   //   //   return val;
  //   //   // }),
  //   // };
  // });

  // let vcs = districtVCs.reduce((agg: any, dvs: any) => {
  //   for (let vcs of dvs.vidhansabhaConstituenciesChildren) {
  //     agg[vcs.name] = vcs;
  //   }

  //   return agg;
  // }, {});

  // {
  //   name_id: String! @id @search(by: [exact, term, fulltext])
  //   names: [_Name_] @hasInverse(field: "indian_district")
  //   states_union_territories: [_Indian_State_Union_Territory_] @hasInverse(field: "districts")
  //   loksabha_constituencies: [_Indian_Loksabha_Constituency_] @hasInverse(field: "districts")
  //   vidhansabha_constituencies: [_Indian_Vidhansabha_Constituency_] @hasInverse(field: "districts")

  //   established_on: DateTime
  //   disestablished_on: DateTime

  //   node_created_on: DateTime
  //   node_updates: [_Node_Update_]
  // }

  // console.log(JSON.stringify(districts, null, 2));

  // const list = districts.reduce((agg: any, val: any) => {
  //   agg[val] = { wikipedia_page: val };
  //   return agg;
  // }, {});

  // // console.log(JSON.stringify(vcs, null, 2));
  // console.log(JSON.stringify(list, null, 2));

  // name_id: String! @id @search(by: [exact, term, fulltext])
  // names: [_Name_] @hasInverse(field: "indian_district")
  // states_union_territories: [_Indian_State_Union_Territory_]
  // regions: [_Indian_District_Region_] @hasInverse(field: "self")
  // wikidata_qid: String @search(by: [hash])
  // wikipedia_page: String @search(by: [fulltext])
  // node_created_on: DateTime

  // loksabha_constituencies: [_Indian_Loksabha_Constituency_] @hasInverse(field: "districts")
  // vidhansabha_constituencies: [_Indian_Vidhansabha_Constituency_] @hasInverse(field: "districts")
  // established_on: DateTime
  // disestablished_on: DateTime

  allDistricts = map(allDistricts, (val: any) => {
    let name: any = val.wikipedia_page.split("/").pop();
    name = name.split("_district")[0].split("_").join(" ");
    return {
      ...val,
      name,
    };
  });
  console.log(JSON.stringify(allDistricts));
})();

/**
 * SCRIPT TO EXTRACT District-VC-LC
 */

// let politics = document.getElementById("d");
// let lcVcs = [];

// politics.querySelectorAll("tbody tr").forEach((row) => {
//   let cells = row.querySelectorAll("td");

//   lcVcs.push({
//     name: cells[1].innerText,
//     href: cells[1].querySelector("a").href,
//     reservation: cells[2].innerText,
//     number: cells[0].innerText,
//     loksabha_constituency: {
//       name: cells[3].innerText,
//       href: cells[3].querySelector("a").href,
//     },
//   });
// });

// function getWikidataQID() {
//   let link = document.getElementById("t-wikibase").querySelector("a").href;
//   let linkChunks = link.split("/");

//   let qid = "";
//   while (qid.length === 0) {
//     qid = linkChunks.pop();
//   }

//   return qid;
// }

// let data = {
//   wikipedia_page: window.location.href,
//   wikidata_qid: getWikidataQID(),
//   lc_vc: lcVcs,
// };

// console.log(data);
