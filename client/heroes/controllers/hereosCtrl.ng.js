angular.module("dota2stats").controller("HeroesCtrl", function ($scope, $meteor) {
  $scope.heroes = $meteor.collection(Heroes);

});
