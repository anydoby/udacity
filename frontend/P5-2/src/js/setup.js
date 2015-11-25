var ENTER_KEY = 13;
var app = app || {};
var $b = Backbone;

(function() {
  app.User = $b.Model.extend({
    defaults : function() {
      return {
        name : "incognito",
        dob : '1980-10-10',
        sex : 'Male',
        activity : 'none',
      };
    },
  });

  app.Setup = $b.View.extend({
    el : $('#setup'),
    model : app.User,
    events : {
      "keypress input" : "checkEnterKey"
    },
    step : 0,
    steps : [ 'name', 'dob', 'sex', 'activity' ],
    initialize : function() {
      this.field = this.$('#setup-' + this.currentStep() + '-field');
      this.field.focus();
      this.render();
    },
    currentStep : function() {
      return this.steps[this.step];
    },
    render : function() {
      this.$el.removeClass('hidden');
      this.$('#setup-' + this.currentStep()).removeClass('hidden');
    },
    checkEnterKey : function(e) {
      if (e.keyCode === ENTER_KEY) {
        this.nextStep();
      }
    },
    nextStep : function() {
      var previousStep =this.currentStep();
      this.model[previousStep ] = this.field.val();
      
      this.$('#setup-' + previousStep ).addClass('hidden');
      this.step++;
      if (this.step < this.steps.length) {
        this.initialize();
      } else {
        this.done();
      }
    },
    done : function() {
    }
  });

})();