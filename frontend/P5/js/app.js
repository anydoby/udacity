var app = app || {};

/*
 * represents input filter query and the resulting locations that match the
 * query
 */
var SearchViewModel = function(app) {
  this.queryText = ko.observable();

  /*
   * Results holds locations filtered by text query. If there's no query text
   * everything is returned.
   */
  this.locations = ko.computed(function() {
    var queryText = this.queryText();
    if (!queryText || queryText.trim().length == 0) {
      return app.locations();
    }

    var queryTerms = queryText.toLowerCase().split(' ');
    var filtered = app.locations().filter(function(location) {
      for (var i = 0; i < queryTerms.length; i++) {
        var term = queryTerms[i];
        if (location.title().toLowerCase().indexOf(term) != -1) {
          return true;
        }
      }
      return false;
    });
    return filtered;
  }, this);
  var hide = function(location){location.visible(false);};
  var show = function(location){location.visible(true);};
  this.locations.subscribe(function(newLocations){
    app.locations().forEach(hide);
    newLocations.forEach(show);
  });
};

$(function() {
  ko.applyBindings(new SearchViewModel(app));
});