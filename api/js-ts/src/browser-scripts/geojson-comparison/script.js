// State Variables
let map = null;
let baseGeojsonData = null;
let comparisonGeojsonData = null;
let currentComparisonIndex = -1;
let mappingObject = {};
let localMapping = [];
let currentState = "idle"; // Initial state

// State Machine Logic - loadGeoJSON event
function changeStateLoadGeoJSON(baseGeojsonString, comparisonGeojsonString) {
  try {
    // 1. Parse GeoJSON Strings
    baseGeojsonData = JSON.parse(baseGeojsonString);
    comparisonGeojsonData = comparisonGeojsonString ? JSON.parse(comparisonGeojsonString) : null;

    // 2. & 3. Update baseGeojsonData & comparisonGeojsonData
    // (Already done above with parsing)

    // 4. Initialize currentComparisonIndex
    currentComparisonIndex = -1;
    if (comparisonGeojsonData && comparisonGeojsonData.features.length > 0) {
      currentComparisonIndex = 0;
    }

    // 5. Initialize mappingObject
    mappingObject = {};

    // 6. Initialize localMapping
    localMapping = [];

    // 7. Initial local state
    if (comparisonGeojsonData && comparisonGeojsonData.features.length > 0) {
      const currentComparisonFeature = comparisonGeojsonData.features[currentComparisonIndex];
      if (currentComparisonFeature) {
        const currentComparisonId = currentComparisonFeature.properties.name_id;
        localMapping = mappingObject[currentComparisonId] ? [...mappingObject[currentComparisonId]] : [];
      }
    }

    // 8. Transition to "ready" state with sub-state
    currentState = "ready";
    if (comparisonGeojsonData && comparisonGeojsonData.features.length > 0) {
      currentState = "mapping";
    }

    console.log("loadGeoJSON complete, current state", currentState);

    return {
      stateChange: true,
    };
  } catch (error) {
    console.error("Error loading GeoJSON:", error);
    // Set the state back to "idle" on error
    currentState = "idle";
    return {
      stateChange: true,
    };
  }
}

function changeStateSelectBaseFeature(feature) {
  // Extract name_id from base feature
  const baseFeatureId = feature.properties.name_id;

  // Get the current comparison feature
  const currentComparisonFeature = comparisonGeojsonData.features[currentComparisonIndex];

  if (currentComparisonFeature) {
    // Extract name_id from current comparison feature
    const currentComparisonId = currentComparisonFeature.properties.name_id;

    // Toggle base feature id in the local mapping array
    if (localMapping.includes(baseFeatureId)) {
      localMapping = localMapping.filter((id) => id !== baseFeatureId);
    } else {
      localMapping.push(baseFeatureId);
    }

    // Log only the local mapping for the current comparison feature
    console.log("Local Mapping for Current Comparison Feature:", currentComparisonId, ":", localMapping);
    return {
      stateChange: false,
    };
  } else {
    console.log("No comparison feature is active at the moment.");
    return {
      stateChange: false,
    };
  }
}

// Handles the next button logic
function changeStateNextFeature() {
  // Save local mapping to saved mapping before changing to new layer
  if (currentComparisonIndex > -1) {
    saveLocalMapping();
  }

  // Get the current comparison feature id before the index is changed
  let previousComparisonId;
  if (currentComparisonIndex > -1 && comparisonGeojsonData.features[currentComparisonIndex]) {
    previousComparisonId = comparisonGeojsonData.features[currentComparisonIndex].properties.name_id;
  }
  currentComparisonIndex++;
  if (currentComparisonIndex >= comparisonGeojsonData.features.length) {
    currentComparisonIndex = 0; // loop back to the first feature
  }

  // Load mapping from saved mapping or create new one to local mapping
  const currentComparisonFeature = comparisonGeojsonData.features[currentComparisonIndex];
  if (currentComparisonFeature) {
    const currentComparisonId = currentComparisonFeature.properties.name_id;
    // Reset local mapping to a new one based on saved mapping if available
    localMapping = mappingObject[currentComparisonId] ? [...mappingObject[currentComparisonId]] : [];
  }
  return {
    stateChange: true,
  };
}

function changeStatePreviousFeature() {
  // Save local mapping to saved mapping before changing to new layer
  if (currentComparisonIndex > -1) {
    saveLocalMapping();
  }
  // Get the current comparison feature id before the index is changed
  let previousComparisonId;
  if (currentComparisonIndex > -1 && comparisonGeojsonData.features[currentComparisonIndex]) {
    previousComparisonId = comparisonGeojsonData.features[currentComparisonIndex].properties.name_id;
  }

  currentComparisonIndex--;
  if (currentComparisonIndex < 0) {
    currentComparisonIndex = comparisonGeojsonData.features.length - 1; // loop back to the last feature
  }

  // Load mapping from saved mapping or create new one to local mapping
  const currentComparisonFeature = comparisonGeojsonData.features[currentComparisonIndex];
  if (currentComparisonFeature) {
    const currentComparisonId = currentComparisonFeature.properties.name_id;

    // Reset local mapping to a new one based on saved mapping if available
    localMapping = mappingObject[currentComparisonId] ? [...mappingObject[currentComparisonId]] : [];
  }
  return {
    stateChange: true,
  };
}

// Function to handle saving local mapping to saved mapping
function saveLocalMapping() {
  const currentComparisonFeature = comparisonGeojsonData.features[currentComparisonIndex];
  if (currentComparisonFeature) {
    const currentComparisonId = currentComparisonFeature.properties.name_id;
    mappingObject[currentComparisonId] = [...localMapping];
    console.log("Saved Mapping:", mappingObject);
  }
}

function renderDocumentLoaded() {
  // Initialize the map
  map = L.map("map").setView([0, 0], 2);

  // Set up the OpenStreetMap layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);
}

function handleDocumentLoaded() {
  // get date from html
  const baseGeojsonInput = document.getElementById("base-geojson-input").value;
  const comparisonGeojsonInput = document.getElementById("comparison-geojson-input").value;

  renderDocumentLoaded();

  // trigger the state machine event for loading GeoJSON
  handleEvent("loadGeoJSON", { baseGeojsonString: baseGeojsonInput, comparisonGeojsonString: comparisonGeojsonInput });
}

function handleLoadGeoJSON() {
  // change state
  // render the change
}

function handleSelectBaseFeature() {
  // change state
  // render the change
}

function handleNextFeature() {
  // change state
  // render the change
}

function handlePreviousFeature() {
  // change state
  // render the change
}

// Event Handler
function handleEvent(event, data) {
  let eventResult;
  switch (event) {
    case "documentLoaded":
      eventResult = handleDocumentLoaded();
      break;
    case "loadGeoJSON":
      eventResult = handleLoadGeoJSON(data.baseGeojsonString, data.comparisonGeojsonString);
      break;
    case "selectBaseFeature":
      eventResult = handleSelectBaseFeature(data.feature);
      break;
    case "nextFeature":
      eventResult = handleNextFeature();
      break;
    case "previousFeature":
      eventResult = handlePreviousFeature();
      break;
    default:
      console.error("Unknown event:", event);
      return;
  }

  if (eventResult && eventResult.stateChange) {
    // Update the UI based on the state
    // renderMap();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  handleEvent("documentLoaded");
});
