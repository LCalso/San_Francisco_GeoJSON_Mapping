// An array which will be used to store created cityMarkers
var cityMarkers = [];
// loop through the city markers
for (var i = 0; i < cities.length; i++) {
  // push the proper information to the cityMarkers array
  cityMarkers.push(
    L.marker(cities[i].location).bindPopup("<h1>" + cities[i].name + "</h1>")
  );
}

// make an array filled with the crime markers 
var crimeMarkers = [];
for (var i = 0; i < crimes.length; i++) {
  // loop through the cities array, create a new marker, push it to the cityMarkers array
  crimeMarkers.push(
    L.marker([crimes[i].y, crimes[i].x]).bindPopup("<h1>" + crimes[i].descript + "</h1>")
  );
}


// var crimeHeatmapMarkers = []
// for (var i = 0; i < crimeMarkers.length; i++) {
//     // establish that the current response is a location
//     var marker = crimeMarkers[i].location;
//     // push the coordinates of the location to the heatarray array
//     if (marker) {
//       crimeHeatmapMarkers.push([marker.coordinates[1], marker.coordinates[0]]);
//     }
// }
// // initiate the Heat Map effect on the heatArray array
// var heat = L.heatLayer(crimeHeatmapMarkers, {
//     radius: 20,
//     blur: 35
// });








// // make an array filled with heatmap 
// var crimeHeatmapMarkers = [];
// for (var i = 0; i < crimes.length; i++) {
//     // establish that the current response is a location
//     var location = crimes[i].location;
//     // push the coordinates of the location to the heatarray array
//     if (location) {
//       crimeHeatmapMarkers.push([location.coordinates[1], location.coordinates[0]]);
//     }
// }
// // create a Heat Map using the crimeHeatmapMarkers array
// var heat = L.heatLayer(crimeMarkers, {
//     radius: 20,
//     blur: 35
//   }).addTo(myMap);







// Add all the cityMarkers to a new layer group.
// Now we can handle them as one group instead of referencing each individually
var cityLayer = L.layerGroup(cityMarkers);
var crimeLayer = L.layerGroup(crimeMarkers);



// Define variables for our tile layers
var light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});

var dark = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
});

var streets = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
});

var satellite = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.satellite",
  accessToken: API_KEY
});

// Create map object and set default layers
var myMap = L.map("map", {
  // center: [46.2276, 2.2137] (this is centered on europe),
  center: [37.7749, -122.4194],
  // this one is centered on SF as it should be haha
  // how far to zoom
  zoom: 13,
  // what are the default layers we want to have sellected?
  layers: [light, cityLayer]
});

// STUFF FROM THE HEATMAP
// data url
var url = "https://data.sfgov.org/resource/cuks-n6tp.json?$limit=10000";
// run this function on the response from this url
d3.json(url, function(response) {
  // print the response from the url
  console.log(response);
  // an array that will store all the created heatmarkers
  var heatArray = [];
  // go through the response parts and 
  for (var i = 0; i < response.length; i++) {
    // establish that the current response is a location
    var location = response[i].location;
    // push the coordinates of the location to the heatarray array
    if (location) {
      heatArray.push([location.coordinates[1], location.coordinates[0]]);
    }
  }
  // initiate the Heat Map effect on the heatArray array
  var heat = L.heatLayer(heatArray, {
    radius: 20,
    blur: 35
  });
});
// end stuff from the heatmap script






// Only one base layer can be shown at a time
var mutuallyExclusiveBaseMaps = {
  Light: light,
  Dark: dark,
  Satellite: satellite,
  Street: streets
};

// Overlays that may be toggled on or off
var toggleLayers = {
  cityPoints: cityLayer,
  crimePoints: crimeLayer,
  // crimeHeatMap: heatLayer
};

// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(mutuallyExclusiveBaseMaps, toggleLayers).addTo(myMap);


