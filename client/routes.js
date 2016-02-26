angular.module('dota2stats').config(function($urlRouterProvider, $stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('heroDetails', {
      url: '/hero/',
      reloadOnSearch: false,
      params: {
        'name': undefined
      },
      controller: 'heroCtrl as herodata',
      templateUrl: 'client/heroes/templates/hero-details.html'
    })
    .state('home', {
      url: '/',
      controller: 'homeCtrl as home',
      templateUrl: 'client/home/templates/home.html'
    });

  $urlRouterProvider.otherwise("/");
});
