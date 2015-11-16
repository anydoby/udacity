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
  app.map = new google.maps.Map(document.getElementById('map'), {
    center : {
      lat : -34.397,
      lng : 150.644
    },
    scrollwheel : true,
    zoom : 8
  });
  app.placesService = new google.maps.places.PlacesService(app.map);
  /*
   * turn restaurant names to locations with google places service
   */
  rawLocations.forEach(function(loc) {
    app.placesService.textQuery({
      text : loc + " " + rawLocations.city
    }, function(result, state) {
      if (state == google.maps.places.PlacesServiceStatus.OK) {
        app.locations.push(result[0]);
      }
    });
  });
})();