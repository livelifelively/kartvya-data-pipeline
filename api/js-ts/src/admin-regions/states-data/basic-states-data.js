const heads = [
  "State",
  "iso_code",
  "vehicle_code",
  "Zone",
  "Capital",
  "Largest city",
  "established_on",
  "Population\n(2011)",
  "Area\n(km)",
  "Official\nlanguages",
  "Additional official\nlanguages",
];

const states = [
  {
    State: {
      links: [
        {
          text: "Kerala",
          href: "https://en.wikipedia.org/wiki/Kerala",
        },
      ],
      text: "Kerala",
    },
    iso_code: {
      links: [],
      text: "IN-KL",
    },
    vehicle_code: {
      links: [],
      text: "KL",
    },
    Zone: {
      links: [
        {
          text: "Southern",
          href: "https://en.wikipedia.org/wiki/Southern_Zonal_Council",
        },
      ],
      text: "Southern",
    },
    Capital: {
      links: [
        {
          text: "Thiruvananthapuram",
          href: "https://en.wikipedia.org/wiki/Thiruvananthapuram",
        },
      ],
      text: "Thiruvananthapuram",
    },
    "Largest city": {
      links: [
        {
          text: "Thiruvananthapuram",
          href: "https://en.wikipedia.org/wiki/Thiruvananthapuram",
        },
      ],
      text: "Thiruvananthapuram",
    },
    established_on: {
      links: [],
      text: "1 November 1956",
    },
    "Population\n(2011)": {
      links: [],
      text: "33,406,061",
    },
    "Area\n(km)": {
      links: [],
      text: "38,863",
    },
    "Official\nlanguages": {
      links: [
        {
          text: "Malayalam",
          href: "https://en.wikipedia.org/wiki/Malayalam",
        },
      ],
      text: "Malayalam",
    },
    "Additional official\nlanguages": {
      links: [
        {
          text: "English",
          href: "https://en.wikipedia.org/wiki/English_language",
        },
      ],
      text: "English",
    },
  },
  {
    State: {
      links: [
        {
          text: "Himachal Pradesh",
          href: "https://en.wikipedia.org/wiki/Himachal_Pradesh",
        },
      ],
      text: "Himachal Pradesh",
    },
    iso_code: {
      links: [],
      text: "IN-HP",
    },
    vehicle_code: {
      links: [],
      text: "HP",
    },
    Zone: {
      links: [
        {
          text: "Northern",
          href: "https://en.wikipedia.org/wiki/Northern_Zonal_Council",
        },
      ],
      text: "Northern",
    },
    Capital: {
      links: [
        {
          text: "Shimla",
          href: "https://en.wikipedia.org/wiki/Shimla",
        },
        {
          text: "Dharamshala",
          href: "https://en.wikipedia.org/wiki/Dharamshala",
        },
      ],
      text: "Shimla (Summer)\nDharamshala (Winter)",
    },
    "Largest city": {
      links: [
        {
          text: "Shimla",
          href: "https://en.wikipedia.org/wiki/Shimla",
        },
      ],
      text: "Shimla",
    },
    established_on: {
      links: [],
      text: "25 January 1971",
    },
    "Population\n(2011)": {
      links: [],
      text: "6,864,602",
    },
    "Area\n(km)": {
      links: [],
      text: "55,673",
    },
    "Official\nlanguages": {
      links: [
        {
          text: "Hindi",
          href: "https://en.wikipedia.org/wiki/Hindi",
        },
      ],
      text: "Hindi",
    },
    "Additional official\nlanguages": {
      links: [
        {
          text: "Sanskrit",
          href: "https://en.wikipedia.org/wiki/Sanskrit",
        },
      ],
      text: "Sanskrit",
    },
  },
  {
    State: {
      links: [
        {
          text: "Meghalaya",
          href: "https://en.wikipedia.org/wiki/Meghalaya",
        },
      ],
      text: "Meghalaya",
    },
    iso_code: {
      links: [],
      text: "IN-ML",
    },
    vehicle_code: {
      links: [],
      text: "ML",
    },
    Zone: {
      links: [
        {
          text: "North-Eastern",
          href: "https://en.wikipedia.org/wiki/North_Eastern_Council",
        },
      ],
      text: "North-Eastern",
    },
    Capital: {
      links: [
        {
          text: "Shillong",
          href: "https://en.wikipedia.org/wiki/Shillong",
        },
      ],
      text: "Shillong",
    },
    "Largest city": {
      links: [
        {
          text: "Shillong",
          href: "https://en.wikipedia.org/wiki/Shillong",
        },
      ],
      text: "Shillong",
    },
    established_on: {
      links: [],
      text: "21 January 1972",
    },
    "Population\n(2011)": {
      links: [],
      text: "2,966,889",
    },
    "Area\n(km)": {
      links: [],
      text: "22,429",
    },
    "Official\nlanguages": {
      links: [
        {
          text: "English",
          href: "https://en.wikipedia.org/wiki/English_language",
        },
      ],
      text: "English",
    },
    "Additional official\nlanguages": {
      links: [],
      text: "—",
    },
  },
  {
    State: {
      links: [
        {
          text: "Jharkhand",
          href: "https://en.wikipedia.org/wiki/Jharkhand",
        },
      ],
      text: "Jharkhand",
    },
    iso_code: {
      links: [],
      text: "IN-JH",
    },
    vehicle_code: {
      links: [],
      text: "JH",
    },
    Zone: {
      links: [
        {
          text: "Eastern",
          href: "https://en.wikipedia.org/wiki/Eastern_Zonal_Council",
        },
      ],
      text: "Eastern",
    },
    Capital: {
      links: [
        {
          text: "Ranchi",
          href: "https://en.wikipedia.org/wiki/Ranchi",
        },
      ],
      text: "Ranchi",
    },
    "Largest city": {
      links: [
        {
          text: "Jamshedpur",
          href: "https://en.wikipedia.org/wiki/Jamshedpur",
        },
      ],
      text: "Jamshedpur",
    },
    established_on: {
      links: [],
      text: "15 November 2000",
    },
    "Population\n(2011)": {
      links: [],
      text: "32,988,134",
    },
    "Area\n(km)": {
      links: [],
      text: "79,714",
    },
    "Official\nlanguages": {
      links: [
        {
          text: "Hindi",
          href: "https://en.wikipedia.org/wiki/Hindi",
        },
      ],
      text: "Hindi",
    },
    "Additional official\nlanguages": {
      links: [
        {
          text: "Angika",
          href: "https://en.wikipedia.org/wiki/Angika",
        },
        {
          text: "Bengali",
          href: "https://en.wikipedia.org/wiki/Bengali_language",
        },
        {
          text: "Bhojpuri",
          href: "https://en.wikipedia.org/wiki/Bhojpuri_language",
        },
        {
          text: "Bhumij",
          href: "https://en.wikipedia.org/wiki/Bhumij_language",
        },
        {
          text: "Ho",
          href: "https://en.wikipedia.org/wiki/Ho_language",
        },
        {
          text: "Kharia",
          href: "https://en.wikipedia.org/wiki/Kharia_language",
        },
        {
          text: "Khortha",
          href: "https://en.wikipedia.org/wiki/Khortha_language",
        },
        {
          text: "Kurmali",
          href: "https://en.wikipedia.org/wiki/Kurmali_language",
        },
        {
          text: "Kurukh",
          href: "https://en.wikipedia.org/wiki/Kurukh_language",
        },
        {
          text: "Magahi",
          href: "https://en.wikipedia.org/wiki/Magahi_language",
        },
        {
          text: "Maithili",
          href: "https://en.wikipedia.org/wiki/Maithili_language",
        },
        {
          text: "Mundari",
          href: "https://en.wikipedia.org/wiki/Mundari_language",
        },
        {
          text: "Nagpuri",
          href: "https://en.wikipedia.org/wiki/Sadri_language",
        },
        {
          text: "Odia",
          href: "https://en.wikipedia.org/wiki/Odia_language",
        },
        {
          text: "Santali",
          href: "https://en.wikipedia.org/wiki/Santali_language",
        },
        {
          text: "Urdu",
          href: "https://en.wikipedia.org/wiki/Urdu",
        },
      ],
      text: "Angika, Bengali, Bhojpuri, Bhumij, Ho, Kharia, Khortha, Kurmali, Kurukh, Magahi, Maithili, Mundari, Nagpuri, Odia, Santali, Urdu",
    },
  },
  {
    State: {
      links: [
        {
          text: "Chhattisgarh",
          href: "https://en.wikipedia.org/wiki/Chhattisgarh",
        },
      ],
      text: "Chhattisgarh",
    },
    iso_code: {
      links: [],
      text: "IN-CG",
    },
    vehicle_code: {
      links: [],
      text: "CG",
    },
    Zone: {
      links: [
        {
          text: "Central",
          href: "https://en.wikipedia.org/wiki/Central_Zonal_Council",
        },
      ],
      text: "Central",
    },
    Capital: {
      links: [
        {
          text: "Raipur",
          href: "https://en.wikipedia.org/wiki/Raipur",
        },
      ],
      text: "Raipur",
    },
    "Largest city": {
      links: [
        {
          text: "Raipur",
          href: "https://en.wikipedia.org/wiki/Raipur",
        },
      ],
      text: "Raipur",
    },
    established_on: {
      links: [],
      text: "1 November 2000",
    },
    "Population\n(2011)": {
      links: [],
      text: "25,545,198",
    },
    "Area\n(km)": {
      links: [],
      text: "135,194",
    },
    "Official\nlanguages": {
      links: [
        {
          text: "Hindi",
          href: "https://en.wikipedia.org/wiki/Hindi",
        },
      ],
      text: "Hindi",
    },
    "Additional official\nlanguages": {
      links: [
        {
          text: "Chhattisgarhi",
          href: "https://en.wikipedia.org/wiki/Chhattisgarhi_language",
        },
      ],
      text: "Chhattisgarhi",
    },
  },
  {
    State: {
      links: [
        {
          text: "Bihar",
          href: "https://en.wikipedia.org/wiki/Bihar",
        },
      ],
      text: "Bihar",
    },
    iso_code: {
      links: [],
      text: "IN-BR",
    },
    vehicle_code: {
      links: [],
      text: "BR",
    },
    Zone: {
      links: [
        {
          text: "Eastern",
          href: "https://en.wikipedia.org/wiki/Eastern_Zonal_Council",
        },
      ],
      text: "Eastern",
    },
    Capital: {
      links: [
        {
          text: "Patna",
          href: "https://en.wikipedia.org/wiki/Patna",
        },
      ],
      text: "Patna",
    },
    "Largest city": {
      links: [
        {
          text: "Patna",
          href: "https://en.wikipedia.org/wiki/Patna",
        },
      ],
      text: "Patna",
    },
    established_on: {
      links: [],
      text: "26 January 1950",
    },
    "Population\n(2011)": {
      links: [],
      text: "104,099,452",
    },
    "Area\n(km)": {
      links: [],
      text: "94,163",
    },
    "Official\nlanguages": {
      links: [
        {
          text: "Hindi",
          href: "https://en.wikipedia.org/wiki/Hindi",
        },
      ],
      text: "Hindi",
    },
    "Additional official\nlanguages": {
      links: [
        {
          text: "Urdu",
          href: "https://en.wikipedia.org/wiki/Urdu",
        },
      ],
      text: "Urdu",
    },
  },
  {
    State: {
      links: [
        {
          text: "Goa",
          href: "https://en.wikipedia.org/wiki/Goa",
        },
      ],
      text: "Goa",
    },
    iso_code: {
      links: [],
      text: "IN-GA",
    },
    vehicle_code: {
      links: [],
      text: "GA",
    },
    Zone: {
      links: [
        {
          text: "Western",
          href: "https://en.wikipedia.org/wiki/Western_Zonal_Council",
        },
      ],
      text: "Western",
    },
    Capital: {
      links: [
        {
          text: "Panaji",
          href: "https://en.wikipedia.org/wiki/Panaji",
        },
      ],
      text: "Panaji",
    },
    "Largest city": {
      links: [
        {
          text: "Vasco da Gama",
          href: "https://en.wikipedia.org/wiki/Vasco_da_Gama,_Goa",
        },
      ],
      text: "Vasco da Gama",
    },
    established_on: {
      links: [],
      text: "30 May 1987",
    },
    "Population\n(2011)": {
      links: [],
      text: "1,458,545",
    },
    "Area\n(km)": {
      links: [],
      text: "3,702",
    },
    "Official\nlanguages": {
      links: [
        {
          text: "Konkani",
          href: "https://en.wikipedia.org/wiki/Konkani_language",
        },
      ],
      text: "Konkani",
    },
    "Additional official\nlanguages": {
      links: [
        {
          text: "Marathi",
          href: "https://en.wikipedia.org/wiki/Marathi_language",
        },
      ],
      text: "Marathi",
    },
  },
  {
    State: {
      links: [
        {
          text: "Maharashtra",
          href: "https://en.wikipedia.org/wiki/Maharashtra",
        },
      ],
      text: "Maharashtra",
    },
    iso_code: {
      links: [],
      text: "IN-MH",
    },
    vehicle_code: {
      links: [],
      text: "MH",
    },
    Zone: {
      links: [
        {
          text: "Western",
          href: "https://en.wikipedia.org/wiki/Western_Zonal_Council",
        },
      ],
      text: "Western",
    },
    Capital: {
      links: [
        {
          text: "Mumbai",
          href: "https://en.wikipedia.org/wiki/Mumbai",
        },
        {
          text: "Nagpur",
          href: "https://en.wikipedia.org/wiki/Nagpur",
        },
      ],
      text: "Mumbai (Summer)\nNagpur (Winter)",
    },
    "Largest city": {
      links: [
        {
          text: "Mumbai",
          href: "https://en.wikipedia.org/wiki/Mumbai",
        },
      ],
      text: "Mumbai",
    },
    established_on: {
      links: [],
      text: "1 May 1960",
    },
    "Population\n(2011)": {
      links: [],
      text: "112,374,333",
    },
    "Area\n(km)": {
      links: [],
      text: "307,713",
    },
    "Official\nlanguages": {
      links: [
        {
          text: "Marathi",
          href: "https://en.wikipedia.org/wiki/Marathi_language",
        },
      ],
      text: "Marathi",
    },
    "Additional official\nlanguages": {
      links: [],
      text: "—",
    },
  },
  {
    State: {
      links: [
        {
          text: "Uttar Pradesh",
          href: "https://en.wikipedia.org/wiki/Uttar_Pradesh",
        },
      ],
      text: "Uttar Pradesh",
    },
    iso_code: {
      links: [],
      text: "IN-UP",
    },
    vehicle_code: {
      links: [],
      text: "UP",
    },
    Zone: {
      links: [
        {
          text: "Central",
          href: "https://en.wikipedia.org/wiki/Central_Zonal_Council",
        },
      ],
      text: "Central",
    },
    Capital: {
      links: [
        {
          text: "Lucknow",
          href: "https://en.wikipedia.org/wiki/Lucknow",
        },
      ],
      text: "Lucknow",
    },
    "Largest city": {
      links: [
        {
          text: "Lucknow",
          href: "https://en.wikipedia.org/wiki/Lucknow",
        },
      ],
      text: "Lucknow",
    },
    established_on: {
      links: [],
      text: "26 January 1950",
    },
    "Population\n(2011)": {
      links: [],
      text: "199,812,341",
    },
    "Area\n(km)": {
      links: [],
      text: "240,928",
    },
    "Official\nlanguages": {
      links: [
        {
          text: "Hindi",
          href: "https://en.wikipedia.org/wiki/Hindi",
        },
      ],
      text: "Hindi",
    },
    "Additional official\nlanguages": {
      links: [
        {
          text: "Urdu",
          href: "https://en.wikipedia.org/wiki/Urdu",
        },
      ],
      text: "Urdu",
    },
  },
  {
    State: {
      links: [
        {
          text: "West Bengal",
          href: "https://en.wikipedia.org/wiki/West_Bengal",
        },
      ],
      text: "West Bengal",
    },
    iso_code: {
      links: [],
      text: "IN-WB",
    },
    vehicle_code: {
      links: [],
      text: "WB",
    },
    Zone: {
      links: [
        {
          text: "Eastern",
          href: "https://en.wikipedia.org/wiki/Eastern_Zonal_Council",
        },
      ],
      text: "Eastern",
    },
    Capital: {
      links: [
        {
          text: "Kolkata",
          href: "https://en.wikipedia.org/wiki/Kolkata",
        },
      ],
      text: "Kolkata",
    },
    "Largest city": {
      links: [
        {
          text: "Kolkata",
          href: "https://en.wikipedia.org/wiki/Kolkata",
        },
      ],
      text: "Kolkata",
    },
    established_on: {
      links: [],
      text: "26 January 1950",
    },
    "Population\n(2011)": {
      links: [],
      text: "91,276,115",
    },
    "Area\n(km)": {
      links: [],
      text: "88,752",
    },
    "Official\nlanguages": {
      links: [
        {
          text: "Bengali",
          href: "https://en.wikipedia.org/wiki/Bengali_language",
        },
        {
          text: "English",
          href: "https://en.wikipedia.org/wiki/English_language",
        },
      ],
      text: "Bengali, English",
    },
    "Additional official\nlanguages": {
      links: [
        {
          text: "Nepali",
          href: "https://en.wikipedia.org/wiki/Nepali_language",
        },
        {
          text: "Hindi",
          href: "https://en.wikipedia.org/wiki/Hindi",
        },
        {
          text: "Odia",
          href: "https://en.wikipedia.org/wiki/Odia_language",
        },
        {
          text: "Punjabi",
          href: "https://en.wikipedia.org/wiki/Punjabi_language",
        },
        {
          text: "Santali",
          href: "https://en.wikipedia.org/wiki/Santali_language",
        },
        {
          text: "Telugu",
          href: "https://en.wikipedia.org/wiki/Telugu_language",
        },
        {
          text: "Urdu",
          href: "https://en.wikipedia.org/wiki/Urdu",
        },
        {
          text: "Kamatapuri",
          href: "https://en.wikipedia.org/wiki/KRNB_lects",
        },
        {
          text: "Rajbanshi",
          href: "https://en.wikipedia.org/wiki/Rangpuri_language",
        },
        {
          text: "Kurmali",
          href: "https://en.wikipedia.org/wiki/Kurmali_language",
        },
        {
          text: "Kurukh",
          href: "https://en.wikipedia.org/wiki/Kurukh_language",
        },
      ],
      text: "Nepali, Hindi, Odia, Punjabi, Santali, Telugu, Urdu, Kamatapuri, Rajbanshi, Kurmali, Kurukh",
    },
  },
  {
    State: {
      links: [
        {
          text: "Nagaland",
          href: "https://en.wikipedia.org/wiki/Nagaland",
        },
      ],
      text: "Nagaland",
    },
    iso_code: {
      links: [],
      text: "IN-NL",
    },
    vehicle_code: {
      links: [],
      text: "NL",
    },
    Zone: {
      links: [
        {
          text: "North-Eastern",
          href: "https://en.wikipedia.org/wiki/North_Eastern_Council",
        },
      ],
      text: "North-Eastern",
    },
    Capital: {
      links: [
        {
          text: "Kohima",
          href: "https://en.wikipedia.org/wiki/Kohima",
        },
      ],
      text: "Kohima",
    },
    "Largest city": {
      links: [
        {
          text: "Dimapur",
          href: "https://en.wikipedia.org/wiki/Dimapur",
        },
      ],
      text: "Dimapur",
    },
    established_on: {
      links: [],
      text: "1 December 1963",
    },
    "Population\n(2011)": {
      links: [],
      text: "1,978,502",
    },
    "Area\n(km)": {
      links: [],
      text: "16,579",
    },
    "Official\nlanguages": {
      links: [
        {
          text: "English",
          href: "https://en.wikipedia.org/wiki/English_language",
        },
      ],
      text: "English",
    },
    "Additional official\nlanguages": {
      links: [],
      text: "—",
    },
  },
  {
    State: {
      links: [
        {
          text: "Rajasthan",
          href: "https://en.wikipedia.org/wiki/Rajasthan",
        },
      ],
      text: "Rajasthan",
    },
    iso_code: {
      links: [],
      text: "IN-RJ",
    },
    vehicle_code: {
      links: [],
      text: "RJ",
    },
    Zone: {
      links: [
        {
          text: "Northern",
          href: "https://en.wikipedia.org/wiki/Northern_Zonal_Council",
        },
      ],
      text: "Northern",
    },
    Capital: {
      links: [
        {
          text: "Jaipur",
          href: "https://en.wikipedia.org/wiki/Jaipur",
        },
      ],
      text: "Jaipur",
    },
    "Largest city": {
      links: [
        {
          text: "Jaipur",
          href: "https://en.wikipedia.org/wiki/Jaipur",
        },
      ],
      text: "Jaipur",
    },
    established_on: {
      links: [],
      text: "26 January 1950",
    },
    "Population\n(2011)": {
      links: [],
      text: "68,548,437",
    },
    "Area\n(km)": {
      links: [],
      text: "342,239",
    },
    "Official\nlanguages": {
      links: [
        {
          text: "Hindi",
          href: "https://en.wikipedia.org/wiki/Hindi",
        },
      ],
      text: "Hindi",
    },
    "Additional official\nlanguages": {
      links: [
        {
          text: "English",
          href: "https://en.wikipedia.org/wiki/English_language",
        },
      ],
      text: "English",
    },
  },
  {
    State: {
      links: [
        {
          text: "Arunachal Pradesh",
          href: "https://en.wikipedia.org/wiki/Arunachal_Pradesh",
        },
      ],
      text: "Arunachal Pradesh",
    },
    iso_code: {
      links: [],
      text: "IN-AR",
    },
    vehicle_code: {
      links: [],
      text: "AR",
    },
    Zone: {
      links: [
        {
          text: "North-Eastern",
          href: "https://en.wikipedia.org/wiki/North_Eastern_Council",
        },
      ],
      text: "North-Eastern",
    },
    Capital: {
      links: [
        {
          text: "Itanagar",
          href: "https://en.wikipedia.org/wiki/Itanagar",
        },
      ],
      text: "Itanagar",
    },
    "Largest city": {
      links: [
        {
          text: "Itanagar",
          href: "https://en.wikipedia.org/wiki/Itanagar",
        },
      ],
      text: "Itanagar",
    },
    established_on: {
      links: [],
      text: "20 February 1987",
    },
    "Population\n(2011)": {
      links: [],
      text: "1,383,727",
    },
    "Area\n(km)": {
      links: [],
      text: "83,743",
    },
    "Official\nlanguages": {
      links: [
        {
          text: "English",
          href: "https://en.wikipedia.org/wiki/English_language",
        },
      ],
      text: "English",
    },
    "Additional official\nlanguages": {
      links: [],
      text: "—",
    },
  },
  {
    State: {
      links: [
        {
          text: "Manipur",
          href: "https://en.wikipedia.org/wiki/Manipur",
        },
      ],
      text: "Manipur",
    },
    iso_code: {
      links: [],
      text: "IN-MN",
    },
    vehicle_code: {
      links: [],
      text: "MN",
    },
    Zone: {
      links: [
        {
          text: "North-Eastern",
          href: "https://en.wikipedia.org/wiki/North_Eastern_Council",
        },
      ],
      text: "North-Eastern",
    },
    Capital: {
      links: [
        {
          text: "Imphal",
          href: "https://en.wikipedia.org/wiki/Imphal",
        },
      ],
      text: "Imphal",
    },
    "Largest city": {
      links: [
        {
          text: "Imphal",
          href: "https://en.wikipedia.org/wiki/Imphal",
        },
      ],
      text: "Imphal",
    },
    established_on: {
      links: [],
      text: "21 January 1972",
    },
    "Population\n(2011)": {
      links: [],
      text: "2,855,794",
    },
    "Area\n(km)": {
      links: [],
      text: "22,327",
    },
    "Official\nlanguages": {
      links: [
        {
          text: "Meitei",
          href: "https://en.wikipedia.org/wiki/Meitei_language",
        },
      ],
      text: "Meitei",
    },
    "Additional official\nlanguages": {
      links: [
        {
          text: "English",
          href: "https://en.wikipedia.org/wiki/English_language",
        },
      ],
      text: "English",
    },
  },
  {
    State: {
      links: [
        {
          text: "Telangana",
          href: "https://en.wikipedia.org/wiki/Telangana",
        },
      ],
      text: "Telangana",
    },
    iso_code: {
      links: [],
      text: "IN-TS",
    },
    vehicle_code: {
      links: [],
      text: "TG",
    },
    Zone: {
      links: [
        {
          text: "Southern",
          href: "https://en.wikipedia.org/wiki/Southern_Zonal_Council",
        },
      ],
      text: "Southern",
    },
    Capital: {
      links: [
        {
          text: "Hyderabad",
          href: "https://en.wikipedia.org/wiki/Hyderabad",
        },
      ],
      text: "Hyderabad",
    },
    "Largest city": {
      links: [
        {
          text: "Hyderabad",
          href: "https://en.wikipedia.org/wiki/Hyderabad",
        },
      ],
      text: "Hyderabad",
    },
    established_on: {
      links: [],
      text: "2 June 2014",
    },
    "Population\n(2011)": {
      links: [],
      text: "35,193,978",
    },
    "Area\n(km)": {
      links: [],
      text: "112,077",
    },
    "Official\nlanguages": {
      links: [
        {
          text: "Telugu",
          href: "https://en.wikipedia.org/wiki/Telugu_language",
        },
      ],
      text: "Telugu",
    },
    "Additional official\nlanguages": {
      links: [
        {
          text: "Urdu",
          href: "https://en.wikipedia.org/wiki/Urdu",
        },
      ],
      text: "Urdu",
    },
  },
  {
    State: {
      links: [
        {
          text: "Sikkim",
          href: "https://en.wikipedia.org/wiki/Sikkim",
        },
      ],
      text: "Sikkim",
    },
    iso_code: {
      links: [],
      text: "IN-SK",
    },
    vehicle_code: {
      links: [],
      text: "SK",
    },
    Zone: {
      links: [
        {
          text: "North-Eastern",
          href: "https://en.wikipedia.org/wiki/North_Eastern_Council",
        },
      ],
      text: "North-Eastern",
    },
    Capital: {
      links: [
        {
          text: "Gangtok",
          href: "https://en.wikipedia.org/wiki/Gangtok",
        },
      ],
      text: "Gangtok",
    },
    "Largest city": {
      links: [
        {
          text: "Gangtok",
          href: "https://en.wikipedia.org/wiki/Gangtok",
        },
      ],
      text: "Gangtok",
    },
    established_on: {
      links: [],
      text: "16 May 1975",
    },
    "Population\n(2011)": {
      links: [],
      text: "610,577",
    },
    "Area\n(km)": {
      links: [],
      text: "7,096",
    },
    "Official\nlanguages": {
      links: [
        {
          text: "Nepali",
          href: "https://en.wikipedia.org/wiki/Nepali_language",
        },
        {
          text: "Sikkimese",
          href: "https://en.wikipedia.org/wiki/Sikkimese_language",
        },
        {
          text: "Lepcha",
          href: "https://en.wikipedia.org/wiki/Lepcha_language",
        },
        {
          text: "English",
          href: "https://en.wikipedia.org/wiki/English_language",
        },
      ],
      text: "Nepali, Sikkimese, Lepcha, English",
    },
    "Additional official\nlanguages": {
      links: [
        {
          text: "Gurung",
          href: "https://en.wikipedia.org/wiki/Gurung_language",
        },
        {
          text: "Limbu",
          href: "https://en.wikipedia.org/wiki/Limbu_language",
        },
        {
          text: "Magar",
          href: "https://en.wikipedia.org/wiki/Magar_language",
        },
        {
          text: "Mukhia",
          href: "https://en.wikipedia.org/wiki/Sunwar_language",
        },
        {
          text: "Newari",
          href: "https://en.wikipedia.org/wiki/Newari_language",
        },
        {
          text: "Rai",
          href: "https://en.wikipedia.org/wiki/Rai_languages",
        },
        {
          text: "Sherpa",
          href: "https://en.wikipedia.org/wiki/Sherpa_language",
        },
        {
          text: "Tamang",
          href: "https://en.wikipedia.org/wiki/Tamang_language",
        },
      ],
      text: "Gurung, Limbu, Magar, Mukhia, Newari, Rai, Sherpa, Tamang",
    },
  },
  {
    State: {
      links: [
        {
          text: "Gujarat",
          href: "https://en.wikipedia.org/wiki/Gujarat",
        },
      ],
      text: "Gujarat",
    },
    iso_code: {
      links: [],
      text: "IN-GJ",
    },
    vehicle_code: {
      links: [],
      text: "GJ",
    },
    Zone: {
      links: [
        {
          text: "Western",
          href: "https://en.wikipedia.org/wiki/Western_Zonal_Council",
        },
      ],
      text: "Western",
    },
    Capital: {
      links: [
        {
          text: "Gandhinagar",
          href: "https://en.wikipedia.org/wiki/Gandhinagar",
        },
      ],
      text: "Gandhinagar",
    },
    "Largest city": {
      links: [
        {
          text: "Ahmedabad",
          href: "https://en.wikipedia.org/wiki/Ahmedabad",
        },
      ],
      text: "Ahmedabad",
    },
    established_on: {
      links: [],
      text: "1 May 1960",
    },
    "Population\n(2011)": {
      links: [],
      text: "60,439,692",
    },
    "Area\n(km)": {
      links: [],
      text: "196,024",
    },
    "Official\nlanguages": {
      links: [
        {
          text: "Gujarati",
          href: "https://en.wikipedia.org/wiki/Gujarati_language",
        },
        {
          text: "Hindi",
          href: "https://en.wikipedia.org/wiki/Hindi",
        },
      ],
      text: "Gujarati, Hindi",
    },
    "Additional official\nlanguages": {
      links: [],
      text: "—",
    },
  },
  {
    State: {
      links: [
        {
          text: "Assam",
          href: "https://en.wikipedia.org/wiki/Assam",
        },
      ],
      text: "Assam",
    },
    iso_code: {
      links: [],
      text: "IN-AS",
    },
    vehicle_code: {
      links: [],
      text: "AS",
    },
    Zone: {
      links: [
        {
          text: "North-Eastern",
          href: "https://en.wikipedia.org/wiki/North_Eastern_Council",
        },
      ],
      text: "North-Eastern",
    },
    Capital: {
      links: [
        {
          text: "Dispur",
          href: "https://en.wikipedia.org/wiki/Dispur",
        },
      ],
      text: "Dispur",
    },
    "Largest city": {
      links: [
        {
          text: "Guwahati",
          href: "https://en.wikipedia.org/wiki/Guwahati",
        },
      ],
      text: "Guwahati",
    },
    established_on: {
      links: [],
      text: "26 January 1950",
    },
    "Population\n(2011)": {
      links: [],
      text: "31,205,576",
    },
    "Area\n(km)": {
      links: [],
      text: "78,438",
    },
    "Official\nlanguages": {
      links: [
        {
          text: "Assamese",
          href: "https://en.wikipedia.org/wiki/Assamese_language",
        },
        {
          text: "Boro",
          href: "https://en.wikipedia.org/wiki/Boro_language_(India)",
        },
      ],
      text: "Assamese, Boro",
    },
    "Additional official\nlanguages": {
      links: [
        {
          text: "Bengali",
          href: "https://en.wikipedia.org/wiki/Bengali_language",
        },
        {
          text: "Meitei",
          href: "https://en.wikipedia.org/wiki/Meitei_language",
        },
      ],
      text: "Bengali, Meitei",
    },
  },
  {
    State: {
      links: [
        {
          text: "Tamil Nadu",
          href: "https://en.wikipedia.org/wiki/Tamil_Nadu",
        },
      ],
      text: "Tamil Nadu",
    },
    iso_code: {
      links: [],
      text: "IN-TN",
    },
    vehicle_code: {
      links: [],
      text: "TN",
    },
    Zone: {
      links: [
        {
          text: "Southern",
          href: "https://en.wikipedia.org/wiki/Southern_Zonal_Council",
        },
      ],
      text: "Southern",
    },
    Capital: {
      links: [
        {
          text: "Chennai",
          href: "https://en.wikipedia.org/wiki/Chennai",
        },
      ],
      text: "Chennai",
    },
    "Largest city": {
      links: [
        {
          text: "Chennai",
          href: "https://en.wikipedia.org/wiki/Chennai",
        },
      ],
      text: "Chennai",
    },
    established_on: {
      links: [],
      text: "1 November 1956",
    },
    "Population\n(2011)": {
      links: [],
      text: "72,147,030",
    },
    "Area\n(km)": {
      links: [],
      text: "130,058",
    },
    "Official\nlanguages": {
      links: [
        {
          text: "Tamil",
          href: "https://en.wikipedia.org/wiki/Tamil_language",
        },
      ],
      text: "Tamil",
    },
    "Additional official\nlanguages": {
      links: [
        {
          text: "English",
          href: "https://en.wikipedia.org/wiki/English_language",
        },
      ],
      text: "English",
    },
  },
  {
    State: {
      links: [
        {
          text: "Punjab",
          href: "https://en.wikipedia.org/wiki/Punjab,_India",
        },
      ],
      text: "Punjab",
    },
    iso_code: {
      links: [],
      text: "IN-PB",
    },
    vehicle_code: {
      links: [],
      text: "PB",
    },
    Zone: {
      links: [
        {
          text: "Northern",
          href: "https://en.wikipedia.org/wiki/Northern_Zonal_Council",
        },
      ],
      text: "Northern",
    },
    Capital: {
      links: [
        {
          text: "Chandigarh",
          href: "https://en.wikipedia.org/wiki/Chandigarh",
        },
      ],
      text: "Chandigarh",
    },
    "Largest city": {
      links: [
        {
          text: "Ludhiana",
          href: "https://en.wikipedia.org/wiki/Ludhiana",
        },
      ],
      text: "Ludhiana",
    },
    established_on: {
      links: [],
      text: "1 November 1966",
    },
    "Population\n(2011)": {
      links: [],
      text: "27,743,338",
    },
    "Area\n(km)": {
      links: [],
      text: "50,362",
    },
    "Official\nlanguages": {
      links: [
        {
          text: "Punjabi",
          href: "https://en.wikipedia.org/wiki/Punjabi_language",
        },
      ],
      text: "Punjabi",
    },
    "Additional official\nlanguages": {
      links: [],
      text: "—",
    },
  },
  {
    State: {
      links: [
        {
          text: "Haryana",
          href: "https://en.wikipedia.org/wiki/Haryana",
        },
      ],
      text: "Haryana",
    },
    iso_code: {
      links: [],
      text: "IN-HR",
    },
    vehicle_code: {
      links: [],
      text: "HR",
    },
    Zone: {
      links: [
        {
          text: "Northern",
          href: "https://en.wikipedia.org/wiki/Northern_Zonal_Council",
        },
      ],
      text: "Northern",
    },
    Capital: {
      links: [
        {
          text: "Chandigarh",
          href: "https://en.wikipedia.org/wiki/Chandigarh",
        },
      ],
      text: "Chandigarh",
    },
    "Largest city": {
      links: [
        {
          text: "Faridabad",
          href: "https://en.wikipedia.org/wiki/Faridabad",
        },
      ],
      text: "Faridabad",
    },
    established_on: {
      links: [],
      text: "1 November 1966",
    },
    "Population\n(2011)": {
      links: [],
      text: "25,351,462",
    },
    "Area\n(km)": {
      links: [],
      text: "44,212",
    },
    "Official\nlanguages": {
      links: [
        {
          text: "Hindi",
          href: "https://en.wikipedia.org/wiki/Hindi",
        },
      ],
      text: "Hindi",
    },
    "Additional official\nlanguages": {
      links: [
        {
          text: "Punjabi",
          href: "https://en.wikipedia.org/wiki/Punjabi_language",
        },
      ],
      text: "Punjabi",
    },
  },
  {
    State: {
      links: [
        {
          text: "Odisha",
          href: "https://en.wikipedia.org/wiki/Odisha",
        },
      ],
      text: "Odisha",
    },
    iso_code: {
      links: [],
      text: "IN-OD",
    },
    vehicle_code: {
      links: [],
      text: "OD",
    },
    Zone: {
      links: [
        {
          text: "Eastern",
          href: "https://en.wikipedia.org/wiki/Eastern_Zonal_Council",
        },
      ],
      text: "Eastern",
    },
    Capital: {
      links: [
        {
          text: "Bhubaneswar",
          href: "https://en.wikipedia.org/wiki/Bhubaneswar",
        },
      ],
      text: "Bhubaneswar",
    },
    "Largest city": {
      links: [
        {
          text: "Bhubaneswar",
          href: "https://en.wikipedia.org/wiki/Bhubaneswar",
        },
      ],
      text: "Bhubaneswar",
    },
    established_on: {
      links: [],
      text: "26 January 1950",
    },
    "Population\n(2011)": {
      links: [],
      text: "41,974,218",
    },
    "Area\n(km)": {
      links: [],
      text: "155,707",
    },
    "Official\nlanguages": {
      links: [
        {
          text: "Odia",
          href: "https://en.wikipedia.org/wiki/Odia_language",
        },
      ],
      text: "Odia",
    },
    "Additional official\nlanguages": {
      links: [],
      text: "—",
    },
  },
  {
    State: {
      links: [
        {
          text: "Madhya Pradesh",
          href: "https://en.wikipedia.org/wiki/Madhya_Pradesh",
        },
      ],
      text: "Madhya Pradesh",
    },
    iso_code: {
      links: [],
      text: "IN-MP",
    },
    vehicle_code: {
      links: [],
      text: "MP",
    },
    Zone: {
      links: [
        {
          text: "Central",
          href: "https://en.wikipedia.org/wiki/Central_Zonal_Council",
        },
      ],
      text: "Central",
    },
    Capital: {
      links: [
        {
          text: "Bhopal",
          href: "https://en.wikipedia.org/wiki/Bhopal",
        },
      ],
      text: "Bhopal",
    },
    "Largest city": {
      links: [
        {
          text: "Indore",
          href: "https://en.wikipedia.org/wiki/Indore",
        },
      ],
      text: "Indore",
    },
    established_on: {
      links: [],
      text: "1 November 1956",
    },
    "Population\n(2011)": {
      links: [],
      text: "72,626,809",
    },
    "Area\n(km)": {
      links: [],
      text: "308,252",
    },
    "Official\nlanguages": {
      links: [
        {
          text: "Hindi",
          href: "https://en.wikipedia.org/wiki/Hindi",
        },
      ],
      text: "Hindi",
    },
    "Additional official\nlanguages": {
      links: [],
      text: "—",
    },
  },
  {
    State: {
      links: [
        {
          text: "Uttarakhand",
          href: "https://en.wikipedia.org/wiki/Uttarakhand",
        },
      ],
      text: "Uttarakhand",
    },
    iso_code: {
      links: [],
      text: "IN-UK",
    },
    vehicle_code: {
      links: [],
      text: "UK",
    },
    Zone: {
      links: [
        {
          text: "Central",
          href: "https://en.wikipedia.org/wiki/Central_Zonal_Council",
        },
      ],
      text: "Central",
    },
    Capital: {
      links: [
        {
          text: "Bhararisain",
          href: "https://en.wikipedia.org/wiki/Bhararisain",
        },
        {
          text: "Dehradun",
          href: "https://en.wikipedia.org/wiki/Dehradun",
        },
      ],
      text: "Bhararisain (Summer)\nDehradun (Winter)",
    },
    "Largest city": {
      links: [
        {
          text: "Dehradun",
          href: "https://en.wikipedia.org/wiki/Dehradun",
        },
      ],
      text: "Dehradun",
    },
    established_on: {
      links: [],
      text: "9 November 2000",
    },
    "Population\n(2011)": {
      links: [],
      text: "10,086,292",
    },
    "Area\n(km)": {
      links: [],
      text: "53,483",
    },
    "Official\nlanguages": {
      links: [
        {
          text: "Hindi",
          href: "https://en.wikipedia.org/wiki/Hindi",
        },
      ],
      text: "Hindi",
    },
    "Additional official\nlanguages": {
      links: [
        {
          text: "Sanskrit",
          href: "https://en.wikipedia.org/wiki/Sanskrit",
        },
      ],
      text: "Sanskrit",
    },
  },
  {
    State: {
      links: [
        {
          text: "Karnataka",
          href: "https://en.wikipedia.org/wiki/Karnataka",
        },
      ],
      text: "Karnataka",
    },
    iso_code: {
      links: [],
      text: "IN-KA",
    },
    vehicle_code: {
      links: [],
      text: "KA",
    },
    Zone: {
      links: [
        {
          text: "Southern",
          href: "https://en.wikipedia.org/wiki/Southern_Zonal_Council",
        },
      ],
      text: "Southern",
    },
    Capital: {
      links: [
        {
          text: "Bengaluru",
          href: "https://en.wikipedia.org/wiki/Bengaluru",
        },
      ],
      text: "Bengaluru",
    },
    "Largest city": {
      links: [
        {
          text: "Bengaluru",
          href: "https://en.wikipedia.org/wiki/Bengaluru",
        },
      ],
      text: "Bengaluru",
    },
    established_on: {
      links: [],
      text: "1 November 1956",
    },
    "Population\n(2011)": {
      links: [],
      text: "61,095,297",
    },
    "Area\n(km)": {
      links: [],
      text: "191,791",
    },
    "Official\nlanguages": {
      links: [
        {
          text: "Kannada",
          href: "https://en.wikipedia.org/wiki/Kannada",
        },
      ],
      text: "Kannada",
    },
    "Additional official\nlanguages": {
      links: [],
      text: "—",
    },
  },
  {
    State: {
      links: [
        {
          text: "Andhra Pradesh",
          href: "https://en.wikipedia.org/wiki/Andhra_Pradesh",
        },
      ],
      text: "Andhra Pradesh",
    },
    iso_code: {
      links: [],
      text: "IN-AP",
    },
    vehicle_code: {
      links: [],
      text: "AP",
    },
    Zone: {
      links: [
        {
          text: "Southern",
          href: "https://en.wikipedia.org/wiki/Southern_Zonal_Council",
        },
      ],
      text: "Southern",
    },
    Capital: {
      links: [
        {
          text: "Amaravati",
          href: "https://en.wikipedia.org/wiki/Amaravati",
        },
      ],
      text: "Amaravati",
    },
    "Largest city": {
      links: [
        {
          text: "Visakhapatnam",
          href: "https://en.wikipedia.org/wiki/Visakhapatnam",
        },
      ],
      text: "Visakhapatnam",
    },
    established_on: {
      links: [],
      text: "1 November 1956",
    },
    "Population\n(2011)": {
      links: [],
      text: "49,506,799",
    },
    "Area\n(km)": {
      links: [],
      text: "162,975",
    },
    "Official\nlanguages": {
      links: [
        {
          text: "Telugu",
          href: "https://en.wikipedia.org/wiki/Telugu_language",
        },
      ],
      text: "Telugu",
    },
    "Additional official\nlanguages": {
      links: [
        {
          text: "Urdu",
          href: "https://en.wikipedia.org/wiki/Urdu",
        },
      ],
      text: "Urdu",
    },
  },
  {
    State: {
      links: [
        {
          text: "Mizoram",
          href: "https://en.wikipedia.org/wiki/Mizoram",
        },
      ],
      text: "Mizoram",
    },
    iso_code: {
      links: [],
      text: "IN-MZ",
    },
    vehicle_code: {
      links: [],
      text: "MZ",
    },
    Zone: {
      links: [
        {
          text: "North-Eastern",
          href: "https://en.wikipedia.org/wiki/North_Eastern_Council",
        },
      ],
      text: "North-Eastern",
    },
    Capital: {
      links: [
        {
          text: "Aizawl",
          href: "https://en.wikipedia.org/wiki/Aizawl",
        },
      ],
      text: "Aizawl",
    },
    "Largest city": {
      links: [
        {
          text: "Aizawl",
          href: "https://en.wikipedia.org/wiki/Aizawl",
        },
      ],
      text: "Aizawl",
    },
    established_on: {
      links: [],
      text: "20 February 1987",
    },
    "Population\n(2011)": {
      links: [],
      text: "1,097,206",
    },
    "Area\n(km)": {
      links: [],
      text: "21,081",
    },
    "Official\nlanguages": {
      links: [
        {
          text: "Mizo",
          href: "https://en.wikipedia.org/wiki/Mizo_language",
        },
        {
          text: "English",
          href: "https://en.wikipedia.org/wiki/English_language",
        },
      ],
      text: "Mizo, English",
    },
    "Additional official\nlanguages": {
      links: [],
      text: "—",
    },
  },
  {
    State: {
      links: [
        {
          text: "Tripura",
          href: "https://en.wikipedia.org/wiki/Tripura",
        },
      ],
      text: "Tripura",
    },
    iso_code: {
      links: [],
      text: "IN-TR",
    },
    vehicle_code: {
      links: [],
      text: "TR",
    },
    Zone: {
      links: [
        {
          text: "North-Eastern",
          href: "https://en.wikipedia.org/wiki/North_Eastern_Council",
        },
      ],
      text: "North-Eastern",
    },
    Capital: {
      links: [
        {
          text: "Agartala",
          href: "https://en.wikipedia.org/wiki/Agartala",
        },
      ],
      text: "Agartala",
    },
    "Largest city": {
      links: [
        {
          text: "Agartala",
          href: "https://en.wikipedia.org/wiki/Agartala",
        },
      ],
      text: "Agartala",
    },
    established_on: {
      links: [],
      text: "21 January 1972",
    },
    "Population\n(2011)": {
      links: [],
      text: "3,673,917",
    },
    "Area\n(km)": {
      links: [],
      text: "10,491",
    },
    "Official\nlanguages": {
      links: [
        {
          text: "Bengali",
          href: "https://en.wikipedia.org/wiki/Bengali_language",
        },
        {
          text: "English",
          href: "https://en.wikipedia.org/wiki/English_language",
        },
        {
          text: "Kokborok",
          href: "https://en.wikipedia.org/wiki/Kokborok",
        },
      ],
      text: "Bengali, English, Kokborok",
    },
    "Additional official\nlanguages": {
      links: [],
      text: "—",
    },
  },
];

