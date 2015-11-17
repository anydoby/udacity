var app = app || {};

/*
 * represents input filter query and the resulting locations that match the query
 */
var SearchViewModel = function(app) {
  this.queryText = ko.observable();

  /*
   * Results holds locations filtered by text query. If there's no query text everything is returned.
   */
  this.locations = ko.computed(function() {
    var queryText=this.queryText();
    if (!queryText || queryText.trim().length == 0) {
      return app.locations();
    }

    var queryTerms = queryText.slice(' ');
    return app.locations().filter(function(location) {
      for (i in queryTerms) {
        if (location.title().indexOf(queryTerms[i]) != -1) {
          return true;
        }
      }
      return false;
    });
  }, this);
};

$(function() {
  ko.applyBindings(new SearchViewModel(app));
});