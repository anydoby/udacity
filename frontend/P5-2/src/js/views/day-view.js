var app = app || {};

(function() {
  app.DayView = Backbone.View.extend({
    el : '#day',
    
    events : {
      'keypress #day-food-input' : 'createOnEnter'
    },
    
    initialize : function() {
      console.log('initializing day view');
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(app.days, 'change', this.render);
      app.days.fetch({reset:true});
      this.render();
    },
    
    render : function() {
      console.log('rendering day view');
      this.$el.removeClass('hidden');
    },
    
    createOnEnter : function(e) {
      if (e.keyCode === ENTER_KEY) {
        console.log('entered');
      }
    }
    
  });
})();