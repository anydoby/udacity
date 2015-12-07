var app = app || {};

app.User = Backbone.Model.extend({
  localStorage : new Backbone.LocalStorage("ht-user")
});
