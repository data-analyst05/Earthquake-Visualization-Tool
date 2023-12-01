# Earthquake Visualization Tool

This project visualizes earthquake data using Leaflet, an open-source JavaScript library for mobile-friendly interactive maps, and D3.js, a JavaScript library for manipulating documents based on data. The tool displays earthquakes worldwide, showing their magnitude and depth, and also illustrates the tectonic plates boundaries.

## Features

- Interactive map displaying earthquake data.
- Earthquake markers that vary in size based on magnitude and color based on depth.
- Tectonic plates boundaries displayed on the map.
- Multiple base map layers (satellite, grayscale, outdoors).
- Layer control for toggling between earthquake data and tectonic plates.
- Responsive design for optimal viewing on various devices.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/data-analyst05/Earthquake-Visualization-Tool.git
   ```
2. Navigate to the project directory:
   ```
   cd Earthquake-Visualization-Tool
   ```
3. Open `index.html` in your web browser.

## Usage

- The map will initially display all earthquakes from the past week with markers indicating their location, magnitude, and depth.
- You can toggle between different base map styles and overlay layers for earthquakes and tectonic plates.
- Click on an earthquake marker to view detailed information about the earthquake.

## Technologies Used

- HTML/CSS/JavaScript
- [Leaflet](https://leafletjs.com/) for interactive maps.
- [D3.js](https://d3js.org/) for data handling and visualization.
- [USGS Earthquake API](https://earthquake.usgs.gov/fdsnws/event/1/) for real-time earthquake data.
- [Fraxen's Tectonic Plates Data](https://github.com/fraxen/tectonicplates) for tectonic plates boundaries.

## Data Sources

- Earthquake data is sourced from the USGS Earthquake API.
- Tectonic plates data is sourced from Fraxen's GitHub repository.

## Acknowledgments

- Thanks to the USGS for providing the earthquake data.
- Thanks to Fraxen for providing the tectonic plates data.

