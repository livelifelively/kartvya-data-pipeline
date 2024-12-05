import { districtVCs } from "../../../admin-regions/districts/andhra-pradesh/ap.districts-vcs";

(async () => {
  let districts = districtVCs.map((dvs) => {
    return {
      name: dvs.district.name,
      wikipedia_page: dvs.district.wikipedia_page,
      complete_vidhansabha_constituencies: dvs.vidhansabhaConstituenciesChildren.map((val) => {
        return {
          ...val,
          name: val.name,
        };
      }),
      partial_vidhansabha_constituencies: dvs.partialVidhanSabha.map((val) => {
        return val;
      }),
    };
  });

  let vcs = districtVCs.reduce((agg: any, dvs: any) => {
    for (let vcs of dvs.vidhansabhaConstituenciesChildren) {
      agg[vcs.name] = vcs;
    }

    return agg;
  }, {});

  console.log(JSON.stringify(districts, null, 2));

  console.log(JSON.stringify(vcs, null, 2));
})();
