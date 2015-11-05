(function (angular) {

  angular.module('catsModule', [DataProvider])
    .directive('catsList', function(DataProvider) {
      return {
        restrict : 'E',
        templateUrl: 'cats-list.html',
        controller : function($scope) {
          var cats = DataProvider.list();
          $scope.cats = cats;
        }
      }
      
    });
})();

