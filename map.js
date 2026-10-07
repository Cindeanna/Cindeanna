var map = L.map('map').setView([29.8884, -97.9384], 14);
 var mapLink = '<a href="https://wwww.openstreetmap.org">OpenStreetMap</a>';
L.tileLayer(
    'https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; ' + mapLink + ' Contributors',
    maxZoom: 18,
}).addTo(map);

//buffer
function createFloodBuffer(){
  var riverPoint = turf.point([-97.9384, 29.8884]);
  var floodBuffer = turf.buffer(riverPoint, 500, {
    units: 'feet'
  });
  L.marker([29.8884, -97.9384])
    .addTo(map)
    .bindPopup("River Location");

  L.geoJSON(floodBuffer)
    .addTo(map);
}

createFloodBuffer();
