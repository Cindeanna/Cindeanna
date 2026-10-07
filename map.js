var map = L.map('map').setView([29.8884, -97.9384], 14);
 var mapLink = '<a href="https://wwww.openstreetmap.org">OpenStreetMap</a>';
L.tileLayer(
    'https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; ' + mapLink + ' Contributors',
    maxZoom: 18,
}).addTo(map);

//buffer
function createRiverBuffer(){
  var riverLine = turf.lineString([
   [-97.9341, 29.8808],
   [-97.9350, 29.8823],
   [-97.9355, 29.8843],
   [-97.9357, 29.8850],
   [-97.9358, 29.8858],
  ]);
  var riverBuffer = turf.buffer(riverLine, 500, {
    units: 'feet'
  });

  L.geoJSON(riverLine, {
    style: {
      color: 'blue',
      weight: 4
    }
  }).addTo(map);
  L.geoJSON(riverBuffer, {
    style: {
      color: 'blue',
      weight: 2,
      fillColor: 'blue',
      fillOpacity: 0.25
    }
  }).addTo(map);
}
createRiverBuffer();
//pointToLineDistance
function calculateRiverDistance() {
    var houseBuilding = turf.point([-97.9340, 29.8870]);
    var river = turf.lineString([
        [-97.9400, 29.8900],
        [-97.9380, 29.8870],
        [-97.9360, 29.8840]
  ]);
    var distance = turf.pointToLineDistance(houseBuilding, river, {
      units: 'miles'
    });
    document.getElementById("result").innerHTML =
        "Distance from the river: " + distance.toFixed(2) + " miles";
}
