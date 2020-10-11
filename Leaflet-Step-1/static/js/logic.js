//const url='https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

// Store our API endpoint inside queryUrl








(async function(){
    const queryUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'	;
    const data = await d3.json(queryUrl);
		console.log(data.features);
		
		const streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
            attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
            maxZoom: 18,
            id: "mapbox.streets",
            accessToken: "pk.eyJ1IjoibWFubGFyYSIsImEiOiJjamtnd2R3ZW4wbWlwM3FxZ3BoY2JkNm1qIn0.NQ7yhFgYEP0fqdHkT9c6-Q"
    });
		
		// Create our map, giving it the streetmap and earthquakes layers to display on load
    const myMap = L.map("map", {
            center: [37.09, -95.71],
            zoom: 5,
            layers: [streetmap]
    });
			
				
		for (var i=0; i < data.features.length; i++){
		
        var lat = data.features[i].geometry.coordinates[1];
				var lon = data.features[i].geometry.coordinates[0];
				var magni = data.features[i].properties.mag;
				var radius = magni * 15000;
				//var markers = L.markerClusterGroup();
				
				if (magni <=1 ) {
            color = "green";
        } 
				else if (magni <= 2 ) {
            color = "lightgreen";
        } 
        else if (magni <= 3 ) {
            color = "yellow";
        } 
				else if (magni <= 4 ) {
            color = "tan";
        } 
				else if (magni <= 5 ) {
            color = "brown";
        }
				else {
						color = "red";
				}	
							
				L.circle([lat, lon], {
								color: "black",
								weight: 0.5,
								fillColor: color,
								fillOpacity: 0.9,
								radius: radius
						}).addTo(myMap).bindPopup("Magnitude: " + data.features[i].properties.mag + "<br>Location: " + data.features[i].properties.place);
			
		};
		
		 // Legend Control
  var legend = L.control({
    position: "bottomright"
  });

  // Create div for legend with details
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");

    var magni_legend = ["<=1", "1-2", "2-3", "3-4","4-5", ">5"];
    var magni_colors = ["green","lightgreen","yellow","tan","brown","red"];
				
      
    // Fill in data for legend
    for (var i = 0; i < magni_legend.length; i++) {;;;
		div.innerHTML += "<leg style='background: " + magni_colors[i] + "'></leg> " + magni_legend[i] + "<br>" };
    
    return div;
  };

  // Finally, we our legend to the map.
  legend.addTo(myMap);
			
})()