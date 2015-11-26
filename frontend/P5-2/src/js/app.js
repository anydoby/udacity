var app = app || {};
var $b = Backbone;

app.router = $b.Router.extend({

  routes : {
    setup : "setup(/:step)",
    day : "day/:date",
  },

  setup : function(step) {
    console.log("Showing welcome step: " + step);
  },

  day : function(date) {
    console.log("Switched to day " + date);
  }

});

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
      new app.SetupWizzard({
        model : user
      });
    }
  });
});