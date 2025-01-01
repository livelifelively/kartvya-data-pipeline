import React, { useEffect, useRef } from 'react';
import { useMachine } from '@xstate/react';
import L, { geoJSON, GeoJSONOptions, Layer, GeoJSON as LeafletGeoJSON } from 'leaflet';
import { useMap } from 'react-leaflet';
import { assign, createMachine } from 'xstate';

interface PolygonLayerProps {
  data: GeoJSON.GeoJsonObject;
  style: L.PathOptions;
  onEachFeature?: (feature: any, layer: Layer) => void;
  fitBounds?: Boolean;
}

const polygonLayerMachine = createMachine(
  {
    id: 'polygonLayer',
    initial: 'idle',
    context: {
      layer: null as LeafletGeoJSON | null,
    },
    states: {
      idle: {
        on: {
          CREATE: 'creating',
        },
      },
      creating: {
        entry: ['createLayer'],
        on: {
          LAYER_CREATED: 'active',
          LAYER_FAILED: 'idle',
        },
      },
      active: {
        on: {
          REMOVE: 'removing',
          UPDATE: {
            target: 'updating',
            actions: ['updateLayer'],
          },
        },
      },
      updating: {
        entry: ['updateLayer'],
        on: {
          LAYER_UPDATED: 'active',
          LAYER_UPDATE_FAILED: 'active',
        },
      },
      removing: {
        entry: ['removeLayer'],
        on: {
          LAYER_REMOVED: 'idle',
        },
      },
    },
  },
  {
    actions: {
      createLayer: assign(({ context, event }) => {
        const { map, data, style, onEachFeature, fitBounds } = event.payload;

        if (!map) {
          return context;
        }

        const options: GeoJSONOptions = {
          style,
          onEachFeature,
        };

        try {
          const layer = L.geoJSON(data, options);
          layer.addTo(map);
          if (fitBounds) map.fitBounds(L.geoJSON(data).getBounds());

          return {
            layer,
          };
        } catch (e) {
          console.error('error creating layer', e);
        }
      }),
      updateLayer: assign(({ context, event }) => {
        const { map, data, style, onEachFeature, fitBounds } = event.payload;

        if (!context.layer || !map) {
          return context;
        }
        try {
          map.removeLayer(context.layer);
          const options: GeoJSONOptions = {
            style,
            onEachFeature,
          };

          const layer = L.geoJSON(data, options);
          layer.addTo(map);

          if (fitBounds) map.fitBounds(L.geoJSON(data).getBounds());

          return { layer };
        } catch (e) {
          console.error('error updating layer', e);
        }
      }),
      removeLayer: assign((context, event: any) => {
        const { map } = event.payload;

        if (context.layer && map) {
          map.removeLayer(context.layer);
        }

        return { layer: null };
      }),
    },
  }
);

export const PolygonLayer: React.FC<PolygonLayerProps> = ({
  data,
  style,
  onEachFeature,
  fitBounds = false,
}) => {
  const map = useMap();
  const [state, send] = useMachine(polygonLayerMachine);
  const layerRef = useRef<LeafletGeoJSON | null>(null);

  useEffect(() => {
    send({
      type: 'CREATE',
      payload: {
        map,
        data,
        style,
        onEachFeature,
        fitBounds,
      },
    });
  }, [map, data, style, onEachFeature, fitBounds, send]);

  useEffect(() => {
    if (state.matches('creating')) {
      send({ type: 'LAYER_CREATED' });
    }
  }, [state, send]);

  useEffect(() => {
    if (state.matches('active')) {
      send({
        type: 'UPDATE',
        payload: {
          map,
          data,
          style,
          onEachFeature,
          fitBounds,
        },
      });
    }
  }, [state, send, data, style, onEachFeature, fitBounds, map]);

  useEffect(() => {
    if (state.matches('updating')) {
      send({ type: 'LAYER_UPDATED' });
    }
  }, [state, send]);

  useEffect(() => {
    return () => {
      send({ type: 'REMOVE', payload: { map } });
    };
  }, [send, map]);

  return null;
};
