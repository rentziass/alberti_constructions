angular.module('myapp').controller('HomeController', function($scope, Users) {
  // Users.getList().then(function(data) {
  //   console.log(data);
  // });

  Users.log_lol();
  $scope.test = "sono una variabile";
  
});
