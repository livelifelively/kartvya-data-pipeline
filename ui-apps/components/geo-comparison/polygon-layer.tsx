import React, { useEffect, useRef } from 'react';
import L, { geoJSON, GeoJSONOptions, Layer, GeoJSON as LeafletGeoJSON } from 'leaflet';
import { useMap } from 'react-leaflet';

interface PolygonLayerProps {
  data: GeoJSON.GeoJsonObject;
  style?: L.PathOptions | L.StyleFunction;
  onEachFeature?: (feature: any, layer: Layer) => void;
  fitBounds?: Boolean;
}

export const PolygonLayer: React.FC<PolygonLayerProps> = ({
  data,
  style,
  onEachFeature,
  fitBounds = false,
}) => {
  const map = useMap();
  const layerRef = useRef<LeafletGeoJSON | null>(null);

  useEffect(() => {
    const options: GeoJSONOptions = {
      style,
      onEachFeature,
    };

    const layer = L.geoJSON(data, options);
    layer.addTo(map);
    layerRef.current = layer;

    if (fitBounds) map.fitBounds(L.geoJSON(data).getBounds());

    // Cleanup function to remove the layer from the map when the component unmounts
    return () => {
      if (layerRef.current) {
        map.removeLayer(layerRef.current);
      }
    };
  }, [map, data, style, onEachFeature]);

  return null;
};
