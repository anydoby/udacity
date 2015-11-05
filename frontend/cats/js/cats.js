var Cat = function(title, src) {
  this.title = title;
  this.src = src;
  this.count = 0;
};
Cat.prototype.constructor = Cat;

var module = angular.module('cats-premium', []);
module.controller(
    'CatController',
    function($scope) {
      var app = this;
      app.cats = [ new Cat('Cat 1', 'http://dreamatico.com/data_images/cat/cat-1.jpg'),
          new Cat('Cat 2', 'http://dreamatico.com/data_images/cat/cat-2.jpg'),
          new Cat('Cat 3', 'http://dreamatico.com/data_images/cat/cat-3.jpg'),
          new Cat('Cat 4', 'http://dreamatico.com/data_images/cat/cat-4.jpg'),
          new Cat('Cat 5', 'http://dreamatico.com/data_images/cat/cat-5.jpg'), ];
      app.selectCat = function(cat) {
        app.selectedCat = cat;
        $scope.selectedCat = cat;
      };
      app.selectCat(app.cats[0]);
      app.catClicked = function() {
        app.selectedCat.count++;
      };
    });

module.controller('CatAdmin', function($scope) {
  var admin = this;
  admin.cat = {};
  $scope.$watch('admin.visible', function(newValue){
    if (newValue) {
      admin.editingCat = $scope.$parent.selectedCat;
      angular.copy(admin.editingCat, admin.cat);
    }
  });
  admin.save = function() {
    angular.copy(admin.cat, admin.editingCat);
    admin.visible = false;
  };
  admin.cancel = function() {
    admin.visible = false;
  };
});