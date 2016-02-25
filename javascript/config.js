angular.module('myapp').config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  
  $urlRouterProvider.otherwise('/home');

  $stateProvider.state('home', {
    url: '/home',
    views: {
      '': {
        templateUrl: 'templates/home/index.html',
        controller: 'HomeController'
      }
    }
  });

});
