var app = app || {};

app.Food = Backbone.Model.extend({
  defaults : {
    id : 1,
    text : 'some text'
  }
});