import { updateNodeType } from "../knowledge-graph/generic/generic.create";
import { createGraphQLClient } from "../knowledge-graph/generic/generic.utils";

const vc_state_regions = [
  {
    vc_region_name_id: "in-vc-ap-araku-valley-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-ichchapuram-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-palasa-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-tekkali-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-pathapatnam-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-srikakulam-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-amadalavalasa-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-narasannapeta-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-etcherla-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-parvathipuram-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-palakonda-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-kurupam-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-salur-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-rajam-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-bobbili-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-cheepurupalli-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-gajapathinagaram-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-nellimarla-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-vizianagaram-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-srungavarapukota-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-bheemili-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-visakhapatnam-east-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-visakhapatnam-west-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-visakhapatnam-north-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-visakhapatnam-south-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-gajuwaka-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-chodavaram-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-madugula-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-anakapalli-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-pendurthi-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-elamanchili-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-payakaraopet-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-narsipatnam-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-paderu-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-rampachodavaram-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-tuni-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-prathipadu-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-pithapuram-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-kakinada-rural-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-peddapuram-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-kakinada-city-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-jaggampeta-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-anaparthy-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-rajanagaram-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-rajamahendravaram-city-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-rajamahendravaram-rural-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-kovvur-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-nidadavole-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-gopalapuram-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-ramachandrapuram-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-mummidivaram-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-amalapuram-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-razole-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-gannavaram-1-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-kothapeta-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-mandapeta-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-unguturu-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-denduluru-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-eluru-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-polavaram-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-chintalapudi-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-nuzvid-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-kaikalur-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-achanta-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-palakollu-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-narasapuram-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-bhimavaram-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-undi-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-tanuku-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-tadepalligudem-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-gannavaram-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-tiruvuru-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-vijayawada-west-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-vijayawada-central-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-vijayawada-east-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-mylavaram-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-nandigama-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-jaggayyapeta-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-gudivada-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-pedana-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-machilipatnam-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-avanigadda-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-pamarru-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-penamaluru-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-tadikonda-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-mangalagiri-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-ponnur-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-tenali-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-prathipadu-1-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-guntur-west-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-guntur-east-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-pedakurapadu-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-chilakaluripeta-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-narasaraopeta-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-sattenapalle-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-vinukonda-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-gurajala-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-macherla-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-vemuru-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-repalle-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-bapatla-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-parchur-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-addanki-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-chirala-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-santhanuthalapadu-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-yerragondapalem-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-darsi-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-ongole-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-kondapi-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-markapuram-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-giddalur-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-kanigiri-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-kandukur-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-kavali-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-atmakur-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-kovuru-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-nellore-city-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-nellore-rural-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-udayagiri-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-sarvepalli-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-kurnool-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-kodumur-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-yemmiganur-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-mantralayam-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-adoni-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-alur-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-pattikonda-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-allagadda-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-srisailam-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-nandikotkur-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-nandyal-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-banaganapalle-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-dhone-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-panyam-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-badvel-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-jammalamadugu-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-kadapa-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-kamalapuram-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-mydukur-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-proddatur-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-pulivendula-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-rajampet-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-rayadurgam-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-uravakonda-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-guntakallu-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-tadpatri-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-singanamala-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-anantapuram-urban-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-kalyandurgam-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-raptadu-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-madakasira-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-hindupuram-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-penukonda-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-puttaparthi-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-dharmavaram-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-kadiri-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-kodur-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-rayachoti-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-thamballapalle-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-pileru-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-madanapalle-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-chandragiri-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-tirupati-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-sullurpeta-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-venkatagiri-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-guduru-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-srikalahasti-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-satyavedu-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-nagari-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-gangadhara-nellore-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-chittoor-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-puthalapattu-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-palamaner-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-kuppam-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ap-punganur-region",
    state_region_name_id: "in-sut-andhra-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-tg-sirpur-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-chennur-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-bellampalli-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-mancherial-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-asifabad-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-khanapur-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-adilabad-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-boath-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-nirmal-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-mudhole-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-armur-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-bodhan-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-jukkal-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-banswada-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-yellareddy-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-kamareddy-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-nizamabad-urban-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-nizamabad-rural-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-balkonda-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-koratla-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-jagtial-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-dharmapuri-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-ramagundam-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-manthani-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-peddapalle-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-karimnagar-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-choppadandi-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-vemulawada-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-sircilla-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-manakondur-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-huzurabad-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-husnabad-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-siddipet-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-medak-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-narayankhed-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-andole-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-narsapur-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-zahirabad-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-sangareddy-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-patancheru-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-dubbak-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-gajwel-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-medchal-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-malkajgiri-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-quthbullapur-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-kukatpally-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-uppal-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-ibrahimpatnam-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-lal-bahadur-nagar-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-maheshwaram-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-rajendranagar-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-serilingampally-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-chevella-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-pargi-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-vikarabad-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-tandur-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-musheerabad-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-malakpet-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-amberpet-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-khairatabad-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-jubilee-hills-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-sanathnagar-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-nampally-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-karwan-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-goshamahal-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-charminar-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-chandrayangutta-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-yakutpura-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-bahadurpura-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-secunderabad-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-secunderabad-cantonment-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-kodangal-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-narayanpet-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-mahbubnagar-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-jadcherla-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-devarkadra-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-makthal-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-wanaparthy-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-gadwal-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-alampur-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-nagarkurnool-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-achampet-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-kalwakurthy-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-shadnagar-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-kollapur-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-devarakonda-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-nagarjuna-sagar-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-miryalaguda-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-huzurnagar-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-kodad-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-suryapet-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-nalgonda-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-munugode-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-bhongir-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-nakrekal-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-thungathurthi-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-alair-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-jangaon-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-ghanpur-station-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-palakurthi-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-dornakal-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-mahabubabad-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-narsampet-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-parkal-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-warangal-west-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-warangal-east-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-waradhanapet-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-bhupalpalle-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-mulug-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-pinapaka-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-yellandu-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-khammam-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-palair-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-madhira-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-wyra-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-sathupalli-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-kothagudem-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-aswaraopeta-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-tg-bhadrachalam-region",
    state_region_name_id: "in-sut-telangana-region",
  },
  {
    vc_region_name_id: "in-vc-ar-lumla-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-tawang-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-mukto-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-dirang-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-kalaktang-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-thrizino-buragaon-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-bomdila-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-bameng-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-chayangtajo-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-seppa-east-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-seppa-west-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-pakke-kessang-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-itanagar-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-doimukh-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-sagalee-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-yachuli-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-ziro–hapoli-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-palin-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-nyapin-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-tali-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-koloriang-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-nacho-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-taliha-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-daporijo-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-raga-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-dumporijo-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-liromoba-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-likabali-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-basar-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-along-west-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-along-east-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-rumgong-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-mechuka-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-tuting–yingkiong-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-pangin-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-nari-koyu-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-pasighat-west-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-pasighat-east-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-mebo-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-mariyang-geku-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-anini-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-dambuk-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-roing-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-tezu-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-hayuliang-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-chowkham-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-namsai-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-lekang-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-bordumsa-diyun-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-miao-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-nampong-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-changlang-south-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-changlang-north-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-namsang-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-khonsa-east-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-khonsa-west-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-borduria–bagapani-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-kanubari-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-longding–pumao-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-ar-pongchau-wakka-region",
    state_region_name_id: "in-sut-arunachal-pradesh-region",
  },
  {
    vc_region_name_id: "in-vc-as-ratabari-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-patharkandi-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-karimganj-north-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-karimganj-south-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-badarpur-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-hailakandi-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-katlicherra-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-algapur-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-silchar-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-sonai-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-dholai-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-udharbond-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-lakhipur-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-barkhola-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-katigorah-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-haflong-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-bokajan-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-howraghat-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-diphu-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-baithalangso-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-mankachar-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-salmara-south-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-dhubri-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-gauripur-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-golakganj-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-bilasipara-west-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-bilasipara-east-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-gossaigaon-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-kokrajhar-west-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-kokrajhar-east-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-sidli-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-bongaigaon-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-bijni-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-abhayapuri-north-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-abhayapuri-south-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-dudhnai-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-goalpara-east-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-goalpara-west-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-jaleswar-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-sorbhog-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-bhabanipur-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-patacharkuchi-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-barpeta-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-jania-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-baghbar-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-sarukhetri-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-chenga-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-boko-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-chaygaon-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-palasbari-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-jalukbari-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-dispur-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-gauhati-east-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-gauhati-west-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-hajo-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-kamalpur-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-rangiya-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-tamulpur-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-nalbari-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-barkhetry-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-dharmapur-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-barama-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-chapaguri-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-panery-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-kalaigaon-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-sipajhar-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-mangaldoi-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-dalgaon-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-udalguri-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-majbat-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-dhekiajuli-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-barchalla-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-tezpur-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-rangapara-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-sootea-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-biswanath-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-behali-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-gohpur-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-jagiroad-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-marigaon-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-laharighat-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-raha-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-dhing-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-batadroba-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-rupohihat-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-nowgong-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-barhampur-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-samaguri-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-kaliabor-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-jamunamukh-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-hojai-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-lumding-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-bokakhat-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-sarupathar-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-golaghat-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-khumtai-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-dergaon-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-jorhat-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-majuli-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-titabar-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-mariani-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-teok-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-amguri-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-nazira-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-mahmara-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-sonari-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-thowra-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-sibsagar-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-bihpuria-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-naoboicha-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-lakhimpur-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-dhakuakhana-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-dhemaji-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-jonai-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-moran-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-dibrugarh-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-lahowal-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-duliajan-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-tingkhong-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-naharkatia-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-chabua-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-tinsukia-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-digboi-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-margherita-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-doomdooma-region",
    state_region_name_id: "in-sut-assam-region",
  },
  {
    vc_region_name_id: "in-vc-as-sadiya-region",
    state_region_name_id: "in-sut-assam-region",
  },
];

