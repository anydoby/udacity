var app = app || {};

var showOrSetupUser = function() {
  app.user = new app.User();
  /*
   * Try to load stored user. If there is no user run a setup wizzard
   */
  app.user.fetch().done(function(users) {
    if (users[0]) {
      app.dayView = new app.DayView({
        model : app.user
      });
    } else {
      app.setup = new app.SetupWizzard({
        model : app.user
      });
    }
  });
};

var AppRouter = Backbone.Router.extend({
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
  Backbone.history.start();
  showOrSetupUser();
});