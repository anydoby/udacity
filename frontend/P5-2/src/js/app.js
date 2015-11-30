var app = app || {};
var $b = Backbone;

var showOrSetupUser = function() {
  var user = new app.User();
  /*
   * Try to load stored user. If there is no user run a setup wizzard
   */
  user.fetch().done(function(users) {
    if (users[0]) {
      app.dayView = new app.DayView({
        model : user
      });
    } else {
      app.setup = new app.SetupWizzard({
        model : user
      });
      app.setup.render();
    }
  });
};

var AppRouter = $b.Router.extend({
  routes : {
    'setup/:step' : "setup",
    'day/:day' : 'day'
  },

  /**
   * Go to certain step in the setup wizzard or create new one.
   */
  setup : function(step) {
    console.log(step);
    if (app.setup) {
      app.setup.setStep(step);
    } else {
      showOrSetupUser();
    }
  },

  day : function(day) {
    if (!app.dayView) {
      showOrSetupUser();
    }
    if (app.dayView) {
      app.dayView.trigger('day', day);
    }
  }

});

$(function() {
  app.router = new AppRouter();
  $b.history.start();
  showOrSetupUser();
});