const uts = [
  {
    State: {
      links: [
        {
          text: "Andaman and Nicobar Islands",
          href: "https://en.wikipedia.org/wiki/Andaman_and_Nicobar_Islands",
        },
      ],
      text: "Andaman and Nicobar Islands",
    },
    iso_code: {
      links: [],
      text: "IN-AN",
    },
    vehicle_code: {
      links: [],
      text: "AN",
    },
    Zone: {
      links: [
        {
          text: "Eastern",
          href: "https://en.wikipedia.org/wiki/Eastern_Zonal_Council",
        },
      ],
      text: "Eastern",
    },
    Capital: {
      links: [
        {
          text: "Sri Vijaya Puram",
          href: "https://en.wikipedia.org/wiki/Sri_Vijaya_Puram",
        },
      ],
      text: "Sri Vijaya Puram",
    },
    "Largest city": {
      links: [
        {
          text: "Sri Vijaya Puram",
          href: "https://en.wikipedia.org/wiki/Sri_Vijaya_Puram",
        },
      ],
      text: "Sri Vijaya Puram",
    },
    established_on: {
      links: [],
      text: "1 November 1956",
    },
    "Population\n(2011)": {
      links: [],
      text: "380,581",
    },
    "Area\n(km)": {
      links: [],
      text: "8,249",
    },
    "Official\nlanguages": {
      links: [
        {
          text: "Hindi",
          href: "https://en.wikipedia.org/wiki/Hindi",
        },
        {
          text: "English",
          href: "https://en.wikipedia.org/wiki/English_language",
        },
      ],
      text: "Hindi, English",
    },
    "Additional official\nlanguages": {
      links: [],
      text: "—",
    },
  },
  {
    State: {
      links: [
        {
          text: "Chandigarh",
          href: "https://en.wikipedia.org/wiki/Chandigarh",
        },
      ],
      text: "Chandigarh",
    },
    iso_code: {
      links: [],
      text: "IN-CH",
    },
    vehicle_code: {
      links: [],
      text: "CH",
    },
    Zone: {
      links: [
        {
          text: "Northern",
          href: "https://en.wikipedia.org/wiki/Northern_Zonal_Council",
        },
      ],
      text: "Northern",
    },
    Capital: {
      links: [
        {
          text: "Chandigarh",
          href: "https://en.wikipedia.org/wiki/Chandigarh",
        },
      ],
      text: "Chandigarh",
    },
    "Largest city": {
      links: [
        {
          text: "Chandigarh",
          href: "https://en.wikipedia.org/wiki/Chandigarh",
        },
      ],
      text: "Chandigarh",
    },
    established_on: {
      links: [],
      text: "1 November 1966",
    },
    "Population\n(2011)": {
      links: [],
      text: "1,055,450",
    },
    "Area\n(km)": {
      links: [],
      text: "114",
    },
    "Official\nlanguages": {
      links: [
        {
          text: "English",
          href: "https://en.wikipedia.org/wiki/English_language",
        },
      ],
      text: "English",
    },
    "Additional official\nlanguages": {
      links: [],
      text: "—",
    },
  },
  {
    State: {
      links: [
        {
          text: "Dadra and Nagar Haveli and Daman and Diu",
          href: "https://en.wikipedia.org/wiki/Dadra_and_Nagar_Haveli_and_Daman_and_Diu",
        },
      ],
      text: "Dadra and Nagar Haveli and Daman and Diu",
    },
    iso_code: {
      links: [],
      text: "IN-DH",
    },
    vehicle_code: {
      links: [],
      text: "DD",
    },
    Zone: {
      links: [
        {
          text: "Western",
          href: "https://en.wikipedia.org/wiki/Western_Zonal_Council",
        },
      ],
      text: "Western",
    },
    Capital: {
      links: [
        {
          text: "Daman",
          href: "https://en.wikipedia.org/wiki/Daman,_India",
        },
      ],
      text: "Daman",
    },
    "Largest city": {
      links: [
        {
          text: "Silvassa",
          href: "https://en.wikipedia.org/wiki/Silvassa",
        },
      ],
      text: "Silvassa",
    },
    established_on: {
      links: [],
      text: "26 January 2020",
    },
    "Population\n(2011)": {
      links: [],
      text: "587,106",
    },
    "Area\n(km)": {
      links: [],
      text: "603",
    },
    "Official\nlanguages": {
      links: [],
      text: "Hindi, English",
    },
    "Additional official\nlanguages": {
      links: [
        {
          text: "Gujarati",
          href: "https://en.wikipedia.org/wiki/Gujarati_language",
        },
      ],
      text: "Gujarati",
    },
  },
  {
    State: {
      links: [
        {
          text: "Delhi",
          href: "https://en.wikipedia.org/wiki/Delhi",
        },
      ],
      text: "Delhi",
    },
    iso_code: {
      links: [],
      text: "IN-DL",
    },
    vehicle_code: {
      links: [],
      text: "DL",
    },
    Zone: {
      links: [
        {
          text: "Northern",
          href: "https://en.wikipedia.org/wiki/Northern_Zonal_Council",
        },
      ],
      text: "Northern",
    },
    Capital: {
      links: [
        {
          text: "New Delhi",
          href: "https://en.wikipedia.org/wiki/New_Delhi",
        },
      ],
      text: "New Delhi",
    },
    "Largest city": {
      links: [
        {
          text: "Delhi",
          href: "https://en.wikipedia.org/wiki/Delhi",
        },
      ],
      text: "Delhi",
    },
    established_on: {
      links: [],
      text: "1 November 1956",
    },
    "Population\n(2011)": {
      links: [],
      text: "16,787,941",
    },
    "Area\n(km)": {
      links: [],
      text: "1,484",
    },
    "Official\nlanguages": {
      links: [
        {
          text: "Hindi",
          href: "https://en.wikipedia.org/wiki/Hindi",
        },
        {
          text: "English",
          href: "https://en.wikipedia.org/wiki/English_language",
        },
      ],
      text: "Hindi, English",
    },
    "Additional official\nlanguages": {
      links: [
        {
          text: "Urdu",
          href: "https://en.wikipedia.org/wiki/Urdu",
        },
        {
          text: "Punjabi",
          href: "https://en.wikipedia.org/wiki/Punjabi_language",
        },
      ],
      text: "Urdu, Punjabi",
    },
  },
  {
    State: {
      links: [
        {
          text: "Jammu and Kashmir",
          href: "https://en.wikipedia.org/wiki/Jammu_and_Kashmir_(union_territory)",
        },
      ],
      text: "Jammu and Kashmir",
    },
    iso_code: {
      links: [],
      text: "IN-JK",
    },
    vehicle_code: {
      links: [],
      text: "JK",
    },
    Zone: {
      links: [
        {
          text: "Northern",
          href: "https://en.wikipedia.org/wiki/Northern_Zonal_Council",
        },
      ],
      text: "Northern",
    },
    Capital: {
      links: [
        {
          text: "Srinagar",
          href: "https://en.wikipedia.org/wiki/Srinagar",
        },
        {
          text: "Jammu",
          href: "https://en.wikipedia.org/wiki/Jammu",
        },
      ],
      text: "Srinagar (Summer)\nJammu (Winter)",
    },
    "Largest city": {
      links: [
        {
          text: "Srinagar",
          href: "https://en.wikipedia.org/wiki/Srinagar",
        },
      ],
      text: "Srinagar",
    },
    established_on: {
      links: [],
      text: "31 October 2019",
    },
    "Population\n(2011)": {
      links: [],
      text: "12,258,433",
    },
    "Area\n(km)": {
      links: [],
      text: "42,241",
    },
    "Official\nlanguages": {
      links: [
        {
          text: "Dogri",
          href: "https://en.wikipedia.org/wiki/Dogri_language",
        },
        {
          text: "Kashmiri",
          href: "https://en.wikipedia.org/wiki/Kashmiri_language",
        },
        {
          text: "Urdu",
          href: "https://en.wikipedia.org/wiki/Urdu_language",
        },
      ],
      text: "Dogri, English, Hindi, Kashmiri, Urdu",
    },
    "Additional official\nlanguages": {
      links: [],
      text: "—",
    },
  },
  {
    State: {
      links: [
        {
          text: "Ladakh",
          href: "https://en.wikipedia.org/wiki/Ladakh",
        },
      ],
      text: "Ladakh",
    },
    iso_code: {
      links: [],
      text: "IN-LA",
    },
    vehicle_code: {
      links: [],
      text: "LA",
    },
    Zone: {
      links: [
        {
          text: "Northern",
          href: "https://en.wikipedia.org/wiki/Northern_Zonal_Council",
        },
      ],
      text: "Northern",
    },
    Capital: {
      links: [
        {
          text: "Leh",
          href: "https://en.wikipedia.org/wiki/Leh",
        },
        {
          text: "Kargil",
          href: "https://en.wikipedia.org/wiki/Kargil",
        },
      ],
      text: "Leh (Summer)\nKargil (Winter)",
    },
    "Largest city": {
      links: [
        {
          text: "Leh",
          href: "https://en.wikipedia.org/wiki/Leh",
        },
      ],
      text: "Leh",
    },
    established_on: {
      links: [],
      text: "31 October 2019",
    },
    "Population\n(2011)": {
      links: [],
      text: "290,492",
    },
    "Area\n(km)": {
      links: [],
      text: "59,146",
    },
    "Official\nlanguages": {
      links: [
        {
          text: "Hindi",
          href: "https://en.wikipedia.org/wiki/Hindi",
        },
        {
          text: "English",
          href: "https://en.wikipedia.org/wiki/English_language",
        },
      ],
      text: "Hindi, English",
    },
    "Additional official\nlanguages": {
      links: [],
      text: "—",
    },
  },
  {
    State: {
      links: [
        {
          text: "Lakshadweep",
          href: "https://en.wikipedia.org/wiki/Lakshadweep",
        },
      ],
      text: "Lakshadweep",
    },
    iso_code: {
      links: [],
      text: "IN-LD",
    },
    vehicle_code: {
      links: [],
      text: "LD",
    },
    Zone: {
      links: [
        {
          text: "Southern",
          href: "https://en.wikipedia.org/wiki/Southern_Zonal_Council",
        },
      ],
      text: "Southern",
    },
    Capital: {
      links: [
        {
          text: "Kavaratti",
          href: "https://en.wikipedia.org/wiki/Kavaratti",
        },
      ],
      text: "Kavaratti",
    },
    "Largest city": {
      links: [
        {
          text: "Kavaratti",
          href: "https://en.wikipedia.org/wiki/Kavaratti",
        },
      ],
      text: "Kavaratti",
    },
    established_on: {
      links: [],
      text: "1 November 1956",
    },
    "Population\n(2011)": {
      links: [],
      text: "64,473",
    },
    "Area\n(km)": {
      links: [],
      text: "32",
    },
    "Official\nlanguages": {
      links: [
        {
          text: "Hindi",
          href: "https://en.wikipedia.org/wiki/Hindi",
        },
        {
          text: "English",
          href: "https://en.wikipedia.org/wiki/English_language",
        },
      ],
      text: "Hindi, English",
    },
    "Additional official\nlanguages": {
      links: [
        {
          text: "Malayalam",
          href: "https://en.wikipedia.org/wiki/Malayalam_language",
        },
      ],
      text: "Malayalam",
    },
  },
  {
    State: {
      links: [
        {
          text: "Puducherry",
          href: "https://en.wikipedia.org/wiki/Puducherry_(union_territory)",
        },
      ],
      text: "Puducherry",
    },
    iso_code: {
      links: [],
      text: "IN-PY",
    },
    vehicle_code: {
      links: [],
      text: "PY",
    },
    Zone: {
      links: [
        {
          text: "Southern",
          href: "https://en.wikipedia.org/wiki/Southern_Zonal_Council",
        },
      ],
      text: "Southern",
    },
    Capital: {
      links: [
        {
          text: "Pondicherry",
          href: "https://en.wikipedia.org/wiki/Pondicherry",
        },
      ],
      text: "Pondicherry",
    },
    "Largest city": {
      links: [
        {
          text: "Pondicherry",
          href: "https://en.wikipedia.org/wiki/Pondicherry",
        },
      ],
      text: "Pondicherry",
    },
    established_on: {
      links: [],
      text: "16 August 1962",
    },
    "Population\n(2011)": {
      links: [],
      text: "1,247,953",
    },
    "Area\n(km)": {
      links: [],
      text: "479",
    },
    "Official\nlanguages": {
      links: [
        {
          text: "Tamil",
          href: "https://en.wikipedia.org/wiki/Tamil_language",
        },
        {
          text: "French",
          href: "https://en.wikipedia.org/wiki/French_language",
        },
        {
          text: "English",
          href: "https://en.wikipedia.org/wiki/English_language",
        },
      ],
      text: "Tamil, French, English",
    },
    "Additional official\nlanguages": {
      links: [
        {
          text: "Telugu",
          href: "https://en.wikipedia.org/wiki/Telugu_language",
        },
        {
          text: "Malayalam",
          href: "https://en.wikipedia.org/wiki/Malayalam_language",
        },
      ],
      text: "Telugu, Malayalam",
    },
  },
];

module.exports = {
  states,
  uts,
};
