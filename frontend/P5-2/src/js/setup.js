var app = {};
var $b = Backbone;

(function() {
  app.User = $b.Model.extend({
    defaults: function() {
      return {
        name: "incognito",
        dob: '1980-10-10',
        records: []
      };
    },    
  });
  
  app.SetupName = $b.View.extend({
    el : $('#main'),
    template : _.template($('#setup-name').html()),
    events : {
      "click #next" : done,
      "keypress input" : done
    },
    render : function() {
      this.input = this.$('#setup-name-field');
    },
    done : function(){}
  });
});