angular.module('alberti_web', ['ui.router', 'pascalprecht.translate', 'duScroll']);

angular.module('alberti_web').run(function($rootScope, $translate, $document) {
  $rootScope.changeLang = function(lang) {
    return $translate.use(lang);
  };
  $rootScope.scrollToElement = function(elmt_id) {
    return $document.scrollToElementAnimated(angular.element(document.getElementById(elmt_id)));
  };
  (function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
      (i[r].q = i[r].q || []).push(arguments);
    };
    i[r].l = 1 * new Date;
    a = s.createElement(o);
    m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
  })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
  ga('create', 'UA-57988742-1', 'auto');
  return ga('send', 'pageview');
});

angular.module('alberti_web').config(function($stateProvider, $urlRouterProvider, $httpProvider, $translateProvider) {
  $translateProvider.translations('it', lang_it);
  $translateProvider.translations('en', lang_en);
  $translateProvider.preferredLanguage('it');
  $stateProvider.state('home', {
    url: '/home',
    views: {
      '': {
        templateUrl: 'templates/home.html',
        controller: 'HomeController'
      }
    }
  });
  return $urlRouterProvider.otherwise('/home');
});

angular.module('alberti_web').controller('ContactsController', function($scope, Mandrill) {
  $scope.contact_form = {};
  $scope.contact_form_data = {};
  $scope.is_sending = false;
  return $scope.sendEmail = function(ev) {
    ev.preventDefault();
    if (!(!$scope.contact_form_data.full_name || !$scope.contact_form_data.email || !$scope.contact_form_data.message)) {
      $scope.is_sending = true;
      return Mandrill.sendMail($scope.contact_form_data).then(function(resp) {
        console.log(resp);
        if (resp.data[0].status === "sent") {
          $scope.contact_form_data.send_success = true;
          return $scope.is_sending = false;
        }
      });
    }
  };
});

angular.module('alberti_web').controller('HomeController', function($scope) {});

var lang_en;

lang_en = {
  TITLE: 'Ideations, DESIGNS, ACHIEVEMENTS OF MAJOR INFRASTRUCTURE, CONSTRUCTION AND CIVIL AND INDUSTRIAL',
  SUBTITLE: 'We propose and coordinate a team of leading companies in their industry sectors for the synergistic application of modern solutions that meet every need "specific" and to the "turnkey".'
};

var lang_it;

lang_it = {
  TITLE: 'IDEAZIONI, PROGETTAZIONI, REALIZZAZIONI DI GRANDI OPERE INFRASTRUTTURALI, COSTRUZIONI E IMPIANTI CIVILI E INDUSTRIALI',
  SUBTITLE: 'Proponiamo e coordiniamo un pool di aziende leader nei propri comparti di settore per la applicazione sinergica di soluzioni moderne che soddisfano qualsiasi esigenza «specifica» e fino alla consegna «chiavi in mano».'
};

angular.module('alberti_web').service('Mandrill', function($q, $http) {
  var baseMailer, urlBase;
  urlBase = 'https://mandrillapp.com/api/1.0/messages/send.json';
  baseMailer = {
    key: "PgQjPpxuJNhrw0CwSYjaVA",
    message: {
      from_email: "##EMAIL##",
      to: [
        {
          email: "frenzi@koodit.it",
          name: "##FULL_NAME##",
          type: "to"
        }
      ],
      autotext: "true",
      subject: "Messaggio ricevuto da ##FULL_NAME## tramite sito.",
      html: "##MESSAGE##" + '</br></br>' + "##FULL_NAME##"
    }
  };
  this.sendMail = function(contact_form_data) {
    var deferred, mail_to_send;
    mail_to_send = baseMailer;
    mail_to_send.message.from_email = contact_form_data.email;
    mail_to_send.message.to[0].name = contact_form_data.full_name;
    mail_to_send.message.subject = "Messaggio ricevuto da " + contact_form_data.full_name + " tramite sito.";
    mail_to_send.message.html = contact_form_data.message + '</br></br>' + contact_form_data.full_name;
    deferred = $q.defer();
    $http({
      url: urlBase,
      method: 'POST',
      data: baseMailer
    }).then(function(data) {
      return deferred.resolve(data);
    }, function(data) {
      return deferred.reject(data);
    });
    return deferred.promise;
  };
  return this;
});