const lc_state_regions = [
  {
    state_region_id: "in-sut-arunachal-pradesh-region",
    lc_region_id: "in-lc-ar-arunachal-west-region",
  },
  {
    state_region_id: "in-sut-arunachal-pradesh-region",
    lc_region_id: "in-lc-ar-arunachal-east-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    lc_region_id: "in-lc-tg-adilabad-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    lc_region_id: "in-lc-tg-peddapalli-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    lc_region_id: "in-lc-tg-nizamabad-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    lc_region_id: "in-lc-tg-zahirabad-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    lc_region_id: "in-lc-tg-karimnagar-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    lc_region_id: "in-lc-tg-medak-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    lc_region_id: "in-lc-tg-malkajgiri-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    lc_region_id: "in-lc-tg-bhongir-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    lc_region_id: "in-lc-tg-chevella-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    lc_region_id: "in-lc-tg-secunderabad-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    lc_region_id: "in-lc-tg-hyderabad-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    lc_region_id: "in-lc-tg-mahabubnagar-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    lc_region_id: "in-lc-tg-nagarkurnool-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    lc_region_id: "in-lc-tg-nalgonda-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    lc_region_id: "in-lc-tg-warangal-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    lc_region_id: "in-lc-tg-mahabubabad-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    lc_region_id: "in-lc-tg-khammam-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    lc_region_id: "in-lc-as-karimganj-region-1",
  },
  {
    state_region_id: "in-sut-assam-region",
    lc_region_id: "in-lc-as-karimganj-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    lc_region_id: "in-lc-as-silchar-region-1",
  },
  {
    state_region_id: "in-sut-assam-region",
    lc_region_id: "in-lc-as-silchar-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    lc_region_id: "in-lc-as-diphu-region-1",
  },
  {
    state_region_id: "in-sut-assam-region",
    lc_region_id: "in-lc-as-dhubri-region-1",
  },
  {
    state_region_id: "in-sut-assam-region",
    lc_region_id: "in-lc-as-dhubri-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    lc_region_id: "in-lc-as-kokrajhar-region-1",
  },
  {
    state_region_id: "in-sut-assam-region",
    lc_region_id: "in-lc-as-kokrajhar-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    lc_region_id: "in-lc-as-barpeta-region-1",
  },
  {
    state_region_id: "in-sut-assam-region",
    lc_region_id: "in-lc-as-barpeta-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    lc_region_id: "in-lc-as-gauhati-region-1",
  },
  {
    state_region_id: "in-sut-assam-region",
    lc_region_id: "in-lc-as-gauhati-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    lc_region_id: "in-lc-as-nowgong-region-1",
  },
  {
    state_region_id: "in-sut-assam-region",
    lc_region_id: "in-lc-as-nowgong-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    lc_region_id: "in-lc-as-jorhat-region-1",
  },
  {
    state_region_id: "in-sut-assam-region",
    lc_region_id: "in-lc-as-jorhat-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    lc_region_id: "in-lc-as-lakhimpur-region-1",
  },
  {
    state_region_id: "in-sut-assam-region",
    lc_region_id: "in-lc-as-lakhimpur-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    lc_region_id: "in-lc-as-dibrugarh-region-1",
  },
  {
    state_region_id: "in-sut-assam-region",
    lc_region_id: "in-lc-as-dibrugarh-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    lc_region_id: "in-lc-as-mangaldoi-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    lc_region_id: "in-lc-as-tezpur-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    lc_region_id: "in-lc-as-kaliabor-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    lc_region_id: "in-lc-as-darrang-udalguri-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    lc_region_id: "in-lc-as-sonitpur-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    lc_region_id: "in-lc-as-kaziranga-region",
  },
];

