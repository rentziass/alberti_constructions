angular.module('alberti_web').config ($stateProvider, $urlRouterProvider, $httpProvider, $translateProvider, $locationProvider) ->

  $translateProvider.translations('it', lang_it)

  $translateProvider.translations('en', lang_en)

  # $translateProvider.translations('fr', lang_fr)

  $translateProvider.preferredLanguage('it');

  $locationProvider.html5Mode(
    enabled: true,
    requireBase: false,
  );

  # routes

  $stateProvider.state 'home',
    url: '/'
    views: '':
	    templateUrl: 'templates/home.html'
	    controller: 'HomeController'

  $urlRouterProvider.otherwise '/'

