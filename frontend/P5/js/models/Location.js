/*
 * Defines observable model for location which has coordinates, description etc. Also stores google location, marker and infoWindow  
 */
var Location = function(googleLoc, marker, infoWindow) {
  this.mapData = googleLoc;
  this.marker = marker;
  this.infoWindow = infoWindow;
  this.title = ko.observable(googleLoc.name);
  this.visible = ko.pureComputed({
    read : function(){return marker.isVisible();},
    write : function(visible) {marker.setVisible(visible);infoWindow.close();}
  });
};