const d_state_regions = [
  {
    state_region_id: "in-sut-arunachal-pradesh-region",
    d_region_id: "in-d-ar-bichom-region",
  },
  {
    state_region_id: "in-sut-arunachal-pradesh-region",
    d_region_id: "in-d-ar-keyi-panyor-region",
  },
  {
    state_region_id: "in-sut-arunachal-pradesh-region",
    d_region_id: "in-d-ar-tawang-region",
  },
  {
    state_region_id: "in-sut-arunachal-pradesh-region",
    d_region_id: "in-d-ar-west-kameng-region",
  },
  {
    state_region_id: "in-sut-arunachal-pradesh-region",
    d_region_id: "in-d-ar-east-kameng-region",
  },
  {
    state_region_id: "in-sut-arunachal-pradesh-region",
    d_region_id: "in-d-ar-pakke-kessang-region",
  },
  {
    state_region_id: "in-sut-arunachal-pradesh-region",
    d_region_id: "in-d-ar-papum-pare-region",
  },
  {
    state_region_id: "in-sut-arunachal-pradesh-region",
    d_region_id: "in-d-ar-lower-subansiri-region",
  },
  {
    state_region_id: "in-sut-arunachal-pradesh-region",
    d_region_id: "in-d-ar-kra-daadi-region",
  },
  {
    state_region_id: "in-sut-arunachal-pradesh-region",
    d_region_id: "in-d-ar-kurung-kumey-region",
  },
  {
    state_region_id: "in-sut-arunachal-pradesh-region",
    d_region_id: "in-d-ar-upper-subansiri-region",
  },
  {
    state_region_id: "in-sut-arunachal-pradesh-region",
    d_region_id: "in-d-ar-kamle-region",
  },
  {
    state_region_id: "in-sut-arunachal-pradesh-region",
    d_region_id: "in-d-ar-west-siang-region",
  },
  {
    state_region_id: "in-sut-arunachal-pradesh-region",
    d_region_id: "in-d-ar-lower-siang-region",
  },
  {
    state_region_id: "in-sut-arunachal-pradesh-region",
    d_region_id: "in-d-ar-lepa-rada-region",
  },
  {
    state_region_id: "in-sut-arunachal-pradesh-region",
    d_region_id: "in-d-ar-siang-district-region",
  },
  {
    state_region_id: "in-sut-arunachal-pradesh-region",
    d_region_id: "in-d-ar-shi-yomi-region",
  },
  {
    state_region_id: "in-sut-arunachal-pradesh-region",
    d_region_id: "in-d-ar-upper-siang-region",
  },
  {
    state_region_id: "in-sut-arunachal-pradesh-region",
    d_region_id: "in-d-ar-east-siang-region",
  },
  {
    state_region_id: "in-sut-arunachal-pradesh-region",
    d_region_id: "in-d-ar-dibang-valley-region",
  },
  {
    state_region_id: "in-sut-arunachal-pradesh-region",
    d_region_id: "in-d-ar-lower-dibang-valley-region",
  },
  {
    state_region_id: "in-sut-arunachal-pradesh-region",
    d_region_id: "in-d-ar-lohit-region",
  },
  {
    state_region_id: "in-sut-arunachal-pradesh-region",
    d_region_id: "in-d-ar-anjaw-region",
  },
  {
    state_region_id: "in-sut-arunachal-pradesh-region",
    d_region_id: "in-d-ar-namsai-region",
  },
  {
    state_region_id: "in-sut-arunachal-pradesh-region",
    d_region_id: "in-d-ar-changlang-region",
  },
  {
    state_region_id: "in-sut-arunachal-pradesh-region",
    d_region_id: "in-d-ar-tirap-region",
  },
  {
    state_region_id: "in-sut-arunachal-pradesh-region",
    d_region_id: "in-d-ar-longding-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    d_region_id: "in-d-tg-komaram-bheem-asifabad-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    d_region_id: "in-d-tg-mancherial-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    d_region_id: "in-d-tg-adilabad-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    d_region_id: "in-d-tg-nirmal-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    d_region_id: "in-d-tg-nizamabad-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    d_region_id: "in-d-tg-kamareddy-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    d_region_id: "in-d-tg-jagtial-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    d_region_id: "in-d-tg-peddapalli-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    d_region_id: "in-d-tg-jayashankar-bhupalpally-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    d_region_id: "in-d-tg-karimnagar-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    d_region_id: "in-d-tg-rajanna-sircilla-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    d_region_id: "in-d-tg-siddipet-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    d_region_id: "in-d-tg-hanamkonda-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    d_region_id: "in-d-tg-medak-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    d_region_id: "in-d-tg-sangareddy-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    d_region_id: "in-d-tg-medchal-malkajgiri-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    d_region_id: "in-d-tg-ranga-reddy-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    d_region_id: "in-d-tg-vikarabad-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    d_region_id: "in-d-tg-mahbubnagar-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    d_region_id: "in-d-tg-hyderabad-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    d_region_id: "in-d-tg-narayanpet-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    d_region_id: "in-d-tg-wanaparthy-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    d_region_id: "in-d-tg-jogulamba-gadwal-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    d_region_id: "in-d-tg-nagarkurnool-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    d_region_id: "in-d-tg-nalgonda-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    d_region_id: "in-d-tg-suryapet-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    d_region_id: "in-d-tg-yadadri-bhuvanagiri-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    d_region_id: "in-d-tg-jangaon-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    d_region_id: "in-d-tg-mahbubabad-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    d_region_id: "in-d-tg-warangal-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    d_region_id: "in-d-tg-mulugu-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    d_region_id: "in-d-tg-bhadradri-kothagudem-region",
  },
  {
    state_region_id: "in-sut-telangana-region",
    d_region_id: "in-d-tg-khammam-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    d_region_id: "in-d-as-karimaganj-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    d_region_id: "in-d-as-hailakandi-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    d_region_id: "in-d-as-cachar-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    d_region_id: "in-d-as-dima-hasao-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    d_region_id: "in-d-as-karbi-anglong-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    d_region_id: "in-d-as-west-karbi-anglong-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    d_region_id: "in-d-as-south-salmara-mankachar-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    d_region_id: "in-d-as-dhubri-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    d_region_id: "in-d-as-kokrajhar-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    d_region_id: "in-d-as-chirang-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    d_region_id: "in-d-as-bongaigaon-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    d_region_id: "in-d-as-goalpara-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    d_region_id: "in-d-as-barpeta-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    d_region_id: "in-d-as-bajali-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    d_region_id: "in-d-as-kamrup-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    d_region_id: "in-d-as-kamrup-metro-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    d_region_id: "in-d-as-baksa-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    d_region_id: "in-d-as-nalbari-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    d_region_id: "in-d-as-udalguri-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    d_region_id: "in-d-as-darrang-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    d_region_id: "in-d-as-sonitpur-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    d_region_id: "in-d-as-biswanath-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    d_region_id: "in-d-as-marigaon-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    d_region_id: "in-d-as-nagaon-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    d_region_id: "in-d-as-hojai-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    d_region_id: "in-d-as-golaghat-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    d_region_id: "in-d-as-jorhat-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    d_region_id: "in-d-as-majuli-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    d_region_id: "in-d-as-sibsagar-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    d_region_id: "in-d-as-charaideo-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    d_region_id: "in-d-as-lakhimpur-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    d_region_id: "in-d-as-dhemaji-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    d_region_id: "in-d-as-dibrugarh-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    d_region_id: "in-d-as-tinsukia-region",
  },
  {
    state_region_id: "in-sut-assam-region",
    d_region_id: "in-d-as-tamulpur-region",
  },
  {
    state_region_id: "in-sut-andhra-pradesh-region",
    d_region_id: "in-d-ap-srikakulam-region",
  },
  {
    state_region_id: "in-sut-andhra-pradesh-region",
    d_region_id: "in-d-ap-parvathipuram-manyam-region",
  },
  {
    state_region_id: "in-sut-andhra-pradesh-region",
    d_region_id: "in-d-ap-vizianagaram-region",
  },
  {
    state_region_id: "in-sut-andhra-pradesh-region",
    d_region_id: "in-d-ap-visakhapatnam-region",
  },
  {
    state_region_id: "in-sut-andhra-pradesh-region",
    d_region_id: "in-d-ap-anakapalli-region",
  },
  {
    state_region_id: "in-sut-andhra-pradesh-region",
    d_region_id: "in-d-ap-alluri-sitharama-raju-region",
  },
  {
    state_region_id: "in-sut-andhra-pradesh-region",
    d_region_id: "in-d-ap-kakinada-region",
  },
  {
    state_region_id: "in-sut-andhra-pradesh-region",
    d_region_id: "in-d-ap-east-godavari-region",
  },
  {
    state_region_id: "in-sut-andhra-pradesh-region",
    d_region_id: "in-d-ap-konaseema-region",
  },
  {
    state_region_id: "in-sut-andhra-pradesh-region",
    d_region_id: "in-d-ap-eluru-region",
  },
  {
    state_region_id: "in-sut-andhra-pradesh-region",
    d_region_id: "in-d-ap-west-godavari-region",
  },
  {
    state_region_id: "in-sut-andhra-pradesh-region",
    d_region_id: "in-d-ap-ntr-region",
  },
  {
    state_region_id: "in-sut-andhra-pradesh-region",
    d_region_id: "in-d-ap-krishna-region",
  },
  {
    state_region_id: "in-sut-andhra-pradesh-region",
    d_region_id: "in-d-ap-guntur-region",
  },
  {
    state_region_id: "in-sut-andhra-pradesh-region",
    d_region_id: "in-d-ap-palnadu-region",
  },
  {
    state_region_id: "in-sut-andhra-pradesh-region",
    d_region_id: "in-d-ap-bapatla-region",
  },
  {
    state_region_id: "in-sut-andhra-pradesh-region",
    d_region_id: "in-d-ap-prakasam-region",
  },
  {
    state_region_id: "in-sut-andhra-pradesh-region",
    d_region_id: "in-d-ap-sri-potti-sriramulu-nellore-region",
  },
  {
    state_region_id: "in-sut-andhra-pradesh-region",
    d_region_id: "in-d-ap-kurnool-region",
  },
  {
    state_region_id: "in-sut-andhra-pradesh-region",
    d_region_id: "in-d-ap-nandyal-region",
  },
  {
    state_region_id: "in-sut-andhra-pradesh-region",
    d_region_id: "in-d-ap-y.s.r.-region",
  },
  {
    state_region_id: "in-sut-andhra-pradesh-region",
    d_region_id: "in-d-ap-anantpur-region",
  },
  {
    state_region_id: "in-sut-andhra-pradesh-region",
    d_region_id: "in-d-ap-sri-sathya-sai-region",
  },
  {
    state_region_id: "in-sut-andhra-pradesh-region",
    d_region_id: "in-d-ap-annamayya-region",
  },
  {
    state_region_id: "in-sut-andhra-pradesh-region",
    d_region_id: "in-d-ap-tirupati-region",
  },
  {
    state_region_id: "in-sut-andhra-pradesh-region",
    d_region_id: "in-d-ap-chittoor-region",
  },
  {
    state_region_id: "in-sut-andaman-nicobar-islands-region",
    d_region_id: "in-d-an-nicobar-region",
  },
  {
    state_region_id: "in-sut-andaman-nicobar-islands-region",
    d_region_id: "in-d-an-north-middle-andaman-region",
  },
  {
    state_region_id: "in-sut-andaman-nicobar-islands-region",
    d_region_id: "in-d-an-south-andaman-region",
  },
];

