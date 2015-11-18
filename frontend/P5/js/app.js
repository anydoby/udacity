var app = app || {};

function isEmpty(text) {
  return !text || text.trim().length == 0;
}

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
    if (isEmpty(queryText)) {
      return app.locations();
    }

    var queryTerms = queryText.toLowerCase().split(' ');
    var filtered = app.locations().filter(function(location) {
      for (var i = 0; i < queryTerms.length; i++) {
        var term = queryTerms[i];
        if (location.title().toLowerCase().indexOf(term) != -1 ||
            location.address().toLowerCase().indexOf(term) != -1) {
          return true;
        }
      }
      return false;
    });
    return filtered;
  }, this);
  
  var hide = function(location){location.visible(false);};
  var show = function(location){location.visible(true);};
  var closeInfo = function(location){location.infoWindow.close();};
  
  this.locations.subscribe(function(newLocations){
    app.locations().forEach(hide);
    newLocations.forEach(show);
  });
  
  this.click = function(location) {
    app.locations().forEach(closeInfo);
    location.openInfo();
    // if there's no additional info about the location load it from yelp
    if (!location.yelpInfo) {
      app.yelp(location, function(data){
        console.log(data);
      });
    }
  };
};

$(function() {
  /*
   * Make the text highlighted upon binding.
   * Borrowed idea from http://www.knockmeout.net/2011/06/fun-with-highlighting-in-knockoutjs.html
   */
  ko.bindingHandlers.highlight = {
      update: function(element, valueAccessor) {
          var options = valueAccessor();
          var value = ko.utils.unwrapObservable(options.text);
          var search = ko.utils.unwrapObservable(options.match);
          if (isEmpty(search)) {
            element.innerHTML = value;
          } else {            
            var replacement = '<span class="highlight">' + search + '</span>';
            element.innerHTML = value.replace(new RegExp(search, 'ig'), replacement);
          }
      }
  };
  ko.applyBindings(new SearchViewModel(app));
});