angular.module('dota2stats').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('heroDetails', {
      url: '/hero/:heroId',
      template: '<hero-details></hero-details>'
    });

  $urlRouterProvider.otherwise("/");
});
