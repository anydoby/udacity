/*
 * Defines observable model for location which has coordinates, description etc. Also stores google location, marker and infoWindow  
 */
var Location = function(googleLoc, marker, infoWindow) {
  this.mapData = googleLoc;
  this.marker = marker;
  this.infoWindow = infoWindow;
  this.title = ko.observable(googleLoc.name);
  this.address = ko.observable(googleLoc.formatted_address);
  this.photo = ko.observable();
  if (googleLoc.photos) {
    this.photo(googleLoc.photos[0].getUrl({maxWidth:100,maxHeight:100}));
  }
  this.visible = ko.pureComputed({
    read : function(){return marker.isVisible();},
    write : function(visible) {marker.setVisible(visible);infoWindow.close();}
  });
  this.openInfo = function() {
    infoWindow.open(marker.map, marker);
    marker.bounce();
  };
};