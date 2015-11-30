var app = app || {};
var $b = Backbone;

(function(){
  var DayView = $b.View.extend({
    el : '#main',
    
    events : {
      'keypress #main-food-input' : 'createOnEnter'
    },
    
    initialize : function() {
      
    },
    
    render : function() {
      this.$el.removeClass('hidden');
    },
    
    createOnEnter : function(event) {
      if (e.keyCode === ENTER_KEY) {
        console.log('entered');
      }
    }
    
  });
})();