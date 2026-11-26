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
calculateRiverDistance();
//Geolocation shi
let locationMarker;
let watchId = null;
const locateBtn = document.getElementById("locateBtn");
const locationStatus = document.getElementById("locationStatus");

//User granting or denying access to location part
locateBtn.addEventListener("click", function () {
  if(!navigator.geolocation) {
  locationStatus.textContent =
    "Geolocation is not supported by your browser.";
  return;
}
if (watchId !== null) {
  navigator.geoloaction.clearWatch(WatchId);
  watchId = null;
  locateBtn.textContent = "Track My Location";
  locationStatus.textContent = "Location tracking stopped.";
  return;
}
locationStatus.textContent = "Finding your location...";
watchId = navigator.geolocation.watchPosition(
  showPosition,
  showError,
  {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 15000
  }
);
  locateBtn.textContent = "Stop Tracking";
});
// how user location will be displayed (the lil circle)
function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const userLocation = [latitude, longitude];
  if (!locationMarker) {
    locationMarker = L.circleMarker(userLocation, {
      radius: 8,
      color: "white",
      weight: 2,
      fillColor: "blue",
      fillOpacity: 1
    }).addTo(map);
  } else {
      locationMarker.setLatLng(userLocation);
  }
  map.setView(userLocation, 15);
  locationStatus.textContent =
    "Location tracking is active.";
  console.log("Latitude:", latitude);
  console.log("Longitude:", longitude);
}
// location errors
function showError(error) {
  switch (error.code) {
    case 1:
      locationStatus.textContent =
        "location unavailable.";
      break;
    case 3:
      locationStatus.textContent =
        "Location request timed out.";
      break;
    default:
      locationStatus.textContent =
        "An unknown error occurred.";
  }
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }
  locateBtn.textContent = "Track My Location";
}

//San Mo Waterways
fetch("waterways.geojson")
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      style: {
        color: "#0077b6",
        weight: 3,
        opacity: 0.9
      }
    }).addTo(map);
  .catch(error => {
    console.error("Error loading waterways:", error);
  });
