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
    // map.fitBounds(L.geoJSON(feature).getBounds()); // Fit the map to the bounds of the feature

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
          console.log("Base Layer Feature Properties:", feature.properties);
        });
      },
    }).addTo(map);

    // Bring base layer to front
    baseLayer.bringToFront();

    // Fit the map to the bounds of the base layer
    // map.fitBounds(L.geoJSON(baseGeojsonData).getBounds());
  }

  // Function to handle the next feature button click
  function showNextComparisonFeature() {
    if (!comparisonGeojsonData || !comparisonGeojsonData.features || comparisonGeojsonData.features.length === 0) {
      alert("No comparison GeoJSON or features to display.");
      return;
    }
    currentComparisonIndex++;
    if (currentComparisonIndex >= comparisonGeojsonData.features.length) {
      currentComparisonIndex = 0; // loop back to the first feature
    }
    const feature = comparisonGeojsonData.features[currentComparisonIndex];
    renderComparisonFeature(feature);

    document.getElementById("comparison-result").textContent = `Feature ${currentComparisonIndex + 1} of ${
      comparisonGeojsonData.features.length
    }`;
  }

  // Function to handle the previous feature button click
  function showPreviousComparisonFeature() {
    if (!comparisonGeojsonData || !comparisonGeojsonData.features || comparisonGeojsonData.features.length === 0) {
      alert("No comparison GeoJSON or features to display.");
      return;
    }
    currentComparisonIndex--;
    if (currentComparisonIndex < 0) {
      currentComparisonIndex = comparisonGeojsonData.features.length - 1; // loop back to the last feature
    }
    const feature = comparisonGeojsonData.features[currentComparisonIndex];
    renderComparisonFeature(feature);

    document.getElementById("comparison-result").textContent = `Feature ${currentComparisonIndex + 1} of ${
      comparisonGeojsonData.features.length
    }`;
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

      // Check if comparison GeoJSON is provided
      if (comparisonGeojsonData && comparisonGeojsonData.features.length > 0) {
        showNextComparisonFeature(); // Render the first comparison feature
        document.getElementById("next-button").disabled = false;
        document.getElementById("prev-button").disabled = false;
        document.getElementById(
          "comparison-result"
        ).textContent = `Feature 1 of ${comparisonGeojsonData.features.length}`;
      } else {
        document.getElementById("next-button").disabled = true;
        document.getElementById("prev-button").disabled = true;
        alert("Base GeoJSON rendered. Please input the comparison GeoJSON.");
      }

      // renderBaseLayer();

      // reset index
      currentComparisonIndex = -1;
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
