import { districtVCs } from "../../../districts/andhra-pradesh/ap.districts-vcs";
import { allDistricts } from "./districts";
import { vidhansabhaConstituencies } from "./vidhan-sabha";

export let allAPLoksabha = {
  Srikakulam: { name: "Srikakulam", href: "https://en.wikipedia.org/wiki/Srikakulam_(Lok_Sabha_constituency)" },
  Vizianagaram: { name: "Vizianagaram", href: "https://en.wikipedia.org/wiki/Vizianagaram_(Lok_Sabha_constituency)" },
  Araku: { name: "Araku", href: "https://en.wikipedia.org/wiki/Araku_Lok_Sabha_constituency" },
  Visakhapatnam: { name: "Visakhapatnam", href: "https://en.wikipedia.org/wiki/Visakhapatnam_Lok_Sabha_constituency" },
  Anakapalli: { name: "Anakapalli", href: "https://en.wikipedia.org/wiki/Anakapalli_(Lok_Sabha_constituency)" },
  Kakinada: { name: "Kakinada", href: "https://en.wikipedia.org/wiki/Kakinada_Lok_Sabha_constituency" },
  Rajamahendravaram: {
    name: "Rajamahendravaram",
    href: "https://en.wikipedia.org/wiki/Rajahmundry_Lok_Sabha_constituency",
  },
  Amalapuram: { name: "Amalapuram", href: "https://en.wikipedia.org/wiki/Amalapuram_(Lok_Sabha_constituency)" },
  Eluru: { name: "Eluru", href: "https://en.wikipedia.org/wiki/Eluru_Lok_Sabha_constituency" },
  Narasapuram: { name: "Narasapuram", href: "https://en.wikipedia.org/wiki/Narasapuram_Lok_Sabha_constituency" },
  Machillipatnam: {
    name: "Machillipatnam",
    href: "https://en.wikipedia.org/wiki/Machilipatnam_Lok_Sabha_constituency",
  },
  Vijayawada: { name: "Vijayawada", href: "https://en.wikipedia.org/wiki/Vijayawada_(Lok_Sabha_constituency)" },
  Machilipatnam: { name: "Machilipatnam", href: "https://en.wikipedia.org/wiki/Machilipatnam_Lok_Sabha_constituency" },
  Guntur: { name: "Guntur", href: "https://en.wikipedia.org/wiki/Guntur_Lok_Sabha_constituency" },
  Narasaraopet: { name: "Narasaraopet", href: "https://en.wikipedia.org/wiki/Narasaraopet_(Lok_Sabha_constituency)" },
  Bapatla: { name: "Bapatla", href: "https://en.wikipedia.org/wiki/Bapatla_Lok_Sabha_constituency" },
  Ongole: { name: "Ongole", href: "https://en.wikipedia.org/wiki/Ongole_Lok_Sabha_constituency" },
  Nellore: { name: "Nellore", href: "https://en.wikipedia.org/wiki/Nellore_Lok_Sabha_constituency" },
  Tirupati: { name: "Tirupati", href: "https://en.wikipedia.org/wiki/Tirupati_Lok_Sabha_constituency" },
  Kurnool: { name: "Kurnool", href: "https://en.wikipedia.org/wiki/Kurnool_Lok_Sabha_constituency" },
  Nandyal: { name: "Nandyal", href: "https://en.wikipedia.org/wiki/Nandyal_(Lok_Sabha_constituency)" },
  Kadapa: { name: "Kadapa", href: "https://en.wikipedia.org/wiki/Kadapa_(Lok_Sabha_constituency)" },
  Rajampet: { name: "Rajampet", href: "https://en.wikipedia.org/wiki/Rajampet_Lok_Sabha_constituency" },
  Anantapuram: { name: "Anantapuram", href: "https://en.wikipedia.org/wiki/Anantapur_Lok_Sabha_constituency" },
  Hindupuram: { name: "Hindupuram", href: "https://en.wikipedia.org/wiki/Hindupur_Lok_Sabha_constituency" },
  Chittoor: { name: "Chittoor", href: "https://en.wikipedia.org/wiki/Chittoor_Lok_Sabha_constituency" },
};

function getLoksabhaConstituencies() {
  let ls: any = {};

  vidhansabhaConstituencies.forEach((vc: any) => {
    if (!ls[vc.loksabha_constituency.name]) {
      ls[vc.loksabha_constituency.name] = vc.loksabha_constituency;
    }
  });

  console.log(JSON.stringify(ls));
}

getLoksabhaConstituencies();
