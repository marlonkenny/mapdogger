var mapPosition = {};

function getLocation() {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
    console.log('getting location')
  } else {
    // not supported
  }
};

function showError(error) {
  switch(error.code) {
  case error.PERMISSION_DENIED:
    element.innerHTML = "User denied the request for Geolocation."
    break;
  case error.POSITION_UNAVAILABLE:
    element.innerHTML = "Location information is unavailable."
    break;
  case error.TIMEOUT:
    element.innerHTML = "The request to get user location timed out."
    break;
  case error.UNKNOWN_ERROR:
    element.innerHTML = "An unknown error occurred."
    break;
 }
}

function showPosition(position) {
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  
  mapPosition["lat"] = lat;
  mapPosition["lng"] = lng;

  locationComplete();
  initialize();
};

function initialize() {
  var mapOptions = {
    center: mapPosition,
    zoom: 13, 
    draggable: true, 
    zoomControl: true,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.SMALL
    },
    streetViewControl: false, 
    scrollwheel: false, 
    disableDoubleClickZoom: false,
    panControl: false,
    scaleControl: false
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  mapLoading();
};

function loadMarkers(grams) {
  console.log('creating markers')
  for (var i = 0; i < grams.length; i++) {
    createMarker(grams[i]);
  };  
}

function createMarker(gram) {
  var position = new google.maps.LatLng(gram.location.latitude, gram.location.longitude);
  var marker = new google.maps.Marker({
    position: position, 
    map: map,
    title: 'Hello!',
    animation: google.maps.Animation.DROP
  });

  var content = '<img src="' + gram.images.low_resolution.url + '" ><p>' + gram.user.username + '</p>';
  var infoBox = new google.maps.InfoWindow({ 
    content: content, 
    maxWidth: 1000 
  });

  google.maps.event.addListener(marker, 'click', function() {
      infoBox.open(map, marker);
  }); 
}