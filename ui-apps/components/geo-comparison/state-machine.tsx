import { assign, createMachine, EventObject, MachineConfig } from 'xstate';

// Define the types for our context
interface MappingContext {
  map: any; // or a more specific type if you have one
  baseGeojsonData: any; // Use a more specific type if needed
  comparisonGeojsonData: any; // Use a more specific type if needed
  currentComparisonIndex: number;
  mappingObject: { [key: string]: { name_id: string; index: number }[] };
  localMapping: { name_id: string; index: number }[];
}

type MappingEvent = {
  type: 'LOAD_GEOJSON';
  baseGeojsonString: string;
  comparisonGeojsonString?: string;
};

// Define the machine configuration
const mappingMachineConfig: MachineConfig<MappingContext, MappingEvent, any> = {
  id: 'mappingApp',
  initial: 'idle',
  context: {
    map: null,
    baseGeojsonData: null,
    comparisonGeojsonData: null,
    currentComparisonIndex: -1,
    mappingObject: {},
    localMapping: [],
  },
  states: {
    idle: {},
    ready: {},
    mapping: {},
  },
  on: {
    LOAD_GEOJSON: {
      target: 'ready',
      actions: assign({
        baseGeojsonData: (context, event: any) => JSON.parse(event?.baseGeojsonString),
        comparisonGeojsonData: (context, event) =>
          event.comparisonGeojsonString ? JSON.parse(event.comparisonGeojsonString) : null,
        currentComparisonIndex: (context, event) =>
          event.comparisonGeojsonString &&
          JSON.parse(event.comparisonGeojsonString).features.length > 0
            ? 0
            : -1,
        mappingObject: {},
        localMapping: [],
      }),
    },
  },
};

const mappingMachine = createMachine(mappingMachineConfig);

export default mappingMachine;
