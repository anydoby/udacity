var app = app || {};

app.Foods = Backbone.Collection.extend({
  url : 'https://apibeta.nutritionix.com/v2/autocomplete?appId=52be4fe3&appKey=f046c68c4dc175477d1378818e4415e7',
  model : app.Food,
  comparator : 'name'
});

/*
app.foods = new app.Foods();
app.foods.fetch({
  data : {
    q : 'greek y'
  },
  processData : true
}).done(function(result) {
  console.log(result);
});
*/