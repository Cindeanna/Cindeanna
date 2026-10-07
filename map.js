var map = L.map('map').setView([29.8884, -97.9384], 14);
 var mapLink = '<a href="https://wwww.openstreetmap.org">OpenStreetMap</a>';
L.tileLayer(
    'https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; ' + mapLink + ' Contributors',
    maxZoom: 18,
}).addTo(map);

//buffer
function createFloodBuffer(){
  var riverLine = turf.lineString([
    [-97.9338, 29.8928],
    [-97.9356, 29.8898],
    [-97.9380, 29.8875],
    [-97.9410, 29.8850],
    [-97.9445, 29.8827],
    [-97.9480, 29.8808],
    [-97.9520, 29.8785],
  ]);
  var floodBuffer = turf.buffer(riverLine, 500, {
    units: 'feet'
  });

  L.geoJSON(riverLine, {
    style: {
      weight: 4
    }
  }).addTo(map);
  L.geoJSON(floodBuffer, {
    style: {
      weight: 2,
      fillOpacity: 0.3
    }
  }).addTo(map);
}

createFloodBuffer();
