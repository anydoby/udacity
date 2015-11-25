var app = {};
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

$(function(){  
  $b.history.start({pushState: true});
});