import axios from "axios";

export async function fetchDistrictsForState(parentName: string, parentAdminLevel: string, childrenAdminLevel: number) {
  const query = `
       [out:json];
       area[name="${parentName}"]["admin_level"="${parentAdminLevel}"]->.searchArea;
       (
         relation["admin_level"="${childrenAdminLevel}"](area.searchArea);
       );
       out body;
     `;

  const response = await axios.post("http://overpass-api.de/api/interpreter", query);
  return response.data;
}

export async function fetchByRelationId(relationId: number) {
  const response = await axios.get(
    `https://nominatim.openstreetmap.org/details.php?osmtype=R&osmid=${relationId}&class=boundary&addressdetails=1&hierarchy=0&group_hierarchy=1&polygon_geojson=1&format=json`
  );

  return response.data;
}
