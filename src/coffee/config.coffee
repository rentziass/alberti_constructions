angular.module('alberti_web').config ($stateProvider, $urlRouterProvider, $httpProvider, $translateProvider) ->

  $translateProvider.translations('it', lang_it)

  $translateProvider.translations('en', lang_en)

  # $translateProvider.translations('fr', lang_fr)

  $translateProvider.preferredLanguage('it');

  # routes

  $stateProvider.state 'home',
    url: '/home'
    views: '':
	    templateUrl: 'templates/home.html'
	    controller: 'HomeController'

  $urlRouterProvider.otherwise '/home'

