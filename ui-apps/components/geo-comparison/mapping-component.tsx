import React, { useState } from 'react';
import { useMachine } from '@xstate/react';
import mappingMachine from './state-machine'; // Assuming the file is in the same directory

function MappingComponent() {
  const [currentEvent, setCurrentEvent] = useState<string | null>(null);
  const [state, send] = useMachine(mappingMachine);

  const handleLoadGeoJson = () => {
    // Mock data for testing
    const baseGeojsonString = JSON.stringify({
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: { name_id: 'base_1' },
          geometry: { type: 'Point', coordinates: [0, 0] },
        },
        {
          type: 'Feature',
          properties: { name_id: 'base_2' },
          geometry: { type: 'Point', coordinates: [1, 1] },
        },
      ],
    });
    const comparisonGeojsonString = JSON.stringify({
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: { name_id: 'comp_1' },
          geometry: { type: 'Point', coordinates: [0, 0] },
        },
        {
          type: 'Feature',
          properties: { name_id: 'comp_2' },
          geometry: { type: 'Point', coordinates: [1, 1] },
        },
      ],
    });

    send({ type: 'LOAD_GEOJSON', baseGeojsonString, comparisonGeojsonString });
    setCurrentEvent('LOAD_GEOJSON');
  };

  const handleNextFeature = () => {
    send({ type: 'NEXT_FEATURE' });
    setCurrentEvent('NEXT_FEATURE');
  };

  const handlePreviousFeature = () => {
    send({ type: 'PREVIOUS_FEATURE' });
    setCurrentEvent('PREVIOUS_FEATURE');
  };

  const handleSetMappingState = () => {
    send({ type: 'SET_MAPPING_STATE' });
    setCurrentEvent('SET_MAPPING_STATE');
  };

  const handleUpdateLocalMapping = () => {
    const feature = {
      properties: {
        name_id: 'base_1',
      },
    };
    send({ type: 'UPDATE_LOCAL_MAPPING', feature: feature });
    setCurrentEvent('UPDATE_LOCAL_MAPPING');
  };

  return (
    <div>
      <h1>Mapping App</h1>
      <p>Current State: {state.value}</p>
      <p>Current Event: {currentEvent}</p>
      <pre>Context: {JSON.stringify(state.context, null, 2)}</pre>
      <button onClick={handleLoadGeoJson}>Load GeoJSON</button>
      <button onClick={handleNextFeature}>Next Feature</button>
      <button onClick={handlePreviousFeature}>Previous Feature</button>
      <button onClick={handleSetMappingState}>Set Mapping State</button>
      <button onClick={handleUpdateLocalMapping}>Update Local Mapping</button>
    </div>
  );
}

export default MappingComponent;
