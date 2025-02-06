import { useMachine } from "@xstate/react";
import { get, has, isEmpty, size } from "lodash";
import { MapContainer, TileLayer } from "react-leaflet";
import { AppShell, Box, Button, Container, Group, Text, Textarea, Title } from "@mantine/core";
import { GeoCompareMachine } from "./geo-comparison.state"; // Assuming the file is in the same directory
import { PolygonLayer } from "./polygon-layer";
import classes from "./geo-comparison.module.css";

import "leaflet/dist/leaflet.css";

import { PathOptions } from "leaflet";
import JsonView from "react18-json-view";

function GeoComparison() {
  const [state, send, actor] = useMachine(GeoCompareMachine);

  const { context, value } = state;
  // console.log(context);
  console.log(value);
  const { selectedBaseLayerFeatures, comparisonToBaseMappings, activeComparisonLayerFeatureIndex, baseLayer, comparisonLayer } =
    context;

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm" }}
      aside={{ width: 500, breakpoint: "md", collapsed: { desktop: false, mobile: true } }}
      padding="md"
    >
      <AppShell.Header style={{ flexDirection: "row", display: "flex", justifyContent: "space-between" }}>
        <Group h="100%" px="md">
          <Title className={classes.title}>
            <Text inherit variant="gradient" component="div" gradient={{ from: "pink", to: "yellow" }}>
              GeoJSON Comparison Map
            </Text>
          </Title>
        </Group>

        <Group gap="sm" flex={1} style={{ justifyContent: "center" }}>
          {/* <Button id="toggle-input-button" variant="default">
            Hide Inputs
          </Button> */}
          <Button
            variant="outline"
            onClick={() => {
              send({ type: "E_RESET_SELECTED_BASE_FEATURES" });
            }}
          >
            Reset Base Features Selection
          </Button>
          <Button
            id="prev-button"
            variant="default"
            disabled={selectedBaseLayerFeatures.length === 0}
            onClick={() => {
              send({ type: "E_PREV_COMPARISON_FEATURE" });
            }}
          >
            Previous Feature
          </Button>
          <Button
            id="next-button"
            variant="default"
            disabled={selectedBaseLayerFeatures.length === 0}
            onClick={() => {
              send({ type: "E_NEXT_COMPARISON_FEATURE" });
            }}
          >
            Next Feature
          </Button>
          <Button
            id="done-button"
            variant="primary"
            disabled={
              selectedBaseLayerFeatures.length === 0 ||
              (value && get(value, "S_COMPARING.S_COMPARISON_COMPLETION_STATUS") === "S_NOT_COMPLETE")
            }
            onClick={() => {
              // console.log(comparisonToBaseMappings);
              console.log(actor.getPersistedSnapshot());
              // window.postMessage(comparisonToBaseMappings, '*');
            }}
          >
            DONE
          </Button>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="xs">
        {activeComparisonLayerFeatureIndex > -1 && (
          <Box
            style={{
              padding: "10px",
              fontSize: "10px",
              border: "1px solid #d5d5d5",
              borderRadius: "5px",
              marginBottom: "10px",
            }}
          >
            <Title size={"h4"}>Active Comparison Feature</Title>
            <JsonView
              src={comparisonLayer.features[activeComparisonLayerFeatureIndex].properties}
              theme="github"
              collapsed={1}
              collapseStringsAfterLength={20}
              collapseStringMode="address"
              displaySize={true}
            />
          </Box>
        )}
        <Box
          style={{
            padding: "10px",
            fontSize: "10px",
            border: "1px solid #d5d5d5",
            borderRadius: "5px",
            marginBottom: "10px",
            backgroundColor: selectedBaseLayerFeatures.length === 0 ? "pink" : "transparent",
          }}
        >
          <Title size={"h4"}>Selected Base Features</Title>
          <JsonView
            src={selectedBaseLayerFeatures}
            theme="github"
            collapsed={1}
            collapseStringsAfterLength={20}
            collapseStringMode="address"
            displaySize={true}
          />
        </Box>
      </AppShell.Navbar>
      <AppShell.Main>
        <Container fluid>
          <Box id="map" style={{ height: "73vh", overflowY: "scroll" }}>
            <MapContainer scrollWheelZoom={true} style={{ height: "100%" }} maxZoom={19}>
              <TileLayer attribution="© OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {activeComparisonLayerFeatureIndex !== -1 && comparisonLayer.features[activeComparisonLayerFeatureIndex] && (
                <PolygonLayer
                  data={comparisonLayer.features[activeComparisonLayerFeatureIndex]}
                  style={{ color: "black", weight: 2, fillOpacity: 0.7, fillColor: "black" }}
                />
              )}
              {!isEmpty(baseLayer) && (
                <PolygonLayer
                  data={baseLayer}
                  style={(feature): PathOptions => {
                    const baseFeatureId = feature?.properties.name_id;
                    if (selectedBaseLayerFeatures && selectedBaseLayerFeatures.includes(baseFeatureId)) {
                      // Set the style to indicate mapping
                      return {
                        fillColor: "cyan",
                        fillOpacity: 0.3,
                        weight: 3,
                        color: "orange",
                      };
                    } else {
                      // Reset the style
                      return {
                        fillColor: "transparent",
                        fillOpacity: 0.3,
                        weight: 2,
                        color: "blue",
                      };
                    }
                  }}
                  onEachFeature={(feature, layer) => {
                    layer.on("click", () => send({ type: "E_CLICK_BASE_FEATURE", baseLayerFeature: feature }));
                  }}
                  fitBounds={!(value && has(value, "S_COMPARING"))}
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
            mb={15}
            onChange={(event) => send({ type: "E_ADD_BASE_LAYER", baseGeojsonString: event.currentTarget.value })}
            style={{
              display: "none",
            }}
          ></Textarea>
          <Textarea
            id="comparison-geojson-input"
            placeholder="Paste comparison GeoJSON here..."
            minRows={10}
            onChange={(event) =>
              send({
                type: "E_ADD_COMPARISON_LAYER",
                comparisonGeojsonString: event.currentTarget.value,
              })
            }
            style={{
              display: "none",
            }}
          ></Textarea>
          <Box
            style={{
              padding: "10px",
              fontSize: "10px",
              border: "1px solid #d5d5d5",
              borderRadius: "5px",
              marginBottom: "10px",
            }}
          >
            <Title size={"h4"}>
              Comparison to Base Mappings -
              <Text
                component="span"
                style={{ color: "red" }}
              >{` ${size(comparisonToBaseMappings)} / ${comparisonLayer.features.length} `}</Text>
            </Title>
            <JsonView
              src={comparisonToBaseMappings}
              theme="github"
              collapsed={1}
              collapseStringsAfterLength={20}
              collapseStringMode="address"
              displaySize={true}
            />
          </Box>
        </Box>
      </AppShell.Aside>
    </AppShell>
  );
}

export default GeoComparison;
