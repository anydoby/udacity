/*
 * Defines observable model for location which has coordinates, description etc. Also stores google location, marker and infoWindow  
 */
var Location = function(googleLoc, marker, infoWindow) {
  var location = this;
  this.mapData = googleLoc;
  this.marker = marker;
  this.infoWindow = infoWindow;
  this.title = ko.observable(googleLoc.name);
  this.address = ko.observable(googleLoc.formatted_address);
  this.photo = ko.observable();
  /*
   * This data is initially empty but will be populated when it is loaded from
   * yelp on first click
   */
  this.yelpData = ko.observable('Loading additional data...');
  this.yelpImage = ko.observable();
  if (googleLoc.photos) {
    this.photo(googleLoc.photos[0].getUrl({
      maxWidth : 100,
      maxHeight : 100
    }));
  }
  this.visible = ko.pureComputed({
    read : function() {
      return marker.isVisible();
    },
    write : function(visible) {
      marker.setVisible(visible);
      infoWindow.close();
    }
  });
};