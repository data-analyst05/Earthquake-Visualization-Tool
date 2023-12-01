// Initialize the map
var map = L.map('map').setView([37.09, -95.71], 3); // Adjust the initial coordinates and zoom level as needed

// Base layers for different map styles
var satellite = L.tileLayer('https://{s}.satellite.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
});

var grayscale = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
});

var outdoors = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenTopoMap contributors'
});

// Set the default layer
grayscale.addTo(map);

// Function to determine marker size based on earthquake magnitude
function markerSize(magnitude) {
    return magnitude * 20000; // Adjust the scaling factor as needed
}

// Function to determine marker color based on earthquake depth
function markerColor(depth) {
    if (depth > 90) return '#ff3333';
    else if (depth > 70) return '#ff6633';
    else if (depth > 50) return '#ff9933';
    else if (depth > 30) return '#ffcc33';
    else if (depth > 10) return '#ffff33';
    else return '#ccff33';
}

// Earthquake data layer
var earthquakes = new L.LayerGroup();

// Fetch earthquake data and add it to the earthquakes layer
var earthquakeDataUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';
d3.json(earthquakeDataUrl).then(function(data) {
    L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
            return L.circle(latlng, {
                radius: markerSize(feature.properties.mag),
                fillColor: markerColor(feature.geometry.coordinates[2]),
                color: '#000',
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            });
        },
        onEachFeature: function(feature, layer) {
            layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>Magnitude: ${feature.properties.mag}</p><p>Depth: ${feature.geometry.coordinates[2]} km</p>`);
        }
    }).addTo(earthquakes);
});
earthquakes.addTo(map);

// Tectonic plates layer
var tectonicPlates = new L.LayerGroup();

// Fetch and add tectonic plates data
var tectonicPlatesUrl = 'https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json';
d3.json(tectonicPlatesUrl).then(function(plateData) {
    L.geoJSON(plateData, {
        color: "#ff6500",
        weight: 2
    }).addTo(tectonicPlates);
});
tectonicPlates.addTo(map);

// Overlay for earthquakes and tectonic plates
var overlayMaps = {
    "Earthquakes": earthquakes,
    "Tectonic Plates": tectonicPlates
};

// Base maps
var baseMaps = {
    "Satellite": satellite,
    "Grayscale": grayscale,
    "Outdoors": outdoors
};

// Layer control to toggle layers
L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);

// Add a legend to the map
var legend = L.control({ position: 'bottomright' });
legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        depths = [-10, 10, 30, 50, 70, 90],
        labels = [];

    div.innerHTML += '<strong>Depth (km)</strong><br>'
    for (var i = 0; i < depths.length; i++) {
        div.innerHTML +=
            '<i style="background:' + markerColor(depths[i] + 1) + '"></i> ' +
            depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
    }
    return div;
};
legend.addTo(map);
