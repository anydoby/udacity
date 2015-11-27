var app = app || {};
var $b = Backbone;

$(function() {
  $b.history.start({
    pushState : true
  });
  var user = new app.User();
  /*
   * Try to load stored user. If there is no user run a setup wizzard
   */
  user.fetch().done(function(users) {
    if (users[0]) {
      console.log(users[0]);
    } else {
      app.setup = new app.SetupWizzard({
        model : user
      });
      app.setup.render();
    }
  });
});