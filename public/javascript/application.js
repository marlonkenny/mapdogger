var map;
var grams = [];
var mapLoaded = false;
var gramsReady = false;

$(function(){
  getLocation();
});

function locationComplete() {
  console.log('location aquired')
  instagramInit();
};

function gramsComplete(){
  gramsReady = true;
  console.log('grams ready');

  loadSidebar();

  if (mapLoaded) {
    loadMarkers(grams);
  }
};

function loadSidebar() {
  function createGram(gram) {
    var gramContainer = $('<div>').addClass('gram-container').append($('<img>').attr('src', gram.images.low_resolution.url));
    $('#left-bar').append(gramContainer).append('<hr>');
  };

  for (var i = 0; i < grams.length; i++) {
    createGram(grams[i]);
  };
};

function mapLoading() {
  google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
    mapLoaded = true;
    console.log('map loaded');

    if (gramsReady) {
      loadMarkers(grams);
    }
  });
};