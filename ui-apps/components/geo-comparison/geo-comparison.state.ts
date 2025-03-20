import { cloneDeep, keyBy, reduce, size } from "lodash";
import { assign, not, raise, setup } from "xstate";

interface MappingContext {
  //   map: any; // or a more specific type if you have one
  baseLayer: any; // Use a more specific type if needed
  comparisonLayer: any; // Use a more specific type if needed
  keyedByNameIdBaseLayerIndices: any;
  keyedByNameIdComparisonLayerIndices: any;
  activeComparisonLayerFeatureIndex: number;
  comparisonToBaseMappings: { [key: string]: string[] };
  selectedBaseLayerFeatures: string[];
}

type MappingEvents =
  | {
      type: "E_ADD_BASE_LAYER";
      baseGeojsonString: string;
    }
  | {
      type: "E_ADD_COMPARISON_LAYER";
      comparisonGeojsonString: string;
    }
  | {
      type: "E_CLICK_BASE_FEATURE";
      baseLayerFeature: any;
    }
  | {
      type: "E_NEXT_COMPARISON_FEATURE";
      //   baseGeojsonString: string;
    }
  | {
      type: "E_PREV_COMPARISON_FEATURE";
      //   baseGeojsonString: string;
    }
  | {
      type: "E_MAPPING_COMPLETE";
      //   baseGeojsonString: string;
    }
  | { type: "E_RESET_SELECTED_BASE_FEATURES" }
  | { type: "E_MAPPING_CHANGED" };