const d_osm = [
  {
    osm_id: null,
    d_region_name_id: "in-d-ap-srikakulam-region",
  },
  {
    osm_id: null,
    d_region_name_id: "in-d-ap-parvathipuram-manyam-region",
  },
  {
    osm_id: null,
    d_region_name_id: "in-d-ap-vizianagaram-region",
  },
  {
    osm_id: null,
    d_region_name_id: "in-d-ap-visakhapatnam-region",
  },
  {
    osm_id: null,
    d_region_name_id: "in-d-ap-anakapalli-region",
  },
  {
    osm_id: null,
    d_region_name_id: "in-d-ap-alluri-sitharama-raju-region",
  },
  {
    osm_id: null,
    d_region_name_id: "in-d-ap-kakinada-region",
  },
  {
    osm_id: null,
    d_region_name_id: "in-d-ap-east-godavari-region",
  },
  {
    osm_id: null,
    d_region_name_id: "in-d-ap-konaseema-region",
  },
  {
    osm_id: null,
    d_region_name_id: "in-d-ap-eluru-region",
  },
  {
    osm_id: null,
    d_region_name_id: "in-d-ap-west-godavari-region",
  },
  {
    osm_id: null,
    d_region_name_id: "in-d-ap-ntr-region",
  },
  {
    osm_id: null,
    d_region_name_id: "in-d-ap-krishna-region",
  },
  {
    osm_id: null,
    d_region_name_id: "in-d-ap-guntur-region",
  },
  {
    osm_id: null,
    d_region_name_id: "in-d-ap-palnadu-region",
  },
  {
    osm_id: null,
    d_region_name_id: "in-d-ap-bapatla-region",
  },
  {
    osm_id: null,
    d_region_name_id: "in-d-ap-prakasam-region",
  },
  {
    osm_id: null,
    d_region_name_id: "in-d-ap-sri-potti-sriramulu-nellore-region",
  },
  {
    osm_id: null,
    d_region_name_id: "in-d-ap-kurnool-region",
  },
  {
    osm_id: null,
    d_region_name_id: "in-d-ap-nandyal-region",
  },
  {
    osm_id: null,
    d_region_name_id: "in-d-ap-y.s.r.-region",
  },
  {
    osm_id: null,
    d_region_name_id: "in-d-ap-anantpur-region",
  },
  {
    osm_id: null,
    d_region_name_id: "in-d-ap-sri-sathya-sai-region",
  },
  {
    osm_id: null,
    d_region_name_id: "in-d-ap-annamayya-region",
  },
  {
    osm_id: null,
    d_region_name_id: "in-d-ap-tirupati-region",
  },
  {
    osm_id: null,
    d_region_name_id: "in-d-ap-chittoor-region",
  },
  {
    osm_id: "9515011",
    d_region_name_id: "in-d-an-nicobar-region",
  },
  {
    osm_id: "9515009",
    d_region_name_id: "in-d-an-north-middle-andaman-region",
  },
  {
    osm_id: "9515010",
    d_region_name_id: "in-d-an-south-andaman-region",
  },
  {
    osm_id: "7686917",
    d_region_name_id: "in-d-tg-komaram-bheem-asifabad-region",
  },
  {
    osm_id: "7686916",
    d_region_name_id: "in-d-tg-mancherial-region",
  },
  {
    osm_id: "2022179",
    d_region_name_id: "in-d-tg-adilabad-region",
  },
  {
    osm_id: "7686918",
    d_region_name_id: "in-d-tg-nirmal-region",
  },
  {
    osm_id: "2022213",
    d_region_name_id: "in-d-tg-nizamabad-region",
  },
  {
    osm_id: "7701043",
    d_region_name_id: "in-d-tg-kamareddy-region",
  },
  {
    osm_id: "7691427",
    d_region_name_id: "in-d-tg-jagtial-region",
  },
  {
    osm_id: "7691426",
    d_region_name_id: "in-d-tg-peddapalli-region",
  },
  {
    osm_id: "7698600",
    d_region_name_id: "in-d-tg-jayashankar-bhupalpally-region",
  },
  {
    osm_id: "2022180",
    d_region_name_id: "in-d-tg-karimnagar-region",
  },
  {
    osm_id: "7691428",
    d_region_name_id: "in-d-tg-rajanna-sircilla-region",
  },
  {
    osm_id: "7665824",
    d_region_name_id: "in-d-tg-siddipet-region",
  },
  {
    osm_id: "2022181",
    d_region_name_id: "in-d-tg-hanamkonda-region",
  },
  {
    osm_id: "2022212",
    d_region_name_id: "in-d-tg-medak-region",
  },
  {
    osm_id: "7663387",
    d_region_name_id: "in-d-tg-sangareddy-region",
  },
  {
    osm_id: "7664883",
    d_region_name_id: "in-d-tg-medchal-malkajgiri-region",
  },
  {
    osm_id: "2022214",
    d_region_name_id: "in-d-tg-ranga-reddy-region",
  },
  {
    osm_id: "7685040",
    d_region_name_id: "in-d-tg-vikarabad-region",
  },
  {
    osm_id: "2022227",
    d_region_name_id: "in-d-tg-mahbubnagar-region",
  },
  {
    osm_id: "7255986",
    d_region_name_id: "in-d-tg-hyderabad-region",
  },
  {
    osm_id: "9502953",
    d_region_name_id: "in-d-tg-narayanpet-region",
  },
  {
    osm_id: "7700765",
    d_region_name_id: "in-d-tg-wanaparthy-region",
  },
  {
    osm_id: "7666146",
    d_region_name_id: "in-d-tg-jogulamba-gadwal-region",
  },
  {
    osm_id: "7700442",
    d_region_name_id: "in-d-tg-nagarkurnool-region",
  },
  {
    osm_id: "2022221",
    d_region_name_id: "in-d-tg-nalgonda-region",
  },
  {
    osm_id: "7699215",
    d_region_name_id: "in-d-tg-suryapet-region",
  },
  {
    osm_id: "7700443",
    d_region_name_id: "in-d-tg-yadadri-bhuvanagiri-region",
  },
  {
    osm_id: "7666379",
    d_region_name_id: "in-d-tg-jangaon-region",
  },
  {
    osm_id: "7699117",
    d_region_name_id: "in-d-tg-mahbubabad-region",
  },
  {
    osm_id: "7666378",
    d_region_name_id: "in-d-tg-warangal-region",
  },
  {
    osm_id: "9502792",
    d_region_name_id: "in-d-tg-mulugu-region",
  },
  {
    osm_id: "7698599",
    d_region_name_id: "in-d-tg-bhadradri-kothagudem-region",
  },
  {
    osm_id: "2022134",
    d_region_name_id: "in-d-tg-khammam-region",
  },
  {
    osm_id: null,
    d_region_name_id: "in-d-ar-bichom-region",
  },
  {
    osm_id: null,
    d_region_name_id: "in-d-ar-keyi-panyor-region",
  },
  {
    osm_id: "3841145",
    d_region_name_id: "in-d-ar-tawang-region",
  },
  {
    osm_id: "3841146",
    d_region_name_id: "in-d-ar-west-kameng-region",
  },
  {
    osm_id: "2027347",
    d_region_name_id: "in-d-ar-east-kameng-region",
  },
  {
    osm_id: "10062837",
    d_region_name_id: "in-d-ar-pakke-kessang-region",
  },
  {
    osm_id: "2027348",
    d_region_name_id: "in-d-ar-papum-pare-region",
  },
  {
    osm_id: "2027356",
    d_region_name_id: "in-d-ar-lower-subansiri-region",
  },
  {
    osm_id: "9516234",
    d_region_name_id: "in-d-ar-kra-daadi-region",
  },
  {
    osm_id: "3841144",
    d_region_name_id: "in-d-ar-kurung-kumey-region",
  },
  {
    osm_id: "2027358",
    d_region_name_id: "in-d-ar-upper-subansiri-region",
  },
  {
    osm_id: "9516226",
    d_region_name_id: "in-d-ar-kamle-region",
  },
  {
    osm_id: "2027359",
    d_region_name_id: "in-d-ar-west-siang-region",
  },
  {
    osm_id: "9516096",
    d_region_name_id: "in-d-ar-lower-siang-region",
  },
  {
    osm_id: "9516097",
    d_region_name_id: "in-d-ar-lepa-rada-region",
  },
  {
    osm_id: "9516098",
    d_region_name_id: "in-d-ar-siang-district-region",
  },
  {
    osm_id: "9516095",
    d_region_name_id: "in-d-ar-shi-yomi-region",
  },
  {
    osm_id: "2027436",
    d_region_name_id: "in-d-ar-upper-siang-region",
  },
  {
    osm_id: "2027435",
    d_region_name_id: "in-d-ar-east-siang-region",
  },
  {
    osm_id: "2027456",
    d_region_name_id: "in-d-ar-dibang-valley-region",
  },
  {
    osm_id: "9515443",
    d_region_name_id: "in-d-ar-lower-dibang-valley-region",
  },
  {
    osm_id: "2027457",
    d_region_name_id: "in-d-ar-lohit-region",
  },
  {
    osm_id: "9515358",
    d_region_name_id: "in-d-ar-anjaw-region",
  },
  {
    osm_id: "9515359",
    d_region_name_id: "in-d-ar-namsai-region",
  },
  {
    osm_id: "2027455",
    d_region_name_id: "in-d-ar-changlang-region",
  },
  {
    osm_id: "2027458",
    d_region_name_id: "in-d-ar-tirap-region",
  },
  {
    osm_id: "9516202",
    d_region_name_id: "in-d-ar-longding-region",
  },
  {
    osm_id: "2026005",
    d_region_name_id: "in-d-as-karimaganj-region",
  },
  {
    osm_id: "2026004",
    d_region_name_id: "in-d-as-hailakandi-region",
  },
  {
    osm_id: "2025971",
    d_region_name_id: "in-d-as-cachar-region",
  },
  {
    osm_id: "2025931",
    d_region_name_id: "in-d-as-dima-hasao-region",
  },
  {
    osm_id: "2025924",
    d_region_name_id: "in-d-as-karbi-anglong-region",
  },
  {
    osm_id: "9521812",
    d_region_name_id: "in-d-as-west-karbi-anglong-region",
  },
  {
    osm_id: "9522272",
    d_region_name_id: "in-d-as-south-salmara-mankachar-region",
  },
  {
    osm_id: "2025887",
    d_region_name_id: "in-d-as-dhubri-region",
  },
  {
    osm_id: "1789229",
    d_region_name_id: "in-d-as-kokrajhar-region",
  },
  {
    osm_id: "9521711",
    d_region_name_id: "in-d-as-chirang-region",
  },
  {
    osm_id: "1791154",
    d_region_name_id: "in-d-as-bongaigaon-region",
  },
  {
    osm_id: "2025888",
    d_region_name_id: "in-d-as-goalpara-region",
  },
  {
    osm_id: "1791158",
    d_region_name_id: "in-d-as-barpeta-region",
  },
  {
    osm_id: "16704179",
    d_region_name_id: "in-d-as-bajali-region",
  },
  {
    osm_id: "1791256",
    d_region_name_id: "in-d-as-kamrup-region",
  },
  {
    osm_id: "9521878",
    d_region_name_id: "in-d-as-kamrup-metro-region",
  },
  {
    osm_id: "9521712",
    d_region_name_id: "in-d-as-baksa-region",
  },
  {
    osm_id: "1791238",
    d_region_name_id: "in-d-as-nalbari-region",
  },
  {
    osm_id: "9521466",
    d_region_name_id: "in-d-as-udalguri-region",
  },
  {
    osm_id: "1791255",
    d_region_name_id: "in-d-as-darrang-region",
  },
  {
    osm_id: "2026041",
    d_region_name_id: "in-d-as-sonitpur-region",
  },
  {
    osm_id: "16701825",
    d_region_name_id: "in-d-as-biswanath-region",
  },
  {
    osm_id: "2025921",
    d_region_name_id: "in-d-as-marigaon-region",
  },
  {
    osm_id: "2025972",
    d_region_name_id: "in-d-as-nagaon-region",
  },
  {
    osm_id: "16701845",
    d_region_name_id: "in-d-as-hojai-region",
  },
  {
    osm_id: "2026354",
    d_region_name_id: "in-d-as-golaghat-region",
  },
  {
    osm_id: "2026355",
    d_region_name_id: "in-d-as-jorhat-region",
  },
  {
    osm_id: "9521299",
    d_region_name_id: "in-d-as-majuli-region",
  },
  {
    osm_id: "2026443",
    d_region_name_id: "in-d-as-sibsagar-region",
  },
  {
    osm_id: "9521247",
    d_region_name_id: "in-d-as-charaideo-region",
  },
  {
    osm_id: "2026356",
    d_region_name_id: "in-d-as-lakhimpur-region",
  },
  {
    osm_id: "2026407",
    d_region_name_id: "in-d-as-dhemaji-region",
  },
  {
    osm_id: "2026441",
    d_region_name_id: "in-d-as-dibrugarh-region",
  },
  {
    osm_id: "2026439",
    d_region_name_id: "in-d-as-tinsukia-region",
  },
  {
    osm_id: "16702229",
    d_region_name_id: "in-d-as-tamulpur-region",
  },
];

(async () => {
  const graphQLClient = await createGraphQLClient();
  for (let d of d_osm) {
    const id = await updateNodeType("_Indian_District_Region_", graphQLClient, {
      filter: { name_id: { eq: d.d_region_name_id } },
      set: {
        osm_id: d.osm_id,
      },
    });
    console.log(id);
  }
})();
