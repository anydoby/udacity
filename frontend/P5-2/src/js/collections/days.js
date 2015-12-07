var app = app || {};

app.Days = Backbone.Collection.extend({
  model : app.Day,
  localStorage : new Backbone.LocalStorage("ht-user-days"),
  comparator : 'timestamp'
});

app.days = new app.Days();