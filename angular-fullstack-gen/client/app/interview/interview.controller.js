'use strict';

angular.module('angularFullstackDemoApp')
  .controller('InterviewCtrl', function ($scope, $http, socket) {
    $scope.interviews = [];
    $scope.current = null;
    $scope.errors = [];

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('interview');
    });

    $http.get('/api/interviews/')
      .success(function (response) {
        $scope.interviews = response;
        socket.syncUpdates('interview', $scope.interviews);
      });

    $scope.create = function () {
      console.log('create interview');
      $scope.reset();
      $scope.current = {};
    };

    $scope.reset = function() {
      $scope.errors = [];
      $scope.form.$setPristine();
      $scope.form.$setValidity();

      for(var field in $scope.form) {
        var fieldElem = $scope.form[field];
        if(fieldElem) {
          if(fieldElem.$setValidity) {
            console.log(field);
            console.log(fieldElem);
            fieldElem.$setValidity('server', true);
          }

          if(fieldElem.$setPristine) {
            fieldElem.$setPristine();
          }
        }
      }
    };

    $scope.save = function () {
      $scope.reset();
      console.log('saving interview: ');
      console.log($scope.current);

      $http.post('/api/interviews', $scope.current)
        .then(function (response) {
          console.log('interview saving SUCCESS');
          console.log(response);
          $scope.current = null;
        }, function (err) {
          console.log('interview saving FAIL');
          //for(var key in err.data) {
          //  $scope.errors.push(err.data[key]);
          //  //$scope.form[key].$setValidity(err.data[key], false);
          //  $scope.form[key].$error = err.data[key];
          //}

          angular.forEach(err.data.errors, function(errors, field) {
            $scope.form[field].$setValidity('server', false);
            $scope.errors.push(errors.message);
          });
        });
    };

    $scope.cancel = function() {
      $scope.reset();
      $scope.current = null;
    };

    $scope.delete = function(toDelete) {
      $http.delete('/api/interviews/' + toDelete._id)
        .then(function(response) {
          console.log(response);
        }, function(err) {
          $scope.error = err;
        });
    };
  });
