var app = app || {};

(function() {
  var rawLocations = {
    city : 'Amsterdam NL',
    locations : [ 'Café-restaurant van Kerkwijk', 'Restaurant Azmarino', 'Singel 404', 'Restaurant De Kas',
        'Getto Food & Drinks', '&samhoud places', 'Hungry Birds Street Food Tours Amsterdam', 'Pancakes Amsterdam',
        'Tomo Sushi', 'Eat Mode', 'Balthazar\'s Keuken', 'Mangetsu', 'La Perla Restaurant', 'Oriental City B.V.',
        'Bazar Amsterdam', 'Castell', 'Broodje Bert', 'Greenwoods', 'Restaurant Greetje', 'Moeders' ]
  };
  
  /**
   * Make a service around yelp search
   * @param location the location you want to get info about
   * @param callback the response callback
   */
  app.yelp = function(location, callback) {
    var auth = {
        //
        // Update with your auth tokens.
        // https://github.com/levbrie/mighty_marks/blob/master/yelp-search-sample.html
        //
        consumerKey : "VMVBpBVP-Wb8jofcKJAS-w",
        consumerSecret : "r4Izjn5MZPlbOnc66xFJ5FxfIrE",
        accessToken : "mWIcBqKui4e7QGnbgkSetWIr4TWtforB",
        // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
        // You wouldn't actually want to expose your access token secret like this in a real application.
        accessTokenSecret : "dVXj7GHKn2AXCxPIF27z4MbWagg",
        serviceProvider : {
          signatureMethod : "HMAC-SHA1"
        }
      };
    var token = {
      public : '',
      secret : ''
    };
    var request_data = {
        url: 'https://api.yelp.com/v2/search?term' + location.title() + '&location=' + rawLocations.city,
        method: 'GET',
        data : {}
    };
    $.ajax({
      url : request_data.url,
      method : request_data.url,
      data : auth.authorize(request_data, token)
    }).done(callback);
  };
  /*
   * Create the map, initialize places service and set map bounds
   */
  app.map = new google.maps.Map(document.getElementById('map'), {
    center : {
      lat : -34.397,
      lng : 150.644
    },
    scrollwheel : true,
    zoom : 8
  });
  app.placesService = new google.maps.places.PlacesService(app.map);
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
  function createLocation(placeData) {
    // service
    var address = placeData.formatted_address; // name of the place from the place
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

    var content = $('<div/>');
    content.append($('<div/>').addClass('place-title').text(placeData.name));
    content.append($('<div/>').addClass('place-address').text(address));
    var infoWindow = new google.maps.InfoWindow({
      content : content.html(),
    });

    var location = new Location(placeData, marker, infoWindow);
    google.maps.event.addListener(marker, 'click', function() {
      location.openInfo();
    });
    return location;
  }

  /*
   * turn restaurant names to locations with google places service
   */
  rawLocations.locations.forEach(function(loc) {
    app.placesService.textSearch({
      query : loc + " " + rawLocations.city
    }, function(result, state) {
      if (state == google.maps.places.PlacesServiceStatus.OK) {
        // console.log(result[0]);
        var location = createLocation(result[0]);
        app.locations.push(location);
      }
    });
  });
})();