function instagramInit() {
  var requestCounter = 0;
  var max_time;
  var data;

  function getGrams() {
    max_time     =  max_time || Math.round(Date.now()/1000);
    var ig_token = 'f87a394154a542419c15c252c4a3082f';
    var domain   = 'https://api.instagram.com/v1/media/search?';
    var distance = 'distance=5000&';
    var position = 'lat=' + mapPosition['lat'] + '&lng=' + mapPosition['lng'] + '&';
    var time     = 'max_timestamp=' + max_time + '&';
    var client   = 'client_id=' + ig_token;
    var request  = distance + position + time + client;
    var url      = domain + request;
    $.ajax({
      type: 'get', 
      url: url,
      dataType: 'jsonp',
      async: false,
      success: function(data, textStatus, jqXHR) {
        filterGrams(data.data);
        console.log(url);
        data = data.data
        requestCounter ++;
        console.log('request number ' + requestCounter);
        max_time = (data[data.length - 1].created_time) - 1;
        console.log('max time is ' + max_time);
        checkForNextRequest();
      },
      error: function(xhr, status, error) {
        console.log(xhr.responseText);
        console.log(status);
        console.log(error);
      }
    });
  }

  function checkForNextRequest() {
    if (grams.length < 20 && requestCounter < 100) {
      getGrams();
    } else {
      gramsLoaded();
    }
  }

  function filterGrams(data) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].tags && data[i].tags.length) {
        for (var j = 0; j < data[i].tags.length; j++) {
          if ((/dog/i.test(data[i].tags[j])) && !containsGram(data[i]))  {
            grams.push(data[i]);
          }
        };
      }
    };
  };

  function containsGram(gram) {
    var i;
    for (i = 0; i < grams.length; i++) {
        if (grams[i] === gram) {
            return true;
        }
    }

    return false;
  }

  function gramsLoaded() {
    console.log(grams);
    gramsComplete();
  };

  getGrams();
};
