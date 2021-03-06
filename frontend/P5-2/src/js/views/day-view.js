var app = app || {};

(function() {
  app.DayView = Backbone.View
      .extend({
        el : '#day',

        events : {
          //'keypress #day-food-input' : 'createOnEnter',
          //'keypress #day-food-input' : 'searchAutocomplete'
        },

        initialize : function() {
          console.log('initializing day view');
          this.listenTo(this.model, 'change', this.render);
          this.listenTo(app.days, 'change', this.render);
          app.days.fetch({
            reset : true
          });
          var foodSelected = this.foodSelected;
          this.foods = new Backbone.AutocompleteList(
              {
                url : function() {
                  var term = $.param({
                    q : $('#day-food-input').val()
                  });
                  return 'https://apibeta.nutritionix.com/v2/autocomplete?appId=52be4fe3&appKey=f046c68c4dc175477d1378818e4415e7&'
                      + term;
                },
                filter : null,
                el : $('#day-food-input'),
                results: $('form#food-search .autocomplete-results'),
                template : _
                    .template('<p><%= text.replace(new RegExp("(" + $("day-food-input").val() + ")", "i") ,"<b>$1</b>") %></p>'),
                delay : 100,
                minLength : 3,
                value : function(model) {
                  return model.get('text')
                },
                click : foodSelected
              });

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
        },
        
        foodSelected : function(food) {
          console.log(food);
        }

      });
})();