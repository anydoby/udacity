var app = app || {};

app.Foods = Backbone.Collection.extend({
  model : app.Food,
  comparator : 'name'
});

app.foods = new app.Foods();