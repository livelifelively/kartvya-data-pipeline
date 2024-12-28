import { useState } from 'react';
import { useMachine } from '@xstate/react';
import { Anchor, Box, Button, Group, Text, Textarea, Title } from '@mantine/core';
import mappingMachine from './state-machine'; // Assuming the file is in the same directory
import classes from './geo-comparison.module.css';

export function GeoComparison() {
  // const [baseGeoJson, setBaseGeoJson] = useState('');
  // const [comparisonGeoJson, setComparisonGeoJson] = useState('');
  const [state, send] = useMachine(mappingMachine);

  return (
    <>
      <Title className={classes.title} ta="center" mt={10}>
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          GeoJSON Comparison Map
        </Text>
      </Title>

      <Box id="geojson-inputs" className="geojson-input-container">
        <Textarea
          id="base-geojson-input"
          placeholder="Paste base GeoJSON here..."
          minRows={10}
          onChange={(event) =>
            send({ type: 'LOAD_GEOJSON', baseGeojsonString: event.currentTarget.value })
          }
        ></Textarea>
        <Textarea
          id="comparison-geojson-input"
          placeholder="Paste comparison GeoJSON here..."
          minRows={10}
          onChange={(event) => setComparisonGeoJson(event.currentTarget.value)}
        ></Textarea>
      </Box>

      <Group justify="center" gap="sm" grow mt={10}>
        <Button id="toggle-input-button" variant="default">
          Hide Inputs
        </Button>
        <Button
          id="render-button"
          variant="default"
          onClick={() => {
            console.log(baseGeoJson);
          }}
        >
          Render GeoJSONs
        </Button>
        <Button id="prev-button" variant="default">
          Previous Feature
        </Button>
        <Button id="next-button" variant="default">
          Next Feature
        </Button>
      </Group>

      <Box></Box>
    </>
  );
}
