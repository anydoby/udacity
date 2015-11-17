var app = app || {};

(function() {
  var rawLocations = {
    city : 'Amsterdam NL',
    locations : [ 'Café-restaurant van Kerkwijk', 'Restaurant Azmarino', 'Singel 404', 'Restaurant De Kas',
        'Getto Food & Drinks', '&samhoud places', 'Hungry Birds Street Food Tours Amsterdam', 'Pancakes Amsterdam',
        'Tomo Sushi', 'Eat Mode', 'Balthazar\'s Keuken', 'Mangetsu', 'La Perla Restaurant', 'Oriental City B.V.',
        'Bazar Amsterdam', 'Castell', 'Broodje Bert', 'Greenwoods', 'Restaurant Greetje', 'Moeders' ]
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
    var name = placeData.formatted_address; // name of the place from the place
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
    return new Location(placeData, marker, infoWindow);
  }

  /*
   * turn restaurant names to locations with google places service
   */
  rawLocations.locations.forEach(function(loc) {
    app.placesService.textSearch({
      query : loc + " " + rawLocations.city
    }, function(result, state) {
      if (state == google.maps.places.PlacesServiceStatus.OK) {
        //console.log(result[0]);
        var location = createLocation(result[0]);
        app.locations.push(location);
      }
    });
  });
})();