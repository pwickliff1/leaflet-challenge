const url='https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

// Store our API endpoint inside queryUrl


function createFeatures(earthquakeData) {

    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the earthquake
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p> Magnitude " +feature.properties.mag + "</p>");
    }

    // Create a GeoJSON layer containing the features array on the earthquakeData object
    // Run the onEachFeature function once for each piece of data in the array
    const earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature
    });

    // Sending our earthquakes layer to the createMap function
    createMap(earthquakes);
}

function createMap(earthquakes) {

    // Define streetmap and darkmap layers
    const streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
            attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
            maxZoom: 18,
            id: "mapbox.streets",
            accessToken: "pk.eyJ1IjoibWFubGFyYSIsImEiOiJjamtnd2R3ZW4wbWlwM3FxZ3BoY2JkNm1qIn0.NQ7yhFgYEP0fqdHkT9c6-Q"
    });

    const darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
            attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
            maxZoom: 18,
            id: "mapbox.dark",
            accessToken: "pk.eyJ1IjoibWFubGFyYSIsImEiOiJjamtnd2R3ZW4wbWlwM3FxZ3BoY2JkNm1qIn0.NQ7yhFgYEP0fqdHkT9c6-Q"
    });

    // Define a baseMaps object to hold our base layers
    const baseMaps = {
            "Street Map": streetmap,
            "Dark Map": darkmap
    };

    // Create overlay object to hold our overlay layer
    const overlayMaps = {
            Earthquakes: earthquakes
    };

    // Create our map, giving it the streetmap and earthquakes layers to display on load
    const myMap = L.map("map", {
            center: [37.09, -95.71],
            zoom: 5,
            layers: [streetmap, earthquakes]
    });


		// Create a circle and pass in some initial options
		L.circle([30.26759, -97.74299], {
				color: "green",
				fillColor: "green",
				fillOpacity: 0.99,
				radius: 50000
		}).addTo(myMap);
		
    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
            collapsed: false
    }).addTo(myMap);
}

(async function(){
    //const queryUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'	;
    const data = await d3.json(url);
		console.log(data.features);
		
		//for (var i = 0; i < data.features.length; i++){
		//	console.log(data.features[i].geometry.coordinates[1])
		//};
		
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data.features);
})()