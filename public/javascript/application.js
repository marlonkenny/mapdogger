var map;
var grams = [];
var mapLoaded = false;
var gramsReady = false;

getLocation();

function locationComplete() {
  console.log('location aquired')
  instagramInit();
};

function gramsComplete(){
  gramsReady = true;
  console.log('grams ready');

  if (mapLoaded) {
    loadMarkers(grams);
  }
};

// function placeMarker(gram){
//   createMarker(gram);
// };

function mapLoading() {
  google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
    mapLoaded = true;
    console.log('map loaded');

    if (gramsReady) {
      loadMarkers(grams);
    }
  });
};