angular.module('myapp').service('Users', function($q, $http) {

  this.getList = function() {
    var deferred = $q.defer();

    $http({
      url: "",
      method: 'GET'
    }).then(function(data) {
      return deferred.resolve(data);
    }).error(function(data) {
      console.log("error", data)
    });

    return deferred.promise;
  };

  this.log_lol = function() {
    console.log('lol');
  };

});
