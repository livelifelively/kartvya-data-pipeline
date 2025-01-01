import { useMachine } from '@xstate/react';
import { isEmpty, isObject } from 'lodash';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import {
  Anchor,
  AppShell,
  Box,
  Button,
  Code,
  Container,
  Group,
  Text,
  Textarea,
  Title,
} from '@mantine/core';
import { GeoCompareMachine } from './geo-comparison.state'; // Assuming the file is in the same directory
import { PolygonLayer } from './polygon-layer';
import classes from './geo-comparison.module.css';

import 'leaflet/dist/leaflet.css';

import { feature } from '@turf/turf';
import { PathOptions } from 'leaflet';
import JsonView from 'react18-json-view';

function GeoComparison() {
  const [state, send] = useMachine(GeoCompareMachine);

  const { context, value } = state;
  // console.log(context);
  console.log(value);

  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm' }}
      aside={{ width: 500, breakpoint: 'md', collapsed: { desktop: false, mobile: true } }}
      padding="md"
    >
      <AppShell.Header
        style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between' }}
      >
        <Group h="100%" px="md">
          <Title className={classes.title}>
            <Text
              inherit
              variant="gradient"
              component="div"
              gradient={{ from: 'pink', to: 'yellow' }}
            >
              GeoJSON Comparison Map
            </Text>
          </Title>
        </Group>

        <Group gap="sm" flex={1} style={{ justifyContent: 'center' }}>
          {/* <Button id="toggle-input-button" variant="default">
            Hide Inputs
          </Button> */}
          <Button
            id="prev-button"
            variant="default"
            onClick={() => {
              send({ type: 'E_PREV_COMPARISON_FEATURE' });
            }}
          >
            Previous Feature
          </Button>
          <Button
            id="next-button"
            variant="default"
            onClick={() => {
              send({ type: 'E_NEXT_COMPARISON_FEATURE' });
            }}
          >
            Next Feature
          </Button>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="xs">
        {context.activeComparisonLayerFeatureIndex > -1 && (
          <Box style={{ backgroundColor: 'pink', padding: '10px', fontSize: '10px' }}>
            <Title size={'h4'}>Active Comparison Feature</Title>
            <JsonView
              src={
                context.comparisonLayer.features[context.activeComparisonLayerFeatureIndex]
                  .properties
              }
              theme="github"
              collapsed={1}
              collapseStringsAfterLength={20}
              collapseStringMode="address"
              displaySize={true}
            />
          </Box>
        )}
        {context.selectedBaseLayerFeatures.length > 0 && (
          <Box style={{ backgroundColor: 'lightgreen', padding: '10px', fontSize: '10px' }}>
            <Title size={'h4'}>Selected Base Features</Title>
            <JsonView
              src={context.selectedBaseLayerFeatures}
              theme="github"
              collapsed={1}
              collapseStringsAfterLength={20}
              collapseStringMode="address"
              displaySize={true}
            />
          </Box>
        )}
      </AppShell.Navbar>
      <AppShell.Main>
        <Container fluid>
          <Box id="map" style={{ height: '73vh', overflowY: 'scroll' }}>
            <MapContainer scrollWheelZoom={true} style={{ height: '100%' }} maxZoom={19}>
              <TileLayer
                attribution="© OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {context.activeComparisonLayerFeatureIndex !== -1 &&
                context.comparisonLayer.features[context.activeComparisonLayerFeatureIndex] && (
                  <PolygonLayer
                    data={
                      context.comparisonLayer.features[context.activeComparisonLayerFeatureIndex]
                    }
                    style={{ color: 'black', weight: 2, fillOpacity: 0.7, fillColor: 'black' }}
                  />
                )}
              {!isEmpty(context.baseLayer) && (
                <PolygonLayer
                  data={context.baseLayer}
                  style={(feature): PathOptions => {
                    const baseFeatureId = feature?.properties.name_id;
                    if (
                      context.selectedBaseLayerFeatures &&
                      context.selectedBaseLayerFeatures.includes(baseFeatureId)
                    ) {
                      // Set the style to indicate mapping
                      return {
                        fillColor: 'cyan',
                        fillOpacity: 0.3,
                        weight: 3,
                        color: 'orange',
                      };
                    } else {
                      // Reset the style
                      return {
                        fillColor: 'transparent',
                        fillOpacity: 0.3,
                        weight: 2,
                        color: 'blue',
                      };
                    }
                  }}
                  onEachFeature={(feature, layer) => {
                    layer.on('click', () =>
                      send({ type: 'E_CLICK_BASE_FEATURE', baseLayerFeature: feature })
                    );
                  }}
                  fitBounds={
                    !(value && isObject(value) && Object.keys(value).includes('S_COMPARING'))
                  }
                />
              )}
            </MapContainer>
          </Box>
        </Container>
      </AppShell.Main>
      <AppShell.Aside p="md">
        <Box id="geojson-inputs" className="geojson-input-container">
          <Textarea
            id="base-geojson-input"
            placeholder="Paste base GeoJSON here..."
            minRows={10}
            onChange={(event) =>
              send({ type: 'E_ADD_BASE_LAYER', baseGeojsonString: event.currentTarget.value })
            }
          ></Textarea>
          <Textarea
            id="comparison-geojson-input"
            placeholder="Paste comparison GeoJSON here..."
            minRows={10}
            onChange={(event) =>
              send({
                type: 'E_ADD_COMPARISON_LAYER',
                comparisonGeojsonString: event.currentTarget.value,
              })
            }
          ></Textarea>
        </Box>
      </AppShell.Aside>
      <AppShell.Footer p="md">Footer</AppShell.Footer>
    </AppShell>
  );
}

export default GeoComparison;
