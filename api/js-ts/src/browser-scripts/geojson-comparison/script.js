document.addEventListener("DOMContentLoaded", function () {
  // Initialize the map
  var map = L.map("map").setView([0, 0], 2);

  // Set up the OpenStreetMap layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  let baseGeojsonData = null;
  let baseLayer = null; // Store the base layer
  let comparisonGeojsonData = null;
  let currentComparisonIndex = -1; // Initialize to -1 to start from the first feature
  let mappingObject = {}; // Initialize mapping object
  let localMapping = []; // Initialize local mapping array

  // Function to render a single comparison feature
  function renderComparisonFeature(feature) {
    map.eachLayer((layer) => {
      if (layer instanceof L.GeoJSON && layer.options) {
        map.removeLayer(layer);
      }
    });

    L.geoJSON(feature, {
      style: {
        color: "red",
        weight: 2,
        opacity: 0.6,
      },
      isComparisonFeature: true, // Add a flag to identify the comparison layer
    }).addTo(map);

    renderBaseLayer();
  }

  function renderBaseLayer() {
    // Add the base GeoJSON layer to the map
    baseLayer = L.geoJSON(baseGeojsonData, {
      style: {
        color: "blue",
        weight: 2,
        opacity: 0.6,
      },
      onEachFeature: function (feature, layer) {
        layer.on("click", function (e) {
          // Extract name_id from base feature and current comparison feature and call the toggle mapping function
          toggleBaseFeatureMapping(feature, layer);
        });
      },
    }).addTo(map);

    // Bring base layer to front
    baseLayer.bringToFront();
    updateBaseLayerStyles();
  }

  function updateBaseLayerStyles() {
    if (!baseLayer || !comparisonGeojsonData || !comparisonGeojsonData.features[currentComparisonIndex]) return;

    const currentComparisonFeature = comparisonGeojsonData.features[currentComparisonIndex];
    const currentComparisonId = currentComparisonFeature.properties.name_id;

    baseLayer.eachLayer((layer) => {
      const baseFeatureId = layer.feature.properties.name_id;

      debugger;

      if (localMapping.includes(baseFeatureId)) {
        // Set the style to indicate mapping
        layer.setStyle({
          fillColor: "yellow",
          fillOpacity: 0.5,
          weight: 3,
          color: "green",
        });
      } else {
        // Reset the style
        layer.setStyle({
          fillColor: null, // Use default fill
          fillOpacity: 0,
          weight: 2,
          color: "blue",
        });
      }
    });
  }

  function toggleBaseFeatureMapping(feature, layer) {
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

      // Update the base layer style
      updateBaseLayerStyles();

      // Log only the local mapping for the current comparison feature
      console.log("Local Mapping for Current Comparison Feature:", currentComparisonId, ":", localMapping);
    } else {
      console.log("No comparison feature is active at the moment.");
    }
  }

  // Function to handle the next feature button click
  function showNextComparisonFeature() {
    if (!comparisonGeojsonData || !comparisonGeojsonData.features || comparisonGeojsonData.features.length === 0) {
      alert("No comparison GeoJSON or features to display.");
      return;
    }

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

    const feature = comparisonGeojsonData.features[currentComparisonIndex];
    renderComparisonFeature(feature);

    document.getElementById("comparison-result").textContent = `Feature ${currentComparisonIndex + 1} of ${
      comparisonGeojsonData.features.length
    }`;
    updateBaseLayerStyles();
  }

  // Function to handle the previous feature button click
  function showPreviousComparisonFeature() {
    if (!comparisonGeojsonData || !comparisonGeojsonData.features || comparisonGeojsonData.features.length === 0) {
      alert("No comparison GeoJSON or features to display.");
      return;
    }

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

    const feature = comparisonGeojsonData.features[currentComparisonIndex];
    renderComparisonFeature(feature);

    document.getElementById("comparison-result").textContent = `Feature ${currentComparisonIndex + 1} of ${
      comparisonGeojsonData.features.length
    }`;
    updateBaseLayerStyles();
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

  // Handle the render button click
  document.getElementById("render-button").addEventListener("click", function () {
    const baseGeojsonInput = document.getElementById("base-geojson-input").value;
    const comparisonGeojsonInput = document.getElementById("comparison-geojson-input").value;

    // Check if base GeoJSON is provided
    if (!baseGeojsonInput) {
      alert("Please input the base GeoJSON.");
      return;
    }

    try {
      baseGeojsonData = JSON.parse(baseGeojsonInput);
      comparisonGeojsonData = comparisonGeojsonInput ? JSON.parse(comparisonGeojsonInput) : null;

      // Clear previous layers
      map.eachLayer(function (layer) {
        if (layer instanceof L.GeoJSON) {
          map.removeLayer(layer);
        }
      });

      // Reset mapping
      mappingObject = {};
      currentComparisonIndex = -1;
      localMapping = [];

      // Check if comparison GeoJSON is provided
      if (comparisonGeojsonData && comparisonGeojsonData.features.length > 0) {
        currentComparisonIndex = 0;
        const currentComparisonFeature = comparisonGeojsonData.features[currentComparisonIndex];
        if (currentComparisonFeature) {
          const currentComparisonId = currentComparisonFeature.properties.name_id;
          localMapping = mappingObject[currentComparisonId] ? [...mappingObject[currentComparisonId]] : [];
        }

        renderComparisonFeature(comparisonGeojsonData.features[currentComparisonIndex]); // Render the first comparison feature
        document.getElementById("next-button").disabled = false;
        document.getElementById("prev-button").disabled = false;
        document.getElementById("comparison-result").textContent = `Feature ${currentComparisonIndex + 1} of ${
          comparisonGeojsonData.features.length
        }`;
      } else {
        document.getElementById("next-button").disabled = true;
        document.getElementById("prev-button").disabled = true;
        alert("Base GeoJSON rendered. Please input the comparison GeoJSON.");
      }
    } catch (error) {
      alert("Invalid GeoJSON: " + error.message);
    }
  });

  // Add next feature button event listener
  document.getElementById("next-button").addEventListener("click", showNextComparisonFeature);
  // Add previous feature button event listener
  document.getElementById("prev-button").addEventListener("click", showPreviousComparisonFeature);
  // Handle toggle input button click
  document.getElementById("toggle-input-button").addEventListener("click", function () {
    const inputContainer = document.getElementById("geojson-inputs");
    const button = document.getElementById("toggle-input-button");
    if (inputContainer.style.display === "none") {
      inputContainer.style.display = "block";
      button.textContent = "Hide Inputs";
    } else {
      inputContainer.style.display = "none";
      button.textContent = "Show Inputs";
    }
  });
});
