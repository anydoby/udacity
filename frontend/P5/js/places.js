var app = app || {};

(function() {
  var rawLocations = {
    city : 'Amsterdam NL',
    locations : [ 'Café-restaurant van Kerkwijk', 'Restaurant Azmarino', 'Singel 404', 'Restaurant De Kas',
        'Getto Food & Drinks', '&samhoud places', 'Hungry Birds Street Food Tours Amsterdam', 'Pancakes Amsterdam',
        'Tomo Sushi', 'Eat Mode', 'Balthazar\'s Keuken', 'Mangetsu', 'La Perla Restaurant', 'Oriental City B.V.',
        'Bazar Amsterdam', 'Castell', 'Broodje Bert', 'Greenwoods', 'Restaurant Greetje', 'Moeders' ]
  };
  app.locations = [];
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

  /*
   * createMapMarker(placeData) reads Google Places search results to create map
   * pins. placeData is the object returned from search results containing
   * information about a single location. We also put the marker and infoWindow
   * in it (marker, infoWindow fields).
   */
  function createMapMarker(placeData) {
    // The next lines save location data from the search result object to local
    // variables
    var lat = placeData.geometry.location.lat(); // latitude from the place
    // service
    var lon = placeData.geometry.location.lng(); // longitude from the place
    // service
    var name = placeData.formatted_address; // name of the place from the place
    // service
    var bounds = window.mapBounds; // current boundaries of the map window

    // marker is an object with additional data about the pin for a single
    // location
    var marker = new google.maps.Marker({
      map : app.map,
      position : placeData.geometry.location,
      title : name
    });

    var infoWindow = new google.maps.InfoWindow({
      content : name
    });

    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.open(app.map, marker);
    });

    // this is where the pin actually gets added to the map.
    // bounds.extend() takes in a map location object
    bounds.extend(new google.maps.LatLng(lat, lon));
    // fit the map to the new marker
    app.map.fitBounds(bounds);
    // center the map
    app.map.setCenter(bounds.getCenter());
    placeData.marker = marker;
    placeData.infoWindow = infoWindow;
  }

  /*
   * turn restaurant names to locations with google places service
   */
  rawLocations.locations.forEach(function(loc) {
    app.placesService.textSearch({
      query : loc + " " + rawLocations.city
    }, function(result, state) {
      if (state == google.maps.places.PlacesServiceStatus.OK) {
        console.log(result[0]);
        app.locations.push(result[0]);
        createMapMarker(result[0]);
      }
    });
  });
})();