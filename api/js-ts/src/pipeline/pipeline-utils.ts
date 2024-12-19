export function polygonToMultiPolygon(feature: any) {
  let newFeature = { ...feature };
  if (feature.geometry.type === "Polygon") {
    newFeature.geometry.type = "MultiPolygon";
    newFeature.geometry.coordinates = [feature.geometry.coordinates];
  }

  return newFeature;
}

export function multiPolygonToDgraphMultiPolygon(multiPolygon: any) {
  let toReturn: any = {
    polygons: multiPolygon.map((polygon: any) => {
      return {
        coordinates: polygon.map((coordinate: any) => {
          return {
            points: coordinate.map((point: any) => {
              return {
                latitude: point[1],
                longitude: point[0],
              };
            }),
          };
        }),
      };
    }),
  };

  return toReturn;
}