export const GeoCompareMachine = setup({
  types: {
    context: {} as MappingContext,
    events: {} as MappingEvents,
  },

  actions: {
    A_ADD_BASE_LAYER: assign(({ event, context }) => {
      if (event.type !== "E_ADD_BASE_LAYER") {
        return context;
      }

      const baseLayer = JSON.parse(event.baseGeojsonString);

      const keyedByNameIdBaseLayerIndices = keyBy(baseLayer.features, "properties.name_id");
      return {
        keyedByNameIdBaseLayerIndices,
        baseLayer,
      };
    }),

    A_ADD_COMPARISON_LAYER: assign(({ event, context }) => {
      if (event.type !== "E_ADD_COMPARISON_LAYER") {
        return context;
      }

      const comparisonLayer = JSON.parse(event.comparisonGeojsonString);

      const keyedByNameIdComparisonLayerIndices = keyBy(comparisonLayer.features, "properties.name_id");
      return {
        comparisonLayer,
        keyedByNameIdComparisonLayerIndices,
      };
    }),

    A_RESET_COMPARISON_LAYER_FEATURE: assign({
      activeComparisonLayerFeatureIndex: 0,
    }),

    A_RESET_SELECTED_BASE_LAYER: assign({
      selectedBaseLayerFeatures: [],
    }),

    A_RESET_MAPPINGS: assign({
      comparisonToBaseMappings: {},
      selectedBaseLayerFeatures: [],
    }),

    A_TOGGLE_BASE_FEATURE_SELECTION: assign(({ context }, params: { baseLayerfeature: any }) => {
      const selectedBaseLayerFeatures: string[] = context.selectedBaseLayerFeatures.filter((val: any) => {
        return val !== params.baseLayerfeature.properties.name_id;
      });

      // if was not there already, push feature
      if (selectedBaseLayerFeatures.length === context.selectedBaseLayerFeatures.length) {
        selectedBaseLayerFeatures.push(params.baseLayerfeature.properties.name_id);
      }

      return {
        selectedBaseLayerFeatures,
      };
    }),

    A_ADD_UPDATE_MAPPINGS: assign(({ context }) => {
      //   const { comparisonLayerFeature, baseLayerFeatures } = params;
      const { comparisonLayer, activeComparisonLayerFeatureIndex, comparisonToBaseMappings, selectedBaseLayerFeatures } = context;

      const comparisonFeatureNameId = comparisonLayer.features[activeComparisonLayerFeatureIndex].properties.name_id;

      const newComparisonToBaseMappings = cloneDeep(comparisonToBaseMappings);

      newComparisonToBaseMappings[comparisonFeatureNameId] = selectedBaseLayerFeatures;

      return {
        comparisonToBaseMappings: newComparisonToBaseMappings,
      };
    }),

    A_SET_NEXT_COMPARISON_FEATURE: assign(({ context }) => {
      const { comparisonLayer, activeComparisonLayerFeatureIndex, comparisonToBaseMappings, selectedBaseLayerFeatures } = context;

      let index = activeComparisonLayerFeatureIndex;
      // make it cyclic.
      if (index >= comparisonLayer.features.length - 1) {
        index = 0;
      } else {
        index += 1;
      }

      const comparisonFeatureNameId = comparisonLayer.features[index].properties.name_id;

      const selectedBaseFeaturesForComparisonFeature = comparisonToBaseMappings[comparisonFeatureNameId]?.length
        ? comparisonToBaseMappings[comparisonFeatureNameId]
        : selectedBaseLayerFeatures;

      return {
        activeComparisonLayerFeatureIndex: index,
        selectedBaseLayerFeatures: selectedBaseFeaturesForComparisonFeature,
      };
    }),

    A_SET_PREV_COMPARISON_FEATURE: assign(({ context }) => {
      const { comparisonLayer, activeComparisonLayerFeatureIndex, comparisonToBaseMappings, selectedBaseLayerFeatures } = context;

      let index = activeComparisonLayerFeatureIndex;
      // make it cyclic.
      if (index <= 0) {
        index = comparisonLayer.features.length - 1;
      } else {
        index -= 1;
      }

      const comparisonFeatureNameId = comparisonLayer.features[index].properties.name_id;

      const selectedBaseFeaturesForComparisonFeature = comparisonToBaseMappings[comparisonFeatureNameId]?.length
        ? comparisonToBaseMappings[comparisonFeatureNameId]
        : selectedBaseLayerFeatures;

      return {
        selectedBaseLayerFeatures: selectedBaseFeaturesForComparisonFeature,
        activeComparisonLayerFeatureIndex: index,
      };
    }),
  },

  guards: {
    G_COMPARISON_COMPLETED: ({ context }) => {
      const { comparisonToBaseMappings, keyedByNameIdComparisonLayerIndices } = context;

      if (size(comparisonToBaseMappings) !== size(keyedByNameIdComparisonLayerIndices)) {
        return false;
      }

      // every mapping has values
      return reduce(
        comparisonToBaseMappings,
        (agg, val) => {
          // eslint-disable-next-line no-param-reassign
          agg = agg && val.length > 0;
          return agg;
        },
        true
      );
    },
  },
}).createMachine(
  {
    context: {
      baseLayer: {},
      comparisonLayer: {},
      keyedByNameIdBaseLayerIndices: {},
      keyedByNameIdComparisonLayerIndices: {},
      activeComparisonLayerFeatureIndex: -1,
      comparisonToBaseMappings: {},
      selectedBaseLayerFeatures: [],
    },
    initial: "S_NASCENT",
    states: {
      S_NASCENT: {
        // we can have a separate machine here that deals with loading data
        type: "parallel",
        states: {
          S_BASE_LAYER_DATA: {
            initial: "S_BASE_LAYER_MISSING",
            states: {
              S_BASE_LAYER_MISSING: {
                on: {
                  E_ADD_BASE_LAYER: {
                    actions: [{ type: "A_ADD_BASE_LAYER" }],
                    target: "S_BASE_LAYER_ADDED",
                  },
                },
              },
              S_BASE_LAYER_ADDED: {
                type: "final",
              },
            },
          },
          S_COMPARISON_LAYER_DATA: {
            initial: "S_COMPARISON_LAYER_MISSING",
            states: {
              S_COMPARISON_LAYER_MISSING: {
                on: {
                  E_ADD_COMPARISON_LAYER: {
                    actions: [{ type: "A_ADD_COMPARISON_LAYER" }],
                    target: "S_COMPARISON_LAYER_ADDED",
                  },
                },
              },
              S_COMPARISON_LAYER_ADDED: {
                type: "final",
              },
            },
          },
        },
        onDone: {
          target: "S_READY_FOR_COMPARISON",
        },
      },
      S_READY_FOR_COMPARISON: {
        entry: [
          "A_RESET_COMPARISON_LAYER_FEATURE",
          "A_RESET_MAPPINGS",
          ({ context }) => {
            console.log(context);
          },
        ],
        always: {
          target: "S_COMPARING.S_COMPARISON_IN_PROGRESS",
        },
      },
      S_COMPARING: {
        // initial: 'S_COMPARISON_IN_PROGRESS',
        type: "parallel",
        states: {
          S_COMPARISON_IN_PROGRESS: {
            on: {
              E_CLICK_BASE_FEATURE: {
                actions: [
                  {
                    type: "A_TOGGLE_BASE_FEATURE_SELECTION",
                    params: ({ event }) => {
                      return { baseLayerfeature: event.baseLayerFeature };
                    },
                  },
                  raise({ type: "E_MAPPING_CHANGED" }),
                ],
              },
              E_RESET_SELECTED_BASE_FEATURES: {
                actions: ["A_RESET_SELECTED_BASE_LAYER", raise({ type: "E_MAPPING_CHANGED" })],
              },
              E_NEXT_COMPARISON_FEATURE: {
                actions: [
                  {
                    type: "A_ADD_UPDATE_MAPPINGS",
                  },
                  {
                    type: "A_SET_NEXT_COMPARISON_FEATURE",
                  },
                ],
              },
              E_PREV_COMPARISON_FEATURE: {
                actions: [
                  {
                    type: "A_ADD_UPDATE_MAPPINGS",
                  },
                  {
                    type: "A_SET_PREV_COMPARISON_FEATURE",
                  },
                ],
              },
            },
          },
          S_COMPARISON_COMPLETION_STATUS: {
            initial: "S_NOT_COMPLETE",
            states: {
              S_NOT_COMPLETE: {
                on: {
                  E_MAPPING_CHANGED: {
                    guard: "G_COMPARISON_COMPLETED",
                    target: "S_COMPLETED",
                  },
                },
              },
              S_COMPLETED: {
                on: {
                  E_MAPPING_CHANGED: {
                    guard: not("G_COMPARISON_COMPLETED"),
                    target: "S_NOT_COMPLETE",
                  },
                },
              },
            },
            // show done button.
            // on: {

            // },
          },
        },
      },
      //   S_COMPARISON_APPROVED: {},
    },
  }
  //   {
  //     guards: {
  //       isDone: ({ context }, params) => {
  //         return false;
  //       },
  //     },
  //   }
);
