/*
 * Defines observable model for found location which has coordinates, description etc.  
 */
var Location = function(googleLoc) {
  this.mapData = googleLoc;
  this.title = ko.observable(googleLoc.name);
};