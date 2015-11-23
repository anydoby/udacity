var app = app || {};

function isEmpty(text) {
  return !text || text.trim().length == 0;
}

/*
 * represents input filter query and the resulting locations that match the query
 */
var SearchViewModel = function(app) {
  this.queryText = ko.observable();

  /*
   * Results holds locations filtered by text query. If there's no query text everything is returned.
   */
  this.locations = ko.computed(function() {
    var queryText = this.queryText();
    if (isEmpty(queryText)) {
      return app.locations();
    }

    var queryTerms = queryText.toLowerCase().split(' ');
    var filtered = app.locations().filter(
        function(location) {
          for (var i = 0; i < queryTerms.length; i++) {
            var term = queryTerms[i];
            if (location.title().toLowerCase().indexOf(term) != -1
                || location.address().toLowerCase().indexOf(term) != -1) {
              return true;
            }
          }
          return false;
        });
    return filtered;
  }, this);

  var hide = function(location) {
    location.visible(false);
  };
  var show = function(location) {
    location.visible(true);
  };
  this.locations.subscribe(function(newLocations) {
    app.locations().forEach(hide);
    newLocations.forEach(show);
    app.map.fitBounds(window.mapBounds);
    app.map.setCenter(window.mapBounds.getCenter());

  });

  this.click = function(location) {
    app.openInfo(location);
  };
};

app.init = function() {
  /*
   * Create the map, initialize places service and set map bounds
   */
  window.mapBounds = new google.maps.LatLngBounds();
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
  app.rawLocations.locations.forEach(function(loc) {
    app.placesService.textSearch({
      query : loc + " " + app.rawLocations.city
    }, function(result, state) {
      if (state === google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT
          || state === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        return;
      }
      if (state == google.maps.places.PlacesServiceStatus.OK) {
        var location = app.createLocation(result[0]);
        app.locations.push(location);
      } else {
        alert("Unable to load data from Google maps. Please check your connection.");
      }
    });
  });

  /*
   * Make the text highlighted upon binding. Borrowed idea from
   * http://www.knockmeout.net/2011/06/fun-with-highlighting-in-knockoutjs.html
   */
  ko.bindingHandlers.highlight = {
    update : function(element, valueAccessor) {
      var options = valueAccessor();
      var value = ko.utils.unwrapObservable(options.text);
      var search = ko.utils.unwrapObservable(options.match);
      if (isEmpty(search)) {
        element.innerHTML = value;
      } else {
        element.innerHTML = value.replace(new RegExp("(" + search + ")", 'ig'), '<span class="highlight">$1</span>');
      }
    }
  };
  ko.applyBindings(new SearchViewModel(app));
};

app.mapsFailed = function(){
  
};