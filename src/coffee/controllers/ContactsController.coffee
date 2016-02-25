angular.module('alberti_web').controller 'ContactsController', ($scope, Mandrill) ->

  $scope.contact_form = {}
  $scope.contact_form_data = {}

  $scope.is_sending = false

  $scope.sendEmail = (ev) ->
    ev.preventDefault()

    unless !$scope.contact_form_data.full_name || !$scope.contact_form_data.email || !$scope.contact_form_data.message
      $scope.is_sending = true
      Mandrill.sendMail($scope.contact_form_data).then (resp) ->
        console.log resp
        if resp.data[0].status == "sent"
          $scope.contact_form_data.send_success = true
          $scope.is_sending = false
  
