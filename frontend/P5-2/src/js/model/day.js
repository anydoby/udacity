var app = app || {};

app.Day = Backbone.Model.extend({
  defaults : {
    timestamp : new Date(),
    
  }
});