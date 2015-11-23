var app = app || {};

(function() {
  app.rawLocations = {
    city : 'Amsterdam NL',
    locations : [ 'Café-restaurant van Kerkwijk', 'Restaurant Azmarino', 'Singel 404', 'Restaurant De Kas',
        'Getto Food & Drinks', '&samhoud places', 'Hungry Birds Street Food Tours Amsterdam', 'Pancakes Amsterdam',
        'Tomo Sushi', 'Eat Mode', 'Balthazar\'s Keuken', 'Mangetsu', 'La Perla Restaurant', 'Oriental City B.V.',
        'Bazar Amsterdam', 'Castell', 'Broodje Bert', 'Greenwoods', 'Restaurant Greetje', 'Moeders' ]
  };

  /**
   * Make a service around yelp search. Should have been very simple according
   * to yelp docs, a real life example appeared to be a lot of code, I swear
   * they did not have it in their official docs:
   * 
   * https://github.com/levbrie/mighty_marks/blob/master/yelp-search-sample.html
   * 
   * Jeeezzz, it's way too much for a simple restful service call
   * 
   * @param location
   *          the location you want to get info about
   * @param callback
   *          the response callback
   */
  app.yelp = function(location, callback) {
    var auth = {
      consumerKey : "VMVBpBVP-Wb8jofcKJAS-w",
      consumerSecret : "r4Izjn5MZPlbOnc66xFJ5FxfIrE",
      accessToken : "mWIcBqKui4e7QGnbgkSetWIr4TWtforB",
      accessTokenSecret : "dVXj7GHKn2AXCxPIF27z4MbWagg",
      serviceProvider : {
        signatureMethod : "HMAC-SHA1"
      }
    };

    var terms = location.title();
    var near = location.address();
    var accessor = {
      consumerSecret : auth.consumerSecret,
      tokenSecret : auth.accessTokenSecret
    };
    parameters = [];
    parameters.push([ 'term', terms ]);
    parameters.push([ 'location', near ]);
    parameters.push([ 'limit', 1 ]);
    var lat = location.mapData.geometry.location.lat();
    var lon = location.mapData.geometry.location.lng();
    parameters.push([ 'cll', lat + "," + lon ]);
    parameters.push([ 'radius_filter', 25 ]);
    parameters.push([ 'callback', 'cb' ]);
    parameters.push([ 'oauth_consumer_key', auth.consumerKey ]);
    parameters.push([ 'oauth_consumer_secret', auth.consumerSecret ]);
    parameters.push([ 'oauth_token', auth.accessToken ]);
    parameters.push([ 'oauth_signature_method', 'HMAC-SHA1' ]);
    var message = {
      'action' : 'http://api.yelp.com/v2/search',
      'method' : 'GET',
      'parameters' : parameters
    };
    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);
    var parameterMap = OAuth.getParameterMap(message.parameters);
    parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature)

    $.ajax({
      'url' : message.action,
      'data' : parameterMap,
      'cache' : true,
      'dataType' : 'jsonp',
      'jsonpCallback' : 'cb'
    }).done(callback).fail(function(data) {
        location.yelpData('Nothing found :( Server responded with ' + data.statusText);
        location.yelpImage('img/404.png');      
    });
  };

  window.mapBounds = new google.maps.LatLngBounds();

  app.locations = ko.observableArray();
  /*
   * When a location is added we want to fit it on the map
   */
  app.locations.subscribe(function(newElements) {
    newElements.forEach(function(newLocation) {
      window.mapBounds.extend(newLocation.mapData.geometry.location);
      app.map.fitBounds(window.mapBounds);
      app.map.setCenter(window.mapBounds.getCenter());
    });
  });

  /*
   * Reads Google Places search results, creates markers and infoWindow.
   */
  app.createLocation = function(placeData) {
    // service
    var address = placeData.formatted_address; // name of the place from the
    // place
    // marker is an object with additional data about the pin for a single
    // location
    var marker = new google.maps.Marker({
      map : app.map,
      position : placeData.geometry.location,
      title : address,
      animation : google.maps.Animation.DROP,
      bounce : function() {
        if (this.getAnimation() != null) {
          this.setAnimation(null);
        } else {
          this.setAnimation(google.maps.Animation.BOUNCE);
          // bounce a bit and then stop
          window.setTimeout(this.bounce.bind(this), 1400);
        }
      }
    });

    var infoMarkup = $($('#infoWindowTemplate').html());    
    var content = infoMarkup.attr('id', placeData.place_id).get(0);
    var infoWindow = new google.maps.InfoWindow({
      content : content
    });

    var location = new Location(placeData, marker, infoWindow);
    google.maps.event.addListener(marker, 'click', function() {
      app.openInfo(location);
    });
    return location;
  }

  app.openInfo = function(location) {   
    app.locations().forEach(function(location) {
      location.infoWindow.close();
    });
    
    location.infoWindow.open(app.map, location.marker);
    location.marker.bounce();
    if (!location.yelpImage()) {
      // let Knockout dynamically set the data for location's description when it's done loading
      ko.applyBindings(location, document.getElementById(location.mapData.place_id));
    }
    /*
     * get more info about the place from yelp and display it in the info window
     */
    app.yelp(location, function(data) {
      if (data.total != 0) {
        location.yelpData(data.businesses[0].snippet_text);
        location.yelpImage(data.businesses[0].image_url);
      } else {
        location.yelpData('Nothing found :( We swear, the panda did not eat it all. Come and check yourself');
        location.yelpImage('img/404.png');
      }
    });
  };

